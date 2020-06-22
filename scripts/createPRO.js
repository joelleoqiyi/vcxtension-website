//for creating of rooms nonPRO..
$(document).ready(function(){
    let validateUserToken = localStorage.getItem('VCXuserToken');
    if (!validateUserToken) {
      window.location.href = "../index.html"
    }
    $("#createPRORoom").click(function(e){
      e.preventDefault()
        let validateRoomName = $("#roomdename").val();
        let validateTranscript = $("#transcript").val() || ""; 
        if (!validateRoomName){
          $("#alertMsg").text(`Error! Please ensure that the Room Name field is not empty`);
          return;
        }
        $.post("https://vcxtension.herokuapp.com/create",
          {
            userToken: validateUserToken,
            proStatus: true,
            roomName: validateRoomName,
            transcript: validateTranscript
          },
          function(data, status){
            if (status){
              if (String(data[0]) === "createRoomCleared" && String(data[1].type) === "pass"){
                console.log("room creation success")
                let roomToken = data[1].payload.roomToken;
                let roomName = data[1].payload.roomName;
                let speakerToken = data[1].payload.speakerToken;
                //display output... 
                // var speaker = document.getElementById("speaker").innerHTML = ("Your Speaker Token is: " + speakerToken);
                document.getElementById("speaker").innerHTML = "Speaker Token: " + speakerToken;
                // var rmToken = document.getElementById("rToken").innerHTML = ("Your Room Token is: " + roomToken);
                document.getElementById("rToken").innerHTML = "Room Token: " + roomToken;

              } else if (String(data[0]) === "createRoomFailed" && String(data[1].type) === "userTokenValidationFailed"){
                window.location.href = "../index.html"
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
