import { LightningElement, api, wire } from 'lwc';

export default class NewsItem extends LightningElement {
    @api
    article;

    newsClickedHandler(event) {
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();

        // Creates the event with the news Data
        const newsSelectedEvnt = new CustomEvent('newsclicked', { detail: this.article });

        // Dispatches the event.
        this.dispatchEvent(newsSelectedEvnt);
    }
}