const socket = io();

const clientsTotal = document.getElementById("client-total");

const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

const tone = new Audio("/tweet-mp3-60172.mp3");

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
});

socket.on("clients-total", (data) => {
    clientsTotal.innerText = "In Chat: " + data;
});

socket.on("chat-message", (data) => {
    // console.log(data);
    addMessagetoUI(false, data);
    tone.play();
})



// messageInput.addEventListener("focus", (e) => {
//     const name = (nameInput.value.trim() === "") ? "Someone" : nameInput.value;
//     socket.emit("feedback", {
//         feedback: name + " is typing a message"
//     });
// });

// messageInput.addEventListener("keypress", (e) => {
//     const name = (nameInput.value.trim() === "") ? "Someone" : nameInput.value;
//     socket.emit("feedback", {
//         feedback: name + " is typing a message"
//     });
// });

// socket.on("feedback", (data) => {
//     console.log("feed")
//     if (inuse == true) return;
//     const element = '<li class="feedback">' + data.feedback + '</li>'
//     inuse = false;
//     messageContainer.innerHTML += element;
// })

function addMessagetoUI(ownMessage, data) {
    const messageClass = ownMessage ? 'message-feedback' : 'message-left';
    const element = '<li class=' + messageClass + '> <p class="message">' + data.message + '</p> <span>' + data.name + '</span> </li>';
    messageContainer.innerHTML += element;
    scrolltoBot();
}

function scrolltoBot() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
};

function sendMessage() {
    if (messageInput.value === '') return;
    console.log(messageInput.value)
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date(),
    }
    socket.emit("message", data);
    addMessagetoUI(true, data);
    messageInput.value = '';
};
