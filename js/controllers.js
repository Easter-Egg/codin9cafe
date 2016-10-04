angular.module('codin9cafe.controllers', [])
.controller('mainCtrl',  function($scope, $timeout, $http, $mdDialog, TimeTable) {
  $scope.noMoreSeminars = false;
  $scope.items = [];

  // asyncly get a added seminars from firebase database
  TimeTable.init().then(function(data){
    if(data.length == 0){
      $scope.noMoreSeminars = true;
      $scope.status = "등록된 발표가 없습니다.";
    }
    else
      $scope.items = data;
  })

  // add listener
  var seminarsRef = firebase.database().ref('seminars/');
  seminarsRef.on('child_added', function(data){
    if($scope.noMoreSeminars) $scope.noMoreSeminars = !$scope.noMoreSeminars;
    $scope.items.splice(0, 0, data.val());
  });

  seminarsRef.on('child_removed', function(data){
    $scope.items.forEach(function(item){
      if(item.key == data.val().key){
        $scope.items.pop(0, 0, item);
      }
    })

    if($scope.items.length == 0) $scope.noMoreSeminars = true;
    $scope.$digest();
  });

  $scope.addSeminarPrompt = function(ev) {
    $mdDialog.show({
      controller: dialogController,
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

  function dialogController($scope, $mdDialog) {
    $scope.today = new Date();
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.addSeminar = function(seminar) {
      var newSeminarKey = firebase.database().ref().child('seminars').push().key;
      firebase.database().ref('seminars/' + newSeminarKey).set({
        key: newSeminarKey,
        date: $scope.today,
        title: $scope.seminar.title,
        speaker: $scope.seminar.speaker,
        content : $scope.seminar.content,
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
})