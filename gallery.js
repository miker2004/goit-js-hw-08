document.addEventListener('DOMContentLoaded', function () {
    const images = [
        {
            preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/orchids-4202820__480.jpg',
            original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/orchids-4202820_1280.jpg',
            description: 'Hokkaido Flower',
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
            description: 'Container Haulage Freight',
        },
    ];

    const gallery = document.querySelector("ul.gallery");

    const galleryStyles = `
        ul.gallery {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 24px;
            list-style-type: none;
            padding: 0;
        }
        .gallery-item {
            position: relative;
            width: 360px; 
            height: 200px; 
        }
        .image-container {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100%;
        }
        .image-container img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s;
            cursor: pointer;
        }
        .image-container img:hover {
            transform: scale(1.1);
        }
    `;

    document.head.insertAdjacentHTML('beforeend', `<style>${galleryStyles}</style>`);

    const generateImageHTML = images => images.map(({ preview, description }) => `
        <li class="gallery-item">
            <div class="image-container">
                <img src="${preview}" alt="${description}">
            </div>
        </li>
    `).join('');

    gallery.innerHTML = generateImageHTML(images);

    const selectPhotos = document.querySelectorAll(".gallery-item img");
    selectPhotos.forEach((photo, index) => {
        photo.addEventListener("click", () => {
            const instance = basicLightbox.create(`
                <img src="${images[index].original}" alt="${images[index].description}" style="max-width: 100vw; max-height: 100vh;">
            `);
            instance.show();

            const lb = document.querySelector('.basicLightbox');
            lb.style.display = 'flex';
            lb.style.justifyContent = 'center';
            lb.style.alignItems = 'center';
            lb.style.position = 'fixed';
            lb.style.top = '0';
            lb.style.left = '0';
            lb.style.width = '100%';
            lb.style.height = '100%';
            lb.style.backgroundColor = '#2E2F42'; 

            document.body.style.overflow = 'hidden';

            const closeLightbox = function (event) {
                if (event.key === 'Escape') {
                    instance.close();
                    document.body.style.overflow = ''; 
                }
            };

            document.addEventListener('keydown', closeLightbox);

            instance.element().addEventListener('click', function () {
                instance.close();
                document.removeEventListener('keydown', closeLightbox); 
                document.body.style.overflow = '';
            });
        });
    });
});