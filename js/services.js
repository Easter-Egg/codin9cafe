angular.module('codin9cafe.services', [])
  .factory('TimeTable', function($q){
  	return {
  		init: function(){
  			var deferrd = $q.defer();
  			var items = [];
  			var recentSeminarsRef = firebase.database().ref('seminars/').limitToLast(3);
				var deferred = $q.defer();
				recentSeminarsRef.once('value').then(function(datas){
					datas.forEach(function(data){
					  items.splice(0, 0, data.val());
					});
					deferred.resolve(items);
				});

				return deferred.promise;
  		}
  	}
  })