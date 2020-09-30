const jsonFile = "../data/samples.json";

      // Use `Object.entries` to add each key and value pair to the panel
      // Inside the loop, use d3 to append new tags for each key-value
      // in the metadata.
            /**
     * Helper function to select belly data
     * Returns an array of values
     * @param {array} rows
     * @param {integer} key
     * index 0 - Date
     * index 1 - Open
     * index 2 - High
     * index 3 - Low
     * index 4 - Close
     * index 5 - Volume
 */

      function unpack(rows, key) {
        return rows.map(function(row) { return (row[key]);});
      }


// Create a function that creates figures from sample.json :
Plotly.d3.json(jsonFile, function(figure){
    // Fetch the JSON data and console log it to display json promise(is it catching my data):
    // How will I go about parsing the data?:
    const datasets = d3.json(jsonFile).then(function(data) {
        var sample_meta = d3.select("#sample-metadata").node().value;
        sample_meta = "";
        // Promise Pending 
        console.log("Data Sets:", datasets);
        // Display Arrays: 
        console.log(data)
        // set json data = variables to of seperate array data sets:
        let metadata = data.metadata
        let names = data.names
        let samples = data.samples
        // Declare constant variables for each data set: 
        const {age, bbtype, ethnicity, gender, id, location, wfreq} = metadata;
        const {name} = names;
        const {sid, otu_ids, otu_labels, sample_values} = samples;
        // Wanted the information to show up user friendly:
        console.log({"Meta Data": metadata});
        console.log({"Names": names});
        console.log({"Samples": samples});});

    //   function plot
    //   let trace1 = {
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
