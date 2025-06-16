// incrustador.js

document.addEventListener('DOMContentLoaded', () => {
    // Busca todos los divs con el ID 'banner-script-redireccion'
    const bannerContainers = document.querySelectorAll('#banner-script-redireccion');

    if (bannerContainers.length === 0) {
        console.warn('Incrustador de Anuncios: No se encontró ningún elemento con id="banner-script-redireccion". Asegúrate de que el div está presente en tu HTML.');
        return;
    }

    bannerContainers.forEach((container, index) => {
        // 1. Obtener los valores de personalización de los atributos 'data-' del div contenedor
        // Usamos 'data-' para atributos personalizados, es la práctica estándar y segura.
        const customRedirectUrl = container.getAttribute('data-redirect-url');
        const customMarketplaceName = container.getAttribute('data-marketplace-name');
        const customButtonText = container.getAttribute('data-button-text');
        const customMainTitle = container.getAttribute('data-main-title');
        const customSecondaryText = container.getAttribute('data-secondary-text');
        const customLogoUrl = container.getAttribute('data-logo-url');

        // ¡IMPORTANTE!: Configura esta URL base.
        // Debe ser la URL ABSOLUTA donde has subido el archivo 'anuncio_libro_neon.html'.
        // Asegúrate de que termina en '/'.
        // Ejemplo: 'https://tuservidor.com/mi_carpeta_anuncios/'
        const baseUrl = 'https://raw.githubusercontent.com/crispro941/cdnpropia/refs/heads/main/js/html/'; // <<-- AJUSTA ESTO CON TU URL REAL

        const iframeHtmlFileName = 'anuncio_neon.html';
        const iframeSrc = `${baseUrl}${iframeHtmlFileName}`;

        // Construir los parámetros de la URL para pasar las variables al iframe
        // Usamos URLSearchParams y encodeURIComponent para codificar los valores de forma segura.
        const params = new URLSearchParams();
        if (customRedirectUrl) params.append('redirectUrl', encodeURIComponent(customRedirectUrl));
        if (customMarketplaceName) params.append('marketplaceName', encodeURIComponent(customMarketplaceName));
        if (customButtonText) params.append('buttonText', encodeURIComponent(customButtonText));
        // Para mainTitle y secondaryText que pueden contener HTML, es crucial codificarlos bien.
        if (customMainTitle) params.append('mainTitle', encodeURIComponent(customMainTitle));
        if (customSecondaryText) params.append('secondaryText', encodeURIComponent(customSecondaryText));
        if (customLogoUrl) params.append('logoUrl', encodeURIComponent(customLogoUrl));

        const finalIframeSrc = `${iframeSrc}?${params.toString()}`;

        // 2. Crear el elemento iframe
        const iframe = document.createElement('iframe');
        iframe.src = finalIframeSrc;
        iframe.width = '100%'; // El iframe ocupa el 100% del ancho de su contenedor padre
        iframe.height = '450px'; // Altura inicial del iframe. Ajusta esto según el espacio que necesites.
                                 // Podrías necesitar un valor diferente para que todo el anuncio sea visible
                                 // sin barras de desplazamiento, dependiendo del contenido y de los ajustes de CSS.
        iframe.frameBorder = '0'; // Elimina el borde predeterminado del iframe
        iframe.scrolling = 'no';  // Evita las barras de desplazamiento internas si el contenido cabe
        iframe.allowTransparency = 'true'; // Permite que el fondo del iframe sea transparente

        // Aplicar estilos directamente al iframe para su presentación en la página principal
        iframe.style.cssText = `
            border: none;
            overflow: hidden;
            width: 100%;
            max-width: 720px; /* Limita el ancho máximo del iframe para que coincida con el contenedor interno */
            height: 450px; /* Repetimos la altura aquí por si se sobrescribe la propiedad 'height' */
            display: block; /* Para permitir el centrado con 'margin: 0 auto;' */
            margin: 0 auto; /* Centra el iframe horizontalmente dentro de su contenedor padre */
            border-radius: 15px; /* Bordes redondeados para el marco del iframe */
            box-shadow: 0 0 15px rgba(0,255,255,0.3); /* Sombra sutil alrededor del marco del iframe */
            background-color: transparent; /* Asegura el fondo transparente del iframe en algunos navegadores */
        `;
        // Para compatibilidad con algunos navegadores que prefieren el atributo directo
        iframe.setAttribute('allowtransparency', 'true');

        // Limpiar cualquier contenido existente dentro del div 'banner-script-redireccion'
        // y luego agregar el iframe generado.
        container.innerHTML = '';
        container.appendChild(iframe);

        console.log(`Incrustador de Anuncios: iframe #${index + 1} generado con éxito. SRC: ${finalIframeSrc}`);
    });
});
