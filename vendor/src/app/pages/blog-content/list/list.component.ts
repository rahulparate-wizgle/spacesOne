import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import {jobListModel} from './list.model';
// import { JobListdata } from './data';
import { JobListService } from './list.service';
import { NgbdJobListSortableHeader, SortEvent } from './list-sortable.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogAPIService } from '../blog-api.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [JobListService, DecimalPipe]
})

/**
 * List Component
 */
export class ListComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  jobListForm!: UntypedFormGroup;
  submitted = false;
  data: any;
  blogData:any;
  p: number = 1;
  // Table data
  content?: any;
  lists?: any;
  jobList!: Observable<jobListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobListSortableHeader) headers!: QueryList<NgbdJobListSortableHeader>;
  filteredUsers: any[];
  filterBy;

  constructor(private modalService: NgbModal,public service: JobListService, private formBuilder: UntypedFormBuilder,
    public router: Router, private activeRoute: ActivatedRoute , private blogservice: BlogAPIService, private loadingController: LoadingController) {
    this.jobList = service.jobList$;
    this.total = service.total$;
   }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Enquiry' }, { label: 'Enquiry List', active: true }];
    let id = this.activeRoute.snapshot.paramMap.get('id');

    this.getAllBlog()


     this.jobList.subscribe(x => {
      this.content = this.blogData;
      // this.blogData =  Object.assign([], x);
    });


  }


  async refresh(): Promise<void>{
    this.getAllBlog();
    const loading = await this.loadingController.create();
    await loading.present();
    await loading.dismiss();
  }

  GetName(input){
    if(input)
    {

      return(input)?.name;
    }
    return "-";
  }

  async getAllBlog(){

    (await this.blogservice.getBlogList()).subscribe(res => {

      this.blogData = res;
      this.filteredUsers = [...this.blogData];

    })

  }
  filter() {
    this.filteredUsers = [...this.blogData.filter(item => item.name?.includes(this.filterBy))];
  }

   /**
   * Open modal
   * @param content modal content
   */
    openViewModal(content: any) {
      this.modalService.open(content, { centered: true });
    }

    // The master checkbox will check/ uncheck all items
    checkUncheckAll(ev:any) {
      this.lists.forEach((x: { state: any; }) => x.state = ev.target.checked)
    }

    // Delete Data
    delete(event:any) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger ms-2'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          showCancelButton: true
        })
        .then(result => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            event.target.closest('tr')?.remove();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            );
          }
        });
    }

    /**
     * Open modal
     * @param content modal content
     */
     openModal(content: any) {
      this.submitted = false;
      this.modalService.open(content, { size: 'md', centered: true });
    }

    /**
     * Form data get
     */
     get form() {
      return this.jobListForm.controls;
    }

    /**
    * Save user
    */
     saveUser() {
      if (this.jobListForm.valid) {
        if (this.jobListForm.get('ids')?.value) {
          this.lists = this.lists.map((data: { id: any; }) => data.id === this.jobListForm.get('ids')?.value ? { ...data, ...this.jobListForm.value } : data)
        }else{
        const id = '11';
        const title = this.jobListForm.get('title')?.value;
        const name =  this.jobListForm.get('name')?.value;
        const location =  this.jobListForm.get('location')?.value;
        const experience =  this.jobListForm.get('experience')?.value;
        const position =  this.jobListForm.get('position')?.value;
        const type =  this.jobListForm.get('type')?.value;
        const posted_date = "02 June 2021";
        const last_date = " Can I visit the banquet hall and sample the food prior to booking it?";
        const status =  this.jobListForm.get('status')?.value;
        this.lists.push({
          id,
          title,
          name,
          location,
          experience,
          position,
          type,
          posted_date,
          last_date,
          status
        });
        this.modalService.dismissAll();
      }
      }
      this.modalService.dismissAll();
      setTimeout(() => {
        this.jobListForm.reset();
      }, 2000);
      this.submitted = true
    }

    /**
     * Open Edit modal
     * @param content modal content
     */
     editDataGet(id: any, content:any) {
      this.submitted = false;
      this.modalService.open(content, { size: 'md', centered: true });
      var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
      modelTitle.innerHTML = 'Edit Order';
      var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
      updateBtn.innerHTML = "Update";
      var listData = this.lists.filter((data: { id: any; }) => data.id === id);
      this.jobListForm.controls['title'].setValue(listData[0].title);
      this.jobListForm.controls['name'].setValue(listData[0].name);
      this.jobListForm.controls['location'].setValue(listData[0].location);
      this.jobListForm.controls['experience'].setValue(listData[0].experience);
      this.jobListForm.controls['position'].setValue(listData[0].position);
      this.jobListForm.controls['type'].setValue(listData[0].type);
      this.jobListForm.controls['status'].setValue(listData[0].status);
      this.jobListForm.controls['ids'].setValue(listData[0].id);
    }

    onDetails(id){

      this.router.navigate(['blog-content/blog-details/' + id])

      this.data = id;

    }

    onEdit(id) {

      this.router.navigate(['blog-content/blog-form/' + id])
      this.data = id;

    }

    async deleteBlogData(id, event) {

  const swalWithBootstrapButtons = Swal.mixin({

        customClass: {

          confirmButton: 'btn btn-success',

          cancelButton: 'btn btn-danger ms-2'

        },

        buttonsStyling: false

      });



      swalWithBootstrapButtons

        .fire({

          title: 'Are you sure?',

          text: 'You won\'t be able to revert this!',

          icon: 'warning',

          confirmButtonText: 'Yes, delete it!',

          cancelButtonText: 'No, cancel!',

          showCancelButton: true

        })

        .then(result => {

          this.blogservice.deleteBlog(id).subscribe(res => {

            if (result.value) {

              swalWithBootstrapButtons.fire(

                'Deleted!',

                'Your file has been deleted.',

                'success'

              );

              event.target.closest('tr')?.remove();

            } else if (

              /* Read more about handling dismissals below */

              result.dismiss === Swal.DismissReason.cancel

            ) {

              swalWithBootstrapButtons.fire(

                'Cancelled',

                'Your imaginary file is safe :)',

                'error'

              );




            }
            this.getAllBlog();

          });

        })




    };




}
