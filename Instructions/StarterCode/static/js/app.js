const jsonFile = "../data/samples.json";
      // Use `Object.entries` to add each key and value pair to the panel
      // Inside the loop, use d3 to append new tags for each key-value
      // in the metadata.
            /**
//      * Helper function to select belly data
//      * Returns an array of values
//      * @param {array} rows
//      * @param {integer} key
//      * index 0 - Date
//      * index 1 - Open
//      * index 2 - High
//      * index 3 - Low
//      * index 4 - Close
//      * index 5 - Volume
//  */

//       function unpack(rows, key) {
//         return rows.map(function(row) { 
//             return (row[key]);});
//       }


// Create a function that creates figures by id's :
Plotly.d3.json(jsonFile, function createFigure(id){


    // Fetch the JSON data and console log it to display json promise(is it catching my data):
    // How will I go about parsing the data?:
    const dataPromise = d3.json(jsonFile).then(function(data) {
        // Promise Pending 
        console.log({"Data Promise": dataPromise});
        // Display Arrays: 
        console.log({"JSON Data": data});
        // set json data = variables to of seperate array data sets:
        // get the metadata info for the demographic panel
        var metadata = data.metadata;
        let names = data.names;
        let samples = data.samples;
        // var value = metadata[0].age;
        // console.log(value)
        
        // Declare constant variables for each data set: 
                // Hint Look at how arrays are nested and release the content by layers.
        // const name= names;
        const [{age}, {bbtype}, {ethnicity}, {gender}, {mid}, {location}, {wfreq}] = metadata;
        const [sample_id, {otu_ids}, {otu_labels}, {sample_values}]= samples;
        // // Wanted the information to show up user friendly:
        console.log({"Meta Data": metadata});
        console.log({"Names": names});
        console.log({"Samples": samples});
        // console.log(name);


        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        // * Use `sample_values` as the values for the bar chart.
        // console.log(sample_values);
        var sampleValues = sample_values.slice(0, 10).reverse();
        console.log(sampleValues);
        
        // // // * Use `otu_ids` as the labels for the bar chart.
        // console.log(otu_ids);
        var idValues = (otu_ids.slice(0, 10)).reverse();
        console.log(idValues)

        // // // * Use `otu_labels` as the hovertext for the chart.
        console.log(otu_labels);
        var idOtu = idValues.map(d => "OTU " + d)

                
        // * Use `otu_ids` for the x values.

        // * Use `sample_values` for the y values.

        // * Use `sample_values` for the marker size.

        // * Use `otu_ids` for the marker colors.

        // * Use `otu_labels` for the text values.


    //   function plot
    //   let bar_trace = {
    //     x: [],
    //     y: [],
    //     mode: "lines"
    //   };
    //   let trace2 = {
    //     x: [],
    //     y: [],
    //     mode: "lines"
    //   };
    //   figure.forEach(function(val) {
    //     trace1.x.push(val["name"]);
    //     trace1.y.push(val["name"]);
    //     trace2.x.push(val["time"]);
    //     trace2.y.push(val["pm10"]);
    //   });
    //   Plotly.newPlot('Bar', [trace1, trace2]);
});
// create the function for the change event
function optionChanged(id) {
    createFigure(id);
    getMeta(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getMeta(data.names[0]);
        createFigure(data.names[0]);
    });
}

init();
});

