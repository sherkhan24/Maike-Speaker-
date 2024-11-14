//1. Get the button element
let button = document.querySelector('button');

//2. Initialize speech recognition (handle both standard and Webkit versions)
let speechReco = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!speechReco) {
    alert("Speech Recognition is not supported in this browser.");
}

//3. Create a new instance of SpeechRecognition
let reco = new speechReco();
let names = ['aapka name sher khan hai ', 'sherkhan hai', 'azhar khan'];

//4. Get chat area elements
let chat_ = document.querySelector('.chat_');
let chat_area = document.querySelector('.chat_area');

//5. Function to display user message in chat
function userMsg(msg) {
    let userOutput = `<p class="query">${msg}</p>`;
    chat_area.innerHTML += userOutput;
    return chat_area;
}

//6. Function to display assistant response in chat
function assistentResult(msg) {
    let userOutput = `<p class="assistentMsg">${msg}</p>`;
    chat_area.innerHTML += userOutput;
    return chat_area;
}

//7. Function to handle assistant's spoken response
function assisTantMsg(msg) {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = 'hi';  // Set language to Hindi

    // Define responses based on user input
    if (msg.includes('what is my name')) {
        let result = names[Math.floor(Math.random() * names.length)];
        speech.text = result;
    } else if (msg.includes('dark mode')) {
        speech.text = 'dark mode is on now';
        document.body.style.background = "#000";
        // document.body.style.color = "#fff";  // Ensure text is visible in dark mode
    } else if(msg.includes('light mode')){
        speech.text = 'light mode is on now';
        document.body.style.background = "#fff";
    }else{
        speech.text = 'sorry this text is not exit!';

    }

    // Speak the response
    window.speechSynthesis.speak(speech);

    // Display assistant's response in chat
    assistentResult(speech.text);
}

//8. Add event listener to handle speech recognition result
reco.addEventListener('result', (e) => {
    let userSpeak = e.results[0][0].transcript;  // Get the recognized text
    // console.log("User said: ", userSpeak);
    
    // Display user's message in chat
    chat_.appendChild(userMsg(userSpeak));
    
    // Handle assistant response based on the user's speech
    assisTantMsg(userSpeak);
});

//9. Start speech recognition when button is clicked
button.addEventListener('click', () => {
    reco.start();  // Start speech recognition
});
