var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://iot.eclipse.org')
 
client.on('connect', function () {
  client.subscribe('priom123')

  var a= "2|Cancel"
  client.publish('ridoy123', a)

})
 
 client.on('message', function (topic, message) {
//   // message is Buffer
   console.log(message.toString())
    //client.end()
//  var b = message.toString();
//   var a = b.split(",");

//   console.log(parseFloat(a[0]));
//   console.log(parseFloat(a[1]));

  

  
// var d = Math.sqrt((23.773373-a[0])*(23.773373-a[0]))+((90.367101-a[1])*(90.367101-a[1]));
// console.log(d);

// if(d<=0.0010208464000004793) /*For 150 meter */
// //if(d<=0.0007103806890015494) /*For 100 meter */
// {
//   console.log("In Our Range");
// }
// else{

//   console.log("Not yet");
// }

 })