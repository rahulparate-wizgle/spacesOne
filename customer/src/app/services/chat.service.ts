import { Injectable } from "@angular/core";
import SendbirdChat, { BaseChannel } from "@sendbird/chat";
import { BaseMessage, FileMessageCreateParams, MessageListParams, UserMessage, UserMessageCreateParams } from "@sendbird/chat/message";
import { OpenChannel, OpenChannelHandler, OpenChannelListQuery, OpenChannelListQueryParams, OpenChannelModule } from "@sendbird/chat/openChannel";

const apiToken = '5ba0790ec46073b463884755693cc03308c89118';
@Injectable({
  providedIn: "root",
})
export class ChatService {
  sb: any;

  // Http Options
  constructor(
  ) {
    this.initSendbirdChat();
  }

  async initSendbirdChat() {
    this.sb = SendbirdChat.init({
      appId: '718108F9-1875-418C-AB43-ABBA6A7988D1',
      modules: [new OpenChannelModule()],
    });
    let userStr = localStorage.getItem('user') || '';
    if (userStr?.length > 0) {
      let user = JSON.parse(userStr);
      await this.sb.connect(user.userId);
    }
  }

  async createUser(id: any, name: any, profileUrl = 'https://test.venues.one/assets/img/real-estate/blog/th02.jpg') {
    var myHeaders = new Headers();
    myHeaders.append("Api-Token", apiToken);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var raw = JSON.stringify({
      "user_id": id,
      "nickname": name,
      "profile_url": profileUrl,
      "issue_access_token": "true"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    let response = '';
    await fetch("https://api-718108F9-1875-418C-AB43-ABBA6A7988D1.sendbird.com/v3/users", requestOptions)
      .then(response => response.text())
      .then(result => {
        response = result;
      })
      .catch(error => console.log('error', error));
    return response;
  }

  async createOpenChannel(channelName: any, channelUrl: any,data ={}) {
    let channelParam = {
      channelUrl: channelUrl,
      name: channelName,
      data:JSON.stringify(data)
    }
    return await this.sb.openChannel.createChannel(channelParam)
  }

  async getChannels(){
    const params: OpenChannelListQueryParams = {
    };
    const query: OpenChannelListQuery = this.sb.openChannel.createOpenChannelListQuery(params);
    if (query.hasNext) {
      const channels: OpenChannel[] = await query.next();
      return channels;
    }
    return []
  }

  getChatInstance() {
    return this.sb;
  }

  async getChannelMessages(channel:any){
    try {
      const params: MessageListParams = {
        prevResultSize: 50,
        nextResultSize: 50,
        // ...
      };
      return await channel.getMessagesByTimestamp(Math.floor(new Date().getTime() / 1000), params);
    } catch(e) {
      // Handle error
    }
  }

  async enterInChannel(channelId: any) {
    let channel = await this.sb.openChannel.getChannel(channelId);
    await channel.enter();
    return channel;
  }

  async sendMessageInChannel(channel: any, MsgText: any, onSuccess = (s: any) => { }, onError = (e: any) => { }) {
    const params: UserMessageCreateParams = {
      message: MsgText
    };
    let response;
    channel.sendUserMessage(params)
      .onSucceeded((s: any) => {
        onSuccess(s)
      }).onFailed((err: any) => {
        onError(err)
      });
    return response;
  }

  async sendFileInChannel(channel: any, msgFile: any, onSuccess = (s: any) => { }, onError = (e: any) => { }) {
    const params: FileMessageCreateParams = {
      file: msgFile, // Or .fileUrl = FILE_URL (You can also send a file message with a file URL.)
  };
    let response;
    channel.sendFileMessage(params)
      .onSucceeded((s: any) => {
        onSuccess(s)
      }).onFailed((err: any) => {
        onError(err)
      });
    return response;
  }

  receiveOpenChannelMessage = (UNIQUE_HANDLER_ID: any, _onMessageReceived: any) => {
    const channelHandler = new OpenChannelHandler({
      onMessageReceived: (channel: BaseChannel, message: BaseMessage) => {
        _onMessageReceived(channel, message)
      }
    });
    this.sb.openChannel.addOpenChannelHandler(UNIQUE_HANDLER_ID, channelHandler);
  }



}
