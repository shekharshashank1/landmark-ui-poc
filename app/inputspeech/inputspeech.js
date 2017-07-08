angular.module('inputSearch',[]);


angular.module('inputSearch').directive('inputspeech', function(){
	return {
		replace: false,	
		restrict: 'E',	
		templateUrl: 'inputspeech/views/inputspeech.html'
	}
});

angular.module('inputSearch').directive('imagebox', function() {
	return {
		restrict: 'E',
		
		scope: {
			searchedItem: '=info'			
		},
		templateUrl: 'directives/imagebox/views/imagebox.html'
	}
});

