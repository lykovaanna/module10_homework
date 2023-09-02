const input = document.querySelector('.input');
const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');
const output = document.querySelector('.output');
const user = document.querySelector('.user-messages');
const server = document.querySelector('.server-messages');
const dlt = document.querySelector('.delete');

let websocket = new WebSocket("wss://echo-ws-service.herokuapp.com")

websocket.onopen = function(evt) {
    console.log("CONNECTED");
};
websocket.onmessage = function(evt, position) {
    writeToScreen(`Server: ${evt.data}`, 'flex-start');
};
websocket.onerror = function(evt) {
    writeToScreen("Error connection");
};
websocket.onerror = function(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
};

function writeToScreen(message, position='flex-end') {
	let element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
        </p>`;
	user.innerHTML += element;
	output.scrollTop = output.scrollHeight;
};

btnSend.addEventListener('click', () => {
    const message = input.value;
    writeToScreen('Вы: ' + message);
    websocket.send(message);
});

// Geo Location

const error = () => {
    let testError = 'Невозможно получить ваше местоположение';
    writeToScreen(testError);
};

const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
}

btnGeo.addEventListener('click', () => {
	if (!navigator.geolocation) {
	    console.log('Geolocation не поддерживается вашим браузером');
	} else {
	    navigator.geolocation.getCurrentPosition(success, error);
	}
});

dlt.addEventListener('click', () => {
	user.innerHTML = " ";
});