var app = angular.module('placetovisit.controller', [])

app.factory('PlaceStore', function(){
	var places = angular.fromJson(window.localStorage['places']) || [{
			placeId: '1',
			name: 'De Pulze Mall',
			desc: 'New Shopping Mall in Cyberjaya',
			city: 'Cyberjaya',
			img: 'img/depulze.png'
		},
		{
			placeId: '2',
			name: 'Alamanda Mall',
			desc: 'The only shopping Mall in Putrajaya with GSC Cinema',
			city: 'Putrajaya',
			img: 'img/alamanda.jpg'
			
		},
		{
			placeId: '3',
			name: 'Ayer8',
			desc: 'Restaurant and boutiques overlooking Putrajaya lake.',
			city: 'Putrajaya',
			img: 'img/ayer8.jpg'
			
		}];
		
		function saveData(){
			window.localStorage['places'] = angular.toJson(places);
		}
	return {
		create: function(place){
			places.push(place);
			saveData();
		},
		list: function(){
			return places;
		},
		getLength: function(){
			return places.length;
		},
		getPlace: function(placeId){
			for (var i = 0; i < places.length; i++){
				if (places[i].placeId === placeId) {
				return places[i]
				}
			}
			return undefined;
		}
	}
});
app.controller('PlaceToVisitCtrl', function($scope, PlaceStore){
	$scope.places = PlaceStore.list();
});

app.controller('EditPlaceCtrl', function($stateParams, $scope, PlaceStore){
	$scope.place = PlaceStore.getPlace($stateParams.placeId);
});

app.controller('AddPlaceCtrl', function($state, $scope, PlaceStore, $cordovaCamera){
	$scope.place = {
		placeId: (PlaceStore.getLength()+1).toString(),
		name: '',
		desc: '',
		city: '',
		img:''
	};
	
	$scope.addItem = function(){
		PlaceStore.create($scope.place);
		console.log($scope.place);
		$state.go('list');
	};
	
	
    $scope.takePhoto = function () {
		var options = {
			quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
		};
		$cordovaCamera.getPicture(options).then(function (imageData) {
                     $scope.place.img = "data:image/jpeg;base64," + imageData;
                       }, function (err) {
                           // An error occured. Show a message to the user
                       });
				   }
			
	
});