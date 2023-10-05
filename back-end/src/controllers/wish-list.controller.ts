import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  RestBindings,
  HttpErrors,
} from '@loopback/rest';
import {WishList} from '../models';
import {VenueMasterRepository, WishListRepository} from '../repositories';
import { inject } from '@loopback/core';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { authenticate } from '@loopback/authentication';

export class WishListController {
  constructor(
    @repository(WishListRepository)
    public wishListRepository : WishListRepository,
    @repository(VenueMasterRepository)
    public venueMasterRepository: VenueMasterRepository,
  ) {}


  @authenticate('jwt')
  @get('/wishlist')
  @response(200, {
    description: 'Array of WishList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WishList, {includeRelations: true}),
        },
      },
    },
  })
  async findAll(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<any> {
    const _userId = currentUserProfile[securityId];
    let wishList = await this.wishListRepository.findOne({where:{userId:_userId}});

    if(wishList && wishList.venues.length > 0){
      let venuesIds = wishList.venues;
      let venueIdFilterArr = [];
      for(let i=0;i<venuesIds.length;i++){
        venueIdFilterArr.push({id:venuesIds[i]})
      }
      let venues = await this.venueMasterRepository.find({where:{or:venueIdFilterArr}})
      return venues;
    }else{
      return [];
    }
  }


  @authenticate('jwt')
  @post('/add-to-wishlist/{venueId}') // Use path parameter
  async addToWishlist1(
    @param.path.string('venueId') venueId: string, // Access venueId from path parameter
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<any> {
    // Ensure that venueId is provided
    console.log("venueId", venueId);
    try {
      const _userId = currentUserProfile[securityId];
      console.log("userID", _userId);    
      if (!venueId) {
        throw {
          statusCode: 400, // Bad Request
          message: 'The venueId parameter must be provided in the URL.',
        };
      }

      let wishlist = await this.wishListRepository.findOne({where:{userId:_userId}});
      if(wishlist){
        //wishlist is present.
        if(!wishlist.venues){
          wishlist.venues = [];
        }
        wishlist.venues.push(venueId)
       await this.wishListRepository.updateById(wishlist.id,wishlist)
      }else{
        //wishlist in  not present
        let wishlist = {userId:_userId,venues:[venueId]};
        console.log('-- ',JSON.stringify(wishlist))
        let res = await this.wishListRepository.create(wishlist);
      }
      // Create a new wishlist entry and associate it with the user

      return {isSuccess : true,message:''} ;
    } catch (error) {
      const typedError = error as Error;
      console.error(`Error adding venue to wishlist: ${typedError.message}`);
      return {isSuccess : false,message:typedError.message}
    }
  }


  @authenticate('jwt')
 @del('/remove-from-wishlist/{venueId}') // Use path parameter
async removeFromWishlist(
  @param.path.string('venueId') venueId: string, // Access venueId from path parameter
  @inject(SecurityBindings.USER)
  currentUserProfile: UserProfile,
): Promise<any> {
  try {
    const userId = currentUserProfile[securityId];
    console.log("userID", userId);

    if (!venueId) {
      throw {
        statusCode: 400, // Bad Request
        message: 'The venueId parameter must be provided in the URL.',
      };
    }

    // Check if the wishlist entry exists for the user
    const wishlist = await this.wishListRepository.findOne({ where: { userId: userId } });

    if (wishlist) {
      // Check if the venueId exists in the user's wishlist
      const venueIndex = wishlist.venues.indexOf(venueId);

      if (venueIndex !== -1) {
        // Remove the venueId from the user's wishlist
        wishlist.venues.splice(venueIndex, 1);

        // Update the wishlist in the database
        await this.wishListRepository.updateById(wishlist.id, wishlist);

        return { isSuccess: true, message: 'Venue removed from wishlist.' };
      } else {
        throw {
          statusCode: 404, // Not Found
          message: 'Venue not found in the wishlist.',
        };
      }
    } else {
      throw {
        statusCode: 404, // Not Found
        message: 'Wishlist not found for the user.',
      };
    }
  } catch (error) {
    const typedError = error as Error;
    console.error(`Error removing venue from wishlist: ${typedError.message}`);
    return { isSuccess: false, message: typedError.message };
  }
}

@authenticate('jwt')
@get('/is-already-in-wishlist/{venueId}') // Use path parameter
async isAlreadyInWishlist(
  @param.path.string('venueId') venueId: string, // Access venueId from path parameter
  @inject(SecurityBindings.USER)
  currentUserProfile: UserProfile,
): Promise<{ isAlreadyInWishlist: boolean }> {
  // Ensure that venueId is provided
  try {
    const _userId = currentUserProfile[securityId];
    console.log("USERID", _userId)
    console.log("VENUEID",venueId)
   
    if (!_userId) {
      throw {
        statusCode: 401, 
        message: 'User not authenticated.',
      };
    }

    if (!venueId) {
      throw {
        statusCode: 400, // Bad Request
        message: 'The venueId parameter must be provided in the URL.',
      };
    }

    // Find the user's wishlist
    const wishlist = await this.wishListRepository.findOne({
      where: { userId: _userId },
    });

    if (!wishlist || !wishlist.venues) {
      // Wishlist doesn't exist or is empty, so the venue is not in the wishlist
      return { isAlreadyInWishlist: false };
    }

    // Check if the venueId is in the user's wishlist
    const isAlreadyInWishlist = wishlist.venues.includes(venueId);

    return { isAlreadyInWishlist };
  } catch (error) {
    const typedError = error as Error;
    console.error(`Error checking if venue is in wishlist: ${typedError.message}`);
    throw typedError; // You can decide to handle or propagate the error as needed
  }
}
}





