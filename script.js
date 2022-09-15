
//se crea el class que servira para agrupar cada grupo de indicaciones dentro de un objeto
class tiquetes{
    constructor(pelicula = "",hora = "",clientes = 0,bebida,palomitas = "",comida = ""){
        this.pelicula = pelicula
        this.hora = hora
        this.clientes = clientes
        this.bebida = bebida
        this.palomitas = palomitas
        this.comida = comida
    }
}
//se crean las constantes que se usaran para pedir los datos del formulario y guardarlos en el array
const valorBoleta = 5000
let reservaciones = []
const formulario = document.getElementById("formulario")
let reservacionesmostrar = []

//se crea el local storage del de la tiquetera para que guarde todos los tiquetes sin que se borren
if(localStorage.getItem(`tiquetera`)){
    reservaciones = JSON.parse(localStorage.getItem(`tiquetera`))
}else{
    localStorage.setItem(`tiquetera`,(reservaciones))
}

//funcion controladora de la pelicula a escoger
const verificarPelicula = (x) =>{
    switch(x){
        case "thor":
            carteleras = "Thor"
            break
        case "telefono negro":
            carteleras = "Telefono Negro"
            break
        case "los minions":
            carteleras = "Los Minions"
            break
        default:
            carteleras = null
            break
    }
}
//esta funcion valida que en el input de hora se escriban horarios validos
const verificarHora = (h) =>{
    switch(h){
        case "6:30":
            horarios = "6:30"
            break
        case "7:30":
            horarios = "7:30"
            break
        case "9:30":
            horarios = "9:30"
            break
        default:
            horarios = null
            break
    }
}
const verificarClientes = (c) =>{
    if((isNaN(c))||(c > 5)||(c < 1)){
        cantidadClientes = null
    }
    /*if(c > 5){
        alert("el maximo de clientes por grupo es de 5 personas")
        cantidadClientes = null
    }
    if(c < 1){
        alert("el minimo de clientes es de 1 personas")
        cantidadClientes = null
    }*/
}

let carteleras 
let horarios 
let cantidadClientes 
let bebidaA 
let comidaA 
let palomitasA 

formulario.addEventListener(`submit`,(e) => {
    e.preventDefault()

    carteleras = document.getElementById("carteleras").value
    horarios = document.getElementById("horarios").value
    cantidadClientes = document.getElementById("cantidadClientes").value
    bebidaA = document.getElementById("bebidaA").value
    comidaA = document.getElementById("comidaA").value
    palomitasA = document.getElementById("palomitasA").value

    verificarPelicula(carteleras)
    verificarHora(horarios)
    verificarClientes(cantidadClientes)

    let tiquete

    if (carteleras === null) {
        Toastify({
            text: "Ingresaste mal la pelicula",
            className: "info",
            style: {
              background: "linear-gradient(to right, #DF0101, #8A0868)",
            }
          }).showToast();
    }else if(horarios === null){
        Toastify({
            text: "Ingresaste mal los horarios",
            className: "info",
            style: {
                background: "linear-gradient(to right, #DF0101, #8A0868)",
            }
          }).showToast();
    }else if(cantidadClientes === null){
        Toastify({
            text: "Ingresaste mal los clientes",
            className: "info",
            style: {
                background: "linear-gradient(to right, #DF0101, #8A0868)",
            }
          }).showToast();
    }else{
        tiquete = new tiquetes(carteleras,horarios,cantidadClientes,bebidaA,palomitasA,comidaA)
        reservaciones.push(tiquete) 
        reservacionesmostrar.push(tiquete)
        Swal.fire({
            icon: 'success',
            title: 'tickete comprado correctamente',
            text: '',
          }) 
    }

    localStorage.setItem(`tiquetera`,JSON.stringify(reservaciones))
    formulario.reset()
    carteleras = ""
    horarios = ""
    cantidadClientes = ""
    bebidaA = ""
    comidaA = ""
    palomitasA = ""
    console.log(tiquete)
    console.log(reservaciones)
})
const botonTiquetera = document.getElementById("botonTiquetera")
//funciones para mostrar los tiquetes
botonTiquetera.addEventListener('click', () => {
    divReservaciones.innerHTML = ""
    reservacionesmostrar.forEach((tiquete, indice) => {
        divReservaciones.innerHTML += `
            <div class="card" id="user${indice}" style="width: 18rem;margin:3px;">
                <div class="card-body">
                    <h5 class="card-title">PELICULA: ${tiquete.pelicula}</h5>
                    <p class="card-text">Hora: ${tiquete.hora}</p>
                    <p class="card-text">Clientes: ${tiquete.clientes}</p>
                    <p class="card-text">Bebida: ${tiquete.bebida}</p>
                    <p class="card-text">Palomitas: ${tiquete.palomitas}</p>
                    <p class="card-text">Comida: ${tiquete.comida}</p>
                    <p class="card-text">total a pagar es $${valorBoleta * tiquete.clientes}</p>
                </div>
            </div>
        
        `
    })
})
//se declara el boton y el div vacio que los dos serviran para mostrar las ventas vendidas 
const botonVentas = document.getElementById("botonVentas")
const divVentas = document.getElementById("divVentas")
//este codigo lo que hace es llamar a los botones desde el html para que ejecute el mostrar los tiquetes ultimos que se han vendido
botonVentas.addEventListener(`click`, () =>{
    const tickStorage = JSON.parse(localStorage.getItem(`tiquetera`))

    divVentas.innerHTML = ""
    tickStorage.forEach((ticket,indice) =>{
        divVentas.innerHTML += `
            <div class="card" id="ticket${indice}" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">TICKETE CINE COLOMBIA</h5>
                    <p class="card-text">PELICULA:${ticket.pelicula}</p>
                    <p class="card-text">HORARIO:${ticket.hora}</p>
                    <p class="card-text">CLIENTES:${ticket.clientes}</p>
                    <p class="card-text">BEBIDA:${ticket.bebida}</p>
                    <p class="card-text">CRISPETAS:${ticket.palomitas}</p>
                    <p class="card-text">COMIDA:${ticket.comida}</p>
                    <p class="card-text">el valor a pagar es$${valorBoleta * ticket.clientes}</p>
                    <button class="btn btn-danger">ELIMINAR TICKET</button>
                </div>
            </div>
        `
    })

    tickStorage.forEach((ticket,indice) =>{
        const ticketeslocales = document.getElementById(`ticket${indice}`)
        ticketeslocales.children[0].children[8].addEventListener(`click`, () =>{
            ticketeslocales.remove()
            reservaciones.splice(indice,1)
            localStorage.setItem(`tiquetera`, JSON.stringify(reservaciones))
            console.log("tickete eliminado")
        })
    })
})

const buscador = document.getElementById("buscador")
let divPeliculas = document.getElementById("divPeliculas")


buscador.addEventListener(`click`,(e) => {
    const encontrar = document.getElementById("encontrar").value
    divPeliculas.innerHTML = ""
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '732e426d40msh6a050703858e155p18d85ejsn83e3416ea393',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    
    fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${encontrar}`, options)
        .then(response => response.json())
        .then(response => {
            //divPeliculas = ""
            let arrayMovies = response.d
            arrayMovies.forEach((elementos) => {
                let titulo = elementos.l
                let  imagen = elementos.i.imageUrl
                let actores = elementos.s 
    
                const poster = `
                    <div>
                        <img src="${imagen}">
                        <h2>${titulo}</h2>
                        <small>${actores}</small>
                    </div>
                `
                divPeliculas.innerHTML += poster
            })
        })
        .catch(err => console.error(err));
        arrayMovies = ""  
})


