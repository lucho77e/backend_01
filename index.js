class ProductManager {
    constructor (productsColection){
        this.products = []
        console.log("Nuevo objeto creado")
    }

    getProducts(){
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        
        if (stock != undefined) {
            let productos = this.products
            
            let filtrado = productos.filter(function(el) {
                return el.code === code;
            })

            if (filtrado.length == 0) {
                this.products.push ({
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

}

//

let instancia = new ProductManager();
console.log(instancia.getProducts())

instancia.addProduct("Coca", "Es una coca", "110,20", "img.png", "0001", "30")
console.log(instancia.getProducts())

instancia.addProduct("Coca", "Es una coca", "110,20", "img.png", "0001", "30")
instancia.addProduct("Pepsi", "Es una pepsi", "150,20", "img.png", "0002", "35")
console.log(instancia.getProducts())

