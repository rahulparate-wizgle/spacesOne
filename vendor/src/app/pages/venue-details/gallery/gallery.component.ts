import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenueDetailsService } from '../venue-details.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
venue;
@Input() venueId;
  image;
  gallery:string[] = []
  files: any;
  isUploadStarted: boolean;
  constructor(private activeRoute: ActivatedRoute,private service: VenueDetailsService,) {

   }

  ngOnInit(): void {

this.getVenueDetails();
}
async getVenueDetails(){
  let venueId = this.activeRoute.snapshot.paramMap.get("id");
  (await this.service.getVenueDetails(venueId)).subscribe(res=>{
    this.venue = res;
    this.gallery = this.venue.gallery;
    if(this.venue?.gallery){
      this.image = this.venue.gallery[0];
    }
  },err=>{})
}
async postAttachedFiles(){
  let venueId = this.activeRoute.snapshot.paramMap.get("id");
  for(let i=0;i<this.files.length;i++){
    (await this.service.addGalleryImages(this.files[i], venueId,this.imageUploadCallback));
  }
  this.isUploadStarted = true;
  //window.location.reload();
}

imageUploadCallback = function(response){
console.log('res -- ', typeof response, ' - ' ,response)

let resObj = JSON.parse(response);

if(resObj.isSuccess){
}

}

fileChangeEvent(event: any): void {
  this.files = event.target.files
}
setMainImage(img){
this.image = img;
}
async deleteImage(index){
  let venueId = this.activeRoute.snapshot.paramMap.get("id");
  (await this.service.removeGalleryImages(venueId,index)).subscribe(res=>{
console.log(res);
this.getVenueDetails();
  },
  res=>{
    console.error(res)
  })

}
}
