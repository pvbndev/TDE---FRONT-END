const firebaseConfig = {
  apiKey: "AIzaSyA7U7Y0xgfvvPQzaoqoUb11FNuGaTL0h70",
  authDomain: "toystore-839ce.firebaseapp.com",
  projectId: "toystore-839ce",
  storageBucket: "toystore-839ce.appspot.com",
  messagingSenderId: "522623887772",
  appId: "1:522623887772:web:1a4babe5c47f7948bf0059"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

var criar_Login = document.querySelector("#box-cad-log")
var formLogin = document.querySelector("#form-login")

function alerta(msg){
    var alert = document.querySelector("#alerta")
    alert.style.display = "block"
    alert.innerHTML = msg
  
    setTimeout(function(){
      alert.style.display = "none"
    }, 3000)
  }


function redirect(link){
    window.location.href = link
}

function validacao(event){
    event.preventDefault();

    var user = document.querySelector("#input_User").value
    var senha = document.querySelector("#input_Senha").value

    user = user.toLowerCase()
    senha = senha.toLowerCase()

    db.collection("Users").get().then((snapshot) => {
    const users = snapshot.docs.map(doc => doc.data());
        atualUser = users.find((e)=> e.user === user && e.password === senha)
        if(!!atualUser){
            const userId = snapshot.docs.find(doc => doc.data().user === user && doc.data().password === senha).id
            console.log(userId);
            sessionStorage.setItem("login", true)
            sessionStorage.setItem("id", userId)
            redirect("/index.html")
        }else{
            document.querySelector("#erroLogin").style.display = "flex"
        }
});




    /* fetch("http://localhost:5000/users",{
        method:"GET",
        headers:{
            'Content-type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then((data) =>{

        var atualUser = data.find((e) => e.user === user && e.password === senha)
        if(!!data.find((e) => e.user === user && e.password === senha)){
            sessionStorage.setItem("login", true)
            sessionStorage.setItem("id", atualUser.id)
            console.log("Login Concluido com sucesso")
            redirect("/index.html")
        }else{
            document.querySelector("#erroLogin").style.display = "flex"
        }
    })
    .catch((err)=> console.log(err)) */

    
}
formLogin.addEventListener('submit', validacao)




