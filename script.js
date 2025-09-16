document.addEventListener("DOMContentLoaded", () => {
	const apiKey = "HVqaS9nDBg0NwsSahVvritUhspNeh1okElwo6M0m";
	const carouselInner = document.getElementById("carousel-inner");
	const searchInput = document.getElementById("searchInput");

	async function buscarFotos(query = "") {
		let url;
		// Se for número, busca por sol; se for texto, busca por câmera
		if (!isNaN(query) && query.trim() !== "") {
			url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${query}&api_key=${apiKey}`;
		} else if (query.trim() !== "") {
			// Busca por nome de câmera (ex: FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM)
			url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${query.toLowerCase()}&api_key=${apiKey}`;
		} else {
			url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;
		}

		carouselInner.innerHTML = "Carregando...";
		try {
			const response = await fetch(url);
			const data = await response.json();
			const photos = data.photos.slice(0, 10);

			if (photos.length === 0) {
				carouselInner.innerHTML = '<div class="text-center text-white">Nenhuma foto encontrada.</div>';
				return;
			}

			carouselInner.innerHTML = "";
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
	}

	// Busca inicial
	buscarFotos();

	// Busca ao pressionar Enter
	searchInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			buscarFotos(searchInput.value.trim());
		}
	});
});
