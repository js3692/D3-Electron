app.controller('PieCtrl', function ($scope, Pie) {
  randomColor(d3.select("h1"), 20);
  function randomColor (d3Elem, count) {
    count--;
    if (!count) return;
    else {
      return randomColor(d3Elem.transition()
        .duration(1000)
        .style("color", function() {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
        }), count);
    }
  }
  Pie.init();
  $scope.loaded = false;
  $scope.open = function () {
    $scope.loaded = false;
    dialog.showOpenDialog({
      defaultPath: '/Users/Jungho/FullstackAcademy/Stackathon/data',
      properties: ['openFile', 'openDirectory']
    }, function (fileName) {
      if(fileName) {
        Pie.readData(fileName[0])
          .then(function (data) {
            $scope.loaded = true;
            $scope.fields = Object.keys(data[0]);
            $scope.$digest();
          });
      }
    });
  };
  $scope.draw = Pie.graph;
  $scope.clear = Pie.clear;
});