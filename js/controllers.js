angular.module('codin9cafe.controllers', [])
.controller('mainCtrl',  function($scope, $timeout, $http, $mdDialog, TimeTable) {
  $scope.seminars = [];
  $scope.iKnows = [];
  $scope.books = [];
  $scope.lastEventNum = 0;
  $scope.lastEventkey = '';
  $scope.noMoreSeminars = false;
  $scope.noMoreIKnows = true;
  $scope.noMoreBooks = true;

  // asyncly init
  TimeTable.init().then(function(data){
    $scope.lastEventNum = data.num;
    $scope.lastEventkey = data.key;

    if(typeof data.seminars == "undefined"){
      $scope.noMoreSeminars = true;
    }

    var seminarsRef = firebase.database().ref('events/'+ data.key  +'/seminars/');
    seminarsRef.on('child_added', function(data){
      if($scope.noMoreSeminars) $scope.noMoreSeminars = !$scope.noMoreSeminars;
      $scope.seminars.splice(0, 0, data.val());
    });

    seminarsRef.on('child_removed', function(data){
      for(var i = 0 ; i < $scope.seminars.length ; i++){
        if($scope.seminars[i].key == data.val().key){
          $scope.seminars.splice(i, 1);
        }
      }

      if($scope.seminars.length == 0) $scope.noMoreSeminars = true;
    });
  })

  $scope.addSeminarPrompt = function(ev) {
    $mdDialog.show({
      controller: addSeminarDialogController,
      templateUrl: 'templates/addSeminarDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function addSeminarDialogController($scope, $mdDialog) {
    var today = new Date();

    var eventsRef = firebase.database().ref('events/');
    eventsRef.limitToLast(1).on('child_added', function(data){
      $scope.lastEventkey = data.key;
    });

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.addSeminar = function(seminar) {
      var newSeminarKey = firebase.database().ref('events/' + $scope.lastEventkey + '/seminars/').push().key;
      firebase.database().ref('events/' + $scope.lastEventkey + '/seminars/' + newSeminarKey).set({
        key: newSeminarKey,
        title: seminar.title,
        speaker: seminar.speaker,
        content : seminar.content,
        time: 0,
        like: 0
      }).then(function(){
        $mdDialog.hide();
      }, function(msg){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent('Check your browser console!')
            .ariaLabel('Error')
            .ok('Got it!')
            .targetEvent(ev)
        );
      });
    };
  }

  $scope.makeEventPrompt = function(ev) {
    $mdDialog.show({
      controller: makeEventDialogController,
      templateUrl: 'templates/makeEventDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function makeEventDialogController($scope, $mdDialog) {
    var today = new Date();
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.makeEvent = function(event){
      var y = event.date.getFullYear(), m = event.date.getMonth() + 1, d = event.date.getDate();
      var date = y + '-' + m + '-' + d;
      var newEventKey = firebase.database().ref().child('events').push().key;
      firebase.database().ref('events/' + newEventKey).set({
        key: newEventKey,
        date: date,
        num: event.num,
        loc: event.location
      }).then(function(){
        $mdDialog.hide();
      }, function(msg){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent('Check your browser console!')
            .ariaLabel('Error')
            .ok('Close')
            .targetEvent(ev)
        );
      });
    };
  }

  $scope.removeSeminar = function(seminar){
    var location = 'events/' + $scope.lastEventkey + '/seminars/' + seminar.key;
    firebase.database().ref(location).remove();
  }

  $scope.removeIKnow = function(iKnow){
    var location = 'events/' + $scope.lastEventkey + '/iKnows/' + iKnow.key;
    firebase.database().ref(location).remove();
  }

  $scope.removeBook = function(book){
    var location = 'events/' + $scope.lastEventkey + '/books/' + book.key;
    firebase.database().ref(location).remove();
  }
})