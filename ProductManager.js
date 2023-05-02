const fs = require('fs')



class ProductManager {
    constructor (path){
        this.productos = []
        this.resultado
        this.ruta = path 
        this.existeFile = false

        // Confirmo si ya existe el archivo JSON
        if (fs.existsSync(this.ruta)){
            this.existeFile = true
        }

        if (this.existeFile) {
            this.resultado = JSON.parse(fs.readFileSync(this.ruta, 'UTF-8')) 
            this.productos = this.resultado 
        } else {
            this.productos = []
        }

    }

    getProducts() {
        if (this.existeFile) {
            this.resultado =  JSON.parse(fs.readFileSync(this.ruta, 'UTF-8'))
            this.productos = this.resultado
        }
        console.log("El listado de productos es:")
        console.log(this.productos)
        return this.productos
    }
    

    async addProduct( title, description, price, thumbnail, code, stock ) {
        try{
            if (stock != undefined) {

                let filtrado = this.productos.filter(function(el) {
                    return el.code === code;
                })

                if (filtrado.length == 0) {
                    let next_id
                    if (this.productos.length > 0) {
                        next_id = this.productos[this.productos.length-1].id+1
                    } else {
                        next_id = 1
                    }

                    let productoParaAgregar ={
                        id: next_id,
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock
                    }
                    this.productos.push(productoParaAgregar)
                    let data_json = JSON.stringify(this.productos,null,2)
                    await fs.promises.writeFile(this.ruta, data_json)
                    this.existeFile = true
                    
                    return 'User ID: '+productoParaAgregar.id

                } else {
                console.log("Error: Ya existe un producto con el mismo Código")
                }

            } else {
                console.log("Error: Faltan especificar algunos campos. Debe ingresar los parámetros Título, Descripción, Precio, Imagen, Código y Stock")
            }
        } catch(error) {
            console.log(error)
            return 'Error al crear el usuario'
        }
    }

    getProductsById(id) {
        let filtrado = this.productos.filter(function(el) {
            return el.id === id;
        })
        if (filtrado.length > 0) {
            console.log(filtrado)
            return filtrado
        } else {
            console.log("Not found")
        }
    }


    async updateProduct(id, data) {
        try {
            let indice = this.productos.findIndex(producto => producto.id === id)
            let productoParaModificar = this.productos[indice]
    
            for (let prop in data) {     
                productoParaModificar[prop] = data[prop]
            }
    
            this.productos[indice] = productoParaModificar
            let data_json = JSON.stringify(this.productos,null,2)
            await fs.promises.writeFile(this.ruta, data_json)
            return 'Updated user: '+ id
        } catch(error) {
            console.log(error)
            return 'Error al modificar el usuario'
        }


    }


    async deleteProduct(id) {
        try{
            this.productos = this.productos.filter(el => el.id!==id)
            let data_json = JSON.stringify(this.productos,null,2)
            await fs.promises.writeFile(this.ruta, data_json)
            return 'Deleted user: '+ id
        } catch(error) {
            console.log(error)
            return 'Error al borrar el usuario'
        }

    }
}




async function manager() {
        console.log("*** Se creará una instancia de la clase “ProductManager”")
        let instancia = new ProductManager('./objetos.json');
        console.log(" ")

        console.log("*** Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []")
        await instancia.getProducts()
        console.log(" ")

        console.log("*** Se llamará al método “addProduct” con los campos: title: “producto prueba” description:”Este es un producto prueba” price:200, thumbnail:”Sin imagen” code:”abc123”, stock:25")
        await instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
        console.log("El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE")
        console.log(" ")

        console.log("*** Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado")
        await instancia.getProducts()
        console.log(" ")

        console.log("*** Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.")
        await instancia.getProductsById(1)
        console.log(" ")

        await instancia.getProductsById(30)
        console.log(" ")

        console.log("*** Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.")
        await instancia.updateProduct(1, {
                     price: 970
                   })
        console.log(" ")

        console.log("*** Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.")
        await instancia.deleteProduct(1)
        console.log(" ")
}

manager()



