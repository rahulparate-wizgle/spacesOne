import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {
  channels: any;
  currentChannel: any;
  MessageList: any;
  myUserId: any = '';
  messageText: string = '';
  channelName: string = '';
  enquiryList: any;
  attachedFile: any;
  constructor(private chatService: ChatService, private apiService: ApiService) {

  }

  // bread crumb items
  breadCrumbItems!: Array<{}>;


  async ngOnInit(): Promise<void> {
    await this.initChat();
    this.getCustomerEnquiries()
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Account', link: '/account/info' },
      { label: 'Message Inbox', active: true }
    ];


  }

  async getCustomerEnquiries() {
    (await this.apiService.commonGet('/customer-enquiries/0')).subscribe((res: any) => {
      this.enquiryList = res;
      this.getAllOpenChannels(this.enquiryList);
    });
  }

  async initChat() {
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

  getChannelNameForCustomer(channel: any) {
    let strData = channel.data;
    if (strData.length) {
      let data = JSON.parse(strData);
      return data.venueName;
    }
    return channel._name ?? '--';
  }

  async selectChannel(id: string) {
    let index = this.channels.indexOf(this.channels.find((a: { _url: any; }) => a._url == id))
    this.channels[index]['isNewMessage'] = false;
    this.channels[index]['newMessageText'] = '';
    this.currentChannel = await this.chatService.enterInChannel(id);
    this.chatService.receiveOpenChannelMessage(this.myUserId, this.onMessageReceived)
    this.getCurrentChannelMessages();
  }

  async getCurrentChannelMessages() {
    let mList = await this.chatService.getChannelMessages(this.currentChannel);
    this.MessageList = mList.filter((a: { channelUrl: any; }) => a.channelUrl == this.currentChannel?._url)
  }

  onMessageReceived = (channel: any, message: any) => {
    if (channel._url == this.currentChannel?._url) {
      this.MessageList.push(message);
    } else {
      let index = this.channels.indexOf(this.channels.find((a: { _url: any; }) => a._url == channel._url))
      this.channels[index]['isNewMessage'] = true;
      this.channels[index]['newMessageText'] = message.message.length > 10 ? message.message.substring(0, 10) + '..' : message.message;
    }
  }

  getDateFromStamp(stamp: any) {
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

fileUploaded(event: any) {
  if (event.target.value) {
      const file = event.target.files[0];
      const type = file.type;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const blob = new Blob([reader.result || ''], { type:type });
        this.attachedFile = blob || '';
      };
  }
}

downloadFile(url: any){
  //TODO Download file
}

clearInputControl(){
  //TODO
}
openFileUploader(){
  document.getElementById('file-uploader')?.click();
}





}


