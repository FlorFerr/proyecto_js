//Objeto productos
class Productos{
    constructor(categoria,nombre,precio,stock, foto, talles, colores){
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseFloat(stock);
        this.foto = foto;
        this.talles = talles;
        this.colores = colores;
	}
}

//Array de objetos
let arrayProductos = [
    { categoria: "Pantalones", 
      nombre:"Jean mom", 
      precio: 4000, 
      stock:35, 
      foto: `images/img1.png`,
      talles:"",
      colores:"",
    }, 
    { categoria: "Pantalones", 
      nombre: "Short Jean", 
      precio: 2000, 
      stock: 60,
      foto: `images/img2.png`,
      talles:"",
      colores:"",
    }, 
    { categoria: "Pantalones", 
      nombre: "Jean Semi Oxford", 
      precio: 3500, 
      stock: 15,
      foto: `images/img3.png`,
      talles:"",
      colores:"",
    }, 
    { categoria: "Remeras", 
      nombre: "Remera Starter", 
      precio: 900, 
      stock: 25,
      foto: `images/img4.png`,
      talles:"",
      colores:"",
    }, 
    { categoria: "Remeras", 
      nombre: "Remera Mine", 
      precio: 1000, 
      stock: 10,
      foto: `images/img5.png`,
      talles:"",
      colores:"",
    },
    { categoria: "Sweaters", 
      nombre: "Sweater Praga", 
      precio: 2300, 
      stock: 30,
      foto: `images/img6.png`,
      talles:"",
      colores:"",
    }];