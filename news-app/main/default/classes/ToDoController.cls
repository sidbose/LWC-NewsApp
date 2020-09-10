public with sharing class ToDoController {
    
    @AuraEnabled
    public static void addToDoList(List<ToDoList__c> todoList) {
        System.debug(todoList);
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDoList__c> getToDoItems() {
        return [ SELECT ToDo_Item__c,Completed__c FROM ToDoList__c ];
    }
}
