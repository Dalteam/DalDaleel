function validate(){
    var password = document.getElementById("password").value;

    if(password == 1234){
        open("index.html");
    }
    else{
        alert("كلمة السر خاطئة");
    }
}