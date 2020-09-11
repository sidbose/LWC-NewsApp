public with sharing class ToDoController {
    
    @AuraEnabled
    public static void addToDoItem(String todoItem, Boolean completed) {
        System.debug('Inside addToDoItem()');
        ToDoList__c todo = new ToDoList__c(ToDo_Item__c=todoItem, Completed__c=completed);
        insert todo;
    }

    @AuraEnabled
    public static List<ToDoList__c> getToDoItems() {
        System.debug('Inside getToDoItems()');
        return [ SELECT ToDo_Item__c,Completed__c FROM ToDoList__c WHERE OwnerId=:UserInfo.getUserId() ];
    }

    @AuraEnabled
    public static void deleteTodoItem(String todoID){
        ToDoList__c todo = [ SELECT ID FROM ToDoList__c WHERE ID=:todoID ];
        delete todo;
    }
}
