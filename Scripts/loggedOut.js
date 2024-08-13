const loginState= JSON.parse(localStorage.getItem("loginState"))
if(loginState===false){
    location.replace("index.html");
}