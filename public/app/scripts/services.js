'use strict';

angular.module('confusionApp')
    .constant("baseURL","http://localhost:3000/")
    .service('menuFactory', ['baseURL', '$resource', function(baseURL, $resource) {        

        this.getDishes = function(){
                                        
            return $resource(baseURL+"dishes/:id",null,  {
                'update': {
                    method:'PUT' 
                }
            });
                                    
        };

        this.getPromotions = function(index) {
            
            return $resource(baseURL+"promotions/:id",null, {
                'update': {
                    method: 'PUT' 
                }
            });   
            
        };

    }])
    .service('corporateFactory', ['baseURL', '$resource', function(baseURL, $resource) {
        
        this.getLeaders = function() {
            return $resource(baseURL+"leadership/:id",null, {
                'update': {
                    method: 'PUT'
                }
            });
        };
        
    }])
    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "feedback/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        
    }])