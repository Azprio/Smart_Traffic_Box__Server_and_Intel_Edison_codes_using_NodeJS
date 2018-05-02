var mysql = require('mysql');
var mqtt = require('mqtt')


//MySQL database connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "datasoft_training_final_project"
});


//MQTT Connection 
var client  = mqtt.connect('mqtt://iot.eclipse.org')
client.on('connect', function () {
    client.subscribe('ridoy')
    //client.publish('priom', '23.774393,90.366181')
  })
   
  client.on('message', function (topic, message) {
    // message is Buffer
    
    //client.end()


   var a = message.toString();
   console.log(a)
    var b = a.split(",");
    var c = b[0].toString();
    var vehicle_cor = (b[1].toString())+","+(b[2].toString());
    con.query(
      'UPDATE tbl_vehicle_details SET current_location = ? Where id = ?',[vehicle_cor, c],
      (err, result) => {
        if (err) throw err;
        
      }
    );

    con.query("SELECT * FROM tbl_traffic_points WHERE id = 4", function (err, result) {
        if (err) throw err;
        var traffic_id = JSON.parse(JSON.stringify(result)); 
        var tem_v_list = traffic_id[0].temp_vehicle_list;
        
        if (tem_v_list != ""){
        var p = traffic_id[0].cordinate;
        var q = p.split(",");
        var r = parseFloat(q[0]);
        var s = parseFloat(q[1]);

        var nearest_vehicle = "";
            if((tem_v_list.toString()).length>12){
              
              // console.log(tem_v_list);
              // var aa = tem_v_list.split("|");
              // aa.forEach(function(element){

              //   console.log("indexof  ::"+aa.indexOf(element));
              //   if (aa.indexOf(element) == 0){
              //     console.log("Hi")
              //     var id = ((element.toString()).split("-"))[1];
              //     console.log(id)
              //     console.log("Hi")
              //   con.query("SELECT * FROM tbl_vehicle_details WHERE id = ?",[id], function (err, result) {
              //     if (err) throw err;
              //     var bb = JSON.parse(JSON.stringify(result));         
              //     bb=bb[0].current_location
              //     console.log("BB print")
              //     bb = bb.split(",");
              //     console.log(parseFloat(bb[0]))
              //     console.log(parseFloat(bb[1]))
              //     nearest_vehicle= Math.sqrt((r-parseFloat(bb[0]))*(r-parseFloat(bb[0])))+((s-parseFloat(bb[1]))*(s-parseFloat(bb[1])));

              //   })
              // }
              // else{
              //   con.query("SELECT * FROM tbl_vehicle_details WHERE id = ?",[((element.toString()).split("-"))[1]], function (err, result) {
              //     if (err) throw err;
              //     var bb = JSON.parse(JSON.stringify(result));         
              //     bb=bb[0].current_location
              //     bb = bb.split(",");
              //     console.log(parseFloat(bb[0]))
              //     console.log(parseFloat(bb[1]))
              //     nearest_vehicle= nearest_vehicle+"|"+Math.sqrt((r-parseFloat(bb[0]))*(r-parseFloat(bb[0])))+((s-parseFloat(bb[1]))*(s-parseFloat(bb[1])));
                  
              //   })
                
              // }
              // console.log(nearest_vehicle);
              // nearest_vehicle = nearest_vehicle.split("|")
              // cc=Math.min.apply(null, nearest_vehicle)
              // nearest_vehicle = aa[nearest_vehicle.indexOf(cc)]
              // //nearest_vehicle = ((nearest_vehicle.toString()).split("-"))[1];


              // })
            
            
            }
            else{
              nearest_vehicle=tem_v_list;
              console.log(tem_v_list);
            }

        var n = nearest_vehicle.split("-")
        var o = n[1].toString();
        
        
        if(c==o){

          console.log(o);
            con.query("SELECT * FROM tbl_vehicle_details WHERE id = ?",[o], function (err, result) {
                if (err) throw err;
                var trafic_points = JSON.parse(JSON.stringify(result));
                trafic_points = trafic_points[0].temp_traffic_points.split("|");
                var previous_traffic_point = "";
                var next_traffic_point = "";
                
                var now = n[0].toString();
                // var previous_traffic_point = now -1;
                // var next_traffic_point = now++;
                console.log(now)
                if(now==0){
                previous_traffic_point = "Start";
                next_traffic_point = now++;
                next_traffic_point = trafic_points[next_traffic_point];
              }
              else if(now==trafic_points.length-1){
                previous_traffic_point = now -1;
                previous_traffic_point = trafic_points[previous_traffic_point];
                next_traffic_point = "last";
              }
              else{
                previous_traffic_point = now -1;
                previous_traffic_point = trafic_points[previous_traffic_point];
                next_traffic_point = now++;
                next_traffic_point = trafic_points[next_traffic_point];
              }
              console.log("previous: "+previous_traffic_point);
              console.log("next: "+next_traffic_point);
    var d = parseFloat(b[1]);
    var e = parseFloat(b[2]);
    console.log(d);
    console.log(e);
    console.log(r);
    console.log(s);
    

    if(n[2].toString()==1){console.log("Forward")}
    else if(n[3].toString()==1){console.log("Right")}
    else if(n[4].toString()==1){console.log("Left")}
    else if(n[5].toString()==1){console.log("Backward")}
    else {console.log("Last Traffic Point")}
    
  var f = Math.sqrt((r-d)*(r-d))+((s-e)*(s-e));
  console.log(f);
  
  if(f<=0.0010208464000004793) /*For 150 meter */
  //if(d<=0.0007103806890015494) /*For 100 meter */
  {
    console.log("In Range");
    

  }
  else{
  
    console.log("Not yet");
  }
  


})
}


    }
})
  })
