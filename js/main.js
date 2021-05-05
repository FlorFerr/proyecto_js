//Pasar los datos del JSON al DOM
const URLJSON = "js/data.json"

let listaOrden = []

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
         for (const boton of botones){
             $(boton).click(function(e){
                item = productos.filter(producto => producto.nombre === e.target.id)[0]//Filtro por ID. Con el 0 toma el primer y unico elemento.
                listaOrden.push({nombre: item.nombre, precio: item.precio});
                agregarCarrito()          
    })}
    }
    })}

let tablaProductosCarrito = document.querySelector("tbody")
function agregarCarrito(){
  let orden = [];
    for(let producto of listaOrden){
        orden += `<tr class= "producto__item">
                  <td class= "item__titulo">${producto['nombre']}</td>
                  <td class= "item__precio">$${producto['precio']}</td>
                  <td><button type="button" id="${producto['nombre']}" class="btnEliminar"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
                  </tr>`
    }
    //Selecciono el elemento del table a donde quiero que se asignen los nuevos elementos
    tablaProductosCarrito.innerHTML = (orden)

  /* const botonesCantidad = $(".btnCantidad")
   for(botonQ of botonesCantidad){
     $(botonQ).change(cambiarCantidad)
   }*/



    const botonEliminar = $(".btnEliminar")
    for(btn of botonEliminar){    
      $(btn).click(eliminarProducto)
      }
      costoTotal()
}







//Función para vaciar el carrito
function vaciarCarrito(){
const btnBorrar = $(".btnVaciar")
btnBorrar.click(function(){
    listaOrden = [];
    agregarCarrito()
})}


function eliminarProducto(event){
  
  btnSeleccionado = event.target;
  itemDos = listaOrden.filter(producto => producto.nombre === event.target.id)[0]//Filtro por ID
                //EL CERO ENTRE CORCHETES ES PARA QUE ELIJA EL PRIMER Y UNICO PRODUCTO
  console.log(itemDos);
  console.log(listaOrden);
  indiceAEliminar = listaOrden.indexOf(itemDos); //SACO EL INDICE DEL PRODUCTO A ELIMINAR
  btnSeleccionado.closest('.producto__item').remove(); 
  listaOrden.splice(indiceAEliminar,1); //EN EL SPLICE COLOCO EL INDICE A ELIMINAR, NO EL PRODUCTO ENTERO
  console.log(listaOrden);
  costoTotal()
}



tablaDos = document.querySelector(".carrito__total")

function costoTotal(){
  let precioItem = []
  for(precio of listaOrden){
    precioItem.push(precio.precio)
    console.log(precioItem)
  }
  
  if(precioItem.length>0){
  
  let sumaCosto = precioItem.reduce((a,b)=>a+b)
  console.log(sumaCosto)
  

    tablaDos.innerHTML =`<p>Total $${sumaCosto} </p>`
    
  }else{
    tablaDos.innerHTML =`<p class="carritoVacio">El carrito de compras está vacío</p>`
  }
  

}

function cambiarCantidad(event){
  const input = event.target
  if(input.value <= 0){
    input.value = 1
  }
}


//Llamar a las funciones
agregarProductos()

vaciarCarrito()
 

