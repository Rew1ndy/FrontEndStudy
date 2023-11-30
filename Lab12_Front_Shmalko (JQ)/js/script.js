'use strict'

const pause = 7000;

const slides = $('.slide');
const pager = $('.pager');

const arrowsCont = $('.arrows');
const prevSlide = $('.prev');
const nextSlide = $('.next');

const slidesCount = slides.length;

let currentSlide = slides.first();
let currentSlideIndex = 1;

let current;
let wordIndex;
let wordBeforeIndex = "none";

const answerField = document.querySelector('.answer-field');
const statistic = document.querySelector('.statistic');
let answerBlock = $('.answer-block').hide();

let trueAnsw = 0;
let falseAnsw = 0;

const pullDiff = [
    "Easy",
    "Default",
    "Hard"
]

const pullQuestionsDefault = {
    "everyone" : ["кожен", "всі", "кожний"],
    "frequency" : ["частота", "повторюваність", "частотність"],
    "when" : ["коли", "як", "якщо"],
    "which" : ["котрий", "хто", "який"],
    "think" : ["думка", "думаю", "міркування"],
    "people" : ["люди", "народ", "люд"],
    "see" : ["бачити", "побачити", "оглядати"],
    "just" : ["просто", "зараз", "заслужений"],
    "now" : ["зараз", "нинішній", "тепер"],
    "want" : ["хотіти", "хочуть", "бажати"],  
}

const pullQuestionsEasy = {
    "cat" : ["кіт", "кошеня", "кішка"],
    "sun" : ["сонце", "промінь", "крем"],
    "book" : ["книга", "читання", "сторінка"],
    "happy" : ["щасливий", "радісний", "веселий"],
    "blue" : ["синій", "блакитний", "голубий"],
    "water" : ["вода", "пити", "річка"],
    "friend" : ["друг", "товариш", "побратим"],
    "run" : ["бігти", "біг", "пробіг"],
    "big" : ["великий", "велика", "велике"],
    "good" : ["добрий", "хороший", "відмінний"],
}

const pullQuestionsHard = {
    "ephemeral" : ["ефемерний", "мимовільний", "тліючий"],
    "ubiquitous" : ["всюдисущий", "всюдиприсутній", "всюдинаявний"],
    "serendipity" : ["серендипіті", "несподіване щастя", "везіння"],
    "eccentricity" : ["ексцентричність", "дивакуватість", "дивакуватість"],
    "obfuscate" : ["ускладнювати", "затемнювати", "розгублювати"],
    "quixotic" : ["ксенофобійний", "фантастичний", "відчужений"],
    "equanimity" : ["екванімність", "самовладдя", "спокій"],
    "sycophant" : ["сикофант", "льстивець", "поклонник"],
    "esoteric" : ["езотеричний", "таємничий", "невідомий"],
    "ineffable" : ["невимовний", "непередаваний словами", "недооцінений"],
}

let pullQuestions = pullQuestionsDefault;

difficultId.onchange = () => {
    switch (difficultId.value) {
        case "0":
            pullQuestions = pullQuestionsEasy;
            break;

        case "1":
            pullQuestions = pullQuestionsDefault;
            break;

        case "2":
            pullQuestions = pullQuestionsHard;
            break;
    }
    console.log(pullQuestions);
    $(".diff-text").fadeOut(200);
    $(".diff-text").text(`Difficulty: ${pullDiff[+difficultId.value]}`);
    $(".diff-text").fadeIn(200);
    currentSlideIndex = 0;
    fadeNext();
}

slides.not(':first').hide();
currentSlide.addClass('active');

function fadeNext() {
    currentSlide.removeClass('active').fadeOut(700);

    if(currentSlideIndex == slidesCount) {
        currentSlide = slides.first();
        currentSlide.delay(500).addClass('active').fadeIn(700);
        currentSlideIndex = 1;
    } else {
        currentSlideIndex++;
        currentSlide = currentSlide.next();
        currentSlide.delay(500).addClass('active').fadeIn(700);
    }
    updateGame();
    pager.text(`${currentSlideIndex} / ${slidesCount}`);
}

function fadePrev() {
    if(currentSlideIndex == 1 || currentSlideIndex == slidesCount) return;
    currentSlide.removeClass('active').fadeOut(700);

    currentSlideIndex--;
    currentSlide = currentSlide.prev();
    currentSlide.delay(500).addClass('active').fadeIn(700);

    updateGame();
    pager.text(currentSlideIndex+' / '+slidesCount);
}

$(nextSlide).click(function(e) {
    e.preventDefault();
    fadeNext();
});

$(prevSlide).click(function(e) {
    e.preventDefault();
    fadePrev();
});

function updateGame() {
    if (currentSlideIndex == 1) {
        trueAnsw = 0;
        falseAnsw = 0;
        statistic.textContent = `Correct: ${trueAnsw} False: ${falseAnsw}`;
    }
    if (current) current.off('click', revealAnsw);
    if (answerBlock) answerBlock.removeClass('active').fadeOut(700);

    current = $('.slide.active');

    if (currentSlideIndex == slidesCount) {
        if(trueAnsw > falseAnsw) {
            if (difficultId.value == 2) {}
            else difficultId.value++;
            current.children('div').html(
                `Good Job<br>Correct: ${trueAnsw} False: ${falseAnsw}`
            );
        } else {
            if (difficultId.value == 0) {}
            else difficultId.value--;
            current.children('div').html(
                `Try best next time<br>Correct: ${trueAnsw} False: ${falseAnsw}`
            );
        }
        setTimeout(() => {
            difficultId.onchange();
        }, 5000);
        return;
    }

    while(true) {
        wordIndex = randomWord();
        if (wordIndex != wordBeforeIndex) {
            wordBeforeIndex = wordIndex;
            break
        }
    }
    
    current.on('click', revealAnsw);
    current.children('div').html(Object.keys(pullQuestions)[wordIndex]);
    answerBlock.delay(500).addClass('active').fadeIn(1000);
}

function revealAnsw() {
    current.off('click', revealAnsw);
    let answer = answerField.value.toLowerCase();
    let values = Object.values(pullQuestions)[wordIndex];
    if (answerField.value == "") {
        falseAnsw++;
    }
    else {
        let unCorrect = true;
        values.forEach(element => {
            if (element == answer) {
                trueAnsw++;
                unCorrect = false;
                return
            }
        });
        if (unCorrect) {
            falseAnsw++;
        }
    }
    current.children('div').html(
        `${Object.keys(pullQuestions)[wordIndex]} -
        ${Object.values(pullQuestions)[wordIndex][0]}`
    )
    statistic.textContent = `Correct: ${trueAnsw} False: ${falseAnsw}`;
    answerField.value = "";
}

function randomWord() {
    return Math.floor(Math.random() * 9);
}

updateGame();