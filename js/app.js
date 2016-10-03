angular.module('codin9cafe', 
  ['ngMaterial',
		'ui.router', 
		'codin9cafe.controllers',
    'codin9cafe.services',
  ])
.run(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdCYEfm6anwaTzis1rZeVD0KueNVqKJ5Q",
    authDomain: "codin9cafe-80eea.firebaseapp.com",
    databaseURL: "https://codin9cafe-80eea.firebaseio.com",
    storageBucket: "codin9cafe-80eea.appspot.com",
    messagingSenderId: "627597171799"
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