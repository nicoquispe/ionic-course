angular.module('starter.countries',[])
.factory('Countries', function($http){
	var theMessage = 'Lista de paises';
	var currentCountry = {};
	var countries = [];
	return{
		setCountries: function ( _countries ) {
			countries = _countries;
		},
		getCountries: function(){
			var _this = this;
			return $http.get('https://restcountries.eu/rest/v1/all')
			.then(function(response){
				_this.setCountries( response.data );
				return response.data;
			}, function(error){
				console.log(error)
				return error;
			});
		},
		get: function(countryCode) {
			for (var i = 0; i < countries.length; i++) {
				if (countries[i].alpha2Code === countryCode) {
					return countries[i];
				}
			}
			return null;
		},
		setCurrentCountry: function ( country ) {
			currentCountry = country;
		},
		getCurrentCountry: function(){
			return currentCountry;
		},
		getMessage: function(){
			return theMessage;
		},
		all: function(){
			return savedCountries;
		}
	}
});
