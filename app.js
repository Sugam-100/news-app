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

  // ✅ Use CORS proxy to bypass browser restrictions
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = `https://newsapi.org/v2/everything?q=${location}&language=en&sortBy=publishedAt&apiKey=c3ae1edacc0042588c90e300fedc2a9b`;
  const fullUrl = proxy + apiUrl;

  try {
    const response = await fetch(fullUrl);
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
