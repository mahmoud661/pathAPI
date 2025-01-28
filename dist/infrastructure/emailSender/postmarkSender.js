"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postmark_1 = require("postmark");
const config_1 = require("../../config");
class PostmarkSender {
    constructor() {
        this.postmarkClient = new postmark_1.ServerClient(config_1.config.postmarkToken);
    }
    static get instance() {
        return PostmarkSender._instance;
    }
    async resetPassword(...args) {
        const res = {
            SubmittedAt: '',
            MessageID: '',
            ErrorCode: 0,
            Message: '',
        };
        return res;
    }
    async announce(...args) {
        const res = {
            SubmittedAt: '',
            MessageID: '',
            ErrorCode: 0,
            Message: '',
        };
        return res;
    }
    async confirmEmail(name, email, actionUrl) {
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
        const res = {
            SubmittedAt: '',
            MessageID: '',
            ErrorCode: 0,
            Message: '',
        };
        return res;
    }
}
PostmarkSender._instance = new PostmarkSender();
exports.default = PostmarkSender;
//# sourceMappingURL=postmarkSender.js.map