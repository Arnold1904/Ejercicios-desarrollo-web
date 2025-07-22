const bin= document.getElementById('binaryInput');
const resultadodiv= document.getElementById('conversionResult');
function agregardigito(digito){
    document.getElementById('binaryInput').value+= digito;
}

function convertir(){
    const binario= bin.value;
    const conversionResult = resultadodiv;
    const decimal= parseInt(binario, 2);
    conversionResult.style.display= 'none';
    conversionResult.classList.remove('alert-sucess', 'alert-danger')
    //verificar si no hay nada escrito
    if(binario===''){
        conversionResult.innerHTML='<strong>Error:</strong> Debes ingresar un numero valido';
        conversionResult.classList.add('alert-danger')
        conversionResult.style.display='block';
    }else{
        // Mostrar el resultado de la conversión
        conversionResult.innerHTML = 
        `<strong>Binario:</strong> ${binario}<br>
        <strong>Decimal:</strong> ${decimal}`;
        conversionResult.classList.add('alert-success');
        conversionResult.style.display = 'block';
    }
}

function borrar(){
    bin.value = bin.value.slice(0,-1);
}

function limpiar(){
    bin.value='';
    resultadodiv.style.display ='none';
}

