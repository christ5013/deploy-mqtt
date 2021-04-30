
  var client;
  
  $('#brokerAddress').on('click', function(){
    var address = 'wss://mqtt.eclipseprojects.io:443/mqtt';
     client = mqtt.connect(address);
      $('#addressInput').val(address);
      $('#status').val("connecting...").css('color','black');

      // connect client
      client.on('connect', function () {
        $('#status').val("successfully Connected").css('color','blue');
      })

      client.on('message', function (publish_topic_input, publishPayload) {
        var time = new Date();
        if (publish_topic_input == $('#subscribeTopic').val()) {
          $('#messageTable').append(`<tr><td>${publish_topic_input}</td><td>${publishPayload}</td><td>${time.toDateString()+" "+ time.toLocaleTimeString()}</td></tr>`);
        }
      })

      $('#subscribeBtn').on('click', function(){
        
          var subscribe_input = $('#subscribeTopic').val();
          var time = new Date();
          if (subscribe_input != "") {
            client.subscribe(subscribe_input, function (error) {
              $('#subscribeTable').append(`<tr><td>${subscribe_input}</td><td>${time.toDateString()+" "+ time.toLocaleDateString()}</td></tr>`);
              if (error) {
                console.log("Error!");
              }
            });
          
          
          }else{
            alert("Please input a subscribe topic!");
          }
          
      }) 


      $('#publishBtn').on('click', function(){
          var publish_topic_input = $('#publishTopic').val();
          var publishPayload = $('#publishPayload').val();
          var time = new Date();
          
          if (publish_topic_input != "" && publish_topic_input != "") {
            client.publish(publish_topic_input, publishPayload);
            $('#publishTable').append(`<tr><td>${publish_topic_input}</td><td>${publishPayload}</td><td>${time.toDateString()+ " " + time.toLocaleTimeString() }</td></tr>`);
            $('#publishPayload').val('');
          } else {
            alert("Please input topic and Payload");
          }
        
      }) 
      
      $('#unsubscribe').on('click', function(){
        client.subscribe('');
      })

  })

    
   
