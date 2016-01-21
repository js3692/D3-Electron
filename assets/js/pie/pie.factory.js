app.factory('Pie', function() {
	var Pie = {};
	Pie.data = [];
	var width = 960,
		height = 500,
		radius = Math.min(width, height) / 2;

	var chart, arc, type;

	Pie.init = function () {
		chart = d3.select("svg#pie")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		
		arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

		type = d3.scale.category10();

	};

	function dataHandler (parsedData) {
		Pie.data = parsedData;
		return parsedData;
	}

	Pie.readData = function (filePath) {
		var promisifiedReadTSV = Promise.promisify(d3.tsv);
		var promisifiedReadCSV = Promise.promisify(d3.csv);

		if (/.csv/.test(filePath)) return promisifiedReadCSV(filePath).then(dataHandler);
		else if (/.tsv/.test(filePath)) return promisifiedReadTSV(filePath).then(dataHandler);
	};

	Pie.clear = function () {
		d3.select("svg#pie")
			.selectAll("g")
			.remove();
	};

	Pie.graph = function (dataSet) {
		Pie.init();

		var pie = d3.layout.pie()
			.sort(null)
			.value(function(d) { return d[dataSet]; });

		var g = chart.selectAll(".arc")
			.data(pie(Pie.data))
			.enter().append("g")
			.attr("class", "arc");

		g.append("path")
			.attr("d", arc)
			.style("fill", function (d) { return "#fff"; })
			.transition()
			.duration(500)
			.style("fill", function (d) { return type(d.data[dataSet]); });

		g.append("text")
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.text(function(d) { return d.data[dataSet]; });

	};

  return Pie;

});