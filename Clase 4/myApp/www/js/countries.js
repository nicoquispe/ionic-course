angular.module('starter.countries',[])
.factory('Countries', function($http){
  var theMessage = 'Lista de paises';
  var savedCountries = {};

  return{
    getMessage: function(){
      return theMessage;
    },
    all: function(){
      return savedCountries;
    }
  }
});
