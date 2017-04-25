'use strict';
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
            });
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])
        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:""};
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])
        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    var newFeedback = new feedbackFactory($scope.feedback);
                    newFeedback.$save();
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
        }])
        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            //Step 1: Create a JavaScript object to hold the comment from the form

            $scope.input = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                $scope.input.date = new Date().toISOString();
                console.log($scope.input);
                $scope.dish.comments.push($scope.input);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.input = {rating:5, comment:"", author:"", date:""};
            };
        }])
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            $scope.message = "Loading...";
            $scope.showLeader = false;
            corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }])
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            $scope.showPromotion = false;
            $scope.messageP="Loading ...";
            $scope.promotion = menuFactory.getPromotions().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.promotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.messageP = "Error: "+response.status + " " + response.statusText;
                    }
                );
            $scope.showLeader = false;
            $scope.messageL ="Loading ...";
            $scope.execcef = corporateFactory.getLeaders().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.execchef = response;
                        $scope.showLeader = true;
                    },
                    function(response) {
                        $scope.messageL = "Error: "+response.status + " " + response.statusText;
                    }
                );
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.featdish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.featdish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
        }]);