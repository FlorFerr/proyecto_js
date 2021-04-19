//Pasar los datos del JSON al DOM
const URLJSON = "js/data.json"

function agregarProductos(){
$.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let productos = respuesta;
      for (const item of productos) {
        $(".productos__contenedor").append(`<div class='col'>         
        <div class='card'>
          <h3 class='card-title'>${item.nombre}</h3>
          <div class='card-body'>
            <img src='${item.foto}' class='card-img-top'/>
          </div>
          <p class ='card-subtitle'>$${item.precio}</p>
        </div>
        <button class="btn btn-info botonCompra" id="${item.nombre}">Agregar al carrito</button>
      </div>`)
      }  
    //Seleccionar el botón para el evento 
    let botones = $(".botonCompra") 
   
          for (boton of botones){
              $(boton).click(function(e){
                
                item = productos.filter(producto => producto.nombre === e.target.id)[0] //Filtro por ID
                //EL CERO ENTRE CORCHETES ES PARA QUE ELIJA EL PRIMER Y UNICO PRODUCTO
                console.log(item);
                listaOrden.push({nombre: item.nombre, precio: item.precio});
                agregarCarrito();
    
    })}
    }
    })}

//Array para los productos seleccionados
let listaOrden = [];
//Función para mostrar los productos seleccionados
function agregarCarrito(){
    let orden = [];
    for(let producto of listaOrden){
        orden += `<tr>
                  <td>${producto['nombre']}</td>
                  <td>$${producto['precio']}</td>
                  </tr>`
    }
    //Selecciono el elemento del table a donde quiero que se asignen los nuevos elementos
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

//Animación
$(".container").prepend('<p id="envios">¡Envíos gratis en compras mayores a $5000!</p>');

$("#envios").css("display", "none")
        .css("font-size","20px")
        .css("margin-top","20px")
        .css("opacity",".5")
        .slideDown(1000)
        .animate({opacity:'1',})

        .animate({opacity:'0.5',})

        .animate({opacity:'1',})
                    
                          