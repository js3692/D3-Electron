'use strict';

// Modules are imported here
var remote = require('remote');
var dialog = remote.require('dialog');

var Promise = require('bluebird');
var fs = require('fs');
var _ = require('lodash');

window.d3 = require('d3');
window.$ = window.jQuery = require('jquery');

// Angular App starts here
window.app = angular.module('D3Desktop', ['ui.router', 'ui.bootstrap', 'ngAnimate']);

app.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});