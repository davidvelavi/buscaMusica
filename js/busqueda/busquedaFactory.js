(function(){

	var busquedaFactory = function($http){
		return{
				busquedaArtista:function(url){
					return $http.get(url);
				},
				busquedaTracks:function(url){
					return $http.get(url);
				}
		}
	}


	var modulo =angular.module("musica");
	modulo.factory("busquedaFactory",busquedaFactory);
}());