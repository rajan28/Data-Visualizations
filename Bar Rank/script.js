var data = [10, 5, 7];

var xScale = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range(["0%", "100%"])

d3.select('.chart')
	.selectAll('div')
		.data(data)
	.enter().append('div')
		.style("width", function(d) {
			return xScale(d);
		})
		.text(function(d) {
			return d;
		})