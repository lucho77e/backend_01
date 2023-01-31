const fs = require('fs')
const { json } = require('stream/consumers')

let productos = []
let resultado

// Confirmo si ya existe el archivo JSON
let existeFile = false
if (fs.existsSync("./objetos.json")){
    existeFile = true
}

// Función para crear por primera vez el archivo JSON, con su primer objeto dentro
const crearFileObjetos = async(param) => {
    await fs.promises.writeFile('./objetos.json', param)
}

// Función para agregar un objeto al archivo JSON ya existente
const updateFileObjetos = async(param) => {
    await fs.promises.appendFile('./objetos.json', param)
}

// Función para leer el archivo JSON ya existente y mostrar los resultados por consola
const leerFileObjetos = async() => {
   let resultado = await fs.promises.readFile('./objetos.json', 'utf-8')
   productos = JSON.parse(resultado)
   console.log("El listado de productos es:")
   console.log(productos)
}

// Función combinada: Chequea si el JSON existe. Si existe, agrega el objeto. Si no, lo crea con el objeto.
function addProductFileObjetos (producto) {
    if (existeFile = false) {
        crearFileObjetos(JSON.stringify(producto))
        
    } else {
        updateFileObjetos(JSON.stringify(producto))
        updateFileObjetos("\n")
    }
}



class ProductManager {
    constructor (productsColection){
        if (existeFile) {
            resultado = fs.readFileSync('./objetos.json', 'utf-8')
            productos.push(JSON.parse(resultado)) 
        } else {
            productos = []
        }
        // this.products = productos
        console.log("Nuevo objeto creado")
    }

    getProducts() {
        if (existeFile) {
            resultado = fs.readFileSync('./objetos.json', 'utf-8')
            productos = JSON.parse(resultado)
        }
        console.log("El listado de productos es:")
        console.log(productos)
    }
    

    addProduct(title, description, price, thumbnail, code, stock) {
        
        if (stock != undefined) {

            let filtrado = productos.filter(function(el) {
                return el.code === code;
            })

            if (filtrado.length == 0) {
                let productoParaAgregar =[{
                    id: productos.length,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }]
                if (existeFile) {
                    fs.appendFileSync('./objetos.json', '\n'+JSON.stringify(productoParaAgregar))
                } else {
                    fs.writeFileSync('./objetos.json', JSON.stringify(productoParaAgregar))
                    existeFile = true
                }


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
}

//


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


