const players = [
    { name: 'Jon-Magne', score: 39 },
    { name: 'Player 2', score: 25 },
    { name: 'Player 3', score: 30 }
];

function updatePlayerList() {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = '';

    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('player-item');
        listItem.innerHTML = `
            <span>${player.name}</span>
            <input type="number" value="${player.score}" min="0" data-index="${index}" class="score-input">
            <button data-index="${index}" class="delete-btn">Delete</button>
        `;
        playerList.appendChild(listItem);
    });

    document.querySelectorAll('.score-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const index = event.target.getAttribute('data-index');
            players[index].score = parseInt(event.target.value);
            updateLeaderboard();
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            players.splice(index, 1);
            updatePlayerList();
            updateLeaderboard();
        });
    });
}

document.getElementById('add-player-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('new-player-name').value;
    const scoreInput = parseInt(document.getElementById('new-player-score').value);

    if (nameInput && !isNaN(scoreInput)) {
        players.push({ name: nameInput, score: scoreInput });
        updatePlayerList();
        updateLeaderboard();
    }
});

// Initial player list update
updatePlayerList();