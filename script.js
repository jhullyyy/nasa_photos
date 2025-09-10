// filepath: c:\Users\Jhully.Aguiar\Documents\nasa_projeto\script.js
document.addEventListener("DOMContentLoaded", async () => {
	const apiKey = "HVqaS9nDBg0NwsSahVvritUhspNeh1okElwo6M0m"; // Troque por sua chave da NASA se tiver
	const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;
	const carouselInner = document.getElementById("carousel-inner");

	try {
		const response = await fetch(url);
		const data = await response.json();
		const photos = data.photos.slice(0, 100); // Pega as 5 primeiras fotos

		if (photos.length === 0) {
			carouselInner.innerHTML = '<div class="text-center text-white">Nenhuma foto encontrada.</div>';
			return;
		}

		photos.forEach((photo, index) => {
			const activeClass = index === 0 ? "active" : "";
			const item = document.createElement("div");
			item.className = `carousel-item ${activeClass}`;
			item.innerHTML = `
                <img src="${photo.img_src}" class="d-block w-100" alt="Foto de Marte da NASA">
                <div class="carousel-caption d-none d-md-block">
                    <p>${photo.earth_date} - ${photo.camera.full_name}</p>
                </div>
            `;
			carouselInner.appendChild(item);
		});
	} catch (error) {
		carouselInner.innerHTML = '<div class="text-center text-danger">Erro ao carregar imagens da NASA.</div>';
	}
});
