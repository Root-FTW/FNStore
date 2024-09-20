const apiUrl = 'https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/mp-item-shop?lang=es';

async function fetchShopData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayShopItems(data.shopData.sections);
    } catch (error) {
        console.error('Error fetching shop data:', error);
        document.getElementById('shop-container').innerHTML = `<p>Error al cargar la tienda: ${error.message}</p>`;
    }
}

function displayShopItems(sections) {
    const shopContainer = document.getElementById('shop-container');
    shopContainer.innerHTML = ''; // Limpiar el contenedor

    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('section');
        sectionDiv.innerHTML = `<h2>${section.displayName}</h2>`;
        
        section.metadata.offerGroups.forEach(offerGroup => {
            const card = document.createElement('div');
            card.classList.add('card');

            const offerGroupData = offerGroup.metadata;
            const title = offerGroupData.textMetadata.find(item => item.key === 'title')?.value || 'Sin título';
            const subtitle = offerGroupData.textMetadata.find(item => item.key === 'subtitle')?.value || '';
            const imageUrl = offerGroupData.textureMetadata.find(item => item.key === 'bodyImage')?.value || '';

            card.innerHTML = `
                <img src="${imageUrl}" alt="${title}">
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${subtitle}</p>
                    <button>Ver Oferta</button>
                </div>
            `;

            sectionDiv.appendChild(card);
        });

        shopContainer.appendChild(sectionDiv);
    });
}

// Llamar a la función para obtener y mostrar los datos de la tienda
fetchShopData();
