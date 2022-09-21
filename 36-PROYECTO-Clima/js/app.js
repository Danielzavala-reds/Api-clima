const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e){
    e.preventDefault();
    
    // Validar el formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    
    if(ciudad === '' || pais === ''){
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais){
    
    const appID = 'a4fb4905611a779ef3fbc24da0142ee6';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`

    spinner(); // Mandamos a llamar el spinner

    fetch(url)
        .then(respuesta => respuesta.json())

        // Para validar correctamente los resultados, es decir; que se introduzca correctamente una ciudad con su respectivo pais
        .then(datos => {
            limpiarHTML(); //Limpiamos el HTML previo
            console.log(datos);
            if(datos.cod === "404"){
                mostrarError('Introduce una ciudad válida y/o con su respectivo país');
                return;
            }

            // Imprimie la respuesta en el HTML
            mostrarHTML(datos);

        });


}

function mostrarHTML(datos){
    const {name,  main: {temp, temp_max, temp_min} } = datos;
    
    // Conversion a centrigrados
    
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    // Imprimimos nombre de la ciudad
    const nombre = document.createElement('p');
    nombre.textContent= `City: ${name}`;
    nombre.classList.add('font-bold', 'text-2xl');

    // Vamos a imprimir la temperatura
    const actual = document.createElement('p');
    actual.innerHTML = `Now: ${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');
    
    // Mostrar las temperaturas maximas y minimas
    const tempMax = document.createElement('div');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl')

    const tempMin = document.createElement('div');
    tempMin.innerHTML = `Min: ${min}  &#8451;`;
    tempMin.classList.add('text-xl');
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);

}

const kelvinACentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML (){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function mostrarError(mensaje, tipo){

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){

        const alerta = document.createElement('div');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3','rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
    `;
    container.appendChild(alerta);

    setTimeout(() => {
        alerta.remove()
    }, 5000);

    }

    

}

function spinner (){

    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  
    `;

    resultado.appendChild(divSpinner);
}