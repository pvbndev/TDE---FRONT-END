var form = document.querySelector("#form-cad-prod");

function newProd(e) {
    e.preventDefault();

    var nomeProd = document.querySelector("#nomeProd").value;
    var descProd = document.querySelector("#descProd").value;
    var precoProd = document.querySelector("#precoProd").value;
    var descontoProd = document.querySelector("#descontProd").value;
    var categProdPrin = document.querySelector("#categProdPrin").value;
    var categProdSec = document.querySelector("#categProdSec").value;
    var imgInput = document.querySelector("#imgProd");
    
    if (imgInput.files.length > 0) {
        const reader = new FileReader();

        reader.onloadend = function() {

            const imgBase64 = reader.result;

            const newProduto = {
                "nome": nomeProd,
                "desc": descProd,
                "preco": precoProd,
                "desconto": descontoProd,
                "categoriaPrincipal": categProdPrin,
                "categoriaSecundario": categProdSec,
                "imagem": imgBase64
            };

            fetch("http://localhost:5000/produtos", {
                method: 'POST',
                body: JSON.stringify(newProduto),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                return response.text();
            }).then(function(text) {

            }).catch(function(error) {
                console.error(error);
            });
        };
        
    } else {
        console.error("Nenhuma imagem selecionada.");
    }
}

form.addEventListener('submit', newProd);
