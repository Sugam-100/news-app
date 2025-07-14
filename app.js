async function getNews() {
  const location = document.getElementById('location').value;
  const newsContainer = document.getElementById('news-container');
  const errorDiv = document.getElementById('error');

  // Clear previous results
  newsContainer.innerHTML = '';
  errorDiv.textContent = '';

  if (!location) {
    errorDiv.textContent = 'Please enter a location.';
    return;
  }

  // ✅ Fetch from your serverless backend
  const apiUrl = `/api/fetchNews?location=${location}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Could not fetch news. Please try again later.');
    }

    const data = await response.json();
    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
      });
    } else {
      newsContainer.innerHTML = '<p>No news articles found for this location.</p>';
    }
  } catch (error) {
    errorDiv.textContent = error.message;
  }
}
