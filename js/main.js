//Pasar los datos del JSON al DOM
const URLJSON = "js/data.json"

let listaOrden = []

function agregarProductos(){
$.getJSON(URLJSON, function (respuesta, estado) {
  
    if(estado === "success"){
      const productos = respuesta;
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
    const botonesComprar = $(".botonCompra") 
         for (const boton of botonesComprar){
             $(boton).click(function(e){
                item = productos.filter(producto => producto.nombre === e.target.id)[0]//Filtro por ID. Con el 0 toma el primer y unico elemento.
                listaOrden.push({nombre: item.nombre, precio: item.precio});
                agregarCarrito()          
    })}
    }
    })}

const tablaProductosCarrito = document.querySelector("tbody")
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
  const ordenFiltrada = listaOrden.filter(producto => producto.nombre === event.target.id)[0]
  const indiceAEliminar = listaOrden.indexOf(ordenFiltrada); //SACO EL INDICE DEL PRODUCTO A ELIMINAR
  btnSeleccionado.closest('.producto__item').remove(); 
  listaOrden.splice(indiceAEliminar,1); //EN EL SPLICE COLOCO EL INDICE A ELIMINAR, NO EL PRODUCTO ENTERO
  console.log(listaOrden);
  costoTotal()
}

const total = document.querySelector(".carrito__total")
function costoTotal(){
  const totalItem = []
  for(costo of listaOrden){
    totalItem.push(costo.precio)
    console.log(totalItem)
  }
  if(totalItem.length>0){
    const sumaCosto = totalItem.reduce((a,b)=>a+b)
    console.log(sumaCosto)
    total.innerHTML =`<p>Total $${sumaCosto} </p>`
  }else{
    total.innerHTML =`<p class="carritoVacio">El carrito de compras está vacío</p>`
  }
}

let modal = document.querySelector(".carrito__contenedor")
let carrito = document.querySelector(".carrito")
$(".abrirCarrito").click(function(e){
  e.preventDefault()
  $(".carrito").css("opacity","1")
               .css("visibility","visible");
 modal.classList.toggle("modal__contenedor")
})

$(".btnCerrar").click(function(){
 modal.classList.toggle("modal__contenedor")
 setTimeout(function(){
  $(".carrito").css("opacity","0")
               .css("visibility","hidden");
 },300)
})

window.addEventListener("click", function(e){
  if(e.target == carrito){
    modal.classList.toggle("modal__contenedor")
    setTimeout(function(){
      $(".carrito").css("opacity","0")
      .css("visibility","hidden");
    },300)
  }
})








//Llamar a las funciones
agregarProductos()
vaciarCarrito()




