var height = 250;
var width = 500;
var barWidth = 35;
var barOffset = 5;
var barColor = 'rgb(255,96,17)';
var barStroke = 'rgb(41, 47, 104)';

//Appending a tool-bar to the html body
d3.select('body')
    .append('div')
    .attr('id', 'tool-bar')

//Appending a chart to the html body 
d3.select('body')
    .append('div')    
    .attr('id', 'chart');

//appending a div 'category' to the tool-bar
d3.select('#tool-bar')
    .append('div')
    .attr('id', 'category')
    .text('Choose the category')

//appending a div 'headquarts' to the tool-bar    
d3.select('#tool-bar')
    .append('div')
    .attr('id', 'headquarters')
    .text('Headquarters');

//initializing a variable with data source
var dataUrl = 'data.json'

//fetching data
fetch(dataUrl)
    .then(function(response) {
        return response.json();
    })
      .then(function(data) {
        console.log(data.ids);
        var names = data.names; 
        names.unshift('Pick the category');
        console.log('names:', names)
        var selectedCategory = '';

          //appending 'select' tag for dropdown
          d3.select('#category')
              .append('select')
              .attr('id', 'cat-dropdown');

          //appending options to select. it will receive the names from DB
          d3.select('#cat-dropdown')
              .selectAll('option')
              .data(names)
              .enter()
              .append('option')
              .attr('class', 'categories')
              .text(function(names) {
                  return names; 
          });

          //creating a p tag within category div to display the results of users pick
          d3.select('#category')
          .append('p')
          .attr('id', 'selected-cat');
          //////CATEGORIES//////////////////////////////////
          if(names.length <2) {
            d3.select('#category').text('Pick the category')
          }
          

          //the pick will be displayed in the span appended here
          d3.select('#selected-cat')
              .append('span')

          var sel = '';
          //getting the pick displayed in the span with onchange event
          var sel = d3.select('#cat-dropdown')
              .on('change', function() {
                  selectedCategory = d3.select('#cat-dropdown').node().value;                    
                  d3.select('span').text(selectedCategory);

                  var indexOfpickedCategory = names.findIndex(function(name) {
                      if(name===selectedCategory) {
                          return selectedCategory
                      }
                  })
                  var counts = data.counts[indexOfpickedCategory]
                  console.log('counts: ', counts);
                  // Array.filter from names and compare them with the picked
                  // than trigger index of it and check index of the year??
                  // make it to a variable and pass it to data?

                  var rect = document.getElementsByClassName('rect');
                  //if there are already some rects elements in the DOM it will remove them first and than add new ones.            
                  if(rect) {
                    d3.select('svg').remove('rect');
                  }
              // d3.select('#chart').remove('svg');
              d3.select('#chart').append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .style('background', 'rgb(151, 216, 157')                
                  .selectAll('rect')
                  .data(counts)
                  .enter().append('rect')
                  .style('fill', barColor)
                  .attr('class', 'rect')
                  .attr('width', barWidth)
                  .attr('height', function(d) {
                      return d
                  })
                  .attr('x', function(d, i) {        
                  
                    // console.log('CREATING THE CHART', rect.length);
                      return i * (barWidth + barOffset);
                  })
                  .attr('y', function(d) {
                      return height -d;
                  })        
          })
      })
      .catch(function(err) {
          console.log('Error in receiving data: ', err.message);
      })
    .catch(function(err) {
        console.log('Error in logging data: ', err.message);
    })
