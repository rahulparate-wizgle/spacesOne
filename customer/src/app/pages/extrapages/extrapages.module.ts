import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbCarouselModule,NgbTooltipModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Search Filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Component
import { ExtraPagesRoutingModule } from "./extrapages-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { AboutComponent } from './about/about.component';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { SortByExtraPagesPipe } from '../extrapages/sort-by.pipe';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    AboutComponent,
    BlogGridComponent,
    SingleBlogComponent,
    ContactsComponent,
    HelpCenterComponent,
    SortByExtraPagesPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgbCarouselModule,
    NgbTooltipModule,
    NgbPaginationModule,
    Ng2SearchPipeModule,
    ExtraPagesRoutingModule,
    SharedModule,
    NgxUsefulSwiperModule
  ]
})
export class ExtraPagesModule { }
