document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselImages = document.querySelectorAll('.carousel-track img');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    let currentIndex = 0;
    const imageWidth = carouselImages[0] ? carouselImages[0].clientWidth + (parseInt(getComputedStyle(carouselImages[0]).marginRight) * 2) : 0; // Largura da imagem + suas margens
    const numImages = carouselImages.length;

    // Função para mover o carrossel
    function moveToSlide(index) {
        if (imageWidth === 0) return; // Evita erro se a largura da imagem for 0
        carouselTrack.style.transform = `translateX(${-index * imageWidth}px)`;
    }

    // Event listener para o botão "Próximo"
    nextButton.addEventListener('click', () => {
        if (currentIndex < numImages - 1) { // Verifica se não é a última imagem
            currentIndex++;
        } else {
            currentIndex = 0; // Volta para o início se for a última
        }
        moveToSlide(currentIndex);
    });

    // Event listener para o botão "Anterior"
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) { // Verifica se não é a primeira imagem
            currentIndex--;
        } else {
            currentIndex = numImages - 1; // Vai para o final se for a primeira
        }
        moveToSlide(currentIndex);
    });

    // Opcional: Ajustar largura do carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        // Recalcular a largura da imagem ao redimensionar, caso ela seja responsiva
        const newImageWidth = carouselImages[0] ? carouselImages[0].clientWidth + (parseInt(getComputedStyle(carouselImages[0]).marginRight) * 2) : 0;
        if (imageWidth !== newImageWidth) { // Apenas recalcula se a largura mudar
            imageWidth = newImageWidth;
            moveToSlide(currentIndex); // Reposiciona o carrossel
        }
    });

    // Chamar moveToSlide uma vez no carregamento para garantir a posição inicial
    moveToSlide(currentIndex);
});