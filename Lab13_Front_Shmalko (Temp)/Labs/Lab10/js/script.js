'use strict'

const windowItem = document.querySelectorAll(".window");
let slot = [document.querySelector(".slot1"), document.querySelector(".slot2"), document.querySelector(".slot3")];
let lamps = document.querySelectorAll(".lamp");
let counter = 0;
window.onresize = () => {
    let resItem = `${windowItem[0].getClientRects().item(0).width}px`;
    
    windowItem.forEach(element => {
        element.style.height = resItem;
    });
};

setTimeout(() => {
    alert(`Hi: ${prompt("Enter name: ")}`);
}, 100);

window.onresize();

goB.onclick = () => {
    counter++;

    if (counter > 3) {
        counter = 0;
        alert("You lose");
        return 0;
    }

    let arrRes = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    let winWidth = windowItem[0].getClientRects().item(0).width;

    lamps.forEach(element => {
        element.style.backgroundColor = "transparent";
        element.style.boxShadow = "none";
    });

    setTimeout(() => {
        if (arrRes[0] == arrRes[1]) {
            ChangeLamps(0, 1);
        }
        if (arrRes[1] == arrRes[2]) {
            ChangeLamps(1, 2);
        }
        if (arrRes[0] == arrRes[2]) {
            ChangeLamps(0, 2);
        }
    }, 8000);

    for (let i = 0; i < arrRes.length; i++) {
        switch (arrRes[i]) {
            case 0:
                slot[i].style.backgroundPosition = `0 ${winWidth * 0 + (winWidth * 3.711) * (Math.floor(Math.random() * 10))}px`;
                break;
            case 1:
                slot[i].style.backgroundPosition = `0 ${winWidth * 2.8 + (winWidth * 3.711) * (Math.floor(Math.random() * 10))}px`;
                break;
            case 2:
                slot[i].style.backgroundPosition = `0 ${winWidth * 5.55 + (winWidth * 3.711) * (Math.floor(Math.random() * 10))}px`;
                break;
            case 3:
                slot[i].style.backgroundPosition = `0 ${winWidth * 0.9 + (winWidth * 3.711) * (Math.floor(Math.random() * 10))}px`;
                break;
            default:
                break;
        }
    }

    if (arrRes[0] === arrRes[1] && arrRes[1] === arrRes[2]) {
        setTimeout(() => {
            alert("You win");
        }, 8500);
        counter = 0;
    }
    
}
function ChangeLamps(lamp1, lamp2) {
    lamps[lamp1].style.backgroundColor = "Gold";
    lamps[lamp1].style.boxShadow = "inset 0 0 15px black";
    lamps[lamp2].style.backgroundColor = "Gold";
    lamps[lamp2].style.boxShadow = "inset 0 0 15px black";
}