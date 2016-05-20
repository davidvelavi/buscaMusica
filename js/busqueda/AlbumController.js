(function(){

	var AlbumController = function($scope,$stateParams,busquedaFactory){
		$scope.Album = {};
		$scope.Album.tracks = [];
		var cancion = {};
		console.log("Saludos",$stateParams)
		var url = "https://api.spotify.com/v1/albums/"+$stateParams.id;
		busquedaFactory.busquedaAlbum(url).success(function(resp){
			//console.log(resp);
			$scope.Album.tracks=[];
			console.log($scope.Album.tracks)
			$scope.Album.nombre = resp.name;
			$scope.Album.img = resp.images[0].url;

			
			for(var i in resp.tracks.items)
			{
				
				cancion.nombre = resp.tracks.items[i].name;
				$scope.Album.tracks.push(cancion);
				cancion={};

			}
			//console.log("Cancion",$scope.Album.tracks)

		})


	}

	var modulo = angular.module("musica");
	modulo.controller("AlbumController",AlbumController)

}());