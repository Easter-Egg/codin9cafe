angular.module('codin9cafe.services', [])
  .factory('TimeTable', function($q){
  	return {
  		init: function(){
  			var deferred = $q.defer();
  			var items = [];

        var eventsRef = firebase.database().ref('events/');
        eventsRef.limitToLast(1).on('child_added', function(data){
          deferred.resolve(data.val());
        });

				return deferred.promise;
  		},
      getLastEventKey: function(){
        var deferred = $q.defer();
        return deferred.promise;
      }
  	}
  })