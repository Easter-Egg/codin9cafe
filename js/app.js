angular.module('codin9cafe', 
  ['ngMaterial',
		'ui.router', 
		'codin9cafe.controllers',
  ])
.run(function(){
  // Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url:"/",
      templateUrl: "templates/main.html",
      controller: "mainCtrl"
    });
  $urlRouterProvider.otherwise('/');
})
