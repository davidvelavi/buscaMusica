 var modulo = angular.module("musica",["ui.router"]);
     // https://api.spotify.com/v1/search?q=Ricardo+Arjona&type=album
      modulo.controller("BuscarMusica",function($scope,$http,busquedaFactory){
	      	
	      	$scope.Artista={};
	      	$scope.Artista.tracks=[];

	      $scope.buscar = function(artista){
	      	console.log(artista)
	      	var query = "q="+artista;
	      	var tipo = "&type=artist";
	      	var url = "https://api.spotify.com/v1/search?"+query+tipo;
	      	var track = {};
	      	busquedaFactory.busquedaArtista(url).success(function(data){
		      	var artista = data.artists.items[0];
		      	$scope.Artista.img = artista.images[0].url;
		      	$scope.Artista.nombre = artista.name;
		      	var tipoTrack = "&type=track";
		      	var urlTrack = "https://api.spotify.com/v1/search?"+query+tipoTrack;

		      	busquedaFactory.busquedaTracks(urlTrack).success(function(data){
		      		//console.log(data.tracks.items[0])
			      		track = {};
			      		$scope.Artista.tracks = [];
			      		for(var i in data.tracks.items){

				      		
				      		track.interpretes =[];
				      		track.cancion = data.tracks.items[i].name;
				      		track.album = data.tracks.items[i].album.name;
				      		track.id = data.tracks.items[i].album.id;
				      		var interpretes = data.tracks.items[i].artists;
				      		for(var j in interpretes)
				      		{
				      			track.interpretes.push(interpretes[j].name)
				      			
				      		}
			      			$scope.Artista.tracks.push(track);
			      			track = {};
			      		}

		      			//console.log("tracks",$scope.Artista.tracks)

		      	})





		      })
		 	}
	      
      });