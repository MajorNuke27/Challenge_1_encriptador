//Obtenemos los elementos del DOM
var textAreaInput = document.getElementById("input");
var btEncriptar = document.getElementById("encriptar");
var btDesencriptar = document.getElementById("desencriptar");
var btLimpiar = document.getElementById("limpiar");
var textAreaOutput = document.getElementById("textArea");
var btCopiar = document.getElementById("copiar");

//Claves para la encriptacion de texto
var keys = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
}

//Asignar las funciones correspondientes a los botones
btEncriptar.onclick = encriptar;
btDesencriptar.onclick = desencriptar;
btLimpiar.onclick = limpiar;
btCopiar.onclick = copiar;

//Valida que el texto ingresado solo contenga letras minusculas sin caracteres especiales
//ademas, valida que el usuario haya ingresado algun valor
function validateInput(texto)
{
    if(texto == "" || /^[ \n]*$/.test(texto) ){
        textAreaInput.value = "";
        return false;
    }
    
    return(/^[a-z \n]*$/.test(texto));
}

//Encripta el texto
function encriptar()
{
    var texto = textAreaInput.value;//Obtiene el texto 
                    
    if(validateInput(texto))//Valida que el texto ingresado sea valido
    {
        //Para cada una de las claves obtiene el valor por el que sera reeemplazado
        for(var letra in keys)
        {
            //Reeemplaza la letra obtenida, por su valor encriptado
            texto = texto.replaceAll(letra, keys[letra]);
        }

        textAreaOutput.value = texto;//Actualiza el text area con el texto encriptado
        textAreaInput.value = "";//Limpia el text area (input)
        document.documentElement.style.setProperty('--url', 'none');//Elimina la imagen de fondo en el textAreaOutput

        return;
    }

    Swal.fire({
      title: 'Texto invalido...',
      text: 'Solo se admiten letras minusculas sin acentos',
      icon: 'error',
    })
}

//Desencripta el texto
function desencriptar()
{
    var texto = textAreaInput.value;//Obtiene el texto   
                    
    if(validateInput(texto))//Valida que el texto ingresado sea valido
    {
        for(var letra in keys)
        {
            //Reeemplaza el valor encriptado, por la letra correspondiente
            texto = texto.replaceAll(keys[letra], letra);
        }

        textAreaOutput.value = texto;//Actualiza el text area con el texto desencriptado
        textAreaInput.value = "";//Limpia el text field
        document.documentElement.style.setProperty('--url', 'none');//Elimina la imagen de fondo en el textAreaOutput
    }
}

function limpiar() {
    textAreaInput.value = "";
    textAreaOutput.value = "";
    document.documentElement.style.setProperty('--url', 'url(\'../images/pagina-no-encontrada.png\')');//Establece la imagen de fondo en el textAreaOutput
}

function copiar() {
    navigator.clipboard.writeText(textAreaOutput.value).then((result) => {
        Swal.fire(
          '',
          'Texto copiado exitosamente!',
          'success'
        );
    }).catch((err) => {
        console.log(err);
    });
}