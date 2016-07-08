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

.controller('AccountCtrl', function($scope, $ionicPopup) {
	$scope.showCustomDialog = function ( ) {
		var customDialog = $ionicPopup.show({
			title: 'Alerta Personalizada',
			template: '¿Qué tipo de diaglod desea abrir?',
			buttons: [
				{
					text: "Alert",
					type: 'button-assertive',
					onTap: function(e) {
						return 'alert';
					}
				},{
					text: "Confirm",
					type: 'button-dark',
					onTap: function(e) {
						return 'confirm';
					}
				},{
					text: "Ninguno",
					type: 'button-calm'
				}
			]
		});
		customDialog.then( function ( response ) {
			if( !response ) return;
			switch( response ){
				case 'alert': 
					$scope.showAlert('Abriendo desde .SHOW');
					break;
				case 'confirm':
					$scope.showConfirm();
					break;
			}
		} )
	};
	$scope.showConfirm = function () {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Eliminar',
			okType: 'button-assertive',
			cancelType: 'button-light',
			template: '¿Estas seguro de querer eliminar.?',
			
		});
		confirmPopup.then( function ( response ) {
			if ( response ) {
				$scope.showAlert('Si deseas eliminar');
			}
			else{
				$scope.showAlert('Ok no hay problema');
			}
		} );
	};
	$scope.showAlert = function ( message ) {
		$ionicPopup.alert({
			subTitle: 'Esta es una alerta fake',
			title: '!Cuidado!',
			cssClass: 'my-alert',
			template: message,
			okText: 'No me importa',
			okType: 'button-assertive',
		});
	};
	$scope.settings = {
		enableFriends: true
	};
})
.controller('CountryDetailCtrl', function($scope, $stateParams, Countries) {
	//$scope.country = Countries.get( $stateParams.countryId );
	$scope.country = Countries.getCurrentCountry();
	if ( $scope.country.currencies &&  $scope.country.currencies.length )
		$scope.country.currencies = $scope.country.currencies.join(', ');

	myLatlng = new google.maps.LatLng($scope.country.latlng[0], $scope.country.latlng[1]);
	
	var mapOptions = {
		center: myLatlng,
		zoom: 5,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControl: true
	};
	var map = new google.maps.Map(document.getElementById("map"),
		mapOptions);

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'Aquí es México'
	});

	$scope.map = map;
})

.controller('CountriesCtrl', function($scope, Countries, $ionicLoading, $state) {
	$scope.theMessage = Countries.getMessage();
	$scope.showDetail = function ( country ) {
		Countries.setCurrentCountry( country );
		$state.go('tab.country-details');
	};
	$scope.getCountries = function(){
		Countries.getCountries().then( function ( response ){
			$scope.theCountries = response;
			$ionicLoading.hide();
		}, function ( error ) {
			console.log(error)
			$ionicLoading.hide()
		} );
	}
	$ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner icon="spiral"></ion-spinner>'
	});
	$scope.getCountries();
});
