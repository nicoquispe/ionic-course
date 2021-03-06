angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
console.log(Countries.all())
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Countries.all();
  $scope.remove = function(chat) {
    Countries.remove(chat);
    console.log(Countries.all())
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Countries) {
  $scope.chat = Countries.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
