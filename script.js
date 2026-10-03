document.addEventListener('DOMContentLoaded', () => {
    // Gallery Carousel Logic
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card) => {
        const mainImgBox = card.querySelector('.project-image-box');
        const mainImg = card.querySelector('.main-project-img');
        const thumbnails = card.querySelectorAll('.thumb');
        const leftArrow = card.querySelector('.left-arrow');
        const rightArrow = card.querySelector('.right-arrow');
        const counter = card.querySelector('.image-counter');
        const projectTitle = card.querySelector('.project-info h3').textContent;

        let currentIndex = 0;

        function updateGallery(index) {
            currentIndex = index;

            const activeThumb = thumbnails[currentIndex];
            if (activeThumb) {
                mainImg.src = activeThumb.src;
                mainImg.alt = activeThumb.alt;

                activeThumb.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'nearest',
                    block: 'nearest'
                });
            }

            thumbnails.forEach((thumb, idx) => {
                if (idx === currentIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });

            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${thumbnails.length}`;
            }
        }

        // Initialize total image counter correctly on load
        if (counter) {
            counter.textContent = `1 / ${thumbnails.length}`;
        }

        // Thumbnail Click Event
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                updateGallery(index);
            });
        });

        // Left Arrow Event
        if (leftArrow) {
            leftArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = thumbnails.length - 1;
                }
                updateGallery(newIndex);
            });
        }

        // Right Arrow Event
        if (rightArrow) {
            rightArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentIndex + 1;
                if (newIndex >= thumbnails.length) {
                    newIndex = 0;
                }
                updateGallery(newIndex);
            });
        }

        // Open Lightbox Modal Event
        mainImgBox.addEventListener('click', () => {
            openModal(mainImg.src, `${projectTitle} - IMAGE ${currentIndex + 1}`);
        });
    });

    // Lightbox Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCloseBtn = document.getElementById('modal-close');

    function openModal(imageSrc, titleText) {
        modalImg.src = imageSrc;
        modalTitle.textContent = titleText;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});