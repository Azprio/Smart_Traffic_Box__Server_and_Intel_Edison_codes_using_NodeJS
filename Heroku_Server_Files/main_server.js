var mysql = require('mysql');
var mqtt = require('mqtt')


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
  client.subscribe('ridoy123')
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())

var a = message.toString();
  var b = a.split("|");
  var c = b.shift();
  console.log(c); 
  var d= b[0];

if(d != "Cancel"){  
  console.log(b.length);
  b.forEach(function(element) {
      
    
    if (b.indexOf(element)>0){
            //console.log(element);
            d +="|"+element;
    }

    

    var traffic_cordinate = element;

    con.query("SELECT * FROM tbl_traffic_points WHERE cordinate = ?",[traffic_cordinate], function (err, result) {
      if (err) throw err;
       var traffic_info = JSON.parse(JSON.stringify(result));
      var f = traffic_info[0].neighber_list;  
     // console.log(f);
        var g = f.split(",");
        if(b.indexOf(element)<b.length){

            if(b.indexOf(element)==b.length-1){
              var e = b.indexOf(element)+"-"+c+"-0-0-0-0";
              console.log(e);
          con.query(
            'UPDATE tbl_traffic_points SET temp_vehicle_list = ? Where cordinate = ?',[e, element],
            (err, result) => {
              if (err) throw err;
              
            }
          );
            }
            else{

              if(b.indexOf(element)==0){
                con.query(
                  'UPDATE tbl_vehicle_details SET current_traffic_index = "0" Where id = ?',[c],
                  (err, result) => {
                    if (err) throw err;
                    
                  }
                );
                //console.log("bazzer er bacca: "+element)
                con.query(
                  'UPDATE tbl_traffic_points SET buzzer= 1 Where cordinate = ?',[element],
                  (err, result) => {
                    if (err) throw err;
                    
                  }
                );
              }

        var h = b[b.indexOf(element)+1];
        con.query("SELECT * FROM tbl_traffic_points WHERE cordinate = ?",[h], function (err, result) {
          if (err) throw err;
          var traffic_id = JSON.parse(JSON.stringify(result)); 

          var m = traffic_id[0].id;
          //console.log(m);
          var e = b.indexOf(element)+"-"+c;
        g.forEach(function(element){

          //console.log(element);
          if(element == m){
                e = e+"-"+"1";
            }else{
              e = e+"-"+"0";
            }  

           
         });
         
         console.log(e);

         
        console.log(traffic_info[0].temp_vehicle_list);

        if(traffic_info[0].temp_vehicle_list!=""){
          
          con.query(
            'UPDATE tbl_traffic_points SET temp_vehicle_list = ? Where cordinate = ?',[e, element],
            (err, result) => {
              if (err) throw err;
              
            }
          );
        
        
          //   if(!(typeof e==="undefined")){
        //   var n = traffic_info[0].temp_vehicle_list;
        //   var e =e+"|"+ n.toString();

        //   con.query(
        //     'UPDATE tbl_traffic_points SET temp_vehicle_list = ? Where cordinate = ?',[e, element],
        //     (err, result) => {
        //       if (err) throw err;
              
        //     }
        //   );
        
        //   console.log("Added");
        //   console.log(e);
        // }




        }
        else{
          con.query(
            'UPDATE tbl_traffic_points SET temp_vehicle_list = ? Where cordinate = ?',[e, element],
            (err, result) => {
              if (err) throw err;
              
            }
          );
          console.log("Null");
          console.log(e);
           
        }
    

     




        });

      }

      }
        
         
     });



   
    

  });
  console.log(d);
  




  con.query(
    'UPDATE tbl_vehicle_details SET temp_traffic_points = ? Where id = ?',[d, c],
    (err, result) => {
      if (err) throw err;
    }
  );


// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM tbl_vehicle_details WHERE id = '1'", function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       var res = JSON.parse(JSON.stringify(result));
//       console.log(res[0].id);
//     });
//   });
}

else{
  console.log("Canceled ..........")

  con.query("SELECT * FROM tbl_vehicle_details WHERE id = ?",[c], function (err, result) {
    if (err) throw err;
    var vehicle_details = JSON.parse(JSON.stringify(result));
    trafic_points = vehicle_details[0].temp_traffic_points.split("|");

    trafic_points.forEach(function(element) {

      con.query(
        'UPDATE tbl_traffic_points SET buzzer = "0" Where cordinate = ?',[element],
        (err, result) => {
          if (err) throw err;
          
        }
      );


      con.query(
        'UPDATE tbl_traffic_points SET temp_vehicle_list = "" Where cordinate = ?',[element],
        (err, result) => {
          if (err) throw err;
          
        }
      );

    })


    // trafic_points.forEach(function(element) {

    //   con.query(
    //     'UPDATE tbl_traffic_points SET buzzer = "0" Where cordinate = ?',[element],
    //     (err, result) => {
    //       if (err) throw err;
          
    //     }
    //   );

    // })

  })

  con.query(
    'UPDATE tbl_vehicle_details SET temp_traffic_points = "" Where id = ?',[c],
    (err, result) => {
      if (err) throw err;
    }
  );


}
  //MQTT END
})
