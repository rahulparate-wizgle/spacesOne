import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatUser, ChatMessage } from './chat.model';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormGroup } from '@angular/forms';
import { enquirylistApiService } from '../list/enquirylist-api.service';
import { ActivatedRoute } from '@angular/router';
import { VenuelistApiService } from '../../venue-list/venuelist-api.service';
import Swal from 'sweetalert2';
import { UsersService } from '../../users/users.service';
import { status } from "../status.data";
@Component({
  selector: 'app-enquiry-details',
  templateUrl: './enquiry-details.component.html',
  styleUrls: ['./enquiry-details.component.scss']
})
export class EnquiryDetailsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  chatMessagesData: any[];
  formData: FormGroup;
  chatSubmit: boolean;
  venuelistdata: any;
  formsubmit: boolean;
  selectAssign: any[];
  emoji = '';
  @ViewChild('scrollRef') scrollRef;
  chatData: ({ image: string; name: string; message: string; time: string; color: string; } | { name: string; message: string; time: string; color: string; image?: undefined; })[];
  enquiryData: any = [];
  id: any;
  status: void;
  assignId: void;
  venueName: any;
  venue: any;
  data: any;
  listData: string[];
  router: any;
  text: any;
  comments: ChatMessage[];
  userDetails: any;
  usersData: any;
  selectValue: any[];
  selectStatus: any[];

  constructor(public formBuilder: UntypedFormBuilder,
    private service: enquirylistApiService,
    private activeRoute: ActivatedRoute,
    private enquiryListService: enquirylistApiService,) { }



  ngOnInit(): void {
    this.getUsersListAllData();
    this.breadCrumbItems = [{ label: 'enquiry' }, { label: 'enquiry Details', active: true }];
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.onListScroll();


    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.getenquiry(this.id);
    }
    this.selectValue = status


  }
  async deleteEnquiryData() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-secondary ms-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure, You won\'t be able to revert this?',
        text: '',
        icon: 'warning',
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(async result => {
        if (result.value) {
          (await this.enquiryListService.deletEnquiry(this.id)).subscribe(res => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.router.navigate(["/enquiries"]);

          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {}

      })
  };

  async getenquiry(id) {

    (await this.service.getenquiryListbyId(id)).subscribe(async (res) => {

      this.enquiryData = res;
      this.status = this.enquiryData?.status;
      this.assignId = this.enquiryData?.userId;
      this.comments = this.enquiryData?.comments;

    });
  }
  async updateEnquiry(id) {

    (await this.service.updateEnquiry(this.id, this.data)).subscribe(res => {
      this.venue = res;
    })

  }
  async getUsersListAllData() {
    (await this.service.getUserList()).subscribe(res => {
      this.selectAssign = res;
    })
  }

  async updateAssign(event) {
    this.data = {};
    this.data['userId'] = event;

    (await this.service.updateEnquiry(this.id, this.data)).subscribe(res => {
      console.log(res);
    })

  }
  async updateStatus(event) {
    this.data = {};
    this.data['status'] = event;

    (await this.service.updateEnquiry(this.id, this.data)).subscribe(res => {
    })

  }




  /**
  * Returns form
  */
  get form() {
    return this.formData.controls;
  }
  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }
  /**
   * Save the message in chat
   */

  // Delete Message
  deleteMessage(event: any) {
    event.target.closest('li').remove();
  }

  // Copy Message
  copyMessage(event: any) {
    navigator.clipboard.writeText(event.target.closest('li').querySelector('p').innerHTML);
  }
  // Delete All Message
  deleteAllMessage(event: any) {
    var allMsgDelete: any = document.querySelector('.chat-conversation')?.querySelectorAll('li');
    allMsgDelete.forEach((item: any) => {
      item.remove();
    })
  }
  // Emoji Picker
  showEmojiPicker = false;

  sets: any = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set: any = 'twitter';
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    const { emoji } = this;
    const text = `${emoji}${event.emoji.native}`;
    this.emoji = text;
    this.showEmojiPicker = false;
  }
  onFocus() {
    this.showEmojiPicker = false;
  }
  onBlur() {
  }
  closeReplay() {
    document.querySelector('.replyCard')?.classList.remove('show');
  }

  async commentdata() {
    let data = this.formData.value;
    (await this.service.postComment(this.id, data)).subscribe(async (res) => {
      this.formData.reset();
      this.getenquiry(this.id)
    });
  }

}
