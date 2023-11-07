var radio = document.querySelector('.manual-btn')
var cont = 1 
const swiper = document.querySelector('.swiper').swiper;

//ABRINDO E FECHAnDO AS CATEGORIAS
var nav_categorias = document.getElementById("nav-categorias")
var categorias = document.getElementById("categorias")
var btn_categorias = document.getElementById("tds-categorias")

btn_categorias.addEventListener("mouseenter", function(){
    categorias.style.display = "flex"
    
})
nav_categorias.addEventListener("mouseleave", function(){
    categorias.style.display = "none"
})

categorias.addEventListener("mouseleave", function(){
    categorias.style.display = "none"
})

function addCart(id){
  fetch("http://localhost:5000/produtos",{
  method:"GET",
  headers:{
      'Content-type': 'application/json',
  },
  }).then((resp) => resp.json())
  .then((data) =>{

    addProdCart = (data.find((e)=> e.id == id))
    console.log(addProdCart);
    
  })

}


//Slider Configuração swiper.js
setTimeout(function () {

  const swiper = new Swiper('.swiper', {
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },

    speed:500,

    //Setando a Direção
    direction: 'horizontal',
    loop: true,
  
    // Setando a paginação
    pagination: {
      el: '.swiper-pagination',
    },

    //definindo as setinhas de navegação
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  }, 1000);


//pegando as ofertas do "banco"
fetch("http://localhost:5000/produtos",{
  method:"GET",
  headers:{
      'Content-type': 'application/json',
  },
})
.then((resp) => resp.json())
.then((data) =>{

  //filtrando apenas as com categoria "Ofertas"
  var produto = (data.find((e)=> e.categProdSec === "Ofertas"))
  var containerOfertas = document.querySelector("#container-ofertas");

  //map para que cada oferta seja imprimida no front
  var prodNomes = data.map(function(produto){


    //criando a div que vai comportar os produtos
    var produtos = document.createElement('div');
    produtos.className = "d-flex justify-content-center col-xl-3 col-md-4 pb-5"

    //colocando os elementos concatenados dentro da div
    produtos.innerHTML = `
    <div class="mp-item box-produtos img-thumbnail w-75">
        <img src="${produto.imagem}" alt="" class="img-thumbnail" id="img-produto">
        <p class="small m-0 text-uppercase">${produto.nome}</p>
        <span class="m-0">
            <div class = "d-flex gap-2">
              <p class="h3 m-0 fw-bold m-0">${'R$'+ produto.preco}</p>
              ${produto.desconto > 0 ? `<p class="h3 m-0 fw-bold m-0 small"><s>R$${(produto.preco + (produto.preco * (produto.desconto/100))).toString()}</s></p>` : '<p class="small text-success m-0">&nbsp</p>'}
            </div>
            ${produto.desconto > 0?'<p class="small text-success m-0">' + produto.desconto +'%OFF</p>': '<p class="small text-success m-0">&nbsp</p>'}
        </span>
        <span id="box-comprar">
          <button class="btn btn-success">Comprar</button>
          <button class="btn btn-primary" onclick="addCart(${produto.id})">
              <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </span>
    </div>
    `;

    //colocando a div filha dentro da div pai que foi pega anteriormente  
    containerOfertas.appendChild(produtos);

  })

  


})
.catch((err)=> console.log(err))
  


