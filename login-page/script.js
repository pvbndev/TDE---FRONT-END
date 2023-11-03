let teste

function redirect(link){
    window.location.href = link
}

function validacao(){

    const email = document.querySelector("#input_email").value
    const senha = document.querySelector("#senha").value

    fetch("http://localhost:5000/users",{
        method:"GET",
        headers:{
            'Content-type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then((data) =>{
        
        if(!!data.find((e) => e.email === email && e.password === senha)){
            redirect("/index.html")
        }else{
            document.querySelector("#erroLogin").style.display = "flex"
        }
    })
    .catch((err)=> console.log(err))

    
}

function criar(){
    const cc_email = document.querySelector("#cc_email").value
    const cc_senha = document.querySelector("#cc_senha").value

    const newUser = {
        "email": cc_email,
        "password": cc_senha
    };
    
    fetch("http://localhost:5000/users", {
        method: 'post',
        body: JSON.stringify(newUser),
        headers:{
            'Content-Typ': 'application/json'
        }

    }).then(function(response){
        return response.text()
    }).then(function(text){

    }).catch(function(error){
        console.error(error)
    })


}




