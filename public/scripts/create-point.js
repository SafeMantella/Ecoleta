function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then(states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)//se mudar algo no seletor de estado, alerta

//itens de coleta
//pega todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const colectedItems = document.querySelector("input[name=items]")
let selectedItems = []//variável

function handleSelectedItem(event){
    const itemLi = event.target
    itemLi.classList.toggle("selected")//muda cor caso item seja selecionado

    const itemId = itemLi.dataset.id

    //verificar se ha itens selecionados, caso positivo, pegue-os
    const alreadySelected = selectedItems.findIndex( item => {
        return item == itemId
    })

    //se ja foi selecionado, tira da seleção
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            return item != itemId
        })

        selectedItems = filteredItems
    }else{
        //se nao foi selecionado, adiciona na seleção
        selectedItems.push(itemId)
    }

    //atualiza campo hidden com os itens selecionados
    colectedItems.value = selectedItems
}