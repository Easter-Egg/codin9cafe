angular.module('codin9cafe.controllers',  [])
.controller('mainCtrl',  function($scope, $timeout, $http, $mdDialog) {

  $scope.addSeminarPrompt = function(ev) {
    $mdDialog.show({
      controller: dialogController,
      templateUrl: 'templates/addSeminarDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.items = [
    {
      title: "코딩 잘하고 싶다",
      name: "김태우",
      img:""
    },
    {
      title: "여기는 루마니아",
      name: "박병훈",
      img:""
    },
    {
      title: "카카오 드라이버",
      name: "오원재",
      img:""
    },
    {
      title: "방황하는 키보드",
      name: "이종찬",
      img:""
    },
   ];

    function dialogController($scope, $mdDialog) {
      $scope.today = new Date();
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.addSeminar = function(seminar) {
        var newPostKey = firebase.database().ref().child('seminars').push().key;
        firebase.database().ref('seminars/' + userId).set({
          username: name,
          email: email,
          profile_picture : imageUrl
        });
      };
    }
})
