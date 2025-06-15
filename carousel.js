document.addEventListener('DOMContentLoaded', function() {
    // Путь к папке с изображениями
    const imageFolder = 'foto/images/'; // Замените на ваш путь
    
    // Массив с именами файлов изображений
    const imageFiles = [
        'photo_2024-07-09_15-25-46.jpg',
        'photo_2024-08-27_22-26-39.jpg',
        'photo_2024-11-23_13-50-23.jpg',
        'photo_2024-12-31_22-45-57.jpg',
        'photo_2024-12-31_22-46-53.jpg',
        'photo_2025-01-26_23-35-56.jpg',
        'photo_2025-02-08_15-46-38.jpg',
        'photo_2025-06-15_18-06-13.jpg',
        'photo_2025-06-15_18-06-19.jpg'
    ]; // Замените на ваши файлы
    
    // Элементы карусели
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const counter = document.querySelector('.image-counter');
    
    let currentIndex = 0;
    
    // Загрузка изображений в карусель
    function loadImages() {
        imageFiles.forEach((file, index) => {
            const img = document.createElement('img');
            img.src = imageFolder + file;
            img.alt = `Изображение ${index + 1}`;
            carousel.appendChild(img);
            
            // Создаем точки для навигации
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        updateCounter();
    }
    
    // Переход к конкретному слайду
    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Обновляем активную точку
        document.querySelectorAll('.dot').forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        updateCounter();
    }
    
    // Переход к следующему слайду
    function nextSlide() {
        currentIndex = (currentIndex + 1) % imageFiles.length;
        goToSlide(currentIndex);
    }
    
    // Переход к предыдущему слайду
    function prevSlide() {
        currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
        goToSlide(currentIndex);
    }
    
    // Обновление счетчика изображений
    function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${imageFiles.length}`;
    }
    
    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Автопрокрутка (опционально)
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Остановка автопрокрутки при наведении
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
    
    // Загрузка изображений при старте
    loadImages();
    
    // Обработка клавиш клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
});