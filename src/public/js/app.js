const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

console.log(messageForm);

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅")
})

socket.addEventListener("message", (message) => {
    console.log('New message:' , message.data)
})

socket.addEventListener("close", () => {
    console.log('Disconnected from Server ❌')  
})

const handleSubmit = (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = ""
}

messageForm.addEventListener('submit', handleSubmit)