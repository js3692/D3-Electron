app.controller('HomeCtrl', function () {

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

	var promisifiedReadTSV = Promise.promisify(d3.tsv);

  promisifiedReadTSV("data/data.tsv")
    .then(function (data) {
      graph(data);
    });

  var graph = function (data) {
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.1);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var chart = d3.select("svg#home-example")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    chart.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(0); })
      .attr("height", function (d) { return height - y(0); })
      .transition()
      .duration(300)
      .delay(function (d,i) { return i * 100; })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .attr("width", x.rangeBand());

    function type(d) {
      d.frequency = +d.frequency; // coerce to number
      return d;
    }
  };
});