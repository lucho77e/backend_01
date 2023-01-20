class ProductManager {
    constructor (productsColection){
        this.products = []
        console.log("Nuevo objeto creado")
    }

    getProducts(){
        console.log(this.products)
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        
        if (stock != undefined) {
            let productos = this.products
            
            let filtrado = productos.filter(function(el) {
                return el.code === code;
            })

            if (filtrado.length == 0) {
                this.products.push ({
                    id: productos.length,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                })
            } else {
            console.log("Error: Ya existe un producto con el mismo Código")
            }

        } else {
            console.log("Error: Faltan especificar algunos campos. Debe ingresar los parámetros Título, Descripción, Precio, Imagen, Código y Stock")
        }
    }

    getProductsById(id) {
        let productos = this.products
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