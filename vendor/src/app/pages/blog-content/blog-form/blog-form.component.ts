import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BlogAPIService } from "../blog-api.service";
import { blogFormList } from "./blog-form.model";
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { Country, State, City } from "country-state-city";



@Component({
  selector: "app-blog-form",
  templateUrl: "./blog-form.component.html",
  styleUrls: ["./blog-form.component.scss"],
})
export class BlogFormComponent implements OnInit {


  countries = Country.getAllCountries();
  states: any;
  cities: any;
  country: any;
  selectedCountry;
  selectedState;
  selectedCity;
  $select: any;
  filterBy: any;

  // getVal(val)
  // {
  //   console.warn(val)
  // }

  onCountryChange(country): void {

    this.states = State.getStatesOfCountry((country)?.isoCode);
    this.selectedCountry = (country);
    this.cities = this.selectedState = this.selectedCity = null;
  }

  onStateChange(state): void {
    this.cities = City.getCitiesOfState((this.selectedCountry)?.isoCode, (state)?.isoCode)
    this.selectedState = (state);
    this.selectedCity = null;

  }

  filter() {
    this.countries = [...this.filterBy.filter(country => country.name.includes(this.filterBy))]
  }

  onCityChange(city): void {
    this.selectedCity = city
  }

  attachedFiles = function (files) {

    this.media = files;
  }

  fileForm = new FormGroup({

  });
  fileToUpload: any;
  handleFileInput(e: any) {
    this.fileToUpload = e?.target?.files[0];
  }
  saveFileInfo() {
    const formData: FormData = new FormData();
    formData.append('myFile', this.fileToUpload);
    return this.http.post("http://localhost:3000/files", formData,
      {
        headers: new HttpHeaders()
      }).subscribe(() => alert("file uploaded"))
  }



  public Editor = ClassicEditor;
  validationError: any = {};
  blogForm: any;
  id: string;
  employeeModelObj: blogFormList = new blogFormList();
  blogData: any;
  image: any;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private service: BlogAPIService,
    private activeRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.blogForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      image: ["", [Validators.required]],
      city: [""],
      country: [""],
      state: [""],
      mobileNumber: ["", [Validators.required]],
      publishDate: ["", [Validators.required]],
      description: ["", [Validators.required]],
      summary: ["", [Validators.required]],
      // address: ["", [Validators.required]],
    });
    if (this.id) {
      this.getblog(this.id);
    }

  }

  dropzoneConfig: DropzoneConfigInterface = {
    url: '/'
  }


  get form() {
    return this.blogForm.controls;
  }
  async getblog(id) {

    (await this.service.getBlogbyId(id)).subscribe((res) => {
      this.blogData = res;
      this.blogForm.patchValue(this.blogData);
    });
  }

  async postBlogData(event) {
    debugger
    this.employeeModelObj.name = this.blogForm.value.name;
    this.employeeModelObj.image = this.blogForm.value.image;
    this.employeeModelObj.country = this.selectedCountry?.name;
    this.employeeModelObj.state = this.selectedState?.name;
    this.employeeModelObj.city = this.selectedCity?.name;
    this.employeeModelObj.mobileNumber = this.blogForm.value.mobileNumber;
    this.employeeModelObj.publishDate = this.blogForm.value.publishDate;
    this.employeeModelObj.description = this.blogForm.value.description;
    this.employeeModelObj.summary = this.blogForm.value.summary;
    // this.employeeModelObj.editor = this.blogForm.value.editor;
    if (this.blogForm.status != "INVALID") {
      if (this.id) {
        (
          await this.service.updateBlog(this.id, this.employeeModelObj)
        ).subscribe(
          async (res: any) => {
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
                text: 'You won\'t be updated!',
                icon: 'warning',
                confirmButtonText: 'Yes, Updated!',
                cancelButtonText: 'No, cancel!',
                showCancelButton: true
              })
              .then(result => {
                this.router.navigate(['blog-form/list'])
                if (result.value) {
                  swalWithBootstrapButtons.fire(
                    'Updated!',
                    'Your file has been Updated.',
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
        );
      } else {
        (await this.service.postBlog(this.employeeModelObj)).subscribe(
          async (res: any) => {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger ms-2'
              },
              buttonsStyling: false
            });

            swalWithBootstrapButtons
              .fire({
                title: 'You Want to Add Blog?',
                icon: 'warning',
                confirmButtonText: 'Yes, Added!',
                cancelButtonText: 'No, cancel!',
                showCancelButton: true
              })
              .then(result => {
                this.blogForm.reset();
                this.router.navigate(['blog-content/list'])
                if (result.value) {
                  swalWithBootstrapButtons.fire(
                    'Add Blog',
                    'Your file has been Added.',
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
        );
        // this.saveFileInfo();

      }
    } else {
      this.validationError = this.service.getFormValidationErrors(
        this.blogForm
      );
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async fileChangeEvent(event: any): Promise<void> {
    let type = event?.target?.files?.length ? event.target.files[0].type : "";
    if (!["image/jpg", "image/png", "image/jpeg"].includes(type)) {
      this.service.showToast(
        "Unsupported File Type, Please select file of type png/jpg/jpeg."
      );
      return;
    }
    let result = await this.toBase64(event.target.files[0]);
    this.image = result;
  }

  //file-upload
  async postImageData(event) {

    // this.employeeModelObj.image = this.blogForm.value.image;
    if (this.blogForm.status != "INVALID") {
      (await this.service.postImage(this.employeeModelObj)).subscribe(
        async (res: any) => {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger ms-2'
            },
            buttonsStyling: false
          });

          swalWithBootstrapButtons
            .fire({
              title: 'You Want to Add Blog?',
              icon: 'warning',
              confirmButtonText: 'Yes, Added!',
              cancelButtonText: 'No, cancel!',
              showCancelButton: true
            })
            .then(result => {
              this.blogForm.reset();
              this.router.navigate(['blog-form/list'])
              if (result.value) {
                swalWithBootstrapButtons.fire(
                  'Add Blog',
                  'Your file has been Added.',
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
      );

    }
  }
}
