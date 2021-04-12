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

        $(".productos__contenedor").append(
          `<div class='col'>         
            <div class='card'>
              <h3 class='card-title'>${item.nombre}</h3>
              <div class='card-body'>
                <img src='${item.foto}' class='card-img-top'/>
              </div>
              <p class ='card-subtitle'>$${item.precio}</p>
            </div>
            <button class="btn btn-info botonCompra" id="${item.nombre}">Agregar</button>
          </div>`
        )}
    //Seleccionar el botón para el evento
    let botones = $(".botonCompra") 
      //HACEMOS OTRO FOR PARA ESCUCHAR LOS EVENTOS, SINO HACIAS MUCHISIMOS EVENTOS DE SOBRA
      for (boton of botones){
          $(boton).click(function(e){//E SERIA EL EVENTO QUE CAPTA
            console.log(e.target.id) //SELECCIONO EL ID QUE TIENE LA DESCRIPCION DEL PRODUCTO CORRESPONDIENTE
            item = arrayProductos.filter(producto => producto.nombre === e.target.id)[0] //Filtro por ID
            //EL CERO ENTRE CORCHETES ES PARA QUE ELIJA EL PRIMER Y UNICO PRODUCTO
            console.log(item);
            listaOrden.push({nombre: item.nombre, precio: item.precio});
            agregarCarrito();

})}}
            
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
let btnBorrar = $(".btnQuitar")
$(".btnQuitar").click(function(){
    listaOrden = [];
    agregarCarrito()
})

//Llamada a la función
agregarProductos()



