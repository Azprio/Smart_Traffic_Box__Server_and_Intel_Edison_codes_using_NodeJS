var mysql = require('mysql')
//var mraa = require('mraa')
var mqtt = require('mqtt')

var traffic_point_id = 3;

function led_on(pin_no){
var pin = new mraa.Gpio(pin_no);
pin.dir(mraa.DIR_OUT);
pin.write(1);
}

function led_off(){
  var pin = new mraa.Gpio(pin_no);
  pin.dir(mraa.DIR_OUT);
  pin.write(0);
}



//MySQL database connection
var con = mysql.createConnection({
  host: "174.142.32.199",
  user: "motlobco_ds",
  password: "Frev~!@123",
  database: "motlobco_datasoft_training_project"
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

    con.query("SELECT * FROM tbl_traffic_points WHERE id = ?",[traffic_point_id], function (err, result) {
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
                var vehicle_details = JSON.parse(JSON.stringify(result));
                trafic_points = vehicle_details[0].temp_traffic_points.split("|");
                var previous_traffic_point = "";
                var next_traffic_point = "";
                
                var now = n[0].toString();
                // var previous_traffic_point = now -1;
                // var next_traffic_point = now++;
                console.log(now)
                if(now==0){
                  previous_traffic_point = "start";
                  next_traffic_point = parseInt(now)+1;
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
                  next_traffic_point = parseInt(now)+1;
                  next_traffic_point = trafic_points[next_traffic_point];
                }
              console.log("previous: "+previous_traffic_point);
              console.log("next: "+next_traffic_point);
    var d = parseFloat(b[1]);
    var e = parseFloat(b[2]);
    console.log(d);
    console.log(e);
  
    
function lights(prev_id){


    var neighbour = traffic_id[0].neighber_list;
    neighbour = (neighbour.toString()).split(",")

      if(n[2].toString()==1&&prev_id == neighbour[3]){console.log("Forward Only")}
      else if(n[3].toString()==1&&prev_id == neighbour[3]){console.log("Forward Right")}
      else if(n[4].toString()==1&&prev_id == neighbour[3]){console.log("Forward Left")}
      else if(n[5].toString()==1&&prev_id == neighbour[3]){console.log("U-tern")}
      
      else if(n[2].toString()==1&&prev_id == neighbour[1]){console.log("Left Forward")}
      else if(n[3].toString()==1&&prev_id == neighbour[1]){console.log("U-tern")}
      else if(n[4].toString()==1&&prev_id == neighbour[1]){console.log("Left Only")}
      else if(n[5].toString()==1&&prev_id == neighbour[1]){console.log("Left Backward")}
      
      else if(n[2].toString()==1&&prev_id == neighbour[2]){console.log("Right Forward")}
      else if(n[3].toString()==1&&prev_id == neighbour[2]){console.log("Right Only")}
      else if(n[4].toString()==1&&prev_id == neighbour[2]){console.log("U-tern")}
      else if(n[5].toString()==1&&prev_id == neighbour[2]){console.log("Right Backward")}
  
      else if(n[2].toString()==1&&prev_id == neighbour[0]){console.log("U-tern")}
      else if(n[3].toString()==1&&prev_id == neighbour[0]){console.log("Backword Right")}
      else if(n[4].toString()==1&&prev_id == neighbour[0]){console.log("Backword Left")}
      else if(n[5].toString()==1&&prev_id == neighbour[0]){console.log("Backward Only")}
      
      else if(n[2].toString()==1&&prev_id == "start"){console.log("Forward Only")}
      else if(n[3].toString()==1&&prev_id == "start"){console.log("Right Only")}
      else if(n[4].toString()==1&&prev_id == "start"){console.log("Left Only")}
      else if(n[5].toString()==1&&prev_id == "start"){console.log("Backward Only")}
      else{console.log("Last One")}

    }
      
      if(previous_traffic_point!= "start"){
    con.query("SELECT * FROM tbl_traffic_points WHERE cordinate = ?",[previous_traffic_point], function (err, result) {
      if (err) throw err;
      var traf_details = JSON.parse(JSON.stringify(result));
      prev_id =(traf_details[0].id).toString();
      lights(prev_id)
    }) 
  }
  else{
    prev_id = "start"
    lights(prev_id)
  }

  //LCD SHOW
  console.log("Vehicle Number: "+(vehicle_details[0].vehicle_number).toString())
  console.log("Organization Name: "+(vehicle_details[0].ogranization_name).toString())
  
  var f = Math.sqrt((r-d)*(r-d))+((s-e)*(s-e));
  console.log(f);
  
  if(f<=0.0010208464000004793) /*For 150 meter */
  //if(d<=0.0007103806890015494) /*For 100 meter */
  {
    console.log("In Range");
    
    
    console.log("Seven Segment :  "+"0")
    //Update Index
    con.query(
      'UPDATE tbl_vehicle_details SET current_traffic_index = ? Where id = ?',[n[0].toString(), o],
      (err, result) => {
        if (err) throw err;
        
      }
    ); 
    //Update next buzzer & end of trip
    if(next_traffic_point == "last"){
    
      con.query(
        'UPDATE tbl_vehicle_details SET temp_traffic_points = "" Where id = ?',[o],
        (err, result) => {
          if (err) throw err;
          
        }
      );
  }
  else{
    console.log("next ttttt : "+next_traffic_point)
    con.query(
      'UPDATE tbl_traffic_points SET buzzer= 1 Where cordinate = ?',[next_traffic_point],
      (err, result) => {
        if (err) throw err;
        
      }
    );
  }


  for(var i = n[0].toString(); i>=0; i--){
    //Update own buzzer to 0
    console.log("hujuuj:    "+i)
    con.query(
      'UPDATE tbl_traffic_points SET buzzer = "0" Where cordinate = ?',[trafic_points[i]],
      (err, result) => {
        if (err) throw err;
        
      }
    );
    //Update temp_vehicle_list
    con.query(
      'UPDATE tbl_traffic_points SET temp_vehicle_list = "" Where cordinate = ?',[trafic_points[i]],
      (err, result) => {
        if (err) throw err;
        
      }
    );
  }
    
    //Insert Report

    con.query(
      'INSERT INTO report(traffic_point_id, vehicle_id) values(?,?)',[traffic_point_id,o],
      (err, result) => {
        if (err) throw err;
        
      }
    );
    

    
    

  }
  else{
  
    console.log("Not yet");
    var current_index = vehicle_details[0].current_traffic_index
    
    //SAVEN SIGMENT SHOW
    console.log("Seven Segment :  "+(n[0].toString()-current_index.toString()))

    var buzzer = traffic_id[0].buzzer;
    if(buzzer.toString()==1){
      console.log("Buzzer On")
    }
  }


  // con.query("SELECT * FROM tbl_traffic_points WHERE buzzer = 1", function (err, result) {
  //   if (err) throw err;
  //   var buzzer_at = JSON.parse(JSON.stringify(result));
    
  //   var current_position = trafic_points.indexOf((buzzer_at[0].cordinate).toString())
  //   console.log("hI vaiya :"+current_position)
  //   if (current_position!=""){

  //     console.log(now)
  //     console.log(current_position)
  //     seven_segment(n[0].toString()-current_position);
  //   }
    


  // })
  


})
}


    }
})
  })



  function seven_segment(traffic_passed){
    if(traffic_passed==0){
      console.log(traffic_passed);
      // led_on(1);
      // led_on(2);
      // led_on(3);
      // led_on(4);
      // led_on(5);
      // led_on(6);
      // led_off(7);
    }
    else if(traffic_passed==1){
      console.log(traffic_passed);
      // led_off(1);
      // led_on(2);
      // led_on(3);
      // led_off(4);
      // led_off(5);
      // led_off(6);
      // led_off(7);
    }
    else if(traffic_passed==2){
      console.log(traffic_passed);
      // led_on(1);
      // led_on(2);
      // led_off(3);
      // led_on(4);
      // led_on(5);
      // led_off(6);
      // led_on(7);
    }
    else if(traffic_passed==3){
      console.log(traffic_passed);
      // led_on(1);
      // led_on(2);
      // led_on(3);
      // led_on(4);
      // led_off(5);
      // led_off(6);
      // led_on(7);
    }
    else if(traffic_passed==4){
      console.log(traffic_passed);
      // led_off(1);
      // led_on(2);
      // led_on(3);
      // led_off(4);
      // led_off(5);
      // led_on(6);
      // led_on(7);
    }
    else if(traffic_passed==5){
      console.log(traffic_passed);
      // led_on(1);
      // led_off(2);
      // led_on(3);
      // led_on(4);
      // led_off(5);
      // led_on(6);
      // led_on(7);
    }
    else if(traffic_passed==6){
      console.log(traffic_passed);
      // led_on(1);
      // led_off(2);
      // led_on(3);
      // led_on(4);
      // led_on(5);
      // led_on(6);
      // led_on(7);
    }
    else if(traffic_passed==7){
      console.log(traffic_passed);
      // led_on(1);
      // led_on(2);
      // led_on(3);
      // led_off(4);
      // led_off(5);
      // led_off(6);
      // led_off(7);
    }
    else if(traffic_passed==8){
      console.log(traffic_passed);
      // led_on(1);
      // led_on(2);
      // led_on(3);
      // led_on(4);
      // led_on(5);
      // led_on(6);
      // led_on(7);
    }
    else if(traffic_passed==9){
      console.log(traffic_passed);
      // led_on(1);
      // led_on(2);
      // led_on(3);
      // led_on(4);
      // led_off(5);
      // led_on(6);
      // led_on(7);
    }
    else {
      console.log(traffic_passed);
      // led_off(1);
      // led_off(2);
      // led_off(3);
      // led_off(4);
      // led_off(5);
      // led_off(6);
      // led_off(7);
    }

  }

