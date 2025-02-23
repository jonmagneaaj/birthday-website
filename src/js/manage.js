import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"; 

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
            score: doc.data().Score || 0
        }));
        console.log("Players fetched from Firestore:", players);
        updatePlayerList();
    } catch (error) {
        console.error("Error fetching players from Firestore:", error);
    }
}

function updatePlayerList() {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = '';

    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('player-item');
        listItem.innerHTML = `
            <span>${player.name}</span>
            <input type="number" value="${player.score}" min="0" data-id="${player.id}" class="score-input">
            <button data-id="${player.id}" class="delete-btn">Delete</button>
        `;
        playerList.appendChild(listItem);
    });

    document.querySelectorAll('.score-input').forEach(input => {
        input.addEventListener('change', async (event) => {
            const playerId = event.target.getAttribute('data-id');
            const newScore = parseInt(event.target.value);
            await updateDoc(doc(db, "Player", playerId), { Score: newScore });
            fetchPlayers();
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const playerId = event.target.getAttribute('data-id');
            await deleteDoc(doc(db, "Player", playerId));
            fetchPlayers();
        });
    });
}

document.getElementById('add-player-btn').addEventListener('click', async () => {
    const nameInput = document.getElementById('new-player-name').value;
    const scoreInput = parseInt(document.getElementById('new-player-score').value);

    if (nameInput && !isNaN(scoreInput)) {
        await addDoc(collection(db, "Player"), {
            Name: nameInput,
            Score: scoreInput
        });
        fetchPlayers();
    }
});

// Initial player list update
fetchPlayers();