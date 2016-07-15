angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('LoginCtrl', function($scope, $firebaseAuth, $state) {
	var auth = $firebaseAuth();
	$scope.loginWithGithub = function () {
		var credential = firebase.auth.GithubAuthProvider.credential('');
		firebase.auth().signInWithCredential(credential).then(function(result) {
			$scope.displayName = result.displayName;
			$scope.userData = result;
			$scope.credentialData = result;
			console.log(result);
		} ).catch( function ( error ) {
			console.log( error );
		} );
	};
	/*
	$firebaseAuth().$signInWithPopup("facebook").then( function (response) {
		console.log( response );
	} ).catch( function ( error ) {
		console.log( error );
	} );
	*/
	$scope.settings = {
		enableFriends: true
	};
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
