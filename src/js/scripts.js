const players = [
    { name: 'Jon-Magne', score: 39 },
    { name: 'Player 2', score: 25 },
    { name: 'Player 3', score: 30 }
];

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    // Sort players by score in descending order
    players.sort((a, b) => b.score - a.score);

    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('leaderboard-item');
        if (index === 0) {
            listItem.classList.add('first-place');
        }
        listItem.innerHTML = `
            <div class="rank">
                ${index === 0 ? '<img src="images/crown.jpg" alt="Crown" class="crown">' : ''}
                <h3>${index + 1}</h3>
            </div>
            <h3 class="name">${player.name}</h3>
            <span class="score">${player.score}</span>
        `;
        leaderboardList.appendChild(listItem);
    });
}

// Initial leaderboard update
updateLeaderboard();