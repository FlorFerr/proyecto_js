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


$(".container").prepend('<p id="envios">¡Envíos gratis en compras mayores a $5000!</p>');
//Declaración de métodos encadenados
$("#envios").css("display", "none")
        .css("font-size","20px")
        .css("margin-top","20px")
        .css("opacity",".5")
        .slideDown(1000)
        .animate({opacity:'1',})

        .animate({opacity:'0.5',})

        .animate({opacity:'1',})
                    
                          