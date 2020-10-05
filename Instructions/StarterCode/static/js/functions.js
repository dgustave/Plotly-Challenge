// 1. Use the D3 library to read in `samples.json`.
var jsonFile = "../data/samples.json";

function initWebpage(){
    var dropdownMenu = d3.select("#selDataset");
    d3.json(jsonFile).then(function(data){
      data.names.forEach(function(sample){
        dropdownMenu.append("option").text(sample).property("value", sample); //This is setting value to sample ("value", sample) 
    });
    buildBar(data.names[0]);
    buildgauge(data.names[0]);
    });
  }

  // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  function buildBar(sample){
    d3.json(jsonFile).then(function(data){
        let samples = data.samples;
        const result = samples.filter(sampleObject => sampleObject.id == sample)[0];

        // Could of initialed all variables let [{otu_ids}, {otu_labels}, {sample_values}]= result;
        console.log({"Samples": result})

        // * Use `sample_values` as the values for the bar chart:
        let sample_values = result.sample_values 
        var sampleValues = (sample_values.slice(0, 10)).reverse();
        console.log({"Top 10 OTUs" :sampleValues});

        // * Use `otu_ids` as the labels for the bar chart:
        let otu_ids = result.otu_ids; 
        let idValues = (otu_ids.slice(0, 10)).reverse().toString();
        let newValues = idValues.split(",")
        let labelValues = newValues.map(i => 'OTU ' + i);
        console.log({"Top 10 OTU IDs" : labelValues});
        

        // * Use `otu_labels` as the hovertext for the chart:
        let otu_labels = result.otu_labels
        console.log({"OTU Labels": otu_labels});
        const otu_text = otu_labels.map(otu_labels => otu_labels.split(";").join(", ").toLowerCase());
        let otu_phrase = otu_text.map(i => 'The following samples tested postive for ' + i);
        console.log({"OTU Text": otu_phrase});
        let otu_sentence = (otu_phrase.slice(0, 10)).reverse();
        console.log({"OTU Sentence": otu_sentence});


        var bar_trace = {
            // * Use `sample values` for the x values:
            x: sampleValues,
            y: labelValues,
            marker: {
              size: sampleValues,
              color: sampleValues
          },
            // * Use `otu_labels` for the labels:
            type: 'bar',
            orientation: "h",
            text: otu_sentence
          };
          var belly_data = [bar_trace]
          var layout = {
          title: 'Top Ten OTUs',
          font:{
              family: 'Raleway, sans-serif'
            },
            showlegend: false,
            xaxis: {
              tickangle: -45
            },
            yaxis: {
              zeroline: false,
              gridwidth: 0
            },
            bargap : 0,
          autosize: false,
          width: 800,
          height: 600,
          margin: {
            l: 100,
            r: 100,
            b: 80,
            t: 80,
            pad: 1
          },
        };
        Plotly.newPlot('bar', belly_data, layout);
    });
  };
  

// 3. Create a bubble chart that displays each sample.

// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.

// ![Bubble Chart](Images/bubble_chart.png)

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// ![hw](Images/hw03.png)

// 6. Update all of the plots any time that a new sample is selected.

// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

// ![hw](Images/hw02.png)

// ## Advanced Challenge Assignment (Optional)

// The following task is advanced and therefore optional.

// * Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.
        // The guage chart
function buildgauge(sample){
    d3.json(jsonFile).then(function(data){
        var metadata = data.metadata;
        let [{age}, {bbtype}, {ethnicity}, {gender}, {id}, {location}, {wfreq}] = metadata;
        console.log({"Meta Data": metadata});
        console.log({"Belly Wash Frequency": wfreq})

        var containersRy = document.querySelector(".container");
        var svg = document.querySelector(".typeRange");
        var output = document.querySelector(".output");
        var outline = document.querySelector(".outline");
        var fill = document.querySelector(".fill");
        var center = document.querySelector(".center");
        var needle = document.querySelector(".needle");

        var initialValue = document.querySelector(".initialValue");

        var rad = Math.PI / 180;
        var NS = "http:\/\/www.w3.org/2000/svg";

        var W = parseInt(window.getComputedStyle(svg, null).getPropertyValue("width"));
        var offset = 40;
        var cx = ~~(W / 2);
        var cy = 160;

        var r1 = cx - offset;
        var delta = ~~(r1 / 4);

        var initVal = initialValue.value;

        var isDragging = false;

        var x1 = cx + r1,
        y1 = cy;
        var r2 = r1 - delta;

        var x2 = offset,
        y2 = cy;
        var x3 = x1 - delta,
        y3 = cy;

        function drawScale() {
        sr1 = r1 + 5;
        sr2 = r2 - 5;
        srT = r1 + 20;
        var scale = document.querySelector(".scale");
        clearRect(scale)
        var n = 0;
        for (var sa = -180; sa <= 0; sa += 18) {
            var sx1 = cx + sr1 * Math.cos(sa * rad);
            var sy1 = cy + sr1 * Math.sin(sa * rad);
            var sx2 = cx + sr2 * Math.cos(sa * rad);
            var sy2 = cy + sr2 * Math.sin(sa * rad);
            var sxT = cx + srT * Math.cos(sa * rad);
            var syT = cy + srT * Math.sin(sa * rad);

            var scaleLine = document.createElementNS(NS, "line");
            var scaleLineObj = {
            class: "scale",
            x1: sx1,
            y1: sy1,
            x2: sx2,
            y2: sy2
            };
            setSVGAttributes(scaleLine, scaleLineObj);

            scale.appendChild(scaleLine);

            var scaleText = document.createElementNS(NS, "text");
            var scaleTextObj = {
            class: "scale",
            x: sxT,
            y: syT,
            };
            setSVGAttributes(scaleText, scaleTextObj);
            scaleText.textContent = n * 10;
            scale.appendChild(scaleText);

            n++

        }

        }

        function drawInput(cx, cy, r1, offset, delta, a) {

        var d1 = getD1(cx, cy, r1, offset, delta);
        var d2 = getD2(cx, cy, r1, offset, delta, a);

        drawScale();

        outline.setAttributeNS(null, "d", d1);
        fill.setAttributeNS(null, "d", d2);

        drawNeedle(cx, cy, r1, a);
        }

        function updateInput(p, cx, cy, r1, offset, delta) {

        var x = p.x;
        var y = p.y;
        var lx = cx - x;
        var ly = cy - y;

        var a = Math.atan2(ly, lx) / rad - 180;

        drawInput(cx, cy, r1, offset, delta, a);
        output.innerHTML = Math.round((a + 180) / 1.8);
        initialValue.value = Math.round((a + 180) / 1.8);
        }

        function getD1(cx, cy, r1, offset, delta) {

        var x1 = cx + r1,
            y1 = cy;
        var x2 = offset,
            y2 = cy;
        var r2 = r1 - delta;
        var x3 = x1 - delta,
            y3 = cy;
        var d1 =
            "M " + x1 + ", " + y1 + " A" + r1 + "," + r1 + " 0 0 0 " + x2 + "," + y2 + " H" + (offset + delta) + " A" + r2 + "," + r2 + " 0 0 1 " + x3 + "," + y3 + " z";
        return d1;
        }

        function getD2(cx, cy, r1, offset, delta, a) {
        a *= rad;
        var r2 = r1 - delta;
        var x4 = cx + r1 * Math.cos(a);
        var y4 = cy + r1 * Math.sin(a);
        var x5 = cx + r2 * Math.cos(a);
        var y5 = cy + r2 * Math.sin(a);

        var d2 =
            "M " + x4 + ", " + y4 + " A" + r1 + "," + r1 + " 0 0 0 " + x2 + "," + y2 + " H" + (offset + delta) + " A" + r2 + "," + r2 + " 0 0 1 " + x5 + "," + y5 + " z";
        return d2;
        }

        function drawNeedle(cx, cy, r1, a) {

        var nx1 = cx + 5 * Math.cos((a - 90) * rad);
        var ny1 = cy + 5 * Math.sin((a - 90) * rad);

        var nx2 = cx + (r1 + 15) * Math.cos(a * rad);
        var ny2 = cy + (r1 + 15) * Math.sin(a * rad);

        var nx3 = cx + 5 * Math.cos((a + 90) * rad);
        var ny3 = cy + 5 * Math.sin((a + 90) * rad);

        var points = nx1 + "," + ny1 + " " + nx2 + "," + ny2 + " " + nx3 + "," + ny3;
        needle.setAttributeNS(null, "points", points);
        }

        // helpers
        function oMousePos(elmt, evt) {
        var ClientRect = elmt.getBoundingClientRect();
        return { //obj
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.min(Math.round(evt.clientY - ClientRect.top), cy)
        }
        }

        function clearRect(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        }

        function setSVGAttributes(elmt, oAtt) {
        for (var prop in oAtt) {
            elmt.setAttributeNS(null, prop, oAtt[prop]);
        }
        }

        // events
        window.addEventListener("load", function() {
        var pa = (initVal * 1.8) - 180;
        var p = {}
        p.x = cx + r1 * Math.cos(pa * rad);
        p.y = cy + r1 * Math.sin(pa * rad);
        updateInput(p, cx, cy, r1, offset, delta)
        }, false);

        initialValue.addEventListener("input", function() {
        var val = this.value;
        var newVal = (!isNaN(val) && val >= 0 && val <= 100) ? val : 18;
        var pa = (newVal * 1.8) - 180;
        var p = {}
        p.x = cx + r1 * Math.cos(pa * rad);
        p.y = cy + r1 * Math.sin(pa * rad);
        updateInput(p, cx, cy, r1, offset, delta)
        }, false);

        svg.addEventListener("mousedown", function(evt) {
        isDragging = true;
        this.classList.add("focusable");
        var mousePos = oMousePos(svg, evt);
        updateInput(mousePos, cx, cy, r1, offset, delta);
        }, false);
        svg.addEventListener("mouseup", function(evt) {
        isDragging = false;
        this.classList.remove("focusable");
        }, false);
        svg.addEventListener("mouseout", function(evt) {
        isDragging = false;
        this.classList.remove("focusable");
        }, false);

        svg.addEventListener("mousemove", function(evt) {
        if (isDragging) {
            var mousePos = oMousePos(svg, evt);
            updateInput(mousePos, cx, cy, r1, offset, delta);
        }
        }, false);
        let belly = "Belly Button Washing Frequency";
        var belly_data = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(wfreq),
            title: { text: belly},
            type: "indicator",
            text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
            textinfo: 'text',
            textposition:'inside',   
            mode: "gauge+number",
            gauge: { axis: { range: [0, 9] },
                        steps: [
                        { range: [0, 1], color: "#f0f1f4" },
                        { range: [1, 2], color: "#eae9e4" },
                        { range: [2, 3], color: "#d3e0ce" },
                        { range: [3, 4], color: "#9cb8a0" },
                        { range: [4, 5], color: "#a4fba6" },
                        { range: [5, 6], color: "#4ae54a" },
                        { range: [6, 7], color: "#30cb00" },
                        { range: [7, 8], color: "#0f9200" },
                        { range: [8, 9], color: "#006203" },
                    ]}
                
            }
            ];
            var layout = { 

                // shapes:[{
                //     type: "path",
                //     path: path,
                //     fillcolor: "850000",
                //     line: {
                //     color: "850000"
                //     }
                //     }],
                    height: 500,
                    width: 600,
                    xaxis: {type:"category",zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
                    yaxis: {type:"category",zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
            };
        Plotly.newPlot("gauge", belly_data, layout);
    });
};  

// * You will need to modify the example gauge code to account for values ranging from 0 through 9.

// * Update the chart whenever a new sample is selected.

// ![Weekly Washing Frequency Gauge](Images/gauge.png)
initWebpage();
  