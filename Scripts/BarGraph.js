<!DOCTYPE html>
<head>
<title> D3.js Demo Example</title>
<script src="https://d3js.org/d3.v4.js"></script>
</head>
<body>


<!-- Create a div where the graph will take place -->
<div id="my_dataviz"></div>
<script>

const colours = ['#ececa3', '#b5e550', '#abc32f', '#809c13', '#607c3c'];

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 460 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/Albithealbino/WebPortfolio/main/Data/WhyYouShouldHireMe.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Year; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
    

// Add X axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 250)
    .attr("y", height + margin.top + 50)
    .text("Promotions each year");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 3])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y).tickFormat(d3.format('d')));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Year); })
    .attr("width", x.bandwidth())
    .attr("fill", function(d, i) {console.log(i); return colours[i]})
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.Promotions); })
  .attr("height", function(d) { return height - y(d.Promotions); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

})

</script>
</body>
</html>
