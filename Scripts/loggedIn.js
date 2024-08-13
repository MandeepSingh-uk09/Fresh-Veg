const loginState= JSON.parse(localStorage.getItem("loginState"))
if(loginState===true){
    location.replace("Main.html");
}