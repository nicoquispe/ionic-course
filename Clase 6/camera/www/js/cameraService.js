angular.module('starter.cameraService', [])
.factory('cameraService', function( $q ) {
	console.log( 'iniciando factory');
	return {
		getPicture: function ( options ) {
			var q = $q.defer();
			navigator.camera.getPicture( function ( result ) {
				console.log('responde promise');
				console.log(result);

				q.resolve( result );
			}, function ( error ) {
				console.log('responde error');
				console.log(error);
				q.reject( error );
			}, options);
			
			return q.promise;
		}
	};
});