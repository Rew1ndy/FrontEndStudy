'use strict'

const player = document.querySelector(".player-2");

const player1 = document.querySelector(".player-1 img.card");
const player2 = document.querySelector(".player-2 img.card");

const scores = document.querySelectorAll(".total-result");

const cardsElems = {
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "valet": 2,
    "queen": 3,
    "king": 4,
    "header": 11,
}
const cardsArray = Object.keys(cardsElems);

let time = 0;
player.onclick = () => startGame();
popUpLoginButton.onclick = () => {
    if (popUpLoginInput.value) {
        popUpLogin.style.opacity = "0";
        playerName.innerHTML = `Player: ${popUpLoginInput.value}`;

        setTimeout(() => {
            popUpLogin.style.display = "none";
        }, 1200);
    }
}
popUpEndButton.onclick = () => {
    popUpEnd.style.zIndex = "-100";
    popUpEnd.style.opacity = "0";
}
reset();

function startGame() {
    let a = Math.floor(Math.random() * cardsArray.length);
    let b = Math.floor(Math.random() * cardsArray.length);
    let flips = document.querySelectorAll(".info-flip");

    //console.log(cardsArray[a]);
    console.log(cardsElems[cardsArray[a]]);
    console.log(cardsElems[cardsArray[b]]);

    player1.src = `img/${cardsArray[a]}_1.png`;
    player2.src = `img/${cardsArray[b]}_2.png`;

    player.onclick = null;

    flips.forEach(element => {
        element.classList.add("flip");
    });

    setTimeout(() => {
        scores[0].textContent = +scores[0].textContent + cardsElems[cardsArray[a]];
        scores[1].textContent = +scores[1].textContent + cardsElems[cardsArray[b]];
    }, 300);

    setTimeout(() => {
        flips.forEach(element => {
            element.classList.remove("flip");
            player.onclick = () => startGame();
        });
    }, 2500);

    time++;

    if (time >= 3 ) {
        setTimeout(() => {
            console.log(`Player: ${+scores[1].textContent}`);
            console.log(`Comp: ${+scores[0].textContent}`);
            let winner = +scores[0].textContent > +scores[1].textContent ? "Computer" : playerName.textContent;
            popUpEnd.style.zIndex = "20";
            popUpEnd.style.opacity = "100";
            popUpEndText.innerText = `Winner: ${winner}`;
        }, 1500);

        setTimeout(() => {
            reset();
        }, 5500);
    }
}

function reset() {
    [scores[0].textContent, scores[1].textContent] = [0, 0];
    time = 0;
}
