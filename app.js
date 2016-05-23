 var modulo = angular.module("musica",["ui.router"]);
     // https://api.spotify.com/v1/search?q=Ricardo+Arjona&type=album
      modulo.controller("BuscarMusica",function($scope,$http,busquedaFactory,$q){
	      	$scope.Artista={};
	      	$scope.Artista.albums=[];
	      	$scope.OtrasOpciones=[];
	      	$scope.Hide = true;
	      	$scope.HideLoader = true;
	      	$scope.Relacionado = true;

	      $scope.busquedaArtista= function(id){
	      	$scope.Hide = true;
	      	$scope.Artista={};
	      	$scope.Artista.albums=[];
	      	var url = "https://api.spotify.com/v1/artists/"+id;
	      	busquedaFactory.busquedaArtista(url).success(function(resp){
	      		//console.log(resp)
	      		var id = resp.id;
	      		$scope.Artista.img = resp.images[0].url;
			    $scope.Artista.nombre = resp.name;
			    var urlAlbums= "https://api.spotify.com/v1/artists/"+id+"/albums";
			    busquedaFactory.busquedaAlbum(urlAlbums).success(function(resp){
			    	
			    	var arregloPeticionesTracks=[]
			    	for(var i in resp.items)
			    	{
				    	var album = resp.items[i];
				    	var artistaAlbum = {};
				    	artistaAlbum.nombre = album.name;
				    	artistaAlbum.img = album.images[0].url;
				    	artistaAlbum.id = album.id;
				    	artistaAlbum.tracks = {};
				    	var urlTracks = "https://api.spotify.com/v1/albums/"+artistaAlbum.id+"/tracks";
				    	arregloPeticionesTracks.push($http.get(urlTracks));
				    	$scope.Artista.albums.push(artistaAlbum);
				    }

				    busquedaFactory.busquedaTracks(arregloPeticionesTracks).then(function(resp){
				    	//console.log("Canciones de Albums",resp[0].data.items[0])
				    	for(var i in resp)
				    	{
				    		var ArregloTracks=[];
				    		for(var j in resp[i].data.items)
				    		{
				    			var Datatrack = {};
						    	Datatrack.nombre = resp[i].data.items[j].name;
						    	Datatrack.duracion = resp[i].data.items[j].duration_ms;
						    	ArregloTracks.push(Datatrack);
				    		}
				    		$scope.Artista.albums[i].tracks= ArregloTracks;
				    	}	
				    })
				 console.log("Artistas",$scope.Artista)

			    })
 				$scope.Hide = false;
	      	})
	      }
	      $scope.buscar = function(artista){
	      //	console.log(artista)
	      	var query = "q="+artista;
	      	var tipo = "&type=artist";
	      	var url = "https://api.spotify.com/v1/search?"+query+tipo;
	      	var track = {};
	      	busquedaFactory.busqueda(url).success(function(data){
	      		$scope.OtrasOpciones = [];
	      		$scope.RelacionadoLength = 0;
	      		$scope.Relacionado = true;
	      		//console.log("busqueda artista",data)
	      		$scope.HideLoader = true;
	      		$scope.Mensaje = ""
	      		if(data.artists.items.length>0)
	      		{	

	      			for(var j in data.artists.items)
	      			{	var otroArtista ={};
	      					otroArtista.nombre = data.artists.items[j].name;
	      					otroArtista.id=data.artists.items[j].id;
	      					$scope.OtrasOpciones.push(otroArtista);
	      			}
	      			$scope.RelacionadoLength = $scope.OtrasOpciones.length ;
	      			//console.log("Similares",$scope.OtrasOpciones)
			      	var artista = data.artists.items[0];
			      	var id = artista.id;
			      	$scope.busquedaArtista(id);
			    }
			    else{
			    	$scope.Artista={};
	      			$scope.Artista.tracks=[];
	      			$scope.Mensaje = "Artista no encontrado";
	      			$scope.HideLoader = true;
		      		$scope.Hide = true;
			    }
		      		


		      })
		 	}
	      
      });
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
(function(){

	var loader = function(){
		return{
			restrict:'E',
			templateUrl:"loader.html",
			link:function(scope,ele,attrs)
			{
				console.log("sjkdsk")
			}
		}
	}

	var modulo = angular.module("musica");
	modulo.directive("loader",loader);
}());
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