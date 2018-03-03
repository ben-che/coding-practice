$(document).ready(function () {

    // grab the AudioContext obj from the window obj to work on
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // grab the actual audio element tag we want to operate on
    let audioElement = document.getElementById('audio-player');
    // specify where the d3 svg output should be
    let barsParent = document.getElementById('d3Wrapper');
    // createMediaElementSource is an AudioContext method - it grabs the actual source file as opposed to just
    //      the element in the DOM (as we did above)
    let audioSrc = audioCtx.createMediaElementSource(audioElement);
    // createAnalyser is a method AudioContext inherits, the analyser allows exposure of time/frequency data
    //      from the 
    let analyser = audioCtx.createAnalyser();
  
    // connect the audio sourcefile to analyser node
    audioSrc.connect(analyser);
    // connect audio source to output
    audioSrc.connect(audioCtx.destination);
    
    // this will be an 8 bit array that we will copy the frequency data of the audio into - we'll define a max length of
    //      200 so that our data can be displayed properly on the page 
    let frequencyData = new Uint8Array(200);
    
    // creating the svg "canvas" - all the work on svgs will be done within this node
    let svgHeight = '250';
    let svgWidth = '1200';
    let barPadding = '0.75';
    
    // define a function that creates an svg - we'll take in the parent node and also provide it with a set
    //      width and length - this is where we'll append our svg to
    function createSvg(parent, height, width) {
        return (d3.select(barsParent) // select where the parent element is on the dom
        .append('svg')            // append the svg to parent
        .attr('height', height).attr('width', width));      // set the svg's height and width
    }

    // variable svg will now invoke the createSvg function whenever it is referenced - it will
    //      create an svg with a height of 300 and a width of 1700
    let svg = createSvg('barsParent', svgHeight, svgWidth);
  
    // grabs all the 'rect' svgs we create and applies the following methods:
    svg.selectAll('rect')
       .data(frequencyData)     // use the frequencyData array to populate the graph
       .enter()                 // creates one bar for each item in the frequencyData array
       .append('rect')          // appends a rectangular bar to the dom
       // now we must set attributes so that the elements inside the dom are actually displayed
       .attr('x', function (d, elem) {     // set the x attribute as a reletive value based on how many items are inside the frequencyData array and the width
          return elem * (svgWidth / frequencyData.length);     // of the svg - this defines how far from the left each bar sits
       })
       .attr('width', svgWidth / frequencyData.length - barPadding); // set a variable width based on how long the data array is and how much padding we want in between
  
    // renderChart is a recursive fn that updates the audio data in real time
    function renderChart() {
        // this window method tells the browser that an animation is about to be performed and the renderChart function must be called beforehand,
        //      before the window repaint
       requestAnimationFrame(renderChart);
  
       // this function uses the analyser node we conencted out audio context to and copies it to 
       //       the frequencyData 8 bit array we used earlier - this will update our freqency data every
       //       time a recursive call is made to renderChart, allowing us to pain updates as the music changes
       analyser.getByteFrequencyData(frequencyData);
    //    console.log(frequencyData);
  
       // this function takes the updates frequencyData array from above and recreates our svgs
       svg.selectAll('rect')
          .data(frequencyData)               // grab new frequencyData
          .attr('height', function(d) {      // grab new height of each svg bar
             return d;                       
          })
          .attr('fill', function(d) {       // update the color of each svg bar
             return 'rgb('+d +',' +d + ',' + d + ')';   // randomize shade of each bar
          });
    }
  
    // run the renderChart function
    renderChart();
  
  });