'use strict'

const randResult = ["Yes", "No", "Maybe", "What?", "Why not", "Are you Sure?"];

document.addEventListener('DOMContentLoaded', contentLoad);

function contentLoad() {
    document.body.innerHTML += 
    `<div class="wrapper" id="wrapper">
        <div class="content">
            <input type="text" class="text-ask">
            <div class="img-sphere press-start"></div>
        </div>
    </div>`;
    
    setTimeout(() => {
        wrapper.style.opacity = "100";
        document.querySelector(".text-ask").addEventListener("blur", addResult);
    }, 300);
}

function addResult() {
    let result = Math.round(Math.random() * 5);
    document.querySelector(".answer")?.remove();
    appendResult(randResult[result]);
}

function appendResult(result) {
    let p = document.createElement("p");
    p.classList.add("answer");
    p.id = "answer";
    p.textContent = result;
    document.querySelector(".content").appendChild(p);

    setTimeout(() => {
        answer.style.opacity = "100";
    }, 300);
}