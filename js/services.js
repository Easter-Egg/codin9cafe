angular.module('codin9cafe.services', [])
  .factory('TimeTable', function($q){
  	return {
  		init: function(){
  			var deferrd = $q.defer();
  			var items = [];
        var lastEventKey = firebase.database().ref('events/').limitToLast(1).key;
        var seminarsOfLastEvents = firebase.database().ref('events/' + lastEventKey + '/seminars/');
				var deferred = $q.defer();
				seminarsOfLastEvents.once('value').then(function(datas){
					datas.forEach(function(data){
					  items.splice(0, 0, data.val());
					});
					deferred.resolve(items);
				});

				return deferred.promise;
  		}
  	}
  })