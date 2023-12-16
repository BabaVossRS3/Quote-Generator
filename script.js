const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const copyBtn = document.getElementById('copy');
const copied_text_div = document.getElementById('copied_text_div');
const prevBtn = document.getElementById('previous-quote');


let apiQuotes = [];
let currentIndex = 0;
let displayedQuotes =[];
//copy on click
console.log(apiQuotes);
copyBtn.addEventListener('click', function () {
    var quoteTextElement = quoteText;
    var authorTextElement = authorText;

    // Create a single input element
    var tempInput = document.createElement('input');

    // Concatenate the values of quoteTextElement and authorTextElement
    var combinedText = quoteTextElement.textContent + ' \n ' + ' - ' + authorTextElement.textContent;

    // Set the input value to the combined text
    tempInput.value = combinedText;

    // Append the input element to the body of the document
    document.body.appendChild(tempInput);

    // Select the text in the input element
    tempInput.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary input element from the DOM
    document.body.removeChild(tempInput);

    setTimeout(() => copied_text_div.style.display = 'flex' , 100);
    setTimeout(() => copied_text_div.style.display = 'none' , 2000);
});
//show loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
function displayQuote() {
    const quote = displayedQuotes[currentIndex];

    // Check if author is blank and replace it with unknown
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to fit
    if (quote.text.length > 40) {
        quoteText.classList.add('long-quote');
        authorText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
        authorText.classList.remove('long-quote');
    }

    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Event listener for the Previous button
prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        displayQuote();
    }
});

// Event listener for the "New Quote" button
newQuoteBtn.addEventListener('click', function () {
    newQuote();
});

// Function to fetch a new random quote and store it in the displayedQuotes array
async function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    displayedQuotes.push(quote);
    currentIndex = displayedQuotes.length - 1;
    displayQuote();
}

// Function to fetch quotes from the API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);

        // Initialize the displayedQuotes array with the first quote
        displayedQuotes.push(apiQuotes[Math.floor(Math.random() * apiQuotes.length)]);

        displayQuote();
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

getQuotes();