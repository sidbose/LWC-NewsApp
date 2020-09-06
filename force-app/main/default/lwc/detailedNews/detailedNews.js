import { LightningElement, wire } from 'lwc';

// Import message service features required for publishing and the message channel
import { subscribe, MessageContext } from 'lightning/messageService';
import NEWS_SELECTED_CHANNEL from '@salesforce/messageChannel/News_Selected__c';

export default class DetailedNews extends LightningElement {
    article;

    subscribe;

    // By using the MessageContext @wire adapter, unsubscribe will be called
    // implicitly during the component descruction lifecycle.
    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for LMS subscribe.
    subscribeToMessageChannel() {
        subscribe(this.messageContext, NEWS_SELECTED_CHANNEL, (message) => {
            this.article = message.article;
        });
    }

    // Standard lifecycle hooks used to sub/unsub to message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}