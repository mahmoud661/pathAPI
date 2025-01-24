import { ServerClient } from 'postmark';
import { config } from '../../config';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import ISender from '../../application/ISender/ISender';

class PostmarkSender implements ISender {
  private postmarkClient: ServerClient;
  private static _instance: PostmarkSender = new PostmarkSender();

  private constructor() {
    this.postmarkClient = new ServerClient(config.postmarkToken);
  }
  static get instance() {
    return PostmarkSender._instance;
  }

  async resetPassword(...args: any[]): Promise<MessageSendingResponse> {
    const res: MessageSendingResponse = {
      SubmittedAt: '',
      MessageID: '',
      ErrorCode: 0,
      Message: '',
    };
    return res;
  }
  async announce(...args: any[]): Promise<MessageSendingResponse> {
    const res: MessageSendingResponse = {
      SubmittedAt: '',
      MessageID: '',
      ErrorCode: 0,
      Message: '',
    };
    return res;
  }
  async confirmEmail(
    name: string,
    email: string,
    actionUrl: string,
  ): Promise<MessageSendingResponse> {
    // try {
    //   const res = await this.postmarkClient!.sendEmailWithTemplate({
    //     From: '120220622132@st.ahu.edu.jo',
    //     To: email,
    //     TemplateAlias: 'devpath-confirm',
    //     TemplateModel: {
    //       product_url: config.devPathUrl,
    //       product_name: 'Dev Path',
    //       name: name,
    //       action_url: actionUrl,
    //       company_name: 'Dev Path',
    //       company_address: 'Jordan',
    //     },
    //   });
    //   return res;
    // } catch (error: Error | any) {
    //   Logger.Error(error, 'send confirmEmail');
    //   return {
    //     ErrorCode: 500,
    //     Message: 'string',
    //   } as MessageSendingResponse;
    // }
    const res: MessageSendingResponse = {
      SubmittedAt: '',
      MessageID: '',
      ErrorCode: 0,
      Message: '',
    };
    return res;
  }
}

export default PostmarkSender;
