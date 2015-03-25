//Width and height
var w = 300;
var h = 300;

var dataset = [ 3, 10, 20, 45, 6, 25 ];

var oRadius = w / 2;
var iRadius = w / 4;

var arc = d3.svg.arc()
	.innerRadius(iRadius)
	.outerRadius(oRadius);

var pie = d3.layout.pie();

//Easy colors accessible via a 10-step ordinal scale
var color = d3.scale.category10();

//Create SVG element
var svg = d3.select(".chart svg")
	//.append("svg")
	.attr("width", w)
	.attr("height", h);

//Set up groups
var arcs = svg.selectAll("g.arc")
	.data(pie(dataset))
	.enter()
	.append("g")
	.attr("class", "arc")
	.attr("transform", "translate(" + oRadius + "," + oRadius + ")");

//Draw arc paths
arcs.append("path")
    .attr("fill", function(d, i) {
    	return color(i);
    })
    .attr("d", arc);

//Labels
arcs.append("text")
    .attr("transform", function(d) {
    	return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
    	return d.value;
    });

/*
var height = 500, width = 500, radius = 250, donut = 150;
var colors = d3.scale.category20c(); //d3 preset color scheme
var myData = [{label: 'John', value: 5}, {label: 'Bob', value: 30}, {label: 'James', value: 30}];

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	})

var arc = d3.svg.arc()
	.innerRadius(donut)
	.outerRadius(radius)

var myChart = d3.select('.chart svg')
	.attr('height', height)
	.attr('width', width)
	.append('g')
		.attr('transform', 'translate('+ radius +', '+ radius +')')
		.selectAll('path').data(pie(myData))
		.enter().append('path')
			.attr('class', 'slice')
			.attr('fill', function(d, i) {
				return colors(i)
			})
			.attr('d', arc)

var slices = d3.selectAll('.slice')
	.append('text')
	.text(function(d) {
		console.log(d);
		return d.data.label;
	})
	.attr('transform', 'translate(200,600)')
*/