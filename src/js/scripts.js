// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKLmp6UlysgnFfhJGUTLSCj_RKNO98l0c",
  authDomain: "games-ca1ed.firebaseapp.com",
  projectId: "games-ca1ed",
  storageBucket: "games-ca1ed.firebasestorage.app",
  messagingSenderId: "137391980062",
  appId: "1:137391980062:web:3051b2e2c6e32de458780f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let players = [];

async function fetchPlayers() {
    try {
        const querySnapshot = await getDocs(collection(db, "Player"));
        players = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().Name,
            score: doc.data().Score || 0 // Assuming there's a Score field, default to 0 if not present
        }));
        console.log("Players fetched from Firestore:", players);
        await updateLeaderboard(); // Await here as well
    } catch (error) {
        console.error("Error fetching players from Firestore:", error);
    }
}

async function updateLeaderboard() {
    const leaderboardList = document.getElementById('playerLeaderboard'); // More descriptive ID
    if (!leaderboardList) {
        console.error("Leaderboard element not found!");
        return;
    }
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

// Initial leaderboard update (await is crucial here)
fetchPlayers();

// Fetch players every 15 seconds
setInterval(fetchPlayers, 15000);