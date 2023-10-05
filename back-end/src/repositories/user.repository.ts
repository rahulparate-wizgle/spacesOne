import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {User, UserCredentials} from '../models';
import {DbDataSource} from '../datasources';
import {UserCredentialsRepository} from './user-credentials.repository';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export type Credentials = {
  username: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err: any) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  async findUsers(): Promise<User[] | undefined> {
    try {
      return await this.find({
        fields: {id: true, username: true, firstName: true, lastName: true},
      });
    } catch (err: any) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  async getVendorId(userId: string): Promise<string> {
    try {
      let user = await this.findById(userId);
      return user.vendorId || user.id;
    } catch (err: any) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return '';
      }
      throw err;
    }
  }

  async getDesignation(userId: string): Promise<string> {
    try {
      let user = await this.findById(userId);
      return user.roles?.length ? user.roles[0] : '';
    } catch (err: any) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return '';
      }
      throw err;
    }
  }

  async addVendorFilter(filter: any,currentUserProfile: UserProfile,): Promise<any> {
    const userId = currentUserProfile[securityId];
    try {
      if ((await this.getDesignation(userId)) !== 'admin') {
        let vendorId = await this.getVendorId(userId);
        if (!filter['where']) {
          //filter present but not where
          filter['where'] = {
            vendorId: vendorId,
          };
        } else {
          //filter present with where
          if (filter['where']['and'] || filter['where']['or']) {
            //Filter has and/or conditions
            if (!filter['where']['and']) {
              filter['where']['and'] = [];
            }
            filter['where']['and'].push({vendorId: vendorId});
          } else {
            //filter is present in where object
            filter['where']['vendorId'] = vendorId;
          }
        }
      }
    } catch (error) {
      console.log('err: ', JSON.stringify(error));
    }
    return filter;
  }
}
