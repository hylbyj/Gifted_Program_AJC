var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]),
    y1 = d3.scale.linear().domain([300, 1100]).range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var formatter = d3.format(".0%");    

// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y0).ticks(5).tickFormat(formatter).orient("left");
// create right yAxis
var yAxisRight = d3.svg.axis().scale(y1).ticks(5).tickFormat(formatter).orient("right");



var tip = d3.tip()
          .attr("class","d3-tip")
          .offset([-10,0])
          .html(function(d){
            return "<span style = 'color:white'> Percentage: " + formatter(d.gifted_total) + "</span>";
          });


var tip1 = d3.tip()
          .attr("class","d3-tip")
          .offset([-10,0])
          .html(function(d){
            return "<span style = 'color:white'> Percentage: " + formatter(d.black_total) + "</span>";
          });

var tip2 = d3.tip()
          .attr("class","d3-tip")
          .offset([-10,0])
          .html(function(d){
            return "<span style = 'color:white'> Percentage: " + formatter(d.black_total - d.gifted_total) + "</span>";
          });          

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);
    svg.call(tip1);    

  x.domain(data_2010.map(function(d) { return d.SYSTEM_NAME; }));
  y0.domain([0, 0.9]);
  y1.domain([0, 0.9]);


  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
     .selectAll("text")
        .style("text-anchor","end")
        .attr("dx","-.4em")
        .attr("dy",".15em")
        .attr("transform",function(d){
          return "rotate(-30)"
        });

  svg.append("g")
    .attr("class", "y axis axisLeft")
    .attr("transform", "translate(0,0)")
    .call(yAxisLeft)
  .append("text")
    .attr("transform","rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Percentage");

  svg.append("g")
    .attr("class", "y axis axisRight")
    .attr("transform", "translate(0,0)")
    //.call(yAxisRight)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .style("text-anchor", "end")
    .style("text-anchor", "end");
    //.text("Dollars");
  /*svg.append("g")
    .attr("class", "y axis axisRight")
    .attr("transform", "translate(" + (width) + ",0)")
    .call(yAxisRight)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .attr("dx", "2em")
    .style("text-anchor", "end")
    .text("#");
  */
var LegendColor= [ ["percentage of black students in gifted program","#aad"],
                   ["percentage of black students in the school systems","#556"]];

var legend = svg.append("g")
    .attr("class", "legend")
    //.attr("x", width - 65)
    .attr("y", 50)
    .attr("height", 200)
    .attr("width", 300)
    .attr('transform', 'translate(-20,50)');

var legendRect = legend.selectAll('rect').data(LegendColor);  

legendRect.enter()
    .append("rect")
    .attr("x", width - 200)
    .attr("y", height)
    .attr("width", 20)
    .attr("height", 20);

legendRect
    .attr("y", function(d, i) {
        return i * 20;
    })
    .style("fill", function(d) {
        return d[1];
    });

var legendText = legend.selectAll('text').data(LegendColor);

legendText.enter()
    .append("text")
    .attr("x", width - 175);

legendText
    .attr("y", function(d, i) {
        return i * 20 + 15;
    })
    .text(function(d) {
        return d[0];
    });
             


var bars = svg.selectAll(".rect").data(data_2010)
  
      bars.enter()
      .append("rect")
      .attr("class", "rect1")
      .attr("x", function(d) { return x(d.SYSTEM_NAME); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.gifted_total); })
      .attr("height", function(d,i,j) { return height - y0(d.gifted_total); })
      .on('mouseover', tip.show)
      .on('mouseout',tip.hide);

var bars1 = svg.selectAll(".rect").data(data_2010)
      
      bars1.enter()
      .append("rect")
      .attr("class", "rect2")
      .attr("x", function(d) { return x(d.SYSTEM_NAME) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.black_total); })
      .attr("height", function(d,i,j) { return height - y1(d.black_total); })
      .on('mouseover', tip1.show)
      .on('mouseout',tip1.hide);  

d3.selectAll("input").on("change",change);



var gap = "See the gap";
console.log("The current value of the button change" + gap);

var year = 2010;

function change(){
  console.log("The value of gap in change () " + gap);
  if (gap == "Comparison of percentages")
  {

    if (this.value === "2010") {gap_year(gapnumber_2010); year  = 2010;}
    if (this.value === "2011") {gap_year(gapnumber_2011);year  = 2011;}
    if (this.value === "2012") {gap_2012(); year  = 2012;}
    if (this.value === "2013") {gap_2013(); year  = 2013;}
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

    if (year == "2010") gap_year(gapnumber_2010);
    if (year == "2011") gap_year(gapnumber_2011);
    if (year == "2012") gap_2012();
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
  
  bars.data(data_year)
      .enter()
      .append("rect")
      .attr("class", "rect1");

  console.log("does it really do the select things?")

  bars.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .attr("x", function(d) { return  x(d.SYSTEM_NAME); })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y0(d.gifted_total); })
      .attr("height", function(d,i,j) { return height - y0(d.gifted_total); });
  
  bars1.data(data_year)
      .enter()
      .append("rect")

  bars1.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y0(d.black_total); })
      .attr("height", function(d,i,j) { return height - y0(d.black_total); });   

  console.log("why not appear 2011?");
}

function gap_year(gapnumber_year){
  
  bars.data(gapnumber_year)
      .enter()
      .append("rect")
      .attr("class", "rect1");

  bars.transition() 
      .duration(1000)
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME) ; })
      .attr("width", x.rangeBand()/ 2  )
      .attr("y", function(d) { return y0(0); })
      .attr("height", function(d,i,j) { return height - y0(0); });
  
  bars1.data(gapnumber_year)
      .enter()
      .append("rect")
      .on('mouseover', tip.show)
      .on('mouseout',tip.hide);

  bars1.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME)  ; })
      .attr("width", x.rangeBand() )
      .attr("y", function(d) { return y0( d.black_total); })
      .attr("height", function(d,i,j) { return height - y0(d.black_total); });


}

function gap_2011(){
  bars.data(gapnumber_2011)
      .enter()
      .append("rect")
      .attr("class", "rect1");

  bars.transition() 
      .duration(1000)
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME) ; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y0(0); })
      .attr("height", function(d,i,j) { return height - y0(0); });
  
  bars1.data(gapnumber_2011)
      .enter()
      .append("rect")

  bars1.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME)  ; })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y0(d.black_total); })
      .attr("height", function(d,i,j) { return height - y0(d.black_total); })

}

function gap_2012(){
  bars.data(data_2012)
      .enter()
      .append("rect")
      .attr("class", "rect1");

  bars.transition() 
      .duration(1000)
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME) ; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y0(0); })
      .attr("height", function(d,i,j) { return height - y0(0); })

  
  bars1.data(data_2012)
      .enter()
      .append("rect")

  bars1.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME) ; })
      .attr("width", x.rangeBand() )
      .attr("y", function(d) { return y0(d.black_total = d.black_total - d.gifted_total); })
      .attr("height", function(d,i,j) { return height - y0(d.black_total); })
      .on('mouseover', tip2.show)
      .on('mouseout',tip2.hide);
}

function gap_2013(){

  bars.data(data_2013)
      .enter()
      .append("rect")
      .attr("class", "rect1");

  bars.transition() 
      .duration(1000)
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME) ; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y0(0); })
      .attr("height", function(d,i,j) { return height - y0(0); })

  
  bars1.data(data_2013)
      .enter()
      .append("rect")

  bars1.transition() 
      .duration(1000)
      .delay(function(d,i){return i*10;})
      .ease("quad")   
      .attr("x", function(d) { return x(d.SYSTEM_NAME) ; })
      .attr("width", x.rangeBand() )
      .attr("y", function(d) { return y0(d.black_total = d.black_total - d.gifted_total); })
      .attr("height", function(d,i,j) { return height - y0(d.black_total); });

}