import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venue-type',
  templateUrl: './venue-type.component.html',
  styleUrls: ['./venue-type.component.scss']
})
export class VenueTypeComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  statusClass = 'not-active';

   listData = [
    {   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJQwhwLrE9erA6n5Suyth1NNzeiGE3Lgktu6jcwgh&s",
        name: 'Chattarpur Farms',
        event:'Ambika Farms',
        id: 'More Info',
        title: 'House/Farm House',
        amount: '$ 1455',
        date: '10 Oct, 19',
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQydr1aC_1w32c4vPKo32xzZkG7gP07o656mp2Xv3Jayw&s',
        name: 'East India Company',
        event:'Center Point',
        id: 'More Info',
        title: 'Bar/Pubs',
        amount: '$ 1024',
        date: '11 Oct, 19',
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6PaIVxKWXaujsqhdeelDuRy3Rl5_o6S5JpSG91JURAA&s',
        name: 'Tuli International',
        event:'Lamba Celebration',
        id: 'More Info',
        title: 'Banquet',
        amount: '$ 1189',
        date: '12 Oct, 19',
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAxaCVzAKq5czerkEBsxotEBMtVHXdxbydzFxYxdCbMw&s',
        name: 'Radisson Blue',
        event:'Le-Mardian',
        id: 'More Info',
        title: 'Hotel/Restaurant',
        amount: '$ 1254',
        date: '12 Oct, 19',
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zRxfrFuKmfwuNNGJlTa-KKJ1MG61rCD-XtwMg2BSxQ&s',
        name: 'Rani Kothi',
        event:'CP Club',
        id: 'More Info',
        title: 'Lawn/Open Garden',
        amount: '$ 1024',
        date: '11 Oct, 19',
    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQ15PgU_hyfPIStegGSteSd1cG1RK559p_gQ4wfegeg&s",
        name: 'Chitnavis Center',
        event:'Deshpande Hall',
        id: 'More Info',
        title: 'Events',
        amount: '$ 1189',
        date: '13 Oct, 19',
    },

];




  constructor( public router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Venue' }, { label: 'Venue Type', active: true }];
  }

  setActiveClass(i){
    this.statusClass = i;
  }

}
