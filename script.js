//   3. wyswietlic imie jako gracz a new game przycisk znika
const playerNameElement = document.getElementById("js-playerName");
const playerPickElement = document.getElementById("js-playerPickElement");
const newGameButton = document.getElementById("js-newGameButton");
const startGameBtn = document.getElementById("js-startGameBtn");
const resultsTableElement = document.getElementById("js-resultsTableElement");
const playerPoints = document.getElementById("js-playerPoints");
const computerPoints = document.getElementById("js-computerPoints");
const playerChoice = document.getElementById("js-playerPick");
const computerChoice = document.getElementById("js-computerPick");
const playerPoint = document.getElementById("js-playerPoint");
const computerPoint = document.getElementById("js-computerPoint");
// Modal
const usernameElement = document.getElementById("js-username");
const numberOfGamesElement = document.getElementById("js-numberOfGames");
// Results Table
const resultsTableBodyElement = document.getElementById("js-resultsTableBody");

let tablicaWynikow = {
  liczbaGier: 0,
  pktyGracza: 0,
  pktyKomputera: 0
};

const zasadyGry = {
  liczbaGier: 3
};

let przebiegRozgrywek = [];

// wyskakuje okienko, pytanie o imie
function getUserName() {
  return usernameElement.value;
  // return prompt(
  //   `Please enter your name
  // name can't be null
  // name nact be number
  // min 3 dig`,
  //   `Agaa`
  // );
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

  $("#myModal").modal("hide");
  zasadyGry.liczbaGier = numberOfGamesElement.value;
  newGameButton.classList.add("hidden");
  playerNameElement.innerHTML = name;
  playerPickElement.classList.remove("hidden");
  resultsTableElement.classList.remove("hidden");
}

startGameBtn.addEventListener("click", event => newGame());
//  4.logika gry ()
// punktacja-zasady gry(wygrana 3 pkty, )

playerPickElement.addEventListener("click", event =>
  playerChoose(event.target)
);

function playerChoose(target) {
  //element to nasz target
  const targetBtn = target.closest(".btn"); //jak naciskam na ikonke w przycisku to szuka najblizszego rodzica .btn;
  const playerChoice = targetBtn.dataset.dupa; //ma byc na cala ikone nie tylko na nazwe(papier)ma byc kolko i znaczek
  // console.log(targetBtn, typeof playerChoice, typeof computerPick()); //playerChoice- wyswietli co wybral gracz
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
  let winner = "";
  if (
    (computerPick == "papier" && playerPick == "nozyce") ||
    (computerPick == "kamien" && playerPick == "papier") ||
    (computerPick == "nozyce" && playerPick == "kamien")
  ) {
    tablicaWynikow.pktyGracza++;
    winner = "player";
  } else {
    tablicaWynikow.pktyKomputera++;
    winner = "computer";
  }
  result(winner);

  //  wybor gracza i kompa ma nbyc pap, noz lub kamien js-playerPick
  playerChoice.innerHTML = playerPick;
  computerChoice.innerHTML = computerPick;

  tablicaWynikow.liczbaGier++;

  const przebiegRundy = {
    pktyGracza: tablicaWynikow.pktyGracza,
    pktyKomputera: tablicaWynikow.pktyKomputera,
    ruchGracza: playerPick.toString(),
    ruchKomputera: computerPick.toString(),
    wygrał: winner
  };

  // Refaktor
  // https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/forEach
  // wykożystaj tablicę 'przebiegRozgrywek' która trzyma wyniki i wstaw je do elementu w HTML o id='js-resultsTableBody'

  przebiegRozgrywek.push(przebiegRundy); // dodawanie elementu na koniec tablicy

  showResult(przebiegRundy);
  // console.table(przebiegRozgrywek);
  console.log(tablicaWynikow.liczbaGier)
  
  przebiegRozgrywek.forEach(element => {
    console.log(element);
  });

  if (
    tablicaWynikow.pktyGracza >= zasadyGry.liczbaGier ||
    tablicaWynikow.pktyKomputera >= zasadyGry.liczbaGier
  ) {
    $("#resultModal").modal("show");
    // endGame();
  }
}

function result(winner, reset = false) {
  //  w koleczku przy imieniu ma byc liczba pktow js-playerPoints
  playerPoints.innerHTML = reset ? "0" : tablicaWynikow.pktyGracza.toString(); //piszzemy to String bo plty sa w liczbach a innerHtml to string
  computerPoints.innerHTML = reset
    ? "0"
    : tablicaWynikow.pktyKomputera.toString();

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
  playerChoice.innerHTML = "";
  computerChoice.innerHTML = "";
  result("", true);

  przebiegRozgrywek = [];
  resultsTableBodyElement.innerHTML = "";

  tablicaWynikow = {
    liczbaGier: 0,
    pktyGracza: 0,
    pktyKomputera: 0
  };
}

//zasady gry (koniec gry gdy wygrany ma 3 pkty, )
function showResult(przebiegRundy) {
  const row = `
    <tr>
      <th scope="row">${tablicaWynikow.liczbaGier}</th>
      <td>${przebiegRundy.pktyGracza}</td>
      <td>${przebiegRundy.pktyKomputera}</td>
      <td>${przebiegRundy.ruchGracza}</td>
      <td>${przebiegRundy.ruchKomputera}</td>
      <td>${przebiegRundy.wygrał}</td>
    </tr>
  `;

  resultsTableBodyElement.innerHTML = resultsTableBodyElement.innerHTML + row;
}

$("#resultModal").on("hide.bs.modal", endGame);
