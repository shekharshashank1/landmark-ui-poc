angular.module('imageChatApp').controller('inputSpeechController', ['$scope','imagesService', function($scope, imagesService){
	
	  this.rec = new webkitSpeechRecognition();	  
	  this.final = '';
	  this.finalText = '';
	  this.searchHistoryList = [];
	  this.recLabel = 'start voice input'
	  var self = this;
	  
	  this.rec.continuous = false;
	  this.rec.lang = 'en-US';
	  this.rec.interimResults = false;
	  this.rec.onerror = function(event) {
	    console.log('error!');
	  };

	  this.start = function() {
	    self.rec.start();
	    self.recLabel = 'stop voice input';
	  };

	  this.stop = function() {
	  	self.rec.stop();
	    self.recLabel = 'start voice input';
	  }
	  
	  this.rec.onresult = function(event) {
	  	self.final = '';
	    for(var i = event.resultIndex; i < event.results.length; i++) {
	      if(event.results[i].isFinal) {
	      		self.final = self.final.concat(event.results[i][0].transcript);	
	      		self.finalText = self.final;     
	      		var imgUrl = imagesService.getImageUrl(self.finalText);
	  			imgUrl.then(function(data){	
	  				self.addToList(data);  					  					  		
			  		self.rec.stop();	
			  		self.recLabel = 'start voice input';      		        
	  			});	        	
	      } 	      
	    }
	  };	

	  this.submitForm = function() {
	  	var imgUrl = imagesService.getImageUrl(self.finalText);
	  		imgUrl.then(function(data){
	  			self.addToList(data); 
	  		});
	  };

	  this.addToList = function(data) {
					if(data.imgUrl && data.imgUrl.webformatURL){
	  					self.searchHistoryList.push({'title': self.finalText, 'imgUrl': data.imgUrl.webformatURL, 'currDate': new Date()});
	  					self.finalText = '';
	  				} else {
	  					self.finalText = 'sorry. The image could not be found. Try again';
	  				}	  	
	  }
	
}]);