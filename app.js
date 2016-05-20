 var modulo = angular.module("musica",["ui.router"]);
     // https://api.spotify.com/v1/search?q=Ricardo+Arjona&type=album
      modulo.controller("BuscarMusica",function($scope,$http,busquedaFactory){
	      	$scope.Artista={};
	      	$scope.Artista.tracks=[];
	      	$scope.Hide = true;
	      	$scope.HideLoader = true;
	      	$scope.OtrasOpciones=[];
	      	$scope.Relacionado = true;


	      $scope.buscar = function(artista){
	      	console.log(artista)
	      	var query = "q="+artista;
	      	var tipo = "&type=artist";
	      	var url = "https://api.spotify.com/v1/search?"+query+tipo;
	      	var track = {};
	      	busquedaFactory.busquedaArtista(url).success(function(data){
	      		$scope.OtrasOpciones = [];
	      		$scope.RelacionadoLength = 0;
	      		$scope.Relacionado = true;
	      		console.log("busqueda artista",data)
	      		
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
	      			console.log("Similares",$scope.OtrasOpciones)
			      	var artista = data.artists.items[0];
			      	$scope.Artista.img = artista.images[0].url;
			      	$scope.Artista.nombre = artista.name;
			      	var tipoTrack = "&type=track";
			      	var query2 = "q="+$scope.Artista.nombre;
			      	var urlTrack = "https://api.spotify.com/v1/search?"+query2+tipoTrack;


			      	/*busquedaFactory.busquedaTracks(urlTrack).success(function(data){
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
			      			$scope.HideLoader = true;
		      				$scope.Hide = false;
			      	})*/
			    }
			    else{
			    	$scope.Artista={};
	      			$scope.Artista.tracks=[];
	      			$scope.Mensaje = "artista no encontrado";
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

	var busquedaFactory = function($http){
		return{
				busquedaArtista:function(url){
					return $http.get(url);
				},
				busquedaTracks:function(url){
					return $http.get(url);
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