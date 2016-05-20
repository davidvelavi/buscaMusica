(function(){

	var rutas = function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/musica")

		$stateProvider
		.state("musica",{
			url:"/musica",
			templateUrl:"buscador.html"
		})
		.state("album",{
			url:"/album/:id",
			templateUrl:"detalleAlbums.html"
		})
	}

	var modulo = angular.module("musica");
	modulo.config(rutas);
}());