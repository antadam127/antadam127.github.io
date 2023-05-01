// Select elements
const pdfInput = document.querySelector('.pdf-input');
const browseComputer = document.querySelector('.browse-computer');
const fromUrl = document.querySelector('.from-url');
const chatInput = document.querySelector('.chat-input');
const sendBtn = document.querySelector('.send-btn');
const chatArea = document.querySelector('.chat-area');
const pdfContainer = document.querySelector('.pdf-container');
const hiddenFileInput = document.getElementById('hiddenFileInput');

// Samples
let sampleQuestions = [
    'What are the highest-grossing movies of all time?',
    'What are the top five most populous countries in the world?',
    'How many elements are on the periodic table?',
    'How much does the average person weigh?',
    'What is the longest river in the world?',
    'What is the smallest country in the world?',
    'How many countries make up the United Nations?',
    'How many moons does Jupiter have?',
    'What is the hottest planet in our solar system?',
    'What is the highest mountain in the world?',
    'What is the smallest mammal in the world?',
    'How many languages are spoken in the world?',
    'What are the most complex organisms on Earth?',
    'What were the key factors that led to the rise and fall of ancient civilizations?',
    'Why do isolated islands have such diverse bird species?',
    'What defines consciousness, and can machines attain it?',
    'How does morality differ across cultures and why?',
    'What are the member states of NATO?',
];

async function addPdf(file) {
    // const pdfName = Math.random() > 0.5 ? 'test_pdf_GPT_filename.pdf' : 'test_pdf.pdf';
    const pdfName = file ? file.name : 'test_pdf_GPT_filename.pdf';
    let pdfAbrv = pdfName;
    const len = 14;
    if (pdfName.length > len) pdfAbrv = pdfName.slice(0, len - 6) + "..." + pdfName.slice(-3);
    if (pdfName.length > len) console.log('Too long. New Name: ', pdfAbrv);

    // Create PDF item
    const pdfItem = document.createElement('div');
    pdfItem.classList.add('pdf-item');
    // pdfItem.style.width = 0;
    // pdfItem.style.width = '105px';
    pdfItem.classList.add('init');
    setTimeout(() => { pdfItem.classList.remove('init'); }, 1);
    pdfItem.innerHTML = `
      <img class="spinner" src="../../../assets/img/spinner.svg" alt="Loading spinner">
      <i class="bi bi-file-earmark-pdf pdf-icon init"></i>
      <div class="pdf-name init">${pdfAbrv}</div>
      <div style="font-size: 8px;">&nbsp;</div>
    `;
    setTimeout(() => { pdfItem.querySelector('i').classList.remove('init'); }, 300);
    setTimeout(() => { pdfItem.querySelector('.pdf-name').classList.remove('init'); }, 1);

    // Add the PDF item to the PDF container
    pdfContainer.appendChild(pdfItem);

    // Scroll to the right
    const pdfRow = pdfContainer.parentElement.parentElement;
    pdfRow.scrollTo({ left: pdfRow.scrollWidth - pdfRow.clientWidth, behavior: 'smooth' });


    // Get the file ready
    pdfItem.classList.add('loading');
    // let failed = Math.random() > 0.96;
    let failed = false;

    function settlePDFLoading() {
        pdfItem.classList.remove('loading');
        pdfItem.querySelector('img').remove();
        if (failed) {
            pdfItem.classList.add('failed');
            pdfItem.querySelector('i').classList.remove('bi-file-earmark-pdf');
            pdfItem.querySelector('i').classList.add('bi-x-circle');
        }
        setEventListeners(failed);
    }
    if (!file) setTimeout(settlePDFLoading, 500 + Math.random() * 3500); // Simulate loading
    else {
        const pdfPages = await convertPdfToText(file);
        settlePDFLoading();
        return pdfPages;
    }


    function setEventListeners(badPDF) {
        // PDF READY
        function alertUser() {
            // Check if chatbot is currently responding
            if (chatbotResponding) {
                setTimeout(() => {
                    alertUser();
                }, 200);
            } else {
                getAIResponse(`PDF Ready: You can now ask me questions related to "${pdfName}"`, true);
            }
        }
        if (!badPDF) alertUser();

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
                getAIResponse(`PDF Removed: "${pdfName}"`, true);
            }
        });

    }
}

// Browse from computer
browseComputer.addEventListener('click', () => {
    hiddenFileInput.click();
    // addPdf();
});

// Click Drop PDF
// pdfInput.addEventListener('click', () => {
//     addPdf(); // Development purposes
// });

// From URL
let showingURLPopup = false;
fromUrl.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!showingURLPopup) showURLPopup();
    showingURLPopup = true;
});

// Handle PDF Input
hiddenFileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
        console.log('File Selected');
        processPdfFile(file);
    } else {
        console.log('Please select a valid PDF file.');
    }
});

// Handle Drag and Drop
let dragCounter = 0;
pdfInput.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    pdfInput.classList.add('file-hover');
});

pdfInput.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) {
        pdfInput.classList.remove('file-hover');
    }
});
pdfInput.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});
pdfInput.addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter = 0;
    pdfInput.classList.remove('file-hover');
    // Handle the dropped file here
    const file = e.dataTransfer.files[0];
    if (file.type === 'application/pdf') {
        console.log('File Dropped');
        processPdfFile(file);
    } else {
        console.log('Please drop a valid PDF file.');
    }
});

// Convert PDF to Text
async function convertPdfToText(file) {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    const numPages = pdf.numPages;
    const pageTexts = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        pageTexts.push(pageText);
    }
    // const pdfText = pageTexts.join('\n\n');
    // console.log(pdfText);
    return pageTexts;
}

// Handle the Files
async function processPdfFile(file) {
    const pdfPages = await addPdf(file);
    // const pdfPages = await convertPdfToText(file);
    // Now you can work with the pdfPages array inside this function.
    // For example, you can log the pages:
    console.log(pdfPages, 'OUTER');
}

// Set random placeholder text for chat input
// chatInput.placeholder = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
function setPlaceholderText() {
    const question = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    const delayBetweenChars = 10; // Delay between typing each character in milliseconds

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
    if (sender !== 'alert') allChats.push({ role: sender, content: message });

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
    textElement.innerHTML = message;
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

    async function getResponse() {
        let response = allChats.length < 2 || explicitResponse ? explicitResponse : await fetchOpenAI(allChats);
        if (response === 'error') {
            explicitResponse = 'There is an error with the OpenAI API. Please try again later.';
            response = explicitResponse;
            instant = true;
            allChats.pop();
            allChats.pop();
            chatArea.lastElementChild.remove();
            addChatMessage('alert', 'Error');
        } else if (!instant) allChats[allChats.length - 1].content = response;
        // console.log(response);
        const htmlText = instant ? response : response.replace(/\n/g, '<br>');
        // console.log(htmlText);
        const responseWords = instant ? htmlText.split('') : htmlText.split(' ');

        // Set Sample Questions
        console.log('LENGTH:', allChats.length);
        if (allChats.length > 1) setSampleQuestions();
        updateHash();

        // Populate chatbot response one word at a time
        let wordIndex = 0;
        const minDelay = 0;
        const maxDelay = responseWords.length < 100 ? 250 : responseWords.length < 150 ? 225 : responseWords.length < 200 ? 200 : 175;
        console.log('delay:', maxDelay, responseWords.length);
        const addWord = () => {
            const wasOnBottom = chatArea.scrollHeight - chatArea.scrollTop <= chatArea.clientHeight + 50;
            if (wordIndex < responseWords.length) {
                const currentText = chatArea.lastElementChild.querySelector('.chat-text').innerHTML;
                chatArea.lastElementChild.querySelector('.chat-text').innerHTML = currentText + (instant ? '' : ' ') + responseWords[wordIndex];
                wordIndex++;
                if (wasOnBottom) chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
                setTimeout(addWord, instant ? 7 : (minDelay + Math.random() * (maxDelay - minDelay))); // Slight random variations between the timing of each word
            } else {
                chatbotResponding = false;
                setTimeout(setPlaceholderText, 1000); // Set a new placeholder text after 1 second
                enterButton.classList.remove('bi-chat-dots-fill');
                enterButton.classList.add('bi-arrow-right-circle-fill');
                if (wasOnBottom) chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
                // chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
            }
        };

        chatArea.lastElementChild.querySelector('.chat-text').innerHTML = ''; // Remove the three dots
        addWord(); // Start populating the chatbot response
    }

    getResponse();
    // Simulate a 3-second delay for chatbot response
    // setTimeout(getResponse, instant ? 0 : 200 + Math.random() * 2800);
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
        e.preventDefault();
        sendChatMessage();
    }
    if (e.key === " " && chatInput.value.trim() === "") {
        e.preventDefault();
        chatInput.value = chatInput.placeholder;
    }
});
chatInput.addEventListener("input", () => {
    if (chatInput.value === "") {
        setPlaceholderText();
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
            if (totalTokens[1] !== 0) totalTokens[1] -= 2;
            if (totalTokens[1] < 0) totalTokens[1] = 0;
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
const initialPrompt = 'Hi, I\'m a chatbot. I can answer questions about the PDFs you upload or help you with anything else.';
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

// OPENAI API
const OPEN_AI_API_KEY = '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';
let totalTokens = [0, 0];
const tokenThreshold = 3400;
async function fetchOpenAI(arr, prmpt) {
    const url = 'https://api.openai.com/v1/completions';
    const fullPrompt = arr === 'questions' ? prmpt : getPrePrompt(arr);
    // console.log(fullPrompt);

    const data = {
        model: 'text-davinci-003',
        prompt: fullPrompt,
        temperature: 0.7,
        max_tokens: 2000, // 512, // 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify(data),
    });

    try {
        const json = await response.json();
        console.log(json.usage)
        totalTokens[0] = json.usage.total_tokens;

        const text = json.choices[0].text.trim();
        // console.log(text);

        const startIndex = text.toLowerCase().indexOf('bot:');
        const returnText = startIndex !== -1 ? text.substring(startIndex + 'bot:'.length) : text;

        return returnText.trim();
    } catch (error) {
        console.log('Error Handled In Script:', error);
        return 'error';
    }
}

// Function to get the chat history
function getPrePrompt(arr) {
    if (totalTokens[0] > tokenThreshold) {
        totalTokens[1] = totalTokens[1] === 0 ? arr.length - 1 : totalTokens[1] - 1;
        console.log('OVER')
    } else {
        if (totalTokens[1] !== 0) totalTokens[1] += 1;
        console.log('UNDER');
    }
    console.log(totalTokens, arr.length);

    const pre = `user: Hello, who are you?\nbot: Hi, I am an AI assistant. How can I help you today?\n`
    const history = pre + arr.slice(totalTokens[1] === 0 ? 1 : arr.length - (totalTokens[1] - 1), -1).map(chat => chat.role !== 'alert' ? `${chat.role}: ${chat.content}` : '').join('\n');
    const preprompt = `The following is a conversation between a human 'user' and an AI assistant 'bot'. The assistant is helpful, creative, and clever.\n\n` + history;
    return preprompt;
}

// Get more relavent placeholder questions
async function setSampleQuestions() {
    const numberOfResponsesToLookAt = 16;
    console.log(allChats.length, 'RESPONSES LOOKED AT:', numberOfResponsesToLookAt * 2, allChats.length <= numberOfResponsesToLookAt * 2 ? 'Reading ALL' : 'Reading only part');
    const history = allChats.slice(allChats.length <= numberOfResponsesToLookAt * 2 ? 1 : allChats.length - numberOfResponsesToLookAt * 2, allChats.length).map(chat => `${chat.role}: ${chat.content}`).join('\n');
    // const history = allChats.slice(totalTokens[1] === 0 ? 1 : allChats.length - (totalTokens[1] - 1), allChats.length).map(chat => `${chat.role}: ${chat.content}`).join('\n');
    const prompt = history + `\n\nThe previous was a conversation between a human 'user' and an AI assistant 'bot'. DO NOT ACT AS IF YOU ARE APART OF THIS CONVERSATION. You are a third party reviewer whose only job is to provide a list of results on one line. You will review this conversation, based on this conversation you will come up with 10 relavent questions that the user might be interested in. Six questions should be on topics related or adjacent to topics found throughout the conversation that should spark further curiosity on the topic. Two questions should be random questions about new related topics that the user might not have thought of and would be interested in based on their conversation. Two quesitons should combine two or more differnet topics into one question. Each question should be insightful and above all inspire wonder. DO NOT repeat any question that has already been asked in the conversation. Format these qestions in a single line seperated by the '&' delimeter. Include a question mark and capitalize the first letter for each question. (example response: 'question1?&question2?&question3?&question4?') (example response: 'What is the most populous country in the world?&How many elements are on the periodic table?&How much does the average person weigh?&What is the longest river in the world?')`;
    // console.log(prompt);
    const results = await fetchOpenAI('questions', prompt);
    // console.log(results);
    if (results !== 'error') sampleQuestions = results.split('&');
    // console.log('Sample Questions Updated');
    console.log(sampleQuestions);
}