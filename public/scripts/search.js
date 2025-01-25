window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search")
    .addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            summonerName: document.getElementById('summoner-name').value,
            tag: document.getElementById('tag').value,
            region: document.getElementById('region').value
        };

        fetch('http://localhost:3000/summoner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => console.log('Success:', data))
        .catch((error) => console.log('Error:', error));
    });
})