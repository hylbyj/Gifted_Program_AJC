var margin = {top: 80, right: 80, bottom: 80, left: 200},
    width = 700 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var x0 = d3.scale.linear().domain([300, 1100]).range([0, width]),
    x1 = d3.scale.linear().domain([300, 1100]).range([0, width]);

var y = d3.scale.ordinal().rangeRoundBands([0, height], .2);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x0.domain([0,0.9]);
    x1.domain([0,0.9]);
    y.domain(data_2010.map(function(d) { return d.SYSTEM_NAME; }));

var bars3 = svg.selectAll(".rect").data(data_2010)
      
    bars3.enter()
    .append("rect")
    .attr("class", "rect4")
    .attr("x", function(d,i,j) { return x0(0); })
    .attr("width", function(d,i,j) { return ( width  );})
    .attr("y", function(d) { return y(d.SYSTEM_NAME); })
    .attr("height", 0);     

var bars = svg.selectAll(".rect").data(data_2010)
    
	bars.enter()
	.append("rect")
	.attr("class", "rect1")
	.attr("x", function(d,i,j) { return x0(0); })
	.attr("width", function(d,i,j) { return ( x0(d.gifted_total)  );})
	.attr("y", function(d) { return y(d.SYSTEM_NAME); })
	.attr("height", y.rangeBand()/2); 

var bars1 = svg.selectAll(".rect").data(data_2010)
    
  bars1.enter()
  .append("rect")
  .attr("class", "rect2")
  .attr("x", function(d,i,j) { return x1(0); })
  .attr("width", function(d,i,j) { return ( x1(d.black_total)  );})
  .attr("y", function(d) { return y(d.SYSTEM_NAME)+ y.rangeBand()/2; })
  .attr("height", y.rangeBand()/2);  

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

   svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

d3.selectAll("input").on("change",change);

var gap = "See the gap";
console.log("The current value of the button change" + gap);

var year = 2010;

function change(){
  console.log("The value of gap in change () " + gap);
  if (gap == "Comparison of percentages")
  {

    if (this.value === "2010") {gap_year(interval_2010); year  = 2010;}
    if (this.value === "2011") {gap_year(gapnumber_2011);year  = 2011;}
    if (this.value === "2012") {gap_year(gapnumber_2012);; year  = 2012;}
    if (this.value === "2013") {gap_year(gapnumber_2012); year  = 2013;}
  }
  else{
    
    if (this.value === "2010") {transition(data_2010);year  = 2010;}
    if (this.value === "2011") {transition(data_2011);year  = 2011;}
    if (this.value === "2012") {transition(data_2012);year  = 2012;}
    if (this.value === "2013") {transition(data_2013);year  = 2013;}

  }

  
  //console.log(gap);
}

function ButtonChange(bt){
   console.log(bt.value);
   if (bt.value == "Comparison of percentages"){ 
   bt.value ="See the gap";
   gap = "See the gap";
 }
   else {

    bt.value = "Comparison of percentages";
    gap = "Comparison of percentages";
  }
   if (bt.value == "Comparison of percentages") {

    if (year == "2010") gap_year(interval_2010);
    if (year == "2011") gap_year(gapnumber_2011);
    if (year == "2012") gap_year(gapnumber_2012);
    if (year == "2013") gap_2013();
  }
   else {
    if (year == "2010") transition(data_2010);
    if (year == "2011") transition(data_2011);
    if (year == "2012") transition(data_2012);
    if (year == "2013") transition(data_2013);
  }
  console.log("This.value is from the ButtonChange" + year);
}


function transition(data_year){
  x0.domain([0, 1]);
  
  xAxis = d3.svg.axis().scale(x0).ticks(6).orient("top");
  
  svg.select(".x.axis")
     .transition().duration(1500).ease("sin-in-out")
     .call(xAxis);
  
  bars.data(data_year)
      .enter()
      .append("rect")
      .attr("class", "rect1");

  console.log("does it really do the select things?")

  bars.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .attr("x", function(d,i,j) { return x0(0); })
      .attr("width", function(d,i,j) { return  x0(d.gifted_total);})
      .attr("y", function(d) { return y(d.SYSTEM_NAME); })
      .attr("height", y.rangeBand()/2); 
  
  bars1.data(data_year)
      .enter()
      .append("rect")

  bars1.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .attr("x", function(d,i,j) { return x0(0); })
      .attr("width", function(d,i,j) { return ( x0(d.black_total)  );})
      .attr("y", function(d) { return y(d.SYSTEM_NAME) + y.rangeBand()/2; })
      .attr("height", y.rangeBand()/2);   

  console.log("why not appear 2011?");
}

function gap_year(gapnumber_year){

     var bars3 = svg.selectAll(".rect").data(gapnumber_year)
      
    bars3.enter()
    .append("rect")
    .attr("class", "rect4")
    .attr("x", function(d,i,j) { return x0(0); })
    .attr("width", function(d,i,j) { return ( width  );})
    .attr("y", function(d) { return y(d.SYSTEM_NAME); })
    .attr("height", y.rangeBand()/1); 
  //rescale the yaxis
  x0.domain([0, 16]);
  
  xAxis = d3.svg.axis().scale(x0).ticks(6).orient("top");

  svg.select(".x.axis")
     .transition().duration(1500).ease("sin-in-out")
     .call(xAxis)

  bars3.data(gapnumber_year)
       .enter()
       .append("rect")
       .attr("class", "rect4")
      
bars3.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad") 
    .attr("x", function(d,i,j) { return x0(0); })
    .attr("width", function(d,i,j) { return ( width  );})
    .attr("y", function(d) { return y(d.SYSTEM_NAME); })
    .attr("height", y.rangeBand()/1); 
  //put the new code of legend here!
   bars.data(gapnumber_year)
      .enter()
      .append("rect")
      .attr("class", "rect1");

  bars.transition() 
      .duration(1002)
      .delay(function(d,i){return i*10;})
      .ease("quad")  
      .sort(function(a,b) {return a.times - b.times;})
      .attr("x", function(d,i,j) { return x0(d.lower_bound)  ; })
      .attr("width", function(d,i,j) { return ( x0(d.upper_bound) - x0(d.lower_bound) );})
      .attr("y", function(d) { return y(d.SYSTEM_NAME)  ; })
      .attr("height", y.rangeBand()/1);



  bars1.data(gapnumber_year)
      .enter()
      .append("rect")
      .attr("class", "rect1");

  bars1.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .sort(function(a,b) {return a.times - b.times;})
      .attr("x", function(d,i,j) { return x0(d.times); })
      .attr("width", 3)
      .attr("y", function(d,i,j) { return y(d.SYSTEM_NAME) -3; })
      .attr("height", y.rangeBand()/1 + 6);
  

  
  

  console.log("The line is drawn");


}

