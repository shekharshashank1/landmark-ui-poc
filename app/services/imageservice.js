angular.module('imageChatApp').factory('imagesService',['$http', function($http) {
	var obj = {};
	var url = 'https://pixabay.com/api?key=5537510-1513f1715e0ed263b2b612efd&hp=&image_type=&cat=&min_width=&min_height=&q=';
	obj.getImageUrl = function(imageStr) {
		  return $http.get(url + imageStr + "&order=popular").then(function(response){ 
   		  	var data = response.data;      		  	
   		  	var imgUrl = data.hits[0];     	  
   		  	return {imgUrl};
 		  });
	};
	return obj;
}])