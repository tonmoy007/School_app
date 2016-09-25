var app=angular.module('mainHome',['components','ngMaterial','ngRoute','ngMessages','ngAnimate']);


app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'index.php/home/getTemplate/homepage/home',
        controller:'home'
    })
})

app.controller('home',  function($scope){
    
});