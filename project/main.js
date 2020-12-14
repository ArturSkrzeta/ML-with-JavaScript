const positive = require('./data/positive');
const negative = require('./data/negative');
let maxLengthInput = -1;

const exampleData = [
  ...positive,
  ...negative
];

const pushZerosToArray = (array, maxLength) => {
  while(array.length < maxLength) {
    array.push(0); // it appneds zeros till array length = maxLengthInput
  };
  return array;
};

const fixedLength = (data, isTrained) => {
  for(i=0; i < data.length; i++) {
    if(data[i].input.length > maxLengthInput){
      maxLengthInput = data[i].input.length;
    };
  };
  for(i=0; i < data.length; i++) {
    pushZerosToArray(data[i].input, maxLengthInput);
  };
  return data;
};

const encode = (d) => {
  const newArray = [];
  d.split('').map(c => {
    newArray.push(c.charCodeAt(0)/255)
  });
  return newArray;
};

const encodeData = (data) => {
  return data.map(d =>{
      return(
        {
          input: encode(d.input),
          output: d.output
        }
      );
  });
};


function main() {

  const brain = require('brain.js')
  const network = new brain.NeuralNetwork();
  encodedData = encodeData(exampleData);
  encodedDataFixedLength = fixedLength(encodedData);
  network.train(encodedDataFixedLength, {log: true});
  console.log(network.run(pushZerosToArray(encode("That is wrong."),maxLengthInput)));

};

if (require.main === module) {
  main();
};



// var net = new brain.recurrent.LSTM();
//
// const data = [
  //   {input: "my unit-tests failed.", output: "software"},
  //   {input: "tried the program, but it was buggy.", output: "software"},
  //   {input: "i need a new power supply.", output: "hardware"},
  //   {input: "the drive has a 2TB capacity.", output: "hardware"},
  //   {input: "unit-tests", output: "software"},
  //   {input: "program", output: "software"},
  //   {input: "power supply", output: "hardware"},
  //   {input: "drive", output: "hardware"}
  // ];
  //
  // console.log("training started");
  //
  // net.train(data, {log:true});
  // new_output = net.run("drive");
  //
  // console.log(new_output);



  // const another_data = [
    //   { input: [0,1,0], output: [0]},
    //   { input: [0,1,1], output: [0]},
    //   { input: [0,0,0], output: [0]},
    //   { input: [1,1,0], output: [1]},
    //   { input: [1,0,0], output: [1]},
    //   { input: [1,0,1], output: [1]},
    //   { input: [1,1,1], output: [1]}
    // ];
    //
    // const another_data_2 = [
      //   { input: [0,1,0], output: {zero:1}},
      //   { input: [0,1,1], output: {zero:1}},
      //   { input: [0,0,0], output: {zero:1}},
      //   { input: [1,1,0], output: {one:1}},
      //   { input: [1,0,0], output: {one:1}},
      //   { input: [1,0,1], output: {one:1}},
      //   { input: [1,1,1], output: {one:1}}
      // ];



      // const teams = [
      //   {input : [1,3], output: [1]},
      //   {input : [2,1], output: [0]},
      //   {input : [3,4], output: [1]},
      //   {input : [3,2], output: [1]},
      //   {input : [2,4], output: [1]}
      // ];

      // const net = new brain.NeuralNetwork();
      // net.train(another_data_2, {log: true});
      // console.log(net.run([0,0,1]));
