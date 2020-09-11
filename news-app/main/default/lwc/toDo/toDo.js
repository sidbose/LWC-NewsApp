import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';

import addToDoItem from '@salesforce/apex/ToDoController.addToDoItem'
import getToDoItems from '@salesforce/apex/ToDoController.getToDoItems'

export default class ToDo extends LightningElement {
    // @track is required for array and object properties 
    @track todos = [];

    connectedCallback() {
        getToDoItems()
            .then(result => {
                this.todos = result;
            })
            .catch(error => {
                this.showToastNotification(error);
            })
    }

    addtohandler() {
        const inputbox = this.template.querySelector("lightning-input");
        addToDoItem({
            todoItem: inputbox.value,
            completed: false
        })
            .then((res) => {
                console.log('addToDoItem() promise res: ' + res);
                // Update to do items by fetching fresh results. Returns a promise as it is not wired
                getToDoItems()
                    .then((result) => {
                        if (result) {
                            console.log('getToDoItems() promise result: ' + result);
                            inputbox.value = '';
                            this.todos = result;
                        }
                    })
                    .catch((error) => {
                        this.showToastNotification(error);
                    })

            })
            .catch((err) => {
                this.showToastNotification(err);
            });
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