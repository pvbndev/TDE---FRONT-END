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

const userCollection = db.collection('Users')
var formCC = document.querySelector("#form-cc")

function redirect(link){
    window.location.href = link
}

function alerta(msg){
    var alert = document.querySelector("#alerta")
    alert.style.display = "block"
    alert.innerHTML = msg
  
    setTimeout(function(){
      alert.style.display = "none"
    }, 3000)
  }

function criar(event){

    event.preventDefault()


    var cc_user = document.querySelector("#cc_user").value
    var cc_email = document.querySelector("#cc_email").value
    var cc_senha = document.querySelector("#cc_senha").value

    cc_user = cc_user.toLowerCase()
    cc_email = cc_email.toLowerCase()
    cc_senha = cc_senha.toLowerCase()



    if (cc_email === "" || cc_senha === "" || cc_user === ""){
        document.querySelector("#erroCriar").style.display = "flex"
    }else{

    const userData = {
      user: cc_user,
      email: cc_email,
      password: cc_senha
    }

    userCollection.add(userData).then((docRef) => {
    console.log("Documento adicionado com ID:", docRef.id)
        redirect("/login-page/index.html")
    }).catch((error) => {
    console.error("Erro ao adicionar documento:", error)
    alerta("Erro ao criar usuário: " + error.message)
    })
    
    }

}

formCC.addEventListener('submit', criar)
