import $ from "jquery";

$(function () {
    const apiKey = 'HBMa3Tla40HaFeGzyrgGcdcbiOaWfXGnxRZQvgQ8ANRVvqaTGskPlP9j';
    let page = 1; 
    const limit = 12; 
    const $container = $('#cards-container'); 
    const loading = $('<div>').addClass('loading text-center p-4').text('Cargando...');

    function fetchData() {
        return $.ajax({
            url: `https://api.pexels.com/v1/curated?per_page=${limit}&page=${page}`,
            method: 'GET',
            headers: {
                Authorization: apiKey 
            }
        });
    }

    // Función para mostrar las tarjetas con las imágenes
    function displayCards(photos) {
        photos.forEach(photo => {
            const cardElement = $('<div>', {
                class: 'card',
                html: `
                    <img src="${photo.src.medium}" alt="${photo.alt || 'Imagen'}">
                    <div class="card-content">
                        <h3 class="card-title">${photo.photographer}</h3>
                        <p class="card-text">Resolución: ${photo.width}x${photo.height}</p>
                    </div>
                `
            });
            $container.append(cardElement);
        });
    }

    // Función para cargar más imágenes
    function loadMore() {
        $container.append(loading); 
        fetchData()
            .done(data => {
                $container.find('.loading').remove(); 
                if (data.photos && data.photos.length > 0) { 
                    displayCards(data.photos);
                    page++; 
                } else {
                    console.warn('No hay más imágenes disponibles.');
                }
            })
            .fail(error => console.error('Error al cargar imágenes:', error));
    }

    loadMore();

    // Desplazamiento infinito con jQuery
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();
        const windowHeight = $(this).height();
        const documentHeight = $(document).height();
        if (scrollTop + windowHeight >= documentHeight - 500) {
            loadMore(); 
        }
    });
});
