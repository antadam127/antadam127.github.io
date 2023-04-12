// Select elements
const pdfInput = document.querySelector('.pdf-input');
const browseComputer = document.querySelector('.browse-computer');
const fromUrl = document.querySelector('.from-url');
const chatInput = document.querySelector('.chat-input');
const sendBtn = document.querySelector('.send-btn');
const chatArea = document.querySelector('.chat-area');

// Samples
const sampleQuestions = [
    'What are the highest-grossing movies of all time?',
    'What are the top-rated movies on IMDb?',
    'Can you recommend a good action movie?',
    'What is the most iconic movie quote?',
    'Who won the Best Actor Oscar last year?'
];
const sampleResponses = [
    'I really enjoyed watching The Shawshank Redemption. The story is so powerful. I really enjoyed watching The Shawshank Redemption. The story is so powerful. I really enjoyed watching The Shawshank Redemption. The story is so powerful.',
    'My favorite movie is The Godfather. The acting and plot are fantastic. I really enjoyed watching The Shawshank Redemption. The story is so powerful. I really enjoyed watching The Shawshank Redemption. The story is so powerful.',
    'Inception is a great movie that really makes you think.',
    'One of the best animated movies I have seen is Spirited Away.',
    'Have you seen The Dark Knight? The performance by Heath Ledger as the Joker is outstanding. I really enjoyed watching The Shawshank Redemption. The story is so powerful.'
];


// Add PDF
function addPdf() {
    console.log('Adding PDF...');
}

// Browse from computer
browseComputer.addEventListener('click', () => {
    console.log('Browse from computer...');
    addPdf();
});

// Click Drop PDF
pdfInput.addEventListener('click', () => {
    console.log('Drop PDF...');
    addPdf();
});

// From URL
fromUrl.addEventListener('click', () => {
    console.log('From URL...');
    addPdf();
});


// Set random placeholder text for chat input
// chatInput.placeholder = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
function setPlaceholderText() {
    const question = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    const delayBetweenChars = 20; // Delay between typing each character in milliseconds

    let charIndex = 0;
    chatInput.placeholder = ''; // Clear the current placeholder
    const typeChar = (first) => {
        if (charIndex < question.length && (first || chatInput.placeholder.length > 0)) {
            chatInput.placeholder += question[charIndex];
            charIndex++;
            setTimeout(typeChar, delayBetweenChars);
        }
    };
    typeChar(true); // Start typing the placeholder text
}
setPlaceholderText();


// Add a message to the chat area
const allChats = [];
function addChatMessage(sender, message) {
    allChats.push({ role: sender, content: message });

    const messageElement = document.createElement('div');
    const messageClass = sender === 'user' ? 'user-message' : 'bot-message';
    messageElement.classList.add('chat-message', messageClass);

    const avatarElement = document.createElement('i');
    const chatIcon = sender === 'user' ? 'bi-person-fill' : 'bi-chat-fill';
    avatarElement.classList.add('chat-avatar', 'bi', chatIcon); // Use the desired Bootstrap icon class
    messageElement.appendChild(avatarElement);

    const textElement = document.createElement('div');
    const chatClass = sender === 'user' ? 'user-text' : 'bot-text';
    textElement.classList.add('chat-text', chatClass);
    textElement.textContent = message;
    messageElement.appendChild(textElement);

    chatArea.appendChild(messageElement);

    // Scroll to the bottom of the chat area
    chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
}

// Get AI response
let chatbotResponding = false;
function getAIResponse(explicitResponse) {
    chatbotResponding = true
    const enterButton = document.querySelector('.send-btn i');
    enterButton.classList.remove('bi-arrow-right-circle-fill');
    enterButton.classList.add('bi-chat-dots-fill');
    chatInput.placeholder = '';

    // Add chatbot response
    addChatMessage('bot', '...');

    // Simulate a 3-second delay for chatbot response
    setTimeout(() => {
        // Get a random response
        const response = explicitResponse?explicitResponse:sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        const responseWords = response.split(' ');
        allChats[allChats.length - 1].content = response;

        // Populate chatbot response one word at a time
        let wordIndex = 0;
        const minDelay = 0;
        const maxDelay = 250;
        const addWord = () => {
            if (wordIndex < responseWords.length) {
                const currentText = chatArea.lastElementChild.querySelector('.chat-text').textContent;
                chatArea.lastElementChild.querySelector('.chat-text').textContent = currentText + ' ' + responseWords[wordIndex];
                wordIndex++;
                setTimeout(addWord, minDelay + Math.random() * (maxDelay - minDelay)); // Slight random variations between the timing of each word
            } else {
                chatbotResponding = false;
                setTimeout(setPlaceholderText, 1000); // Set a new placeholder text after 1 second
                enterButton.classList.remove('bi-chat-dots-fill');
                enterButton.classList.add('bi-arrow-right-circle-fill');
                chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
            }
        };

        chatArea.lastElementChild.querySelector('.chat-text').textContent = ''; // Remove the three dots
        addWord(); // Start populating the chatbot response
    }, 200 + Math.random() * 2800);
}

// Send chat message
function sendChatMessage() {
    const messageText = chatInput.value.trim();
    if (messageText.length === 0 || chatbotResponding) {
        return;
    }
    addChatMessage('user', messageText);
    chatInput.value = '';

    console.log('Sending chat message...');

    // Get AI response
    getAIResponse();
}

// Send button click event
sendBtn.addEventListener('click', sendChatMessage);

// Chat input enter key event
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});


// Initialize
function init() {
    console.log('Initializing...');
    // addChatMessage('bot', 'Hi, I\'m a chatbot. I can answer questions about the PDF you upload.');
    // addChatMessage('user', 'Hi, what are your favorite movies?');
    // addChatMessage('bot', 'I like The Dark Knight, The Shawshank Redemption, and Spirited Away.');
    // addChatMessage('user', 'Whats another movie you like?');
    // getAIResponse('I like The Dark Knight, The Shawshank Redemption, and Spirited Away.');
    
    getAIResponse('Hi, I\'m a chatbot. I can answer questions about the PDF you upload.');
}

// Call init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);

// PDF Input Hover 
browseComputer.addEventListener('mouseover', () => pdfInput.classList.add('links-hovered'));
browseComputer.addEventListener('mouseout', () => pdfInput.classList.remove('links-hovered'));
fromUrl.addEventListener('mouseover', () => pdfInput.classList.add('links-hovered'));
fromUrl.addEventListener('mouseout', () => pdfInput.classList.remove('links-hovered'));
