// Select elements
const pdfInput = document.querySelector('.pdf-input');
const browseComputer = document.querySelector('.browse-computer');
const fromUrl = document.querySelector('.from-url');
const chatInput = document.querySelector('.chat-input');
const sendBtn = document.querySelector('.send-btn');
const chatArea = document.querySelector('.chat-area');
const pdfContainer = document.querySelector('.pdf-container');

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


function addPdf() {
    const pdfName = 'test_pdf_gpt_filename.pdf';
    let pdfAbrv = pdfName;
    const len = 14;
    if (pdfName.length > len) pdfAbrv = pdfName.slice(0, len - 6) + "..." + pdfName.slice(-3);

    // Create PDF item
    const pdfItem = document.createElement('div');
    pdfItem.classList.add('pdf-item');
    // pdfItem.style.width = 0;
    // pdfItem.style.width = '105px';
    pdfItem.classList.add('init');
    setTimeout(() => {pdfItem.classList.remove('init');}, 1);
    pdfItem.innerHTML = `
      <img class="spinner" src="../../../assets/img/spinner.svg" alt="Loading spinner">
      <i class="bi bi-file-earmark-pdf pdf-icon init"></i>
      <div class="pdf-name init">${pdfAbrv}</div>
      <div style="font-size: 8px;">&nbsp;</div>
    `;
    setTimeout(() => {pdfItem.querySelector('i').classList.remove('init');}, 300);
    setTimeout(() => {pdfItem.querySelector('.pdf-name').classList.remove('init');}, 1);

    // Add the PDF item to the PDF container
    pdfContainer.appendChild(pdfItem);

    // Scroll to the right
    const pdfRow = pdfContainer.parentElement.parentElement;
    pdfRow.scrollTo({ left: pdfRow.scrollWidth - pdfRow.clientWidth, behavior: 'smooth' });

    pdfItem.classList.add('loading');
    let failed = Math.random() > 0.96;
    setTimeout(() => {
        pdfItem.classList.remove('loading');
        pdfItem.querySelector('img').remove();
        if (failed) {
            pdfItem.classList.add('failed');
            pdfItem.querySelector('i').classList.remove('bi-file-earmark-pdf');
            pdfItem.querySelector('i').classList.add('bi-x-circle');
        }
        setEventListeners(failed);
    }, 500 + Math.random() * 3500);


    function setEventListeners(badPDF) {
        // PDF READY
        function alertUser() {
            // Check if chatbot is currently responding
            if (chatbotResponding) {
                setTimeout(() => {
                    alertUser();
                }, 200);
            } else {
                getAIResponse(`PDF Ready: You can now ask me questions related to ${pdfName}`, true);
            }
        }
        if (!badPDF) alertUser();

        // Add event listener for showing the remove dropdown
        pdfItem.addEventListener('click', () => {
            pdfItem.querySelector('i').classList.toggle(failed ? 'bi-x-circle' : 'bi-file-earmark-pdf');
            pdfItem.querySelector('i').classList.toggle('bi-trash');
            pdfItem.classList.toggle('selected');
        });
        pdfItem.addEventListener('mouseleave', () => {
            pdfItem.querySelector('i').classList.add(failed ? 'bi-x-circle' : 'bi-file-earmark-pdf');
            pdfItem.querySelector('i').classList.remove('bi-trash');
            pdfItem.classList.remove('selected');
        });
        pdfItem.querySelector('i').addEventListener('click', (e) => {
            if (pdfItem.classList.contains('selected')) {
                e.preventDefault();
                e.stopPropagation();
                pdfItem.remove();
            }
        });

    }
}

// Browse from computer
browseComputer.addEventListener('click', () => {
    addPdf();
});

// Click Drop PDF
pdfInput.addEventListener('click', () => {
    addPdf();
});

// From URL
let showingURLPopup = false;
fromUrl.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!showingURLPopup) showURLPopup();
    showingURLPopup = true;
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
            // chatInput.placeholder += question[charIndex];
            chatInput.placeholder = question.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeChar, delayBetweenChars);
        }
    };
    typeChar(true); // Start typing the placeholder text
}
setPlaceholderText();


// Add a message to the chat area
let allChats = [];
function addChatMessage(sender, message) {
    allChats.push({ role: sender, content: message });

    const messageElement = document.createElement('div');
    const messageClass = sender === 'user' ? 'user-message' : sender === 'bot' ? 'bot-message' : 'alert-message';
    messageElement.classList.add('chat-message', messageClass);

    const avatarElement = document.createElement('i');
    const chatIcon = sender === 'user' ? 'bi-person-circle' : sender === 'bot' ? 'bi-chat-fill' : 'bi-exclamation-circle-fill';
    avatarElement.classList.add('chat-avatar', 'bi', chatIcon); // Use the desired Bootstrap icon class
    messageElement.appendChild(avatarElement);

    const textElement = document.createElement('div');
    const chatClass = sender === 'user' ? 'user-text' : sender === 'bot' ? 'bot-text' : 'alert-text';
    textElement.classList.add('chat-text', chatClass);
    textElement.textContent = message;
    messageElement.appendChild(textElement);

    chatArea.appendChild(messageElement);

    // Scroll to the bottom of the chat area
    chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
}

// Get AI response
let chatbotResponding = false;
function getAIResponse(explicitResponse, instant) {
    chatbotResponding = true
    const enterButton = document.querySelector('.send-btn i');
    enterButton.classList.remove('bi-arrow-right-circle-fill');
    enterButton.classList.add('bi-chat-dots-fill');
    chatInput.placeholder = '';

    // Add chatbot response
    addChatMessage(instant ? 'alert' : 'bot', '...');

    // Simulate a 3-second delay for chatbot response
    setTimeout(() => {
        // Get a random response
        const response = explicitResponse ? explicitResponse : sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        const responseWords = instant ? response.split('') : response.split(' ');
        allChats[allChats.length - 1].content = response;
        updateHash();

        // Populate chatbot response one word at a time
        let wordIndex = 0;
        const minDelay = 0;
        const maxDelay = 250;
        const addWord = () => {
            if (wordIndex < responseWords.length) {
                const currentText = chatArea.lastElementChild.querySelector('.chat-text').textContent;
                chatArea.lastElementChild.querySelector('.chat-text').textContent = currentText + (instant ? '' : ' ') + responseWords[wordIndex];
                wordIndex++;
                setTimeout(addWord, instant ? 7 : (minDelay + Math.random() * (maxDelay - minDelay))); // Slight random variations between the timing of each word
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
    }, instant ? 0 : 200 + Math.random() * 2800);
}

// Send chat message
function sendChatMessage() {
    const messageText = chatInput.value.trim();
    if (messageText.length === 0 || chatbotResponding) {
        return;
    }
    addChatMessage('user', messageText);
    updateHash();
    chatInput.value = '';

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

// Deal with the Hash
const hashMode = false;
if (!hashMode) {
    window.addEventListener('hashchange', () => {
        console.log('Hash changed');
        const base64String = window.location.hash.substring(1);
        if (base64String) {
            chatArea.innerHTML = '';
            init();
        }
    });
}

function updateHash(returnHash) {
    if (!hashMode && !returnHash) return;
    const msgpack = msgpack5();
    const binaryData = msgpack.encode(allChats);
    const base64String = btoa(String.fromCharCode.apply(null, binaryData));
    if (returnHash) return base64String;
    window.location.hash = base64String;
}

function decodeHash() {
    const base64String = window.location.hash.substring(1);
    if (!hashMode && (window.location.href.endsWith('#') || base64String)) window.location.hash = '';
    if (base64String) {
        console.log('Decoding hash...')
        try {
            const binaryData = new Uint8Array(
                atob(base64String)
                    .split('')
                    .map((c) => c.charCodeAt(0))
            );
            const msgpack = msgpack5();
            const chatArray = msgpack.decode(binaryData);
            return chatArray;
        } catch (error) {
            console.error('Error decoding hash:', error);
            return [];
        }
    } else {
        console.log('No hash...')
        return [];
    }
}

function initializeMessages() {
    const chatsToAdd = allChats;
    allChats = [];

    const instant = true;
    if (chatsToAdd[chatsToAdd.length - 1].role === 'bot' && !instant) {
        for (let i = 0; i < chatsToAdd.length - 1; i++) {
            if (chatsToAdd[i].role !== 'alert') addChatMessage(chatsToAdd[i].role, chatsToAdd[i].content);
        }
        getAIResponse(chatsToAdd[chatsToAdd.length - 1].content);
    } else {
        chatsToAdd.forEach((chat) => {
            if (chat.role !== 'alert') addChatMessage(chat.role, chat.content);
        });
    }
}

// Initialize
const initialPrompt = 'Hi, I\'m a chatbot. I can answer questions about the PDFs you upload.';
function init() {
    allChats = decodeHash();

    if (allChats.length > 0) {
        initializeMessages();
    } else {
        getAIResponse(initialPrompt);
    }

}

// Call init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);

// PDF Input Hover 
browseComputer.addEventListener('mouseover', () => pdfInput.classList.add('links-hovered'));
browseComputer.addEventListener('mouseout', () => pdfInput.classList.remove('links-hovered'));
fromUrl.addEventListener('mouseover', () => pdfInput.classList.add('links-hovered'));
fromUrl.addEventListener('mouseout', () => pdfInput.classList.remove('links-hovered'));

function showURLPopup() {
    const popup = document.createElement('div');
    popup.className = 'url-popup';

    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.className = 'url-input';
    urlInput.placeholder = 'https://example.com/file.pdf';

    const findPdfButton = document.createElement('button');
    findPdfButton.className = 'url-btn';
    findPdfButton.textContent = 'Find PDF';

    popup.appendChild(urlInput);
    popup.appendChild(findPdfButton);
    document.body.appendChild(popup);

    const rect = fromUrl.getBoundingClientRect();
    popup.style.position = 'fixed';
    popup.style.width = `70%`;
    popup.style.left = `50%`;
    popup.style.top = `${rect.bottom + window.scrollY + 8}px`;
    popup.style.transform = `translateX(-50%)`;

    urlInput.focus();

    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkURL();
        }
    });

    findPdfButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        checkURL();
    });

    urlInput.addEventListener('input', () => {
        urlInput.classList.remove('input-error');
    });

    function checkURL() {
        const url = urlInput.value.trim();
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/[^/]*\.pdf$/i;
        if (!urlPattern.test(url)) {
            urlInput.classList.add('input-error');
            urlInput.select();
        } else {
            // Code to handle a valid URL
            removeNow();
            addPdf();
        }
    }

    document.addEventListener('click', removePopup);
    function removePopup(event) {
        if (!popup.contains(event.target)) {
            removeNow();
        }
    }

    function removeNow() {
        popup.remove();
        showingURLPopup = false;
        document.removeEventListener('click', removePopup);
    }
};

// Tooltips
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

document.getElementById('share-icon').addEventListener('click', () => {
    console.log('Share button clicked');
    // Copy URL to clipboard
    let hashUrl = window.location.href;
    if (!hashMode) {
        const hash = updateHash(true);
        hashUrl = `${window.location.href.split('#')[0]}#${hash}`;
    }
    navigator.clipboard.writeText(hashUrl).then(() => {
        // Show toast
        const toastElement = document.getElementById('toast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }).catch((error) => {
        console.error('Error copying URL to clipboard:', error);
    });
});

document.getElementById('clear-icon').addEventListener('click', () => {
    resetChat();
});

function resetChat() {
    allChats = [];
    updateHash();
    chatArea.innerHTML = '';
    getAIResponse(initialPrompt);
}