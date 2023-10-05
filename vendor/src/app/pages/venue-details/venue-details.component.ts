import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.scss']
})
export class VenueDetailsComponent implements OnInit {
  isDisableOtherTabs = true;
  @Input() currentTab = 1;
  @Input() venue: any;
  externalProjectUrl = 'http://test.venues.one/#/venues/details/'
  constructor(private apiServive:ApiService, private activeRoute: ActivatedRoute, public router: Router) { }
  ngOnInit(): void {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    this.isDisableOtherTabs = venueId == '0'
  }


  switchTab(tab){
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    this.router.navigate(['venue-details/'+venueId+'/' + tab])
  }
  openPreview(id){
    const url = this.externalProjectUrl + id;
    window.open(url, '_blank');
  }
}
