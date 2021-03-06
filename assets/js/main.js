'use strict'

const openModel = () => document.getElementById('model').classList.add('active')

const closeModel = () => {
    clearFields()
    document.getElementById('model').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_product'))??[]
const setLocalStorage = (db_product) => localStorage.setItem('db_product', JSON.stringify(db_product))

const readproduct = () => getLocalStorage()

const createproduct = (product) => {
    const db_product = getLocalStorage()
    db_product.push(product)
    setLocalStorage(db_product)
}

const updateproduct = (index, product) => {
    const db_product = readproduct()
    db_product[index] = product
    setLocalStorage(db_product)
}


const deleteproduct = (index) => {
    const db_product = readproduct()
    db_product.splice(index, 1)
    setLocalStorage(db_product)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.model-field')
    fields.forEach(field => field.value = "")
}

const saveproduct = () => {
    if (isValidFields()) {
        const product = {
                name: document.getElementById('name').value,
                id: document.getElementById('id').value,
                etat: document.getElementById('etat').value,
                prix: document.getElementById('prix').value,
                peremtion: document.getElementById('peremtion').value,
                type: document.getElementById('type').value,
            }
            //console.log('The Cadastral student: ' + student)
        const index = document.getElementById('name').dataset.index
        if (index == 'new') {
            createproduct(product)
            listproduct()
            closeModel()
        } else {
            updateproduct(index, product)
            listproduct()
            closeModel()
        }
    }
}


const createRow = (product, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
				<td>${product.name}</td>
				<td>${product.id}</td>
				<td>${product.etat}</td>
				<td>${product.prix}</td>
				<td>${product.peremtion}</td>
				<td>${product.type}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Edit</button>
					<button type="button" class="button red" id="delete-${index}">Delete</button>
				</td>
			`
    document.querySelector('#tblproduct>tbody').appendChild(newRow)
}

const crearTable = () => {
    const rows = document.querySelectorAll('#tblproduct>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const listproduct = () => {
    const products = readproduct()
        // console.log(products)
    crearTable()
    products.forEach(createRow)
}

const fillFields = (product) => {
    document.getElementById('name').value = product.name
    document.getElementById('id').value = product.id
    document.getElementById('etat').value = product.etat
    document.getElementById('prix').value = product.prix
    document.getElementById('peremtion').value = product.peremtionday
    document.getElementById('type').value = product.type

    document.getElementById('name').dataset.index = product.index
}

const editproduct = (index) => {
    const product = readproduct()[index]
    product.index = index
    fillFields(product)
    openModel()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editproduct(index)
        } else {
            const product = readproduct()[index]
            const response = confirm(`Are you sure to delete the product ${product.name}`)
            if (response) {
                deleteproduct(index)
                listproduct()
            }
        }
    }
}

listproduct()

document.getElementById('idproduct').addEventListener('click', openModel)
document.getElementById('modelClose').addEventListener('click', closeModel)
document.getElementById('save').addEventListener('click', saveproduct)
document.getElementById('cancel').addEventListener('click', closeModel)
document.querySelector('#tblproduct>tbody').addEventListener('click', editDelete)