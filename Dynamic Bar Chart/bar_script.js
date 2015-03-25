var myData = [];
//var myTitle = "Rankings Generated from the Trials of FDA Approved Drugs in 2012";
var margins = {top: 0, right: 0, bottom: 10, left: 45};
var cHeight = 400 - margins.top - margins.bottom;
var cWidth = 600 - margins.right - margins.left;
var titleHeight = 50;
var axisSpaceLeft = 50;
var axisSpaceBottom = 50;

//Populates myData w/ 50 random integers between 1 and 1000
for (var i = 0; i < 50; i++) {
	myData[i] = Math.ceil(Math.random()*100);
}

function sorter(data) {
	var temp;
	for (var i = 0; i < data.length; i++) {
		if (data[i] > data[i+1]) {
			temp = data[i]
			data[i] = data[i+1];
			data[i+1] = temp;
			if (i > 1) {
			i = i-2;
			}
		}
	}
	for (var i = 0; i < data.length; i++) {
		if (data[i] > data[i+1]) {
			temp = data[i]
			data[i] = data[i+1];
			data[i+1] = temp;
		}
	}
	return data;
}
//sorter(myData);

//Scales the height of the bars by mapping the domain to the range
//i.e. the highest value in myData is multiplied to meet the specified range height in pixels. This multiple is then applied to the rest of the bars.
var yScale = d3.scale.linear()
	.domain([0, d3.max(myData)])
	.range([0, cHeight - titleHeight])

//Scales the width of each bar by mapping the domain to range
//i.e. the specified range width in pixels is divided number of bars in myData, to determine the optimal width of each bar (called a rangeBand).
var xScale = d3.scale.ordinal()
	.domain(d3.range(0, myData.length))
	.rangeBands([0, cWidth])

//Colors the bars on a linear scale. Array length of the domain and range must be equal.
var colorScale = d3.scale.linear()
	.domain([0, myData.length*.33, myData.length*.66, myData.length])
	.range(['#0A2933', '#259286','#738A05', '#A57706'])

var tooltip = d3.select('body')	
	.append('div')
	  .style('color', '#fff')
	  .style('position', 'absolute')
	  .style('padding', '20px')
	  .style('max-width', '200px;')
	  .style('background-color', 'rgba(0, 0, 0, 0.85)')
	  .style('-webkit-border-radius', '12px')
	  .style('-moz-border-radius', '12px')
	  .style('border-radius', '12px')
	  .style('opacity', 0)

//The Chart
var myChart = d3.select('.chart svg')
	.attr('height', cHeight + margins.bottom)
	.attr('width', cWidth + margins.left)
	//.style('background', '#AAAAAA')
	.append('g')
	.attr('transform', 'translate('+ margins.left +', 0)')
	.selectAll('rect') //Lines 33-35 create a bar for each value in myData.
		.data(myData)
		.enter().append('rect')
		.attr('width', xScale.rangeBand()) //Width of the bar is the size of the rangeBand (i.e. the optimal width given the # of bars and the svg width).
		.attr('x', function(d,i) { //Bar is shifted to the right by i rangeBands.
			return xScale(i);
		})
		.attr('height', 0)
		.attr('y', cHeight)
		.style('fill', function(d,i) { //Bar is given a hex color based on its proximity to each of the domain values in the colorScale.
			return colorScale(i);
		})
	.on('mouseover', function(d) {
		d3.select(this)
			.transition()
			.duration(500)
			.style('opacity', 0.4)
		tooltip.transition()
			.style('opacity', 1)
			.text('This player has scored ' + d + ' points.')
			.style('left', (d3.event.pageX-20) + 'px')
			.style('top', (d3.event.pageY+20) + 'px')
	})
	.on('mouseout', function(d) {
		d3.select(this)
			.transition()
			.duration(500)
			.style('opacity', 1)
		tooltip.transition()
			.style('position', 'absolute')
			.style('opacity', 0)
	})

myChart.transition()
	.attr('height', function(d) { //Height of the bar is the value of myData[i], adjusted to the yScale multiple.
			return yScale(d);
	})
	.attr('y', function(d) { //Bar is shifted downwards by the difference between the svg height and adjusted bar height.
			return cHeight - yScale(d);
	})
	.delay(function(d, i) {
		return i * 20;
	})
	.duration(1000)
	.ease('elastic')

var vGuideScale = d3.scale.linear()
	.domain([0, d3.max(myData)])
	.range([cHeight - titleHeight, 0])

var vAxis = d3.svg.axis()
	.scale(vGuideScale)
	.orient('left')
	.ticks(10)

var vGuide = d3.select('svg').append('g')
	vAxis(vGuide)

vGuide.attr('transform', 'translate('+ margins.left +', '+ titleHeight +')')
vGuide.selectAll('path')
	.style({fill: 'none', stroke:"#000"})
vGuide.selectAll('line')
	.style({stroke:"#000"})

var hAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom')
	.tickValues(1)

var hGuide = d3.select('svg').append('g')
	hAxis(hGuide)

hGuide.attr('transform', 'translate('+ margins.left +', '+ cHeight +')')
hGuide.selectAll('path')
	.style({fill: 'none', stroke:"#000"})
hGuide.selectAll('line')
	.style({stroke:"#000"})

/*

I would like to do multiple additional things to this chart.
It would be cool to add a better tooltip, with more information.
Another idea is to bring in a 

*/