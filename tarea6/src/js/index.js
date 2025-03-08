import 'flowbite';

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'HBMa3Tla40HaFeGzyrgGcdcbiOaWfXGnxRZQvgQ8ANRVvqaTGskPlP9j';
    let page = 1;
    const limit = 12;
    const container = document.getElementById('cards-container');
    const loading = document.createElement('div');
    loading.className = 'p-4 text-center loading';
    loading.textContent = 'Cargando...';

    // Función para obtener datos de la API de Pexels
    async function fetchData() {
        const response = await fetch(
            `https://api.pexels.com/v1/curated?per_page=${limit}&page=${page}`,
            {
                headers: {
                    Authorization: apiKey
                }
            }
        );
        if (!response.ok) {
            throw new Error(`Error al cargar datos: ${response.status}`);
        }
        return await response.json();
    }

    // Función para mostrar las tarjetas con las imágenes
    function displayCards(photos) {
        photos.forEach(photo => {
            const cardElement = document.createElement('div');
            cardElement.className = 'transition-transform duration-300 ease-in-out transform card hover:scale-105';

            cardElement.innerHTML = `
<img src="${photo.src.medium}" alt="${photo.alt || 'Imagen'}">
                    <div class="card-content">
                        <h3 class="card-title">${photo.photographer}</h3>
                        <p class="card-text">Resolución: ${photo.width}x${photo.height}</p>
                    </div>
            `;

            container.appendChild(cardElement);
        });
    }

    // Función para cargar más imágenes
    async function loadMore() {
        container.appendChild(loading);
        try {
            const data = await fetchData();
            if (data.photos && data.photos.length > 0) {
                displayCards(data.photos);
                page++;
            } else {
                console.warn('No hay más imágenes disponibles.');
            }
        } catch (error) {
            console.error('Error al cargar imágenes:', error);
        } finally {
            container.removeChild(loading);
        }
    }

    // Carga inicial
    loadMore();

    // Desplazamiento infinito con Intersection Observer
    const sentinel = document.querySelector('.sentinel');
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) loadMore();
    }, { threshold: 0.1 });
    observer.observe(sentinel);
});
