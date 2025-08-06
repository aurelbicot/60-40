let playerCount = 3;
let players = [];

function renderPlayers() {
  const grid = document.getElementById('player-grid');
  grid.innerHTML = '';

  for (let i = 0; i < playerCount; i++) {
    const player = players[i] || {};
    const div = document.createElement('div');
    div.className = 'player-bubble';
    div.onclick = () => openModal(i);

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    if (player.photo) {
      avatar.style.backgroundImage = `url(${player.photo})`;
      avatar.style.backgroundSize = 'cover';
    } else {
      avatar.textContent = player.name ? player.name.slice(0, 2).toUpperCase() : '👤';
    }

    const name = document.createElement('div');
    name.className = 'player-name';
    name.textContent = player.name || '';

    div.appendChild(avatar);
    div.appendChild(name);
    grid.appendChild(div);
  }
}

function addPlayer() {
  if (playerCount < 15) {
    playerCount++;
    renderPlayers();
  }
}

function removePlayer() {
  if (playerCount > 3) {
    playerCount--;
    players.splice(playerCount);
    renderPlayers();
  }
}

let editingIndex = null;

function openModal(index) {
  editingIndex = index;
  document.getElementById('player-name-input').value = players[index]?.name || '';
  document.getElementById('player-photo-input').value = '';
  document.getElementById('player-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('player-modal').style.display = 'none';
}

function savePlayer() {
  const name = document.getElementById('player-name-input').value.trim();
  const photoInput = document.getElementById('player-photo-input');
  const photo = photoInput.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    const photoURL = photo ? reader.result : null;
    players[editingIndex] = { name, photo: photoURL };
    closeModal();
    renderPlayers();
  };

  if (photo) {
    reader.readAsDataURL(photo);
  } else {
    players[editingIndex] = { name };
    closeModal();
    renderPlayers();
  }
}

function startGame() {
  const allFilled = players.length >= playerCount && players.every(p => p?.name);
  if (!allFilled) {
    document.getElementById('error-message').style.display = 'block';
  } else {
    document.getElementById('error-message').style.display = 'none';
    alert('Game Started!'); // Replace this with your real game start logic
  }
}