//Pasar los datos del JSON al DOM
const URLJSON = "js/data.json"

let listaOrden = []
let tabla = document.querySelector("tbody")



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
                item = productos.filter(producto => producto.nombre === e.target.id)[0] //Filtro por ID
                //EL CERO ENTRE CORCHETES ES PARA QUE ELIJA EL PRIMER Y UNICO PRODUCTO
    
                listaOrden.push({nombre: item.nombre, precio: item.precio});
                agregarCarrito()
                
    })}
    
    }
    
    })}

    
function agregarCarrito(){
  let orden = [];
    for(let producto of listaOrden){
        orden += `<tr class= "productosCarrito">
                  <td class= "itemCarrito">${producto['nombre']}</td>
                  <td class= "itemCarritoPrecio">$${producto['precio']}</td>
                  <td><input type="number" class="btnCantidad" value="1"></input></td>
                  <td><button type="button" id="${producto['nombre']}" class="btnEliminar">Eliminar</button></td>
                  </tr>`
    }
    //Selecciono el elemento del table a donde quiero que se asignen los nuevos elementos
    tabla.innerHTML = (orden)

   



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
  btnSeleccionado.closest('.productosCarrito').remove(); 
  listaOrden.splice(indiceAEliminar,1); //EN EL SPLICE COLOCO EL INDICE A ELIMINAR, NO EL PRODUCTO ENTERO
  console.log(listaOrden);
  costoTotal()
}



tablaDos = document.querySelector(".totalSeleccionados")

function costoTotal(){
  let precioItem = []
  for(precio of listaOrden){
    precioItem.push(precio.precio)
    console.log(precioItem)
  }

  if(precioItem.length>0){
  
  let sumaCosto = precioItem.reduce((a,b)=>a+b)
  console.log(sumaCosto)

    tablaDos.innerHTML =`<p class="sumaProductos">Total $${sumaCosto} </p>`
  }else{
    tablaDos.innerHTML =`<p colspan="3" class="carritoVacio">El carrito de compras está vacío</p>`
  }
  

}


//Llamar a las funciones
agregarProductos()

vaciarCarrito()
 

