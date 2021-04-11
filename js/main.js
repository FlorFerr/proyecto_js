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

//Array para los productos seleccionados
let listaOrden = [];

//Función para pasar el array de productos al HTML
function agregarProductos(){
    for (let item of arrayProductos) {

        //Selecciono el elemento contenedor en el HTML usando la class
        let contenedorProductos = document.querySelector(".productos__contenedor");

        //Creo un Div donde va a ir todo el contenido
        let contenidoCard = document.createElement('div')
        contenidoCard.classList.add('col')

        contenidoCard.innerHTML =
        `<div class='card'>
          <h3 class='card-title'>${item.nombre}</h3>
          <div class='card-body'>
            <img src='${item.foto}' class='card-img-top'/>
          </div>
          <p class ='card-subtitle'>$${item.precio}</p>
        </div>`
 
        //Agrego el boton que va a contener el evento 
        let btnAgregar = document.createElement(`button`);
        btnAgregar.classList.add('btn');
        btnAgregar.classList.add('btn-info');
        btnAgregar.textContent= (`Agregar al carrito`);

        //Agrego cada contenido a su contenedor
        contenidoCard.appendChild(btnAgregar)
        contenedorProductos.appendChild(contenidoCard)

        //Evento para agregar los productos selecconados al array correspondiente
        btnAgregar.addEventListener('click', function(){
            listaOrden.push({nombre: item.nombre, precio: item.precio})
            agregarCarrito()
        })
}
}

//Función para mostrar los productos seleccionados
function agregarCarrito(){
    let orden = [];
    for(let producto of listaOrden){
        orden += `<tr>
                  <td>${producto['nombre']}</td>
                  <td>$${producto['precio']}</td>
                  </tr>`
    }

    //Selecciono el elemento de l table a donde quiero que se asignen los nuevos elementos
    let tabla = document.querySelector("tbody")
    tabla.innerHTML = (orden)
    
    //Nuevo array con los precios de los productos seleccionados
    let costo=[];
    for(let cost of listaOrden){
      costo.push(Number(cost['precio']))
    }

    //If que suma los elementos del array y los muestra, si es que corresponde
    if(costo.length>0){
    let sumaCosto = costo.reduce((a,b)=>a+b)
    tabla.innerHTML +=`<tr class="sumaProductos"><td>Total</td><td class="total">$${sumaCosto}</td></tr>`
    }else{
      tabla.innerHTML +=`<td colspan="2" class="carritoVacio">El carrito de compras está vacío</td>`
    }
}

//Evento para quitar todos los elementos seleccionados
let btnBorrar = document.querySelector(".btnQuitar")
btnBorrar.addEventListener('click', function(){
    listaOrden = [];
    agregarCarrito()
})

//Llamada a la función
agregarProductos()



