public with sharing class NewsController {

    private static final String apiKey = 'c93dfc7dd6a945ba899e2bddd9e4551b';
    private static final String endPoint = 'https://newsapi.org/v2/top-headlines?';

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getNews() {
        Map<String, Object> results = new Map<String,Object>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endPoint+'country=US&apiKey='+apiKey);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());  
        }
        return results;
    }
}
