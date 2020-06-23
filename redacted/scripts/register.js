// for sign up stuff... 
$(document).ready(function(){
    $("#register").click(function(e){
      e.preventDefault()
      console.log("registering...")
        let validateUsername = $("#username_signup").val();
        let validatePassword = $("#password_signup").val();
        if (!validateUsername && !validatePassword){
          $("#alertMsg").text(`Error! Please ensure that the username and password field is not empty`);
          return;
        }
        $.get(`https://vcxtension.herokuapp.com/register/check/${validateUsername}`, 
          function(data, status){
            if (status){
              if (String(data[0]) === "checkUserCleared" && String(data[1].type) === "pass"){
                $.post("https://vcxtension.herokuapp.com/register",
                  {
                    username: validateUsername,
                    password: validatePassword,
                    paidStatus: true
                  },
                  function(signUpdata, signUpstatus){
                    if (signUpstatus){
                      if (String(signUpdata[0]) === "signUpCleared" && String(signUpdata[1].type) === "pass"){
                        localStorage.setItem('VCXuserToken', String(signUpdata[1].payload.userToken));
                        localStorage.setItem('VCXusername', String(validateUsername));
                        localStorage.setItem('VCXpassword', String(validatePassword));
                        window.location.href = "account.html"
                      } else {
                        $("#alertMsg").text(`Error! ${String(signUpdata[1].errorMessage)}`);
                      }
                    } else {
                      $("#alertMsg").text(`Error! Something went wrong! Try again. `);
                    }
                  }
                );
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
