const form = document.querySelector('#region-form');
const newsContainer = document.querySelector('#news-container');
const apiKey = 'b0c62d8c73e74f77b72efe7115241fdb';
const articles = [];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Remove the class "invisible" from the element with ID "aiButton"
  document.getElementById("aiButton").classList.remove("invisible");

  const region = form.elements.region.value;
  const url = `https://newsapi.org/v2/top-headlines?country=${region}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    newsContainer.innerHTML = '';

    data.articles.slice(0, 9).forEach(article => {
      articles.push(article.url);
      const newsCard = document.createElement('div');
      newsCard.classList.add('news-card');
      newsCard.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <p>${article.publishedAt}</p>
        <p><a href="${article.url}" target="_blank">Read More</a></p>
      `;
      newsContainer.appendChild(newsCard);
    });
    console.log(articles)
  } catch (error) {
    console.error(error);
  }
});

form.addEventListener('AI', async (e) => {
  e.preventDefault();

  // const region = form.elements.region.value;
  // const url = `https://newsapi.org/v2/top-headlines?country=${region}&apiKey=${apiKey}`;

  // try {
  //   const response = await fetch(url);
  //   const data = await response.json();

  //   newsContainer.innerHTML = '';

  //   data.articles.slice(0, 9).forEach(article => {
  //     articles.push(article.url);
  //     const newsCard = document.createElement('div');
  //     newsCard.classList.add('news-card');
  //     newsCard.innerHTML = `
  //       <h2>${article.title}</h2>
  //       <p>${article.description}</p>
  //       <p>${article.publishedAt}</p>
  //       <p><a href="${article.url}" target="_blank">Read More</a></p>
  //     `;
  //     newsContainer.appendChild(newsCard);
  //   });
  //   console.log(articles)
  // } catch (error) {
  //   console.error(error);
  // }
});