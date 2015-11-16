app.factory('Scattered', function() {
	var Scattered = {};
	Scattered.data = [];
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var chart, x, y, xAxis, yAxis, type, detail;

  Scattered.init = function () {
		chart = d3.select("svg#scattered")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x = d3.scale.linear()
			.range([0, width]);

		y = d3.scale.linear()
			.range([height, 0]);

		xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

    type = d3.scale.category10();

    detail = d3.select("#scattered-chart-container").append("div")
			.attr("class", "legend")
			.style("opacity", 0);
	};

	function dataHandler (parsedData) {
		Scattered.data = parsedData;
		return parsedData;
	}

	Scattered.readData = function (filePath) {
		var promisifiedReadTSV = Promise.promisify(d3.tsv);
		var promisifiedReadCSV = Promise.promisify(d3.csv);

		if (/.csv/.test(filePath)) return promisifiedReadCSV(filePath).then(dataHandler);
		else if (/.tsv/.test(filePath)) return promisifiedReadTSV(filePath).then(dataHandler);
	};

	Scattered.clear = function () {
		d3.select("svg#scattered")
			.selectAll(".dot")
			.remove();
		d3.select("svg#scattered")
			.selectAll("g")
			.remove();
	};

	Scattered.graph = function (xVar, yVar, filter) {
		Scattered.init();

		x.domain([d3.min(Scattered.data, function (d) { return Number(d[xVar]); }) - 1,
			d3.max(Scattered.data, function (d) { return Number(d[xVar]); }) + 1]);
		y.domain([d3.min(Scattered.data, function (d) { return Number(d[yVar]); }) - 1,
			d3.max(Scattered.data, function (d) { return Number(d[yVar]); }) + 1]);

		chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text(xVar);

		chart.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text(yVar);

		chart.selectAll(".dot")
			.data(Scattered.data)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", 3.5)
			.attr("cx", function (d) { return x(Number(d[xVar])); })
			.attr("cy", function (d) { return y(Number(d[yVar])); })
			.style("fill", function (d) { return type(d[filter]); })
			.on("mouseover", function (d) {
				detail.transition()
					.duration(200)
					.style("opacity", 0.9);
				detail.html(d[filter] + " (" + d[xVar] + ", " + d[yVar] + ")")
					.style("left", (d3.event.pageX + 5) + "px")
					.style("top", (d3.event.pageY - 28) + "px");
			})
			.on("mouseout", function(d) {
				detail.transition()
					.duration(500)
					.style("opacity", 0);
			});

		// var legend = chart.selectAll(".legend")
		// 	.data(type.domain())
		// 	.enter().append("g")
		// 	.attr("class", "legend")
		// 	.attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

		// legend.append("rect")
		// 	.attr("x", width - 18)
		// 	.attr("width", 18)
		// 	.attr("height", 18)
		// 	.style("fill", type);

		// legend.append("text")
		// 	.attr("x", width - 24)
		// 	.attr("y", 9)
		// 	.attr("dy", ".35em")
		// 	.style("text-anchor", "end")
		// 	.text(function (d) { return d; });

	};

  return Scattered;

});