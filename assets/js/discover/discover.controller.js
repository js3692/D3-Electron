app.controller('ExternalCtrl', function ($scope) {
	var webview = document.getElementById('discover');

  webview.addEventListener("did-start-loading", function (e) {

		$scope.back = function () {
			webview.goBack();
		};
		$scope.forward = function () {
			webview.goForward();
		};
		$scope.reload = function () {
			webview.reload();
		};
  });


});