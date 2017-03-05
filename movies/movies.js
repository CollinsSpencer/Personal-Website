angular.module('movieListApp', [])
/*
 * .service("movieService", function($http) { return { getMovies: function() {
 * return $http.get("/movies/movies.json", {responseType: "json"}); } } })
 */

.controller(
		"movieList",
		function($scope, $http) {
			$scope.priorityInput="2";
			
			getMovies();

			function getMovies() {
				$http.get("getMovie.php", {
					responseType : "json"
				}).success(function(data) {
					$scope.movies = data;
				});
			}
			;

			$scope.addMovie = function(title,notes,priority) {
				console.log("Added: Title:" + title + " Notes:" + notes + " Priority:" + priority);
				$http.get("addMovie.php?title=" + title + "&notes=" + notes + "&priority=" + priority).success(
						function(data) {
							getMovies();
							$scope.titleInput = "";
							$scope.notesInput = "";
						});
			};
			$scope.deleteMovie = function(movieID) {
				if (confirm("Are you sure you want to delete this movie?")) {
					$http.post("deleteMovie.php?movieID=" + movieID).success(
						function(data) {
							getMovies();
						});
				}
			};
			
			$scope.edit = function(movieID){
				
			}
			
			$scope.templates = [
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
			}

			$scope.toggleWatched = function(movie, watched) {
				if(watched == '1'){
					watched = '0';
				} else {
					watched = '1';
				}
				$http.post("updateMovie.php?movieID=" + movie + "&watched=" + watched).success(function(data) {
					getMovies();
				});
				
			};

			/*
			 * movieService.getMovies().success(function (result){ $scope.movies =
			 * result; }) $http.get("/movies/movies.json", {responseType:
			 * "json"}).then(function(data) { $scope.movies = data; })
			 */
		})