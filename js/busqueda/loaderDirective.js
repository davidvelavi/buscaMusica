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