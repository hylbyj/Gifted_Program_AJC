

//Simple d3.js barchart example to illustrate d3 selections
 
//other good related tutorials
//http://www.recursion.org/d3-for-mere-mortals/
//http://mbostock.github.com/d3/tutorial/bar-1.html
 
var margin = {top: 80, right: 80, bottom: 80, left: 80}
var w = 1000 - margin.left - margin.right
var h = 500 - margin.top - margin.bottom

var x = d3.scale.ordinal()
    .rangeRoundBands([0, w], .1)

var y0 = d3.scale.linear().domain([300, 1100]).range([h, 0])
    y1 = d3.scale.linear().domain([300, 1100]).range([h, 0])

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y0).ticks(4).orient("left")
// create right yAxis
var yAxisRight = d3.svg.axis().scale(y1).ticks(4).orient("right")
 

 
function bars(data)
{   
    console.log("the bars function is used")
 
    max = d3.max(data)
 
    //nice breakdown of d3 scales
    //http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/
    x = d3.scale.linear()
        .domain(d3.range(data.length))
        .rangeBands([0, w],.1)
 
    y = d3.scale.ordinal()
        .domain([0,1])
        .range([0,h])
 
 
    var vis = d3.select("#barchart")
    
    //a good written tutorial of d3 selections coming from protovis
    //http://www.jeromecukier.net/blog/2011/08/09/d3-adding-stuff-and-oh-understanding-selections/
    var bars = vis.selectAll("rect.bar")
        .data(data)
 
    //update
    bars
        .attr("fill", "#0a0")
        .attr("stroke", "#050")
 
    //enter
    bars.enter()
        .append("svg:rect")
        .attr("class", "bar")
        .attr("fill", "#800")
        .attr("stroke", "#800")
 
 
    //exit 
    bars.exit()
    .transition()
    .duration(300)
    .ease("exp")
        .attr("width", 0)
        .remove()
 
 
    bars
        .attr("stroke-width", 4)
    .transition()
    .duration(300)
    .ease("quad")
      .attr("x", function(d) { return x(d.SYSTEM_NAME); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.gifted_total); })
      .attr("height", function(d,i,j) { return height - y0(d.gifted_total); })
        .attr("transform", function(d,i) {
            return "translate(" + [0, y0(i)] + ")"
        })
 
}
 
 
function init()
{
 
    //setup the svg
    console.log("the function.init is used")
    var svg = d3.select("#svg")
        .attr("width", w+100)
        .attr("height", h+100)
    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#000")
        .attr("fill", "none")
 
    svg.append("svg:g")
        .attr("id", "barchart")
        .attr("transform", "translate(50,50)")

    //trying to do the axis things
    svg.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);
    
    //setup our ui
    d3.select("#data_2010")
        .on("click", function(d,i) {
            bars(data_2010)
        })   
    d3.select("#data_2011")
        .on("click", function(d,i) {
            bars(data_2011)
        })   
 
 
 
    //make the bars
    bars(data_2010)
}