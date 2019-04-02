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

function newGame(startGameBtn) {
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

newGameButton.addEventListener("click", event => newGame(event.target));
//  4.logika gry ()
// punktacja-zasady gry(wygrana 3 pkty, )

playerPickElement.addEventListener("click", event => playerPick(event.target));

function playerPick(target) {
  //element to nasz target
  const targetBtn = target.closest(".btn"); //jak naciskam na ikonke w przycisku to szuka najblizszego rodzica .btn;
  const playerChoice = targetBtn.dataset.dupa; //ma byc na cala ikone nie tylko na nazwe(papier)ma byc kolko i znaczek
  console.log(targetBtn, playerChoice, computerPick()); //playerChoice- wyswietli co wybral gracz
  sedzia(playerChoice, computerPick());
}

function computerPick() {
  //  const los = Math.floor(Math.random()*3);
  //switch(los){
  //case 0:
  //return "Papier";

  //case 1:
  //return "Nozyce";

  // case 2:
  //return "Kamien";
  // }

  const options = ["papier", "nozyce", "kamien"];
  return options[Math.floor(Math.random() * 3)];
}

const tablicaWynikow = {
  liczbaGier: 0,
  pktyGracza: 0,
  pktyKomputera: 0
};

function sedzia(playerPick, computerPick) {
  if (computerPick == playerPick) {
    return 0; //remis
  }

  if (
    (computerPick == "papier" && playerPick == "nozyce") ||
    (computerPick == "kamien" && playerPick == "papier") ||
    (computerPick == "nozyce" && playerPick == "kamien")
  ) {
    tablicaWynikow.pktyGracza++;
  } else {
    tablicaWynikow.pktyKomputera++;
  }

  tablicaWynikow.liczbaGier++;

  console.log(tablicaWynikow);

  //  computer win
  //  playerPick =='kamien'
}
