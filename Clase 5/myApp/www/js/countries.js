angular.module('starter.countries',[])
.factory('Countries', function($http){
  var theMessage = 'Lista de paises';
  var savedCountries = {};
  var selectedCountry = {};

  return{
    getMessage: function(){
      return theMessage;
    },
    all: function(){
      return savedCountries;
    },
    selectCountry: function(country){
      selectedCountry = country;
      console.log("El país seleccionado es "+ selectedCountry.name)
    },
    getSelectedCountry: function(){
      return selectedCountry;
    }

  }
});
