    let currentIndex = 0;

    // Função para calcular a largura total de uma imagem, incluindo suas margens
    function calculateImageTotalWidth() {
        // Pega a primeira imagem para calcular a largura, assumindo que todas têm a mesma largura e margens
        const firstImage = carouselImages[0];
        const imageRect = firstImage.getBoundingClientRect(); // Largura real do elemento
        const imageStyle = getComputedStyle(firstImage); // Estilos computados para pegar as margens
        const marginLeft = parseFloat(imageStyle.marginLeft);
        const marginRight = parseFloat(imageStyle.marginRight);
        
        // Retorna a largura do elemento mais as margens laterais
        return imageRect.width + marginLeft + marginRight;
    }

    // Função para mover o carrossel para um slide específico
    function moveToSlide(index) {
        const imageWidth = calculateImageTotalWidth(); // Recalcula a largura sempre que for mover
        
        if (imageWidth === 0) {
            console.warn('Largura da imagem do carrossel é 0. Verifique o CSS das imagens do carrossel (width e margin).');
            return;
        }
        
        // Aplica a transformação translateX para rolar o track
        carouselTrack.style.transform = `translateX(${-index * imageWidth}px)`;
    }

    // Event listener para o botão "Próximo"
    nextButton.addEventListener('click', () => {
        // Se não for a última imagem, avança
        if (currentIndex < carouselImages.length - 1) {
            currentIndex++;
        } else {
            // Se for a última, volta para o início (loop)
            currentIndex = 0; 
        }
        moveToSlide(currentIndex);
    });

    // Event listener para o botão "Anterior"
    prevButton.addEventListener('click', () => {
        // Se não for a primeira imagem, retrocede
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Se for a primeira, vai para a última (loop)
            currentIndex = carouselImages.length - 1; 
        }
        moveToSlide(currentIndex);
    });

    // Ajustar a posição do carrossel ao redimensionar a janela
    // Isso garante que se as larguras das imagens mudarem devido à responsividade,
    // o carrossel se ajuste à posição correta.
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex); 
    });

    // Chamar moveToSlide uma vez no carregamento inicial para garantir a posição
    // Um pequeno atraso pode ajudar a garantir que todas as imagens foram renderizadas
    // e suas dimensões estão corretas antes do cálculo inicial.
    setTimeout(() => {
        moveToSlide(currentIndex);
    }, 100); 
});