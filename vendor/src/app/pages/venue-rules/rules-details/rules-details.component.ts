import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RulesAPIService } from '../rules-api.service';


@Component({
  selector: 'app-rules-details',
  templateUrl: './rules-details.component.html',
  styleUrls: ['./rules-details.component.scss']
})
export class RulesDetailsComponent implements OnInit {
  id: string;
  rulesData: any= [];


  constructor( private service: RulesAPIService,
    private activeRoute: ActivatedRoute, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.getRules(this.id);
    }
  }


  async getRules(id) {

    (await this.service.getRulesbyId(id)).subscribe((res) => {
      this.rulesData = res;
      console.log(" response", res);
    });
  }

}
