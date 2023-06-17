new window.EventSource("/sse").onmessage = function (event) {
	window.messages.innerHTML += `<p>${event.data}</p>`;
};

window.document.getElementById("form").addEventListener("submit", function (evt) {
	evt.preventDefault();
	let msg = document.getElementById('form-input').value;

	window.fetch(`/chat?message=${msg}`);
	document.getElementById('form-input').value = ""
});