<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="styles.css">

</head>

<body>
    <header>
        <h1>My Gallery</h1>
        <p>Search for images and Videos</p>
    </header>
    <main>
        <div id="collections-list"></div>
        <div class="search-section">
            <div class="search-bar">
                <select id="search-type">
                    <option value="images" selected>Images</option>
                    <option value="videos">Videos</option>
                    <option value="all">All</option>
                </select>
                <input type="text" id="search-query" placeholder="Search for images or videos..."
                    onkeypress="handleEnter(event)">
                <button onclick="performSearch()"><i class="fas fa-search"></i> Search</button>
            </div>
            <button class="trending-button" onclick="fetchTrendingImages()"><i class="fas fa-fire"></i>
                Trending</button>
        </div>
        <div id="images-list" class="media-list"></div>
        <button id="load-more-images" class="load-more-button" style="display: none;" onclick="loadMoreImages()">Load
            More Images</button>
        <div id="videos-list" class="media-list"></div>
        <button id="load-more-videos" class="load-more-button" style="display: none;" onclick="loadMoreVideos()">Load
            More Videos</button>
        <form action="logout.php" method="POST">
            <button type="submit">Logout</button>
        </form>
    </main>


</body>
<script src="script.js"></script>

</html>