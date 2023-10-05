import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

import { ChatUser, ChatMessage } from './chat.model';

import { chatData, chatMessagesData } from './data';
import { ChatService } from 'src/app/services/chat.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  channels: any;
  currentChannel: any;
  MessageList: any;
  myUserId:any='';
  messageText:string = '';
  channelName:string = '';


  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;

  username = 'Steven Franklin';

  // bread crumb items
  breadCrumbItems: Array<{}>;
  chatData: ChatUser[];
  chatMessagesData: ChatMessage[];
  formData: UntypedFormGroup;
  // Form submit
  chatSubmit: boolean;
  usermessage: string;
  emoji = '';
  enquiryList: any;
  currentEnquiry: any;
  attachedFile: any = null;
  id: any;

  constructor(public formBuilder: UntypedFormBuilder,private chatService:ChatService,private apiService:ApiService
    ,private activeRoute : ActivatedRoute) {
  }

  async ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Enquiry', active: true }];

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.onListScroll();

    this._fetchData();
    await this.initChat();
    this.getCustomerEnquiries();
  }

  ngAfterViewInit() {
    this.scrollEle.SimpleBar.getScrollElement().scrollTop = 100;
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 200;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  private _fetchData() {
    //manager-enquiries/{status}
    this.chatData = chatData;
    this.chatMessagesData = chatMessagesData;
  }

  async getCustomerEnquiries() {
    (await this.apiService.commonGet('/manager-enquiries/0')).subscribe(async (res: any) => {
      this.enquiryList = res;
      await this.getAllOpenChannels(this.enquiryList);
      if(this.id){
        await this.selectChannel(this.id);
      }
    });
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  chatUsername(name) {
    this.username = name;
    this.usermessage = 'Hello';
    this.chatMessagesData = [];
    const currentDate = new Date();

    this.chatMessagesData.push({
      name: this.username,
      message: this.usermessage,
      time: currentDate.getHours() + ':' + currentDate.getMinutes()
    });

  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message').value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      this.chatMessagesData.push({
        align: 'right',
        name: 'Henry Wells',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes()
      });
      this.onListScroll();

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null
      });
    }

    this.chatSubmit = true;
  }

  // Delete Message
  deleteMessage(event:any){
    event.target.closest('li').remove();
  }

  // Copy Message
  copyMessage(event:any){
    navigator.clipboard.writeText(event.target.closest('li').querySelector('p').innerHTML);
  }

  // Delete All Message
  deleteAllMessage(event:any){
    var allMsgDelete:any = document.querySelector('.chat-conversation')?.querySelectorAll('li');
    allMsgDelete.forEach((item:any)=>{
      item.remove();
    })
  }

  // Emoji Picker
  showEmojiPicker = false;
  sets:any = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set:any = 'twitter';
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event:any) {
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

  closeReplay(){
   document.querySelector('.replyCard')?.classList.remove('show');
  }

  // Contact Search
  ContactSearch(){
    var input:any, filter:any, ul:any, li:any, a:any | undefined, i:any, txtValue:any;
    input = document.getElementById("searchContact") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    ul = document.querySelectorAll(".chat-list");
    ul.forEach((item:any)=>{
      li = item.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h5")[0];
        txtValue = a?.innerText;
        if (txtValue?.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
      }
    })
  }

// CHAT METHODS

  async initChat(){
  let userStr = localStorage.getItem('user') || '';
  if (userStr?.length > 0) {
    let user = JSON.parse(userStr);
    this.myUserId = user.userId;
  }
  await this.chatService.initSendbirdChat();

}

async getAllOpenChannels(enqList: any[]) {
  this.channels = [];
  for (let i = 0; i < enqList.length; i++) {
    let entry = await this.chatService.enterInChannel(enqList[i].id);
    this.channels.push(entry);
  }
  this.chatService.receiveOpenChannelMessage(this.myUserId, this.onMessageReceived)
}

getCustomerNameForVendor(channel: any) {
  let strData = channel.data;
  if (strData.length) {
    let data = JSON.parse(strData);
    return data.venueName;
  }
  return channel._name ?? '--';
}

async selectChannel(id:string){
  let index =  this.channels.indexOf(this.channels.find((a: { _url: any; })=>a._url == id))
  this.channels[index]['isNewMessage'] = false;
  this.channels[index]['newMessageText'] = '';
  this.currentEnquiry = this.enquiryList[index];
  this.currentChannel = await this.chatService.enterInChannel(id);
  this.chatService.receiveOpenChannelMessage(this.myUserId,this.onMessageReceived)
  this.getCurrentChannelMessages();
}

async getCurrentChannelMessages(){
  let mList = await this.chatService.getChannelMessages(this.currentChannel);
  this.MessageList = mList.filter((a: { channelUrl: any; })=>a.channelUrl == this.currentChannel?._url);
  console.log(this.MessageList)
}

onMessageReceived = (channel:any,message:any) => {
  if(channel._url == this.currentChannel?._url){
    this.MessageList.push(message);
  }else{
     let index =  this.channels.indexOf(this.channels.find((a: { _url: any; })=>a._url == channel._url))
     this.channels[index]['isNewMessage'] = true;
     this.channels[index]['newMessageText'] = message.message.length > 10 ? message.message.substring(0,10) +'..': message.message;
  }
}

getDateFromStamp(stamp:any){
  return new Date(stamp);
}

async sendMessage(){
if(this.attachedFile != null){
  await this.chatService.sendFileInChannel(this.currentChannel,this.attachedFile,(s)=>{
    this.MessageList.push(s)
    this.attachedFile = null;
    this.clearInputControl();
  })
}
  if(this.messageText.length){
    await this.chatService.sendMessageInChannel(this.currentChannel,this.messageText,(s)=>{
      this.MessageList.push(s)
      this.messageText = '';
    })
  }
}

fileUploaded(event) {
  if (event.target.value) {
      const file = event.target.files[0];
      const type = file.type;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const blob = new Blob([reader.result], { type:type });
        this.attachedFile = blob
      };
  }
}

downloadFile(url){
  //TODO Download file
}

clearInputControl(){
  //TODO
}
openFileUploader(){
  document.getElementById('file-uploader').click();
}



}
