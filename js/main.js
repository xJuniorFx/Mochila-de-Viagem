const form = document.getElementById("novo-item")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []


itens.forEach((elemento) => {
    criaItem(elemento)
})

form.addEventListener("submit", (evento)=>{
    evento.preventDefault()

    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe){

        itemAtual.id = existe.id

        atualizaElemeto(itemAtual)

        // buscando se há elemento repetido
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0

        criaItem(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaItem (item){
    
    // criando li
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")
    
    // criando tag strong
    const quantidadeItem = document.createElement("strong")
    quantidadeItem.innerHTML = item.quantidade
    quantidadeItem.dataset.id = item.id
    
    // colocando a tag, nome dentro da li    
    novoItem.appendChild(quantidadeItem)
    novoItem.innerHTML += item.nome

    //adicionando botaoDeleta
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

}

function atualizaElemeto (item){
    document.querySelector("[data-id= '"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta (id){
    const botao = document.createElement("button")
    botao.innerText = "X"

    botao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return botao
}

function deletaElemento(elemento, id){
    elemento.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}