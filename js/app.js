/*
 * Create a list that holds all of your cards
 */
var cars = [
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>'];
var openCards=[];
var moves = 0;
var seconds=0;
var timeCount;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cars).forEach(function (car) {
    $(".deck").append($(car));
});
startTime();
function show() {
    this.className="card open show";
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
$(".deck").on('click','li',function () {
    show.call(this);
    openCards.push(this);
    check();
});
function check() {
    if(openCards.length==2){
        if(openCards[0].firstChild.className==openCards[1].firstChild.className){
            openCards[0].className="card match";
            openCards[1].className="card match";
            openCards.length=0;
        }else {
            setTimeout(function () {
                openCards[0].className="card";
                openCards[1].className="card";
                openCards.length=0;
            },500)
        }
        moves++;
        $(".moves").text(moves);
        showStars();
    }
    if($(".match").length==cars.length){
        stopTime();
        setTimeout(showSuccess(),500);
    }
}

/**
 * start count use second time
 */
function startTime() {
    $(".useTime").text(seconds);
    seconds++;
    console.log("seconds:"+seconds);
    timeCount = setTimeout("startTime()",1000);
}
function stopTime() {
    clearTimeout(timeCount);
}

/**
 * show success notify
 * ask if play again
 */
function showSuccess() {
    if(confirm("恭喜通关成功，是否再玩一局？")){
        restart();
    }
}

/**
 * check stars by moves
 */
function showStars() {
    var startNum = 4-moves*3/2cars.length;
    startNum=startNum<=1?1:startNum;
    if($(".fa-star").length>startNum) {
        $(".fa-star")[0].remove();
    }
}

/**
 * restart the game
 * 
 */
function restart() {
    moves=0;
    openCards.length=0;
    $(".deck").empty();
    shuffle(cars).forEach(function (car) {
        $(".deck").append($(car));
    });
    stopTime();
    seconds=0;
    startTime();
}
/*
 * set up the event listener for a refresh sign. If the sign is clicked:
 *  - shuffle the list of cards using the provided "shuffle" method below
 *  - loop through each card and create its HTML
 *  - add each card's HTML to the page
 */
$(".restart").on('click',function () {
   restart();
});