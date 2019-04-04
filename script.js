//   3. wyswietlic imie jako gracz a new game przycisk znika
const playerNameElement = document.getElementById("js-playerName");
const playerPickElement = document.getElementById("js-playerPickElement");
const newGameButton = document.getElementById("js-newGameButton");
const resultsTableElement = document.getElementById("js-resultsTableElement");
const playerPoints = document.getElementById("js-playerPoints");
const computerPoints = document.getElementById("js-computerPoints");
const playerChoice = document.getElementById("js-playerPick");
const computerChoice = document.getElementById("js-computerPick");
const playerPoint = document.getElementById("js-playerPoint");
const computerPoint = document.getElementById("js-computerPoint");

let tablicaWynikow = {
  liczbaGier: 0,
  pktyGracza: 0,
  pktyKomputera: 0
};

const zasadyGry = {
  liczbaGier: 3
};

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

  return (
    !isNameNull &&
    isMax11Characters &&
    isMinimum3Characters &&
    !isOnlyNumbers &&
    isAEnded
  );
}

function newGame() {
  const name = getUserName();
  if (!validateUserName(name)) {
    alert("imie nie poprawne");

    return;
  }

  newGameButton.classList.add("hidden");
  playerNameElement.innerHTML = name;
  playerPickElement.classList.remove("hidden");
  resultsTableElement.classList.remove("hidden");
}

newGameButton.addEventListener("click", event => newGame());
//  4.logika gry ()
// punktacja-zasady gry(wygrana 3 pkty, )

playerPickElement.addEventListener("click", event => playerPick(event.target));

function playerPick(target) {
  //element to nasz target
  const targetBtn = target.closest(".btn"); //jak naciskam na ikonke w przycisku to szuka najblizszego rodzica .btn;
  const playerChoice = targetBtn.dataset.dupa; //ma byc na cala ikone nie tylko na nazwe(papier)ma byc kolko i znaczek
  // console.log(targetBtn, playerChoice, computerPick()); //playerChoice- wyswietli co wybral gracz
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
    result("player");
  } else {
    tablicaWynikow.pktyKomputera++;
    result("computer");
  }

  //  wybor gracza i kompa ma nbyc pap, noz lub kamien js-playerPick
  playerChoice.innerHTML = playerPick;
  computerChoice.innerHTML = computerPick;

  tablicaWynikow.liczbaGier++;
  if (tablicaWynikow.pktyGracza >= 3 || tablicaWynikow.pktyKomputera >= 3) {
    endGame();
  }
}

function result(winner, reset = false) {
  //  w koleczku przy imieniu ma byc liczba pktow js-playerPoints
  playerPoints.innerHTML = reset ? '0' : tablicaWynikow.pktyGracza.toString(); //piszzemy to String bo plty sa w liczbach a innerHtml to string
  computerPoints.innerHTML = reset ? '0' : tablicaWynikow.pktyKomputera.toString();

  playerPoint.innerHTML =
    winner == "player" ? '<i class="fa fa-trophy"></i>' : "";

  computerPoint.innerHTML =
    winner == "computer" ? '<i class="fa fa-trophy"></i>' : "";

  // if (winner == "computer") {
  //   computerPoint.innerHTML = '<i class="fa fa-trophy"></i>';
  // } else {
  //   computerPoint.innerHTML = "";
  // }

  //  pukty -czy jest pkt za wybor p,n,k czy remis 0-0 playerPoint
  //  po zakonczeniu gry z 3 pktami ma byc zapytanie czy gramy jeszcze raz. jak nie to ma byc powrot do przycisku nowa gra.
}

function endGame() {
  newGameButton.classList.remove("hidden");
  playerNameElement.innerHTML = "PlayerName";
  playerPickElement.classList.add("hidden");
  resultsTableElement.classList.add("hidden");
  
  result('', true);
  
  tablicaWynikow = {
    liczbaGier: 0,
    pktyGracza: 0,
    pktyKomputera: 0
  };
}

//zasady gry (koniec gry gdy wygrany ma 3 pkty, )
