import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileData: any= [];
  id: any;

  constructor(
    private service : UsersService,
    private activeRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.getUserProfile(this.id);

  }
  }

    async getUserProfile(id) {

      (await this.service.getUsersbyId(id)).subscribe((res) => {
        this.userProfileData = res;
      });
    }

    editProfile(id){
      this.router.navigate(["/users-list/users-form/" + id])
    }

}
