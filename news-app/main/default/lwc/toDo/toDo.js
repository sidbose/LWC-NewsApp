import { LightningElement, wire } from 'lwc';
import addToDoList from '@salesforce/apex/ToDoController.addToDoList'
import getToDoItems from '@salesforce/apex/ToDoController.getToDoItems'

export default class ToDo extends LightningElement {
    todos = [];

    //wiring to a function
    @wire(getToDoItems)
    getCurrentToDoItems({ data, error }) {
        if (data) {
            this.todos = data;
        }
        else if (error) {
            this.showToastNotification(error);
        }
    }

    addtohandler(event) {
        todos.push(this.template.query("lightning-input").value);
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