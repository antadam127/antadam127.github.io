// Replace YOUR_API_KEY with your actual API key
const API_KEY = "YOUR_API_KEY";

// Replace ARTICLE_LINKS with an array of links to the articles you want to analyze
const ARTICLE_LINKS = ["https://www.example.com/article1", "https://www.example.com/article2", "https://www.example.com/article3"];

// Define a function to fetch the article content and perform sentiment analysis
async function analyzeArticle(link) {
  const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=en&url=${link}`);
  const data = await response.json();
  const { agreement, score_tag } = data;
  return { agreement, score_tag };
}

// Define a function to loop through all the articles and update their news cards with the analysis results
async function updateNewsCards() {
  const newsCards = document.querySelectorAll(".news-card");
  const numCards = newsCards.length;
  for (let i = 0; i < numCards; i++) {
    const card = newsCards[i];
    card.style.background = "lightgray"; // Set the news card background color to gray while it is being scraped
    const link = ARTICLE_LINKS[i];
    const { agreement, score_tag } = await analyzeArticle(link);
    card.style.background = ""; // Reset the news card background color
    const sentiment = score_tag.toLowerCase();
    const sentimentText = `${sentiment.charAt(0).toUpperCase()}${sentiment.slice(1)}`;
    card.innerHTML += `<div>Agreement: ${agreement}</div><div>Sentiment: ${sentimentText}</div><div>Score: ${score_tag}</div>`;
  }
}

// Call the updateNewsCards function to start the sentiment analysis
updateNewsCards();
