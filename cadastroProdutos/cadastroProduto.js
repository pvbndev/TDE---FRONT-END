var form = document.querySelector("#form-cad-prod");

function newProd(event) {
    event.preventDefault();

    var nomeProd = document.querySelector("#nomeProd").value;
    var precoProd = document.querySelector("#precoProd").value;
    var descontoProd = document.querySelector("#descontProd").value;
    var categProdPrin = document.querySelector("#categProdPrin").value;
    var categProdSec = document.querySelector("#categProdSec").value;
    var imgInput = document.querySelector("#imgProd").files[0]; // Obtém o arquivo de imagem

    var reader = new FileReader();

    reader.onloadend = function() {
        const newProduto = {
            "nome": nomeProd,
            "preco": precoProd,
            "desconto": descontoProd,
            "categoriaPrincipal": categProdPrin,
            "categoriaSecundario": categProdSec,
            "imagem": reader.result
        };

        fetch("http://localhost:5000/produtos", {
            method: 'post',
            body: JSON.stringify(newProduto),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Erro ao enviar o formulário');
        }).then(function(text) {
            console.log(text); // Faça algo com a resposta do servidor, se necessário
        }).catch(function(error) {
            console.error(error);
        });
    };

    if (imgInput) {
        reader.readAsDataURL(imgInput); // Lê o arquivo de imagem como base64
    }
}

form.addEventListener('submit', newProd);
