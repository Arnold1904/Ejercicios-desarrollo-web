let inputCount = 2;
const minInputs = 2;
const maxInputs = 10;
const minValue = 100;
const maxValue = 250000;

// Función para agregar un nuevo campo de entrada
function addInput() {
    if (inputCount >= maxInputs) {
        alert('Máximo 10 campos permitidos');
        return;
    }
    
    const container = document.getElementById('input-container');
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.innerHTML = `
        <input type="text" class="number-input" placeholder="Ej: 123.45" data-index="${inputCount}">
        <button class="remove-btn" onclick="removeInput(${inputCount})">-</button>
    `;
    
    container.appendChild(inputGroup);
    inputCount++;
    updateButtonStates();
}

// Función para eliminar un campo de entrada
function removeInput(index) {
    if (inputCount <= minInputs) {
        alert('Mínimo 2 campos requeridos');
        return;
    }
    
    const container = document.getElementById('input-container');
    const inputGroups = container.querySelectorAll('.input-group');
    
    // Encontrar y eliminar el grupo correcto
    inputGroups.forEach(group => {
        const input = group.querySelector('.number-input');
        if (input.getAttribute('data-index') == index) {
            container.removeChild(group);
            inputCount--;
        }
    });
    
    updateButtonStates();
}

// Función para actualizar el estado de los botones
function updateButtonStates() {
    const addBtn = document.getElementById('add-btn');
    const removeBtns = document.querySelectorAll('.remove-btn');
    
    addBtn.disabled = inputCount >= maxInputs;
    
    removeBtns.forEach(btn => {
        btn.disabled = inputCount <= minInputs;
    });
}

// Función para limpiar estilos de error
function clearErrorStyles() {
    const inputs = document.querySelectorAll('.number-input');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Función para validar un número individual
function validateNumber(value, input) {
    // Verificar si está vacío
    if (value === '') {
        input.classList.add('error');
        return { valid: false, message: 'Por favor, complete todos los campos' };
    }
    
    // Verificar si contiene solo números, punto decimal y hasta 2 decimales
    const numberRegex = /^\d+(\.\d{1,2})?$/;
    
    if (!numberRegex.test(value)) {
        input.classList.add('error');
        return { valid: false, message: 'Por favor, ingrese solo números válidos con hasta 2 decimales (ej: 123.45)' };
    }
    
    const numValue = parseFloat(value);
    
    if (numValue < minValue || numValue > maxValue) {
        input.classList.add('error');
        return { valid: false, message: `El número debe estar entre ${minValue.toLocaleString()} y ${maxValue.toLocaleString()}` };
    }
    
    return { valid: true, value: numValue };
}

// Función para calcular la suma
function calculateSum() {
    // Limpiar estilos de error previos
    clearErrorStyles();
    
    const inputs = document.querySelectorAll('.number-input');
    const numbers = [];
    const errors = [];
    
    // Validar todos los inputs
    inputs.forEach((input, index) => {
        const value = input.value.trim();
        const validation = validateNumber(value, input);
        
        if (!validation.valid) {
            errors.push(`Campo ${index + 1}: ${validation.message}`);
        } else {
            numbers.push(validation.value);
        }
    });
    
    // Si hay errores, mostrar alerta con todos los errores
    if (errors.length > 0) {
        let errorMessage = 'Se encontraron los siguientes errores:\n\n';
        errors.forEach((error, index) => {
            errorMessage += `${index + 1}. ${error}\n`;
        });
        errorMessage += '\nPor favor, corrija los errores e intente nuevamente.';
        alert(errorMessage);
        return;
    }
    
    if (numbers.length < minInputs) {
        alert(`Se requieren al menos ${minInputs} números`);
        return;
    }
    
    // Calcular la suma
    const sum = numbers.reduce((total, num) => total + num, 0);
    
    // Verificar que el resultado no exceda el límite
    if (sum > 2500000) {
        alert('El resultado excede el límite máximo de 2,500,000');
        return;
    }
    
    // Mostrar resultados
    displayResults(sum);
}

// Función para mostrar los resultados
function displayResults(sum) {
    const numericResult = document.getElementById('numeric-result');
    const textResult = document.getElementById('text-result');
    
    // Formatear número con comas
    const formattedSum = sum.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    numericResult.textContent = formattedSum;
    textResult.textContent = numberToWords(sum);
}

// Función para convertir números a palabras en español
// Función para convertir números a palabras en español (CORREGIDA)
function numberToWords(num) {
    const ones = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    // Función auxiliar para convertir números menores a 1000
    function convert(n) {
        if (n === 0) return '';
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) {
            const ten = Math.floor(n / 10);
            const one = n % 10;
            // Manejo especial para 'veintiun', 'veintidos', etc.
            if (ten === 2 && one > 0) return `veinti${ones[one]}`;
            return tens[ten] + (one > 0 ? ` y ${ones[one]}` : '');
        }
        if (n < 1000) {
            const hundred = Math.floor(n / 100);
            const remainder = n % 100;
            if (n === 100) return 'cien';
            // Usa el auxiliar 'convert' para el resto del número
            return hundreds[hundred] + (remainder > 0 ? ` ${convert(remainder)}` : '');
        }
        return '';
    }
    
    if (num === 0) return 'cero';

    // Separar parte entera y decimal
    const parts = num.toFixed(2).toString().split('.');
    let integerPart = parseInt(parts[0]);
    const decimalPart = parseInt(parts[1]);

    let result = '';

    // Millones
    if (integerPart >= 1000000) {
        const millions = Math.floor(integerPart / 1000000);
        // Ajuste para "un millón" en lugar de "uno millón"
        result += (millions === 1 ? 'un millón' : `${convert(millions)} millones`);
        integerPart %= 1000000;
        if (integerPart > 0) result += ' ';
    }

    // Miles
    if (integerPart >= 1000) {
        const thousands = Math.floor(integerPart / 1000);
        // Ajuste para "mil" en lugar de "un mil"
        if (thousands > 1) {
            result += `${convert(thousands)} mil`;
        } else {
            result += 'mil';
        }
        integerPart %= 1000;
        if (integerPart > 0) result += ' ';
    }

    // Cientos, decenas y unidades
    if (integerPart > 0) {
        result += convert(integerPart);
    }
    
    // Parte decimal (mejorada)
    if (decimalPart > 0) {
        result += ` con ${convert(decimalPart)} centavos`;
    }

    // Capitalizar la primera letra y devolver
    return (result.charAt(0).toUpperCase() + result.slice(1)).trim();

    
    // Agregar parte decimal si existe
    if (decimalPart) {
        result += ' punto ';
        for (let digit of decimalPart) {
            result += ones[parseInt(digit)] + ' ';
        }
    }
    
    return result.trim();
    
    function convertHundreds(n) {
        if (n === 0) return '';
        
        let str = '';
        
        // Centenas
        if (n >= 100) {
            const h = Math.floor(n / 100);
            if (h === 1 && n === 100) {
                str += 'cien';
            } else {
                str += hundreds[h];
            }
            n %= 100;
            if (n > 0) str += ' ';
        }
        
        // Decenas y unidades
        if (n >= 20) {
            const t = Math.floor(n / 10);
            str += tens[t];
            n %= 10;
            if (n > 0) {
                str += ' y ' + ones[n];
            }
        } else if (n >= 10) {
            str += teens[n - 10];
        } else if (n > 0) {
            str += ones[n];
        }
        
        return str;
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    updateButtonStates();
});
