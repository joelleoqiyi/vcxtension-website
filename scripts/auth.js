// for login and signout stuff... 
$(document).ready(function(){
    $("#signIn").click(function(e){
      e.preventDefault()
      console.log("signing in...")
        let validateUsername = $("#username").val();
        let validatePassword = $("#password").val();
        if (!validateUsername && !validatePassword){
          $("#alertMsg").text(`Error! Please ensure that the username and password field is not empty`);
          return;
        }
        $.post("https://vcxtension.herokuapp.com/auth/signin",
          {
            username: validateUsername,
            password: validatePassword
          },
          function(data, status){
            if (status){
              if (String(data[0]) === "authProSigninCleared" && String(data[1].type) === "pass"){
                console.log(data[1]);
                if (window.localStorage) {
                  localStorage.setItem('VCXuserToken', String(data[1].payload.userToken));
                  localStorage.setItem('VCXusername', String(validateUsername));
                  localStorage.setItem('VCXpassword', String(validatePassword));
                  window.location.href = "account.html"
                } else {
                  $("#alertMsg").text(`Error! You browser doesn't support cookies? yum yum!`);
                }
              } else {
                $("#alertMsg").text(`Error! ${String(data[1].errorMessage)}`);
              }
            } else {
              $("#alertMsg").text(`Error! Something went wrong! Try again. `);
            }
          }
        );
    });

    $("#signOut").click(function(e){
      e.preventDefault()
      console.log("signing out...")
        let validateUserToken = localStorage.getItem('VCXuserToken');
        let validateUsername = localStorage.getItem('VCXusername')
        let validatePassword = localStorage.getItem('VCXpassword')
        $.post("https://vcxtension.herokuapp.com/auth/logout",
          {
            username: validateUsername,
            password: validatePassword,
            userToken: validateUserToken

          },
          function(data, status){
            if (status){
              if (String(data[0]) === "authProLogoutCleared" && String(data[1].type) === "pass"){
                if (window.localStorage) {
                  localStorage.removeItem('VCXuserToken');
                  localStorage.removeItem('VCXusername');
                  localStorage.removeItem('VCXpassword');
                  window.location.href = "../index.html"
                } else {
                  $("#alertMsg").text(`Error! Your browser doesn't support cookies? hmm...`);
                }
              } else {
                $("#alertMsg").text(`Error! ${String(data[1].errorMessage)}`);
              }
            } else {
              $("#alertMsg").text(`Error! Something went wrong! Please try again!`);
            }
          }
        );
    });
});
