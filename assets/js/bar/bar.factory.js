app.factory('Bar', function() {
	var Bar = {};
	Bar.data = [];
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var chart, x, y, xAxis, yAxis;

  Bar.init = function () {
		chart = d3.select("svg#bar")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x = d3.scale.ordinal()
			.rangeRoundBands([0, width], 0.2, 0.3);

		y = d3.scale.linear()
			.range([height, 0]);

		xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");
	};


	function dataHandler (parsedData) {
		Bar.data = parsedData;
		return parsedData;
	}

	Bar.readData = function (filePath) {
		var promisifiedReadTSV = Promise.promisify(d3.tsv);
		var promisifiedReadCSV = Promise.promisify(d3.csv);

		if (/.csv/.test(filePath)) return promisifiedReadCSV(filePath).then(dataHandler);
		else if (/.tsv/.test(filePath)) return promisifiedReadTSV(filePath).then(dataHandler);
	};

	Bar.clear = function () {
		d3.select("svg#bar")
			.selectAll(".bar")
			.remove();
		d3.select("svg#bar")
			.selectAll("g")
			.remove();
	};

	Bar.graph = function (xVar, yVar) {
		Bar.init();

    x.domain(Bar.data.map(function(d) { return d[xVar]; }));
    y.domain([0, d3.max(Bar.data, function(d) { return Number(d[yVar]); })]);

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    chart.selectAll(".bar")
      .data(Bar.data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d[xVar]); })
      .attr("y", function(d) { return y(0); })
      .attr("height", function (d) { return height - y(0); })
      .transition()
      .duration(300)
      .delay(function (d,i) { return i * 100; })
      .attr("y", function(d) { return y(Number(d[yVar])); })
      .attr("height", function(d) { return height - y(Number(d[yVar])); })
      .attr("width", x.rangeBand());
	};

	return Bar;

});