// for retrieving of data after user logs in 
$(document).ready(function(){
  let validateUserToken = localStorage.getItem('VCXuserToken') || null;
  let validateUsername = localStorage.getItem('VCXusername') || null;
  let validatePassword = localStorage.getItem('VCXpassword') || null;
  if (!validateUserToken && !validateUsername && !validatePassword) {
    window.location.href = "../index.html"
  }
    $.post("https://vcxtension.herokuapp.com/data",
      {
        username: validateUsername,
        password: validatePassword,
        userToken: validateUserToken
      },
      function(data, status){
        if (status){
          if (String(data[0]) === "dataProCleared" && String(data[1].type) === "pass"){
            let rooms = data[1].payload.rooms || [];
            console.log(rooms)
              for (room of rooms){
                console.log("displaying result...")
                  let roomname = room.name;
                  let roomToken = room.roomToken;
                  console.log(roomname);
                  console.log(roomToken);
                  var newRow = document.createElement("tr");
                  var name = document.createElement("td");
                  var token = document.createElement("td");
                  name.innerText = roomname;
                  token.innerText = roomToken;
                  newRow.appendChild(name);
                  newRow.appendChild(token);
                  document.getElementById("PROtable").appendChild(newRow);
              }
            
            //display output...
          } else if (String(data[0]) === "dataProFailed" && String(data[1].type) === "userValidationFailed"){
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
