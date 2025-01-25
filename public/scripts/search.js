window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search").addEventListener('submit', async (event) => {
        event.preventDefault();
        const resultDiv = document.querySelector(".results");

        resultDiv.innerHTML = '<div class="loading">Searching...</div>';

        const formData = {
            summonerName: document.getElementById('summoner-name').value,
            tag: document.getElementById('tag').value,
            region: document.getElementById('region').value
        };

        try {
            const response = await fetch('http://localhost:3000/summoner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            resultDiv.innerHTML = `
                <div class="profile-card">
                    <h2>Summoner Profile</h2>
                    <p>Name: ${data.summonerName}</p>
                    <p>Tag: ${data.tag}</p>
                    ${data.level ? `<p>Level: ${data.level}</p>` : ''}
                    <p class="puuid">PUUID: <code>${data.puuid}</code></p>
                    ${data.accountId ? `<p>Account ID: ${data.accountId}</p>` : ''}
                    ${data.summonerId ? `<p>Summoner ID: ${data.summonerId}</p>` : ''}
                </div>
            `;
        } catch (error) {
            resultDiv.innerHTML = `
                <div class="error">
                    Error: ${error.message}
                </div>
            `;
        }
    });
});