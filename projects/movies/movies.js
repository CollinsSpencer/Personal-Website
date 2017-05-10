angular.module('movieListApp', ['ngMaterial'])

.config(function ($mdThemingProvider) {
	var huskerRedMap = $mdThemingProvider.extendPalette('red', {
	    '500': '#d00000',
	    'contrastDefaultColor': 'light'
	});
	var lightBlueMap = $mdThemingProvider.extendPalette('blue', {
	    'contrastDefaultColor': 'dark',
	    'A100': '#BBDEFB',
	    'A200': '#90CAF9',
	    'A400': '#42A5F5',
	    'A700': '#1976D2',
	    'contrastLightColors': ['400', '500', '600', '700', '800', '900', 'A400', 'A700'],
	});

	var orangeBackgroundMap = $mdThemingProvider.extendPalette('grey', {
		'50': '#FFF8E1'
	});


	// Register the new color palette maps
	$mdThemingProvider.definePalette('huskerRed', huskerRedMap);
	$mdThemingProvider.definePalette('lightBlue', lightBlueMap);
	$mdThemingProvider.definePalette('orangeBackground', orangeBackgroundMap);

	// Use that theme for the primary intentions
	$mdThemingProvider.theme('default')
	    .primaryPalette('blue', {
	    	'default': '500'
	    })
		.accentPalette('orange', {
	    	'default': '400'
	    })
		.warnPalette('blue-grey')
		.backgroundPalette('orangeBackground', {

		});
	$mdThemingProvider.theme('darkTheme', 'default')
	    .primaryPalette('lightBlue')
	    .dark();

})

.controller("movieList", function($scope, $rootScope, $http, $mdDialog, $q, $window, $timeout) {
	$scope.updateTime = Date.now();
	$scope.priorityInput="2";
	$rootScope.ratings = [
              {name: 'Five', value: 5},
              {name: 'Four', value: 4},
              {name: 'Three', value: 3},
              {name: 'Two', value: 2},
              {name: 'One', value: 1},
              {name: 'Zero', value: 0}
              ];
  	$rootScope.priorities = [
              {name: 'High', value: 1},
              {name: 'Mid', value: 2},
              {name: 'Low', value: 3}
              ];
  	$rootScope.templates = [
              {name: 'toWatch', url: 'toWatch.html', switchModeLink: 'Watched Movies', title: 'Movies To Watch'},
              {name: 'haveWatched', url: 'haveWatched.html', switchModeLink: 'Movies To Watch', title: 'Watched Movies'}
              ];
  	$scope.template = $scope.templates[0];
  	$scope.switchTemplates = function() {
  		if($scope.template == $scope.templates[0]){
  			$scope.template = $scope.templates[1];
  		} else {
  			$scope.template = $scope.templates[0];
  		}
  		$rootScope.refreshForm();
  	}

  	//Adjust sizing on initial page load (document ready)
  	angular.element(document).ready(function () {
  	    checkSize();
  	});

  	//Adjust sizing on window resize
  	angular.element($window).on('resize', function () {
  		checkSize();
  	});

  	//Adjust sizing based on the css @media rule for a test class
  	function checkSize() {
  	    if ($(".testClass").css("float") == "left" ){
  	        $scope.sizing = 56;
  	    } else if ($(".testClass").css("float") == "none" ){
  	        $scope.sizing = 45;
  	    } else if ($(".testClass").css("float") == "right" ){
  	        $scope.sizing = 34;
  	    }
  	};

	//Promise that retrieves movies from database
	function getMovies() {
        var def = $q.defer();

        $http.get("getMovie.php")
            .success(function(data) {
                $scope.movies = data;
                def.resolve(data);
            })
            .error(function() {
                def.reject("Failed to get albums");
            });
        return def.promise;
    };

    //function that sets all .swipe objects as draggable
	$rootScope.refreshSwipe = function(){
		$( ".swipe" ).draggable({
			axis: "x",
			scroll: false,
			distance: 15,
			containment: [-4*$scope.sizing, 0, $scope.sizing/3, 0],
			/*drag: function( event, ui ) {
                ui.position.left = Math.min( $scope.sizing/3, ui.position.left );
                ui.position.left = Math.max( -4 * $scope.sizing, ui.position.left );
			},*/
			start: function( event, ui) {
				$(this).data('start', ui.position.left);
			},
			stop: function( event, ui ) {
				var start = $(this).data('start');
				if(start > (-1 * $scope.sizing) && ui.position.left < (-1 * $scope.sizing) || ui.position.left < (-3 * $scope.sizing)){
					$( this ).animate({
					    left: -3 * $scope.sizing,
					}, 300, function() {});
				}else if(ui.position.left >= -3 * $scope.sizing){
					$( this ).animate({
					    left: "0",
					}, 300, function() {});
				}
			},
		});
		return true;
	};

	//Promise that sets all .swipe objects as draggable
	function refreshSwipePromise() {
		return $q(function(resolve, reject) {
		    setTimeout(function() {
		      if ($rootScope.refreshSwipe()) {
		          resolve('Hello, ' + name + '!');
		      } else {
		          reject('Failure to refresh swipe.');
		      }
		    }, 1000);
		});
	};

	//Primary function for reloading the data and ensuring
	//  swipe object function properly
	$rootScope.refreshForm = function() {
		$q.all([
	        getMovies(),
	        refreshSwipePromise()
	    ]);
	}

	//functions that allow for scrolling on draggable objects
	$scope.firstY = null;
	$scope.lastY = null;
	$scope.currentY = null;
	$scope.vertScroll = false;
	$scope.initAdjustment = 0;
	angular.element(document).on('touchstart', '.swipe', function(e) {
		$scope.lastY = $scope.currentY = $scope.firstY = e.originalEvent.touches[0].pageY;
	});
	angular.element(document).on('touchmove', '.swipe', function(e) {
		$scope.currentY = e.originalEvent.touches[0].pageY;
	    var adjustment = $scope.lastY-$scope.currentY;

	    // Mimic native vertical scrolling where scrolling only starts after the
	    // cursor has moved left or right from its original position by ~30 pixels.
	    if ($scope.vertScroll == false && Math.abs($scope.currentY-$scope.firstY) > 30) {
	    	$scope.vertScroll = true;
	        $scope.initAdjustment = $scope.currentY-$scope.firstY;
	    }

	    // only apply the adjustment if the user has met the threshold for vertical scrolling
	    if ($scope.vertScroll == true) {
	        window.scrollBy(0,adjustment + $scope.initAdjustment);
	        $scope.lastY = $scope.currentY + adjustment;
	    }
	});
	angular.element(document).on('touchend', '.swipe', function(e) {
		$scope.vertScroll = false;
	});

	//Function to add movies to database
	$scope.addMovie = function(title,notes,priority) {
		console.log("Added: Title:" + title + " Notes:" + notes + " Priority:" + priority);
		$http.post("addMovie.php?title=" + title + "&notes=" + notes + "&priority=" + priority).success(
				function(data) {
					$rootScope.refreshForm();
					$scope.titleInput = "";
					$scope.notesInput = "";
				});
		//$rootScope.refreshForm();
	};

	//Function that deletes movie records from database
	$scope.deleteMovie = function(movieID) {
		if (confirm("Are you sure you want to delete this movie?")) {
			$http.post("deleteMovie.php?movieID=" + movieID).then(
					function(data) {
						$rootScope.refreshForm();
					}, function(){});
		}
	};

	//Binding that allows updates to be called from different controllers
	$rootScope.$on("callUpdate", function(event, input) {
		$scope.update(event, input.id, input.title, input.notes, input.rating, input.priority, input.watched);
	});

	//Update entire movie record in database
	$scope.update = function(event, id, title, notes, rating, priority, watched) {
		console.log("Updated " + title + " " + notes + " " + rating + " " + priority + " " + watched + " ");
		$http.post("updateMovie.php?movieID=" + id + "&title=" + title + "&notes=" + notes + "&rating=" + rating + "&priority=" + priority + "&watched=" + watched).success(
				function(data) {
					$rootScope.refreshForm();
					$scope.cancel();
				});
	};

	//Open a Dialog Modal for displaying notes about a single movie
	$scope.displayNotes = function(ev, id, title, notes, rating, priority, watched) {
		$mdDialog.show({
			parent: angular.element(document.body),
	        templateUrl: 'displayNotes.html',
	        preserveScope: true,
	        controller: 'DialogController',
	        targetEvent: ev,
	        fullscreen: $scope.customFullscreen,
	        locals: {
	        	event: ev,
	        	id: id,
	        	title: title,
	        	notes: notes,
	        	rating: rating,
	        	priority: priority,
	        	watched: watched
	        }
		}).then(function() {
			$rootScope.refreshForm();
		}, function() {});
	};

	//Binding that allows Edit dialog to be opened from different controllers
	$rootScope.$on("callEdit", function(event, input) {
		$scope.edit(event, input.id, input.title, input.notes, input.rating, input.priority, input.watched);
	});

	//Open a Dialog Modal for editting a single movie
	$scope.edit = function(ev, id, title, notes, rating, priority, watched) {
		$mdDialog.show({
	        parent: angular.element(document.body),
	        templateUrl: 'editForm.html',
	        preserveScope: true,
	        controller: 'DialogController',
	        targetEvent: ev,
	        fullscreen: $scope.customFullscreen,
	        locals: {
	        	event: ev,
	        	id: id,
	        	title: title,
	        	notes: notes,
	        	rating: rating,
	        	priority: priority,
	        	watched: watched
	        }
	    });
	};

	//Binding that allows dialog to be closed from different controllers
	$rootScope.$on("callCancel", function(event) {
		$scope.cancel();
	});

	//Close any open Dialog Modal
	$scope.cancel = function() {
    	$mdDialog.cancel();
    };

	//move movie entry to other view
	$scope.toggleWatched = function(movie, watched) {
		if(watched == '1'){
			watched = '0';
		} else {
			watched = '1';
		}
		$http.post("updateMovie.php?movieID=" + movie + "&watched=" + watched).then(
				function(data) {
					$rootScope.refreshForm();
				}, function(){});
	};

	//initial get request
	$rootScope.refreshForm();
})

//Controller for Dialog Modals
.controller('DialogController', function ($scope, $rootScope, $mdDialog, $http, event, id, title, notes, rating, priority, watched) {
	$scope.fixedTitle = title;
	$scope.id = id;
	$scope.title = title;
	$scope.notes = notes;
	$scope.rating = rating;
	$scope.ratingObject = {score: rating};
	$scope.priority = priority;
	$scope.watched = watched;
	$scope.ratings = $rootScope.ratings;
	$scope.priorities = $rootScope.priorities;

	$scope.edit = function(event, id, title, notes, rating, priority, watched) {
		$rootScope.$broadcast("callEdit", {id: id, title: title, notes: notes, rating: rating, priority: priority, watched: watched});
	};

	$scope.update = function(event, id, title, notes, ratingObjectScore, priority, watched) {
		console.log("Updating " + title + " " + notes + " " + ratingObjectScore + " " + priority + " " + watched + " ");
		$rootScope.$broadcast("callUpdate", {id: id, title: title, notes: notes, rating: ratingObjectScore, priority: priority, watched: watched});
	};

	$scope.cancel = function() {
    	$rootScope.$broadcast("callCancel", "");
    };
});
