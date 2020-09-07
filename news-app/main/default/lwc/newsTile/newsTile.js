import { LightningElement, wire } from "lwc";
import getNews from '@salesforce/apex/NewsController.getNews'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import NEWS_SELECTED_CHANNEL from '@salesforce/messageChannel/News_Selected__c';

export default class NewsTile extends LightningElement {

    articles;
    error;
    articleClicked;

    //wiring to a function.
    @wire(getNews) getNewsData({ data, error }) {
        if (data) {
            this.articles = data.articles;
        }
        else if (error) {
            this.showToastNotification(error);
        }
    }

    @wire(MessageContext)
    messageContext;

    // handle news clicked event propagated from child
    newsClickedHanderParent(event) {
        this.articleClicked = event.detail;

        const payload = { article: this.articleClicked }

        publish(this.messageContext, NEWS_SELECTED_CHANNEL, payload);
    }

    //helper method
    showToastNotification(error) {
        this.dispatchEvent(new ShowToastEvent({
            title: "Error loading news",
            message: reduceErrors(error).join(', '),
            variant: 'error'
        }));
    }

}
