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
    $scope.settings = {
        enableFriends: true
    };

    $scope.showAlert = function(message) {
        $ionicPopup.alert({
            title: "¡CUIDADO!",
            subTitle: "Esta es una alerta fake",
            cssClass: "miAlerta",
            template: message,
            okText: "¡No me importa!",
            okType: "button-assertive"
        });
    }

    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: "Sobre tu viaje",
            template: "¿Deseas viajar?"
        })

        confirmPopup.then(function(response) {
            if (response) {
                $scope.showAlert('Si desea viajar');
                console.log('Si desea viajar')
            } else {
                $scope.showAlert('Se quedará aburrido en casa...');
                console.log('Se quedará aburrido en casa...')
            }
        })
    }

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


    $scope.getCountries = function() {
        $http.get('https://restcountries.eu/rest/v1/all')
            .then(function(response) {
                $scope.theCountries = response.data;
                $ionicLoading.hide();
            }, function(error) {
                console.log(error)
            });
    }
    $scope.getCountries();

    $scope.showDetail = function(country) {
        console.log(country);
        Countries.selectCountry(country);
        $state.go("tab.countries-details")
    }
})

.controller('CountriesDetailCtrl', function($scope, Countries, $compile) {
    console.log(Countries.getSelectedCountry())
    $scope.country = Countries.getSelectedCountry();

	//Code for draw Google Map
    $scope.initMap = function() {

        var myLatlng = new google.maps.LatLng(23, -102);
        console.log(myLatlng.lat)
        console.log(myLatlng.lng)

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
    }
})
