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


setTimeout(function () {
    new Swiper('.swiper-container', {
      // suas opções aqui
    });
  }, 1000);
  

swiper = new Swiper('.swiper', {
    //Setando a Direção
    direction: 'horizontal',
    loop: true,
  
    // Setando a paginação
    pagination: {
      el: '.swiper-pagination',
    },

    //fazendo com que o role com o scroll do mouse
    mousewheel: {
        invert: true,
    },
  
    //definindo as setinhas de navegação
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });