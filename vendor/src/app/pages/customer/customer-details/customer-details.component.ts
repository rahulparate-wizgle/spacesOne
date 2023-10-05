import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from './customer-details.model';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  id: string;
  customerData: any= [];
  breadCrumbItems: Array<{}>;
  revenueBarChart: ChartType;
  statData;
  constructor(
    private customerService:CustomerService,
    private activeRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.getCustomer(this.id);
    }
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
  }

  async getCustomer(id) {
    (await this.customerService.getCustomerbyId(id)).subscribe((res) => {
      this.customerData = res;
    });
  }
}
