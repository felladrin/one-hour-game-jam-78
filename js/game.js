angular.module('game', [])
    .controller('GameController', function ($scope, $timeout) {
        $scope.isRunning = false;

        $scope.stats = {
            limesSold: 0,
            consumerSatisfaction: 0,
            currentHour: 5,
            currentMinute: 0
        };

        $scope.paymentsToReceive = [];

        var displayGameOverMessage = function () {
            alert("The Day is Over!\nCongratulations for selling " + $scope.stats.limesSold + " limes today!\nConsumers seem to be " + ($scope.stats.consumerSatisfaction > 0 ? 'satisfied!' : 'unsatisfied!'));
        };

        var increaseMinute = function () {
            if ($scope.isRunning) {
                if ($scope.stats.currentMinute == 59) {
                    $scope.stats.currentMinute = 0;
                    $scope.stats.currentHour++;
                    if ($scope.stats.currentHour >= 20) {
                        $scope.isRunning = false;
                        displayGameOverMessage();
                    }
                }
                else {
                    $scope.stats.currentMinute++;
                }
            }
            $timeout(increaseMinute, 50);
        };

        var decreaseConsumerSatisfaction = function () {
            if ($scope.isRunning) {
                $scope.stats.consumerSatisfaction--;
            }
            $timeout(decreaseConsumerSatisfaction, Math.floor((Math.random() * 3000 / ($scope.paymentsToReceive.length + 1)) + 500));
        };

        increaseMinute();
        decreaseConsumerSatisfaction();

        $scope.sellLime = function () {
            $scope.stats.limesSold++;
            $scope.stats.consumerSatisfaction++;
            $scope.paymentsToReceive.push(angular.copy($scope.stats.limesSold));
        };

        $scope.receivePayment = function (index) {
            $scope.paymentsToReceive.splice(index, 1);
        };

        $scope.start = function () {
            $scope.stats.limesSold = 0;
            $scope.stats.consumerSatisfaction = 0;
            $scope.stats.currentHour = 5;
            $scope.stats.currentMinute = 0;
            $scope.isRunning = true;
            $scope.paymentsToReceive = [];
        }
    });