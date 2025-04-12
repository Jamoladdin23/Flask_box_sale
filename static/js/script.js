

document.addEventListener("DOMContentLoaded", function () {
    initModal();
    let currentSlideIndex = 0;

    });

    function initModal() {
        const closeButton = document.querySelector('.close');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        const images = document.querySelectorAll('div.col img');

        if (!closeButton || !prevButton || !nextButton || !images.length) {
            console.error("Не найдены необходимые элементы модального окна!");
            return;
        }


        closeButton.addEventListener('click', closeModal);
        prevButton.addEventListener('click', () => changeSlide(-1));
        nextButton.addEventListener('click', () => changeSlide(1));
        images.forEach((image, index) => {
            image.addEventListener('click', (event) => openModal(event, index));
        });

        document.addEventListener('keydown', handleKeydown);
    }

    function openModal(event, index) {
        console.log("openModal triggered");
        const modal = document.getElementById('myModal');
        const modalImg = document.getElementById('modalImage');
        const images = document.querySelectorAll('div.col img');

        if (!modal || !modalImg || !images.length) {
            console.error("Модальное окно или изображения не найдены!");
            return;
        }


        currentSlideIndex = index;
        modal.style.display = 'block';
        modalImg.src = images[currentSlideIndex].src;


        history.pushState({ modalOpen: true }, null, location.href);

    }

    function closeModal() {
        console.log("closeModal triggered");
        const modal = document.getElementById('myModal');
        if (modal) {
            modal.style.display = 'none';
            history.replaceState(null, null, location.href); // Обновляем состояние без сохранения модального окна
        }
    }

    window.addEventListener('popstate', function (event) {
        const modal = document.getElementById('myModal');
        if (event.state && event.state.modalOpen) {
            // Если состояние открытого модального окна сохранено, закрываем его
            if (modal) {
                modal.style.display = 'none';
                console.log("Modal closed due to popstate");
            }
        }
    });


        // Добавляем обработчик для события "popstate"
//    window.addEventListener('popstate', function (event) {
//        const modal = document.getElementById('myModal');
//        if (modal && modal.style.display === 'block') {
//            modal.style.display = 'none'; // Гарантированно закрываем модальное окно
//            console.log("Modal closed due to popstate event");
//        }
//    });

    function changeSlide(direction) {
        console.log("changeSlide triggered with direction:", direction);
        const images = document.querySelectorAll('div.col img');
        const modalImg = document.getElementById('modalImage');

        if (!images.length || !modalImg) {
            console.error("Изображения или модальное окно отсутствуют!");
            return;
        }

        currentSlideIndex += direction;

        if (currentSlideIndex >= images.length) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = images.length - 1;
        }

        modalImg.src = images[currentSlideIndex].src;
        console.log("Current slide index:", currentSlideIndex);
    }

//    images.forEach((image, index) => {
//    image.addEventListener('click', (event) => {
//        console.log(`Image ${index} clicked`);
//        openModal(event, index);
//    });
//});

    function handleKeydown(event) {
        if (event.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
            changeSlide(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }

console.log("openModal triggered");
console.log("Modal element:", modal);
console.log("Image element:", modalImg);




