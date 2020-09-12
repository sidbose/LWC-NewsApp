public with sharing class ToDoController {
    
    @AuraEnabled
    public static void addToDoItem(String todoItem, Boolean completed) {
        ToDoList__c todo = new ToDoList__c(ToDo_Item__c=todoItem, Completed__c=completed);
        insert todo;
    }

    @AuraEnabled
    public static void updateToDoItem(ID todoid, Boolean completed){
        ToDoList__c todo = new ToDoList__c(ID=todoid, Completed__c=completed);
        upsert todo;
    }

    @AuraEnabled
    public static List<ToDoList__c> getToDoItems() {
        return [ SELECT ToDo_Item__c,Completed__c FROM ToDoList__c WHERE OwnerId=:UserInfo.getUserId() ORDER BY createdDate ];
    }

    @AuraEnabled
    public static void deleteTodoItem(String todoID){
        ToDoList__c todo = [ SELECT ID FROM ToDoList__c WHERE ID=:todoID ];
        delete todo;
    }
}
