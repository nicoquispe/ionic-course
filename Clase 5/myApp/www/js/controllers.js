angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.theMessage = Chats.getMessage('Sergio');
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CountriesCtrl', function($scope, Countries, $http, $state, $ionicLoading) {
  $scope.theMessage = Countries.getMessage();

  $ionicLoading.show({
    content: "Cargando...",
    animation: "fade-in",
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  $scope.getCountries = function(){
    $http.get('https://restcountries.eu/rest/v1/all')
    .then(function(response){
        $scope.theCountries = response.data;
        $ionicLoading.hide();
    }, function(error){
        console.log(error)
    });
  }
  $scope.getCountries();

  $scope.showDetail = function(country){
    console.log(country);
    Countries.selectCountry(country);
    $state.go("tab.countries-details")
  }
})

.controller('CountriesDetailCtrl', function($scope, Countries) {
    console.log(Countries.getSelectedCountry())
    $scope.country = Countries.getSelectedCountry();
})
