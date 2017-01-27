function Card (type) {
  this.type = type;
  this.face = '';
  this.flipped = false;
}

Card.prototype.getInfo = function() {
  return this.type + ' card, flipped: ' + this.flipped;
};

var cardFaces = [
  'images/card1.png',
  'images/card2.png',
  'images/card3.png',
  'images/card4.png',
  'images/card5.png',
  'images/card6.png',
  'images/card7.png',
]

function createDeck(length) {
  var deck = [];
  for (var i = 0; i < length; i++) {
    var newCard = new Card('flip');
    console.log('Created new card. ', newCard.getInfo());
    deck.push(newCard);
  }
  //set faces of cards
  setFaces(deck);
  // randomly sort deck
  deck.sort(function() {
    return 0.5 - Math.random();
});
  return deck;
}

// Make an array which has 2 of each, then randomize it
function setFaces(deck) {
var possibleFaces = cardFaces.slice(0);
// var selected = [];
for (var i = 0; i < deck.length; i+=2) {
  // Randomly pick one from the array of remaining cardFaces
  var randomIndex = Math.floor(Math.random(possibleFaces.length));
  var face = possibleFaces[randomIndex];
  // Assign two cards this face
  deck[i].face = face;
  deck[i+1].face = face;
  // Remove from array
  possibleFaces.splice(randomIndex, 1);
}
}

// building html like this sucks (pure JS)... this is where jquery is nice. New versions of JS
// have fixed this shit with ES6 and its beautiful
function buildHtml(deck) {
  for (var j = 0; j < deck.length; j++) {
    var flipContainer = document.createElement('div');
    var flipper = document.createElement('div');
    var front = document.createElement('div');
    var back = document.createElement('div');
    var frontElem = document.createElement('img');
    var backElem = document.createElement('img');
    flipContainer.className = 'flip-container';
    flipper.className = 'flipper';
    front.className = 'front img-container';
    frontElem.src = 'images/deck.jpg';
    backElem.src = deck[j].face;
    backElem.innerHtml = deck[j].value;
    back.className = 'back img-container';
    front.appendChild(frontElem);
    back.appendChild(backElem);
    flipper.appendChild(front);
    flipper.appendChild(back);
    flipContainer.appendChild(flipper);
    document.getElementById('main').appendChild(flipContainer);
  }
}

function flip(){
  if (this.classList.contains('flipped')){
    this.classList.remove('flipped')
  }
  else {
    this.classList.add('flipped');
  }
}

function setupClickListener() {
  var btns = document.getElementsByClassName('flipper');
  for (var i = 0; i < btns.length; i++){
    var btn = btns[i];
    btn.addEventListener('click', flip);
  }
}


var myDeck = createDeck(14);
buildHtml(myDeck);
setupClickListener();
