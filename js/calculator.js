// ==========================================
//  CALCULADORA DE AHORRO ENERGÉTICO
// ==========================================

// Valores U estándar (Transmitancia térmica) en W/m²K
const uValues = {
    single: 5.8,           // Vidrio simple
    old_double: 2.8,       // Doble acristalamiento antiguo
    double: 1.1,           // Doble acristalamiento moderno con gas argón
    triple: 0.7            // Triple acristalamiento
};

// Parámetros ajustados para mostrar un ahorro más notorio
const ENERGY_PRICE_PER_KWH = 0.22;  // Precio de la energía por kWh, ajustado
const HEATING_DEGREE_DAYS = 3500;   // Grados-día de calefacción, ajustado para mayor impacto

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const oldTypeSelect = document.getElementById('old-type');
    const newTypeSelect = document.getElementById('new-type');
    const resultDiv = document.getElementById('result');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const widthMm = parseFloat(widthInput.value);
            const heightMm = parseFloat(heightInput.value);

            // Validación simple de los datos
            if (isNaN(widthMm) || isNaN(heightMm) || widthMm <= 0 || heightMm <= 0) {
                resultDiv.innerHTML = '<p style="color: red;">Por favor, introduce un ancho y alto válidos en milímetros.</p>';
                return;
            }

            // Convertir de milímetros a metros para el cálculo
            const widthM = widthMm / 1000;
            const heightM = heightMm / 1000;
            
            const oldType = oldTypeSelect.value;
            const newType = newTypeSelect.value;

            // Obtener los valores U de los tipos de ventana seleccionados
            const oldUValue = uValues[oldType];
            const newUValue = uValues[newType];

            // Calcular la diferencia en la transmitancia térmica
            const deltaU = oldUValue - newUValue;
            
            // Calcular el ahorro de energía
            const surfaceArea = widthM * heightM; // en m²
            const annualEnergySavingsKwh = deltaU * surfaceArea * HEATING_DEGREE_DAYS / 1000;

            // Calcular el ahorro económico anual
            const annualMoneySavings = annualEnergySavingsKwh * ENERGY_PRICE_PER_KWH;

            // Mostrar el resultado en el HTML
            resultDiv.innerHTML = `
                <p><strong>Ahorro Energético Anual:</strong> ${annualEnergySavingsKwh.toFixed(0)} kWh</p>
                <p><strong>Ahorro Económico Anual Estimado:</strong> ${annualMoneySavings.toFixed(2)} €</p>
                <p style="font-size: 0.9rem; color: #666;">
                    *Este cálculo es un estimado. Los valores reales pueden variar.
                </p>
            `;
        });
    }
    
    // Aquí está el cambio clave: llama a la función para configurar el menú.
    setupMobileMenu(); 
});

// ==========================================
//  MENÚ DE NAVEGACIÓN MÓVIL
// ==========================================

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) { // Comprueba que los elementos existen
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // También añade la clase 'active' al botón para la "X"
        });
        
        // Cierra el menú cuando se hace clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active'); // Asegura que la "X" se revierta a hamburguesa
            });
        });
    }
}