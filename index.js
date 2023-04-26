const fs = require('fs')
const { json } = require('stream/consumers')
const { CLIENT_RENEG_LIMIT } = require('tls')

let productos = []
let resultado

// Confirmo si ya existe el archivo JSON
let existeFile = false
if (fs.existsSync("./objetos.json")){
    existeFile = true
}

// // Función para crear por primera vez el archivo JSON, con su primer objeto dentro
// const crearFileObjetos = async(param) => {
//     await fs.promises.writeFile('./objetos.json', param)
// }

// // Función para agregar un objeto al archivo JSON ya existente
// const updateFileObjetos = async(param) => {
//     await fs.promises.appendFile('./objetos.json', param)
// }

// // Función para leer el archivo JSON ya existente y mostrar los resultados por consola
// const leerFileObjetos = () => {
//    let resultado = fs.promises.readFileSync('./objetos.json', 'UTF-8')
//    productos = JSON.parse(resultado)
//    console.log("El listado de productos es:")
//    console.log(productos)
// }

// // Función combinada: Chequea si el JSON existe. Si existe, agrega el objeto. Si no, lo crea con el objeto.
// function addProductFileObjetos (producto) {
//     if (existeFile = false) {
//         crearFileObjetos(JSON.stringify(producto,null,2))
        
//     } else {
//         updateFileObjetos(JSON.stringify(producto,null,2))
//         updateFileObjetos("\n")
//     }
// }



class ProductManager {
    constructor (){
        if (existeFile) {
            resultado = JSON.parse(fs.readFileSync('./objetos.json', 'UTF-8')) 
            productos = resultado 
        } else {
            productos = []
        }

    }

    getProducts() {
        if (existeFile) {
            resultado =  JSON.parse(fs.readFileSync('./objetos.json', 'UTF-8'))
            productos = resultado
        }
        console.log("El listado de productos es:")
        console.log(productos)
    }
    

    async addProduct( title, description, price, thumbnail, code, stock ) {
        
        if (stock != undefined) {

            let filtrado = productos.filter(function(el) {
                return el.code === code;
            })

            if (filtrado.length == 0) {
                let next_id = productos[productos.length-1].id+1
                let productoParaAgregar ={
                    id: next_id,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
                productos.push(productoParaAgregar)
                let data_json = JSON.stringify(productos,null,2)
                await fs.promises.writeFile('./objetos.json', data_json)
                existeFile = true
            } else {
            console.log("Error: Ya existe un producto con el mismo Código")
            }

        } else {
            console.log("Error: Faltan especificar algunos campos. Debe ingresar los parámetros Título, Descripción, Precio, Imagen, Código y Stock")
        }
    }

    getProductsById(id) {
        let filtrado = productos.filter(function(el) {
            return el.id === id;
        })
        if (filtrado.length > 0) {
            console.log(filtrado)
        } else {
            console.log("Not found")
        }
    }


    async updateProduct(id, data) {
        let indice = productos.findIndex(producto => producto.id === id)
        let productoParaModificar = productos[indice]

        for (let prop in data) {     
            productoParaModificar[prop] = data[prop]
        }

        productos[indice] = productoParaModificar
        let data_json = JSON.stringify(productos,null,2)
        await fs.promises.writeFile('./objetos.json', data_json)

    }


    async deleteProduct(id) {
        productos = productos.filter(el => el.id!==id)
        let data_json = JSON.stringify(productos,null,2)
        await fs.promises.writeFile('./objetos.json', data_json)
    }
}

//

async function manager() {
    let instancia = new ProductManager();
    instancia.updateProduct(55, {
        price: 110
      })
    // await instancia.addProduct("Manaos", "Envase retornable 1l", 60, "Sin imagen", "zzz", 25)
    // await instancia.deleteProduct(1)
}

manager()

/*

console.log("*** Se creará una instancia de la clase “ProductManager”")
let instancia = new ProductManager();
console.log(" ")

console.log("*** Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []")
instancia.getProducts()
console.log(" ")

console.log("*** Se llamará al método “addProduct” con los campos: title: “producto prueba” description:”Este es un producto prueba” price:200, thumbnail:”Sin imagen” code:”abc123”, stock:25")
instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log("El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE")
console.log(" ")

console.log("*** Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado")
instancia.getProducts()
console.log(" ")

console.log("*** Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.")
instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log(" ")

console.log("*** Se evaluará que getProductById devuelva error si no encuentra el producto")
instancia.getProductsById(50)
console.log(" ")

console.log("*** Se evaluará que getProductById devuelva el producto en caso de encontrarlo")
instancia.getProductsById(0)
console.log(" ")

*/



