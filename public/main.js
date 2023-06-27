const socket = io();

const clientsTotal = document.getElementById("client-total")

socket.on("clients-total", (data) => {
    console.log(data);
    clientsTotal.innerText = "In Chat: " + data;
});