import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';

import addToDoItem from '@salesforce/apex/ToDoController.addToDoItem'
import getToDoItems from '@salesforce/apex/ToDoController.getToDoItems'
import updateToDoItem from '@salesforce/apex/ToDoController.updateToDoItem'
import deleteTodoItem from '@salesforce/apex/ToDoController.deleteTodoItem'

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

    completedHandler(event) {
        const ele = event.currentTarget;
        updateToDoItem({
            todoid: event.currentTarget.dataset.id,
            completed: true
        })
            .then(res => {
                ele.parentNode.classList.add('todo_completed');
            })
            .catch(error => {
                this.showToastNotification(error);
            })
    }

    deleteHandler(event) {
        deleteTodoItem({ todoID: event.currentTarget.dataset.id })
            .then(res => {
                getToDoItems()
                    .then((result) => {
                        if (result) {
                            this.todos = result;
                        }
                    })
                    .catch((error) => {
                        this.showToastNotification(error);
                    })
            })
            .catch(error => this.showToastNotification(error));
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