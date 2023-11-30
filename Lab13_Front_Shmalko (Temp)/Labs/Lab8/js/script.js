const player = prompt("Hi, please\nEnter user name: ");
const startB = document.querySelector("button.start-roll-b");
let result1 = document.querySelector(".rezult-1");
let result2 = document.querySelector(".rezult-2");
let index = 0;

if (!player) {
    window.close();
}

window.onload = () => {
    if (player) {
        userName.textContent = `User: ${player}`;
    }

    startB.onclick = () => startGameF();
}

function startGameF() {
    if (index > 4) {
        let winner = parseInt(result2.innerHTML) > parseInt(result1.innerHTML) ? player : "Computer";
        alert(`Winner is: ${winner}`);

        index = 0;
        result1.textContent = "0%";
        result2.textContent = "0%";
        document.querySelector(".block-space-st-1").style.left = -100 + "%";
        document.querySelector(".block-space-st-2").style.left = -100 + "%";
        return;
    }

    let playerSc = parseInt(result2.innerHTML);
    let compSc = parseInt(result1.innerHTML);

    console.log(`Now: ${playerSc}`);
    
    // Computer:
    //console.log(Math.floor(Math.random() * 25));
    compSc += Math.floor(Math.random() * 25);
    playerSc += Math.floor(Math.random() * 25);

    console.log(`Calc: ${playerSc}`);

    result1.innerHTML = compSc + "%";
    result2.innerHTML = playerSc + "%";

    document.querySelector(".block-space-st-1").style.left = -100 + compSc + "%";
    document.querySelector(".block-space-st-2").style.left = -100 + playerSc + "%";

    index++;
}