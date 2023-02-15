const express = require('express')
const fs = require('fs')
const { json } = require('stream/consumers')
const bodyParser = require('body-parser')

let productos = []
let resultado

// Función para leer el archivo JSON ya existente y mostrar los resultados por consola
const leerFileObjetos = async() => {
   let resultado = await fs.promises.readFile('../objetos.json', 'utf-8')
   productos = JSON.parse(resultado)
}
leerFileObjetos()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/api/products', (req, res) => {
    let limit = req.query.limit
    if (req.query.limit != undefined) {
        let limiteProductos = productos.slice(0,req.query.limit)
        res.send(limiteProductos)
    } else {
        res.send(productos)
    }
})




app.delete('/api/products/:pid', (req, res) => {
    let idProducto = req.params.pid
    let index = productos.findIndex(x => x.id == idProducto);


    if (index != -1) {       
        console.log(index)

        let eliminado = productos.splice(index, 1)

        fs.writeFileSync('../objetos.json', JSON.stringify(productos))
        res.json(productos)
        
    } else {
        res.send("No existe el producto")
    } 
})


app.get('/api/products/:pid', (req, res) => {
    let idProducto = req.params.pid
    let productoFiltrado = productos.find(u=> u.id == idProducto)
    if (productoFiltrado) {
        res.send(productoFiltrado)
    } else {
        res.send("El objeto no existe")
    }
})


app.put('/api/products/:pid', (req, res) => {
    let idProducto = req.params.pid
    let index = productos.findIndex(x => x.id == idProducto);

    if (index != -1) {
        let productoParaAgregar = req.body
        productoParaAgregar.id = idProducto
       
        if(productoParaAgregar.status == undefined) {
            productoParaAgregar.status = true
        }
         
        if ((productoParaAgregar.title) && (productoParaAgregar.description) && (productoParaAgregar.code) && (productoParaAgregar.price) && (productoParaAgregar.stock) && (productoParaAgregar.category)) {
            productos[index] = productoParaAgregar
            fs.writeFileSync('../objetos.json', JSON.stringify(productos))
            res.json(productoParaAgregar)
        } else {
            res.send("Faltan parámetros")
        } 
    } else {
        res.send("No existe el producto")
    } 
})


app.post('/api/products/', (req, res) => {
    let productoParaAgregar = req.body
    
    if(productoParaAgregar.status == undefined) {
        productoParaAgregar.status = true
    }
    
    let valueId = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
    productoParaAgregar.id = valueId
   
    if ((productoParaAgregar.title) && (productoParaAgregar.description) && (productoParaAgregar.code) && (productoParaAgregar.price) && (productoParaAgregar.code) && (productoParaAgregar.stock) && (productoParaAgregar.category)) {
        productos.push(productoParaAgregar)
        fs.writeFileSync('../objetos.json', JSON.stringify(productos))
        res.json(productoParaAgregar)
    } else {
        res.send("Faltan parámetros")
    }

})


app.listen(8080, () => console.log("Servidor escuchando 8080"))




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

