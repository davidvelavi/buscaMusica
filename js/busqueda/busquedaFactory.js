(function(){

	var busquedaFactory = function($http,$q){
		return{
				busqueda:function(url){
					return $http.get(url);
				},
				busquedaArtista:function(url){
					return $http.get(url);
				},
				busquedaTracks:function(tracks){
					return $q.all(tracks);
				},
				busquedaAlbum:function(url){
					return $http.get(url);
				}
		}
	}


	var modulo =angular.module("musica");
	modulo.factory("busquedaFactory",busquedaFactory);
}());