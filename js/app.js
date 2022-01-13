function copyTextToClipboard(){
    // get the text output:
    const textOutput = document.getElementById("output").value;

    navigator.clipboard.writeText(textOutput)
    .then(() => {
        console.log("Text copied to clipboard");
    })
    .catch((err) => {
        console.log(`An error occured : ${err}`);
    })
    
}

function clearOutputField(){
    const outputField = document.getElementById('output');
    outputField.value = "";
}

function evalGreet(sex){
    if(sex == 'male'){
        return "Sehr geehrter Herr";
    } else if (sex == 'female'){
        return "Sehr geehrte Frau";
    } else if (sex == 'authority'){
        return "Sehr geehrte Damen und Herren der";
    } else {
        return "Undefiniertes Geschlecht";
    }
}



function generateTextContent(){
    const textContent = document.getElementById('textContent').value;
    const outputField = document.getElementById('output');
    outputField.value += textContent;

}

function generateGreeter(){
    const receiverName = document.getElementById('nameReceiver').value;
    const receiverSex = document.getElementById('receiverSex').value;
    const outputField = document.getElementById('output');
    

    const greetBeginner = evalGreet(receiverSex);
    const greet = `${greetBeginner} ${receiverName},\n\n`;

    outputField.value += greet;

}


function generateMailDraft(){
    const absenderName = document.getElementById('senderName').value;
    const outputField = document.getElementById('output');
    const gruss = document.getElementById('grussformelSelect').value;


    outputField.value += `\n\n${gruss}\n${absenderName}`;


}

function generateMail(event){
    event.preventDefault();
    clearOutputField();
    generateGreeter();
    generateTextContent();
    generateMailDraft();
    // clear form:
    document.mailForm.reset();

}


function addHandlers(){
    document.getElementById('generateMailDraft').addEventListener('click', generateMail);
    document.getElementById('copyMailButton').addEventListener('click', copyTextToClipboard);
}


function registerServiceWorker(){
    console.log('Enter function registerServiceWorker() ...');
    // Make sure service worker are supported
    if ('serviceWorker' in navigator){
        navigator.serviceWorker
            .register('https://moritzott.github.io/meg/serviceworker.js')
            .then(registrationObject => console.log('ServiceWorker registered.'))
            .catch(error => console.log(`ServiceWorker Error: ${error}`))
    } else {
        console.log('ServiceWorker not supported nor registered.');
    }
}

window.addEventListener('load', addHandlers);
window.addEventListener('load', registerServiceWorker)