const apiKey = '19LaFyGTiwhkOVmhhLB06O60QHdeMaulahQcA1xFUVFs9s5nlqiswlDr'; // Use the provided Pexels API key
let imagesPage = 1;
let videosPage = 1;
let searchQuery = '';
let searchType = 'images';

// Fetch and display collections when the page loads
document.addEventListener('DOMContentLoaded', fetchCollections);

async function fetchCollections() {
    const url = `https://api.pexels.com/v1/collections/featured?page=1&per_page=18`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching collections');
        }

        const data = await response.json();
        console.log('Fetched collections:', data.collections); // Debugging log
        displayCollections(data.collections);
    } catch (error) {
        console.error('Error fetching collections:', error);
        document.getElementById('collections-list').innerHTML = `<p>Error fetching collections: ${error.message}</p>`;
    }
}

async function fetchCollectionMedia(collectionId) {
    const url = `https://api.pexels.com/v1/collections/${collectionId}?type=photos`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching collection media');
        }

        const data = await response.json();
        console.log('Fetched collection media:', data.media); // Debugging log
        return data.media;
    } catch (error) {
        console.error('Error fetching collection media:', error);
        return null;
    }
}

async function displayCollections(collections) {
    const container = document.getElementById('collections-list');
    container.innerHTML = '';

    for (const collection of collections) {
        const mediaItems = await fetchCollectionMedia(collection.id);
        if (mediaItems && mediaItems.length > 0) {
            const imgSrc = mediaItems[0].src.medium;
            if (imgSrc) {
                const mediaItem = document.createElement('div');
                mediaItem.className = 'collection-card';
                mediaItem.onclick = () => displayCollectionImages(mediaItems);

                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = collection.title;

                const title = document.createElement('h3');
                title.textContent = collection.title;

                mediaItem.appendChild(img);
                mediaItem.appendChild(title);
                container.appendChild(mediaItem);
            }
        }
    }
}

function displayCollectionImages(images) {
    const container = document.getElementById('images-list');
    container.innerHTML = '';

    images.forEach(image => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';

        const img = document.createElement('img');
        img.src = image.src.medium;
        img.alt = image.alt;

        const gradientOverlay = document.createElement('div');
        gradientOverlay.className = 'gradient-overlay';

        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = image.alt;

        const downloadIcon = document.createElement('a');
        downloadIcon.href = image.src.original;
        downloadIcon.download = `image-${image.id}.jpg`;
        downloadIcon.className = 'download-icon';
        downloadIcon.innerHTML = '<i class="fas fa-download"></i>';

        gradientOverlay.appendChild(description);
        gradientOverlay.appendChild(downloadIcon);
        mediaItem.appendChild(img);
        mediaItem.appendChild(gradientOverlay);
        container.appendChild(mediaItem);
    });

    document.getElementById('load-more-images').style.display = 'none'; // Hide load more button for collections
}

async function fetchImages() {
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=30&page=${imagesPage}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching images');
        }

        const data = await response.json();
        displayImages(data.photos);
    } catch (error) {
        console.error('Error fetching images:', error);
        document.getElementById('images-list').innerHTML = `<p>Error fetching images: ${error.message}</p>`;
    }
}

async function loadMoreImages() {
    imagesPage++;
    fetchImages();
}

function displayImages(images) {
    const container = document.getElementById('images-list');
    if (imagesPage === 1) {
        container.innerHTML = '';
    }

    images.forEach(image => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';

        const img = document.createElement('img');
        img.src = image.src.medium;
        img.alt = image.alt;

        const gradientOverlay = document.createElement('div');
        gradientOverlay.className = 'gradient-overlay';

        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = image.alt;

        const downloadIcon = document.createElement('a');
        downloadIcon.href = image.src.original;
        downloadIcon.download = `image-${image.id}.jpg`;
        downloadIcon.className = 'download-icon';
        downloadIcon.innerHTML = '<i class="fas fa-download"></i>';

        gradientOverlay.appendChild(description);
        gradientOverlay.appendChild(downloadIcon);
        mediaItem.appendChild(img);
        mediaItem.appendChild(gradientOverlay);
        container.appendChild(mediaItem);
    });

    document.getElementById('load-more-images').style.display = 'block';
}

async function fetchTrendingImages() {
    imagesPage = 1;
    const url = `https://api.pexels.com/v1/curated?per_page=30&page=${imagesPage}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching trending images');
        }

        const data = await response.json();
        document.getElementById('search-query').value = '';
        displayImages(data.photos);
        document.getElementById('videos-list').innerHTML = '';
        document.getElementById('load-more-videos').style.display = 'none';
    } catch (error) {
        console.error('Error fetching trending images:', error);
        document.getElementById('images-list').innerHTML = `<p>Error fetching trending images: ${error.message}</p>`;
    }
}

async function fetchVideos() {
    const url = `https://api.pexels.com/videos/search?query=${searchQuery}&per_page=30&page=${videosPage}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching videos');
        }

        const data = await response.json();
        displayVideos(data.videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        document.getElementById('videos-list').innerHTML = `<p>Error fetching videos: ${error.message}</p>`;
    }
}

async function loadMoreVideos() {
    videosPage++;
    fetchVideos();
}

function displayVideos(videos) {
    const container = document.getElementById('videos-list');
    if (videosPage === 1) {
        container.innerHTML = '';
    }

    videos.forEach(video => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';

        const videoElement = document.createElement('video');
        videoElement.src = video.video_files[0].link;
        videoElement.controls = true;

        const gradientOverlay = document.createElement('div');
        gradientOverlay.className = 'gradient-overlay';

        const downloadIcon = document.createElement('a');
        downloadIcon.href = video.video_files[0].link;
        downloadIcon.download = `video-${video.id}.mp4`;
        downloadIcon.className = 'download-icon';
        downloadIcon.innerHTML = '<i class="fas fa-download"></i>';

        gradientOverlay.appendChild(downloadIcon);
        mediaItem.appendChild(videoElement);
        mediaItem.appendChild(gradientOverlay);
        container.appendChild(mediaItem);
    });

    document.getElementById('load-more-videos').style.display = 'block';
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    searchQuery = document.getElementById('search-query').value;
    searchType = document.getElementById('search-type').value;
    imagesPage = 1;
    videosPage = 1;

    if (searchType === 'images' || searchType === 'all') {
        fetchImages();
    }

    if (searchType === 'videos' || searchType === 'all') {
        fetchVideos();
    }
}