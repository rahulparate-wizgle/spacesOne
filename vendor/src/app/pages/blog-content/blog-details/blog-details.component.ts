import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogAPIService } from '../blog-api.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blogData: any= [];
  id: string;

  constructor( private service: BlogAPIService,
    private activeRoute: ActivatedRoute, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.getblog(this.id);
    }
  }


  async getblog(id) {

    (await this.service.getBlogbyId(id)).subscribe((res) => {
      this.blogData = res;
    });
  }

}
