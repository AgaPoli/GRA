// wyskakuje okienko, pytanie o imie
function getUserName() {
  return prompt(
    `Please enter your name
  name can't be null
  name nact be number
  min 3 dig`,
    `Agaa`
  );
}

// waldacja imienia(ile liter, cyfry, anuluj)
function validateUserName(name) {
  const nameLength = name.length;
  const isNameNull = name == null;
  const isMax11Characters = nameLength <= 11;
  const isMinimum3Characters = nameLength >= 3;
  const isOnlyNumbers = /^\d+$/.test(name);
  const isAEnded = /a$/.test(name);

  if (
    !isNameNull &&
    isMax11Characters &&
    isMinimum3Characters &&
    !isOnlyNumbers &&
    isAEnded
  ) {
    console.log("poprawne " + name);
    return true;
  } else {
    console.log("nie poprawne " + name);
    return false; //przerywa program
  }
}

function startGame(startGameBtn) {

  const name = getUserName();
  if (!validateUserName(name)) {
    alert("imie nie poprawne");
    return;

  }
  startGameBtn.classList.add("hidden");
  playerNameElement.innerHTML = name;
  playerPickElement.classList.remove("hidden");
  resultsTableElement.classList.remove("hidden");
}

//   3. wyswietlic imie jako gracz a new game przycisk znika
const playerNameElement = document.getElementById("js-playerName");
const playerPickElement = document.getElementById("js-playerPickElement");
const newGameButton = document.getElementById("js-newGameButton");
const resultsTableElement = document.getElementById("js-resultsTableElement");

newGameButton.addEventListener("click", event => startGame(event.target));
