let teste
let obj_login = ''

var criar_Login = document.querySelector("#box-cad-log")
var formCC = document.querySelector("#form-cc")
var formLogin = document.querySelector("#form-login")

function redirect(link){
    window.location.href = link
}

async function atualizarJson(taskId, Task){
    const url = `http://localhost:5000/users/${taskId}`
    const options = {
        method: 'PUT',
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify(Task)
    }

    const response = await fetch(url, options)
    if (response.ok){
        console.log ("Tarefa Atualizada!!!")
    }else{
        console.log("falha")
    }
}


function validacao(){

    var user = document.querySelector("#input_User").value
    var senha = document.querySelector("#input_Senha").value

    user = user.toLowerCase()
    senha = senha.toLowerCase()

    fetch("http://localhost:5000/users",{
        method:"GET",
        headers:{
            'Content-type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then((data) =>{
        
        if(!!data.find((e) => e.user === user && e.password === senha)){
            console.log("Login Concluido com sucesso")
        }else{
            document.querySelector("#erroLogin").style.display = "flex"
        }
    })
    .catch((err)=> console.log(err))

    
}

function criar(){
    var cc_user = document.querySelector("#cc_user").value
    var cc_email = document.querySelector("#cc_email").value
    var cc_senha = document.querySelector("#cc_senha").value

    cc_user = cc_user.toLowerCase()
    cc_email = cc_email.toLowerCase()
    cc_senha = cc_senha.toLowerCase()



    if (cc_email === "" || cc_senha === "" || cc_user === ""){
        document.querySelector("#erroCriar").style.display = "flex"
    }else{
        const newUser = {
            "user": cc_user,
            "email": cc_email,
            "password": cc_senha
        };
        
        fetch("http://localhost:5000/users", {
            method: 'post',
            body: JSON.stringify(newUser),
            headers:{
                'Content-Type': 'application/json'
            }
    
        }).then(function(response){
            return response.text()
        }).then(function(text){
            redirect("/login-page/index.html")
        }).catch(function(error){
            console.error(error)
        })
    }

}

formCC.addEventListener('submit', criar)
formLogin.addEventListener('submit', validacao)




