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
let wordBeforeIndex = "none";

const answerField = document.querySelector('.answer-field');
const statistic = document.querySelector('.statistic');
let answerBlock = $('.answer-block').hide();

let trueAnsw = 0;
let falseAnsw = 0;

const pullQuestions = {
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

// slides.not(':first').attr('display', 'none');
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
    currentSlide.removeClass('active').fadeOut(700);

    if(currentSlideIndex == 1) {
        currentSlide = slides.last();
        currentSlide.delay(500).addClass('active').fadeIn();
        currentSlideIndex = slidesCount;
    } else {
        currentSlideIndex--;
        currentSlide = currentSlide.prev();
        currentSlide.delay(500).addClass('active').fadeIn(700);
    }
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
    if (current) current.off('click', revealAnsw);
    if (answerBlock) answerBlock.removeClass('active').fadeOut(700);

    current = $('.slide.active');
    // current.children('div').html(currentSlideIndex);
    let wordIndex;
    while(true) {
        wordIndex = randomWord();
        if (wordIndex != wordBeforeIndex) {
            break
        }
    }
    current.on('click', function() {revealAnsw(wordIndex)});
    current.children('div').html(Object.keys(pullQuestions)[wordIndex]);
    answerBlock.delay(500).addClass('active').fadeIn(1000);
}

function revealAnsw(index) {
    let answer = answerField.value.toLowerCase();
    let values = Object.values(pullQuestions)[index];
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
        `${Object.keys(pullQuestions)[index]} -
        ${Object.values(pullQuestions)[index][0]}`
    )
    statistic.textContent = `Correct: ${trueAnsw} False: ${falseAnsw}`;
}

function randomWord() {
    return Math.floor(Math.random() * 9);
}

updateGame();