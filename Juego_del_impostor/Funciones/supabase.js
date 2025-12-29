// Función para leer un archivo CSV
async function leerCSV(ruta) {
    try {
        const respuesta = await fetch(ruta);
        const texto = await respuesta.text();
        const filas = texto.split('\n').map(fila => fila.split(','));

        // Convertir a un formato de objetos
        const encabezados = filas[0];
        const datos = filas.slice(1).map(fila => {
            return encabezados.reduce((obj, encabezado, i) => {
                obj[encabezado] = fila[i];
                return obj;
            }, {});
        });

        console.log('Datos leídos del CSV:', datos);
        return datos;
    } catch (error) {
        console.error('Error al leer el archivo CSV:', error);
    }
}

// Exportar la función
export { leerCSV };