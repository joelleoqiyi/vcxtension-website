//for creating of rooms nonPRO..
$(document).ready(function(){
    $("#createFree").click(function(){
        let validateRoomName = $("#roomfreename").val();
        let validateTranscript = $("#transcript-free").val();
        console.log(validateRoomName)
        if (!validateRoomName){
          $("#alertMsg").text(`Error! Please ensure that the Room Name field is not empty`);
          return;
        }
        $.post("https://vcxtension.herokuapp.com/create",
          {
            roomName: validateRoomName,
            transcript: validateTranscript
          },
          function(data, status){
            if (status){
              if (String(data[0]) === "createRoomCleared" && String(data[1].type) === "pass"){
                let roomKey = data[1].payload.roomToken;
                let roomName = data[1].payload.roomName;
                let speakerToken = data[1].payload.speakerToken;
                //display output... 
                var rmkey = document.getElementById("rmkey").innerHTML = ("Your Room Key is: " + roomKey);
                var speaker = document.getElementById("rmspeaker").innerHTML = ("Your Speaker Token is: " + speakerToken);
                document.append(rmkey);
                document.append(speaker);
                console.log(roomKey)
                console.log(speakerToken)
              } else {
                $("#alertMsg").text(`Error! ${String(data[1].errorMessage)}`);
              }
            } else {
              $("#alertMsg").text(`Error! Something went wrong! Try again. `);
            }
          }
        );
    });
});
