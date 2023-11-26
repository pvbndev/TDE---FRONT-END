var container = document.querySelector("#box-items-cart")
var produtos = document.querySelector("#prods")
produtos.style.display = "none"

function alerta(msg){
  var alert = document.querySelector("#alerta")
  alert.style.display = "block"
  alert.innerHTML = msg

  setTimeout(function(){
    alert.style.display = "none"
  }, 3000)
}

async function deleteJson(id){
  fetch(`https://toy-store-json.vercel.app/carrinho/${id}`,{
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)})
  .catch((error) => {
    console.error('Error:', error);
  });
}

async function atualizarJson(taskId, Task){

  const url = `https://toy-store-json.vercel.app/carrinho/${taskId}`
  const options = {
      method: 'PATCH',
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
  window.location.reload()
}

function modQte(id, pm){
    
  fetch('https://toy-store-json.vercel.app/carrinho')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    modProd = data.find((e)=> e.produtoId == id)
    console.log(modProd.id)

    if (modProd.qteProd > 1 || pm == +1){
      modProd.qteProd += pm
      atualizarJson(modProd.id, modProd)
    }

    
  })
}


function imprimirInfosCart() {

  produtos.innerHTML = " "

  fetch('https://toy-store-json.vercel.app/carrinho')
    .then(response => response.json())
    .then(data => {
      var atualUser = sessionStorage.getItem("id");
      console.log(atualUser);
      var produtosUser = data.filter((e) => e.userId == atualUser);
      console.log(produtosUser);

      fetch('https://toy-store-json.vercel.app/produtos')
        .then(response => response.json())
        .then(dataProds => {
          console.log(dataProds);

          const produtosUserIds = produtosUser.map(userProd => userProd.produtoId);
          console.log(produtosUserIds);

          const produtosDoUsuario = dataProds.filter(prod => produtosUserIds.includes(prod.id));
          console.log(produtosDoUsuario);

          // Vincular a quantidade correta aos produtos correspondentes
          const produtosComQte = produtosDoUsuario.map(produto => {
            const produtoUserCorrespondente = produtosUser.find(userProd => userProd.produtoId === produto.id);
            return { ...produto, qteProd: produtoUserCorrespondente.qteProd };
          });

          // Agora produtosComQte contém os produtos do usuário com suas quantidades correspondentes
          console.log(produtosComQte);

          produtosComQte.map((prods) => {

            console.log(produtosUser.find(e=> e.produtoId == prods.produtosUser));
            
            produtos.className = "bg-secondary-subtle prod-cart d-flex align-items-center px-3";
            produtos.innerHTML += `
              <img src="${prods.imagem}">
              <p class="col-3 m-0">${prods.nome}</p>
              <p class="m-0 col-2 text-center">R$${prods.preco}</p>
              <p class="m-0 col-2 text-center">
                <button onclick="modQte(${prods.id}, -1)" class="btn btn-danger btnPM">-</button>
                ${prods.qteProd}
                <button onclick="modQte(${prods.id}, 1)" class="btn btn-primary btnPM">+</button>
              </p>
              <p class="m-0 col-2 text-center">${prods.qteProd * prods.preco}</p>
              <button onclick="deleteJson(${prods.id})" id="btn-lixo" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
            `
            container.appendChild(produtos);
          });

          
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

imprimirInfosCart()

