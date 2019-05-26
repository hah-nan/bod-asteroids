
var participants = ['Denise', 'Andrew', 'Rick', 'Cassie', 'Sheila', 'Eric']
var test = false

// Canvas Asteroids
//
// Copyright (c) 2010 Doug McInnes
//

// $('#password').hide()

jQuery.expr[':'].focus = function( elem ) {
  return elem === document.activeElement && ( elem.type || elem.href );
};

function colDetect(rect1, rect2){
  return (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.y + rect1.height > rect2.y)
}


//image upload
var soundwaveImage = new Image();
soundwaveImage.src = "images/soundwave.png";
var bedroomtopImage = new Image();
bedroomtopImage.src = "images/bedroom_toplayer.png";
var bedroomImage = new Image();
bedroomImage.src = "images/bedroom1.png";
var dennyImage = new Image();
dennyImage.src = "images/denny.png";
var musicImage = new Image();
musicImage.src = "images/music.png";

var IMAGES = { 
 'soundwave': soundwaveImage,
 'bedroomTop':bedroomtopImage,
 'bedroom':bedroomImage,
 'denny':dennyImage,
 'music': musicImage
}


function ifButtonsPressed(){
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads[0]) {
    gamepads = [{axes: [5,5,5], buttons:[5,5,5]}]
  }
  // return gamepads[0].buttons[0].pressed || gamepads[0].buttons[1].pressed
  return gamepads[0].buttons[1].pressed

}

function ifAxisCentered(){
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads[0]) {
      gamepads = [{axes: [5,5,5], buttons:[5,5,5]}]
  }

  return Math.round(gamepads[0].axes[0]) == 0 && Math.round(gamepads[0].axes[1]) == 0
}

function ifAxisPressed(){
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads[0]) {
    // alert('gamepad disconnected');
    gamepads = [{axes: [5,5,5], buttons:[5,5,5]}]
  }
  return gamepads[0].axes[0] == 1 || gamepads[0].axes[1] == 1 || gamepads[0].axes[0] == -1 || gamepads[0].axes[1] == -1
}

var Inside = {}
Inside.bar = function(context){
  context.drawImage(bedroomImage, 20,38)
  Game.specialImage = bedroomtopImage

  let door = {x: 755, y: 485, width:80, height:80}
  let playerRect = {x: player.x - 25, y: player.y - 25, width: 50, height: 50}
  let chest = {x: 300, y: 60, width:200, height:165}

  makeShip(context, 100, 300, 7, 'downleft', { name: participants[0], dialogue: ['Whens the next dream start, Will?'] })
  makeShip(context, 130, 312, 7, 'downleft', { name: participants[1], dialogue: ['Will! you\'re back'] })
  participants[5] ? makeShip(context, 220, 340, 7, 'downleft', { name: participants[5], dialogue: ['You got a wild imagination, Will'] }) : null;
  makeShip(context, 650, 167, 7, 'upleft', { name: participants[2], dialogue: ['This is weird'] })
  participants[4] ? makeShip(context, 756, 379, 7, 'left', { name: participants[4], dialogue: ['Will, I hope youve been feeling better'] }) : null;
  makeShip(context, 88, 545, 7, 'down', { name: participants[3], dialogue: ['The reality is really seeping into this closet!'] })


  if( readyForPump && colDetect(playerRect, door) ){
    Game.instructional = 'Press shoot to exit'

    if(KEY_STATUS['space'] || ifButtonsPressed()){
      readyForPump = false
      SFX.closedoor.play()
      Game.inside = ''
      Game.flags.bod_engine_on = true
      Game.specialImage = null
    }
  }

  if( readyForPump && colDetect(playerRect, chest) ){
    Game.instructional = 'PRESS SHOOT TO INSPECT DESK'
    if(KEY_STATUS['space'] || ifButtonsPressed()){
      readyForPump = false
      Game.textSequence = ['Under the bed you see an open chest on a desk', 'A combination lock that once secured the chest is open with the combination 936', 'Inside the chest you see a scattering of private notes and vials filled with a magical purple liquid']
      Game.textSequence.name = 'Chest'
      Game.textSequence.portrait = 'ship'
      Game.instructional = ''
    }
  }
}

var Map = {}
Map.x1y0 = function(context){
  makePlanet(context, 100,100, 200)
  makePlanet(context, 500, 200, 20)
  makePlanet(context, 530, 250, 10)

  makeShip(context, 200, 200, 7, 'down', { name: 'Normal Spaceship', dialogue: ['What happened over there?', 'One second there was all the asteroids and then suddenly they were all gone...', 'Well I guess we are safe now! Can I get ya a beer?']})
}

Map.x0y1 = function(context){
  makeShip(context, 500, 290, 7, 'downleft', { name: 'Preteen Spaceship', dialogue: ['Oh are you the hero that saved us?! Omgosh!', 
'Your so close to me..you look smaller in person',
'Get closer...',
'omg celebrity'] })
  makeShip(context, 440, 240, 7, 'down', { name: 'Child Spaceship', dialogue: ['Dad said its safe to go out now, no asteroids! Thank you hero!'] })
  makeShip(context, 380, 290, 7, 'downright', { name: 'Teen Spaceship', dialogue: ['Hey man fuck off',
'...',
'Yeah YOU! Fuck off, I said!',
'...',
'I heard my mom talking to my dad',
'She knows your bullshit man',
'my brother and sister here might buy your whole hero shtick, but not me',
'She heard it all from her friend at your stupid Grand Celebration. How come you\'re not even there, huh?',
'...I just can’t believe you would do this',
'Ignore the truth and leave it to our generation to clean it all up once your done with your little party',
'You are what I hate'] })
}

Map.x0y2 = function(context){
  makePlanet(context, 130, 50, 340)
  makeShip(context, 500, 290, 30, 'left', { name: 'Father Spaceship', dialogue: ['Look buddy I think you deserve to go home and celebrate with your friends and family like the rest of us', 'But if I find out there was any foul play with this asteroid buisiness', 'If I find out....you -cheated- or something. If I find out the asteroids are still out there...', 'If I find out this is a.....', '...DREAM...', 'I\ll will find you, and I will throw an asteroid right at your head in front of your family', 'But for now just get the hell off my planet and go east to your party at X:4 Y:2'] })
}

Map.x0y3 = function(context){
  makePlanet(context, 130, -500 -74, 340)
  makeShip(context, 400, 30, 10, 'down', { name: 'Mother Spaceship', dialogue: ['I should never have told him what my friend told me.. My friend..she\'s such a BUZZKILL.', 'ugh.. god... I hope she is wrong. This can\'t be a dream, can it? How will I explain this to the kids?'] })
}


Map.x3y2 = function(context){
  makePlanet(context, 400, 250, 40)

  if(SFX.partymusic.paused){
      SFX.partymusic.volume = .5
     SFX.partymusic.play()
  }

  makeShip(context, 740, 120, 10, 'left', { name: 'Alien Spaceship', dialogue: ['Look I’m not from this universe but y’all sure know how to party']})
  makeShip(context, 750, 150, 6, 'left', { name: 'Ex Spaceship', dialogue: ['Hi hero...', 'look let\'s talk later','congrats with everything, great party','but...im busy with someone']})
}

Map.x4y4 = function(context){
  let denny = {x: 655, y: 455, width:150, height:150}
  let playerRect = {x: player.x - 25, y: player.y - 25, width: 50, height: 50}

  if( readyForPump && colDetect(playerRect, denny) ){
    Game.instructional = 'Press shoot to enter'
    if(KEY_STATUS['space'] || ifButtonsPressed()){
      readyForPump = false
      paused = true
      Game.flags.unlockingCombo = true
      $('.cyclic_input').css({display:'block'})
      $('.cyclic_input').first().focus()
      Game.instructional = 'Press shoot to submit'
    } 
  }
  
  context.drawImage(IMAGES.denny, 750,500)
  makePlanet(context, 600, 400, 390)
}
Map.x5y4 = function(context){
  makePlanet(context, -180 - 39, 400 - 74, 390)
}
Map.x5y5 = function(context){
  makePlanet(context, -180 - 39, -140 - 74, 390)
  makeShip(context, 300, 400, 15, 'downright', {name: 'Explorer Spaceship', dialogue: ['I\'ve been searching for this planet for 26 years.... Planet Bar.', 
    'I\'m finally here',
    'Somewhere on this planet theres a locked house that guards a secret',
    'but I can\'t seem to find it',
    'and even if I did, I haven’t the faintest clue how to unlock it',
    'I have grown sick from my travels, I will probably die here before I discover the secret',
    'Find it for me when I\'m gone, will you?']})
}
Map.x4y5 = function(context){
  makePlanet(context, 600 - 39, -140 - 74, 390)
}

Map.x1y5 = function(context){
  makePlanet(context, 350, 200, 200)
  makeShip(context, 460, 460, 15, 'down', {name: 'Detective Spaceship', dialogue: ['Psst..yo hero',
    'I got a clue', 
    'So I went to the Grand Celebration on your planet and this ship was acting really CRAZY',
'They told me something...',
'You know that house on Bar Planet?',
'They told me the owner used to forget the code to get into his own house',
'SO...he wrote it down in his SHOWER cuz then he had to look at it everyday and wouldn\'t forget',
'Genius if you ask me. I think I\'m gonna write down my mom\'s birthday in MY shower' ]})
}

Map.x4y2 = function(context){
  makePlanet(context, 20, 20, 200)
  makePlanet(context, 410, 300, 50)
  makePlanet(context, 510, 280, 40)

  if(SFX.partymusic.paused){
      SFX.partymusic.volume = .9
     SFX.partymusic.play()
  }


  context.drawImage(musicImage, 396, 262)

  makeShip(context, 100, 300, 5, 'right', {name: 'Buzzkill Spaceship', dialogue: ['That crazy ship over there ain\'t so crazy you know',
'we will all inevitably wake up soon',
'then...we will look up, and the \'roids will be there again',
'burning the sky',
'waiting to engulf us in their eternal flames',
'you and I will become skeletons with fiery flesh',
'the universe will become hell incarnate',
'scared of the reality?',
'fine',
'let us dream forever then... you coward']})

  makeShip(context, 80, 150, 15, 'downright', {name: 'High School Friend Spaceship', dialogue: ['Hey this is awesome man, here we are the Grand Celebration party',
'The \'roids are gone! the \'roids are G O N E baby',
'AND YOURE THE HERO. Ha of all people.. who would have thought?.',
'Ha, braski, remember high school... MEMORIESSSS',
'you were such a nerd back then! ha',
'Hey you look great now though',
'and Hey look we NEEDED math to stop the \'roids',
'we needed a hero like you.',
'lets party till the brake of dawn']})


  makeShip(context, 143, 157, 12, 'downleft', {name: 'College Friend Spaceship', dialogue: ['Im completely sober, but I can still celebrate.',
'I get high OFF LIFE',
'we can live in peace now.',
'wow',
'wow life.',
'wow remember when we met in college?',
'same floor in the dorms.. legendary times',
'Hey remember streaking?',
'I\'ts time for that again...',
'It\'s the only way to celebrate',
'I feel the energy in my bones',
'in your bones, too',
'streak with me',
'wow',
'under our clothes, we are all nude anyways']})

    makeShip(context, 390, 215, 8, 'left', {name: 'Flirty Spaceship', dialogue: ['oh baby, what a mighty hero we have here!',
'ooo such strong muscles',
'triangles are such a stroooooong shape',
'SHARP ANGLES',
'69 degrees',
'ooo',
'oh stay away',
'no',
'come back',
'oh my',
'oh ur so hawt hero',
'is your ship always this pointy or are you just happy to see me?',
'let\'s celebrate together just me and you']})


    makeShip(context, 540, 310, 15, 'left', {name: 'Crazy Spaceship', dialogue: ['THE SECRET',
'THE TRUTH',
'THIS ISNT REALITY',
'ITS A DREAM',
'WERE ALL DREAMING',
'WAKE UP DAMMIT',
'DONT YOU GET IT',
'YOURE NOT A HERO',
'YOU HAVEN\'T DONE JACK SHIT',
'YOU JUST SLEEP ON YOUR BED',
'THE TRUTH IS IN THE HOUSE',
'I KNOW HOW TO GET INTO TO THE HOUSE',
'I TOLD SOMEONE HOW TO GET THE CODE',
'SHE LEFT',
'SHE WENT SOUTHWEST TO X:1 Y:5',
'ONLY YOU CAN FIND THE CODE',
'YOUR MORE THAN JUST A SPACESHIP I CAN TELL',
'THERE SOMETHING ELSE CONTROLLING YOU',
'YOU CAN SEE THE CODE FOR ME, YOU CAN DO WHAT I CAN\'T',
]})


//     'ITS DEEPER THAN WE EVEN KNOW',
// 'THERES MORE LAYERS THAN THE MATRIX',
// AS MANY LAYERS AS INCEPTION
// 'WE NEED TO WAKE HIM UP',
// 'WE NEED TO WAKE YOU UP',
// 'YOUR THE HERO',
// DONT YOU SEE
// DONT YOU FUCKING SEE IT DAMMIT
// WERE ALL IN A DREAM
// YOUR NOT DONE
// YOUR NOT A FUCKING HERO
// YOU HAVENT DONE JACK SHIT
// YOUR JUST IN YOUR BED SLEEPING

makeShip(context, 200, 60, 18, 'down', {name: 'Empathetic Spaceship', dialogue: [
'There\'s a dark beauty in all of this, ya know?',
'A universe ignorant of its impending demise',
'...look',
'I dont wanna believe it either',
'but those asteroids went away too quickly',
'good things don’t just happen like that',
'you can lie to all of us, but dont lie to yourself',
'you were there..',
'you know you didn’t destroy the asteroids',
'...But I feel you.. what can ya do?',
'Its tough to be a hero, don\'t worry, I know. I don\'t blame you',
'Hey, I\'ll catch ya later, have a drink for me, alright?'
]})



    makeShip(context, 200, 400, 7, 'up', {name: 'Connie', dialogue: ['THAT WUZ NUTZ HUH??',
'for a SECOND I thought we WUZ done 4',
'that was like real Armageddon Bruce Willis style',
'but im so glad your home safe and sound buddy',
'You\'re my best bud.... ',
'....',
'..',
'I was scared...',
'AAHHHH MY BUDDY!!!!!!!!! I LOVE YOU BUDY!!!',
'Enjoy your PartEEEE tonight',
'Hey this isn\’t a dream is it??? HAHAHA JUSST KDDING',
'JUSt kidding hahah THAT WOULD BE NUTZZZ',
'YOU NEVER LIE TO ME']})
    
    makeShip(context, 275, 390, 3, 'up', {name: 'Hero Jr', dialogue: [
'does this mean I can go out into space on my own now????',
'Whats that person over there saying about the house at X:4 Y:4??',
'Can I go to the house???',
'They said theres a secret there...',
'I want to know the secret!!!',
'Do you know the secret!!??',
'you wouldn\'t hide anything from me, would you???'
  ]})

    makeShip(context, 305, 375, 5, 'upleft', {name: 'Heroine Jr', dialogue: [
      'now this universe is boring...',
      'ugh',
      'I wanna have an adventure just like you did',
      'I wanna do somethng cooler though',
      'Something dangerous',
      'something...real',
      'I could have defeated those asteroids way faster than you, you know'
  ]})
}

Map.x3y1 = function(context){

    if(SFX.partymusic.paused){
      SFX.partymusic.volume = .4
     SFX.partymusic.play()
  }
    makeShip(context, 680, 500, 10, 'upleft', { name: 'Bitter Spaceship', dialogue: ['Hero! hey, I thought I would catch you here',
'ok this is a bit delicate',
'So I heard the news you defeated the \'roids and everything',
'so I sold my defense shields and everything',
'...?',
'your a hero so...you wouldn’t lie to me right?',
'...',
'... I was just southeast, at the Grand Celebration party you\'re hosting..',
'you know what I heard.... I HEARD THAT THE \'ROIDS ARE STILL OUT THERE',
'is this true????',
'I mean wtf, what about my family??',
'my kids??',
'DID YOU NOT DO ANYTHING??',
'R U A HERO OR NOT??',
'WHICH ONE IS IT???',
'jeeeeeez',
'UR JUST GONNA PRETEND AND CELEBRATE ARENT YOU???',
'ugh whatever',
'I hope what I heard was wrong',
'enjoy your party',
'I SOLD my defense shields…',
'what am I gonna tell my kids',
'god you\’re an ass']})

}

Map.x6y3 = function(context){
  makePlanet(context, 200,200,150)
    makeShip(context, 500, 100, 10, 'left', { name: 'Dancing spaceship', dialogue: [
'at the Y M C A! = )  we all get down at the Y M C A. =0',
'…',
'what am i'
  ]})
}


Map.x6y0 = function(context){
  makePlanet(context, 100,50,150)

  makeShip(context, 242, 150, 40, 'downright', { name: 'Argazi', dialogue: [
'Quazasun you\’re peaceful ways are too soft for a time like this',
'You have heard the rumours - the disappearance of the asteroids is just an illusion',
'We have to stop the Grand Celebration',
'We must begin investigation into how to unveil the illusion',
'The Hero must be trained vigilantly starting now',
'Our universe defense shield production line must restart production',
'The Grand Celebration must be shut down IMMEDIATELY',
'and we must prepare every ship in the universe for the reality of our situation',
'The hero must rise to destroy the asteroids before we all die'
  ]})

  makeShip(context, 502, 150, 40, 'downleft', { name: 'Quazasun', dialogue: [
'You are a simple fool Argazi',
'You do not know what makes a hero',
'I\’ve heard the rumours about the asteroids, I have...',
'But to shut down the Grand Celebration with news such as that?',
'This universe has lived in fear of asteroids since its inception',
'finally theres one moment of joy and you wish to end it?',
'A hero is not born from destroying something they fear',
'A hero is born when they want to protect something they love',
'With this grand celebration the hero can finally see a universe worth fighting for',
'...',
'Let the hero be happy for once. This is the moment they rise'
  ]})


      makePlanet(context, 430,50,150)

}


Map.x4y3 = function(context){
  if(SFX.partymusic.paused){
    SFX.partymusic.volume = .2
    SFX.partymusic.play()
  }
}


Map.x5y2 = function(context){
  if(SFX.partymusic.paused){
     SFX.partymusic.volume = .2
     SFX.partymusic.play()
  }
}

Map.x1y4 = function(context){
  makePlanet(context, 300,100,50)

}

Map.x4y1 = function(context){
  makePlanet(context, 600,100,50)

  if(SFX.partymusic.paused){
    SFX.partymusic.volume = .5
     SFX.partymusic.play()
  }
  makeShip(context, 200, 500, 10, 'up', { name: 'Lightweight spaceship', dialogue: [
'oh fuk im so drunk',
'(pukes)',
'oh no..',
'whatever its space who cares'
  ]})
}

Map.x4y0 = function(context){

  makeShip(context, 700, 100, 16, 'downleft', { name: 'Scrooge spaceship', dialogue: [
'Bah!',
'Get away!',
'I will NOT be celebrating tonight!',
'I lash out in anger in order to protect myself from true human connection : something I am scared of, but desperately need!!!',
'I said get away from me!'
  ]})
}


Map.x0y6 = function(context){
  makeShip(context, 400, 300, 7, 'up', { name: 'Lost spaceship', dialogue: [
'Hero!!!!',
'Im looking for the Grand Celebration! The party held in your great honor',
'Oh im so happy to see you, where is it at?? Its definitely not this way..'
  ]})

}


function checkCombo(){

  let char1 = $('.cyclic_input')[0].innerHTML
  let char2 = $('.cyclic_input')[1].innerHTML
  let char3 = $('.cyclic_input')[2].innerHTML

  console.log(char1,char2,char3)
  if(char1 === "B" && char2 === "C" && char3 === "D"){
    SFX.opendoor.play()
    Game.inside = 'bar'
    Game.flags.bod_engine_on = false
  }
}

function makePlanet(context, x, y, size){
  context.strokeStyle='white'
  context.beginPath();
  context.arc(x+size, y+size, size, 0, 2*Math.PI);
  context.stroke();
}

function makeShip(context, x, y, scale, facing, text){
  let playerRect = {x: player.x - 25, y: player.y - 25, width: 50, height: 50}

  let shipRect = {x: x - 25, y: y - 25, width: 30, height: 30}
  if(scale > 10){
    shipRect.width = 60
    shipRect.height = 60
  }
  if(scale > 20){
    shipRect.width = 90
    shipRect.height = 90
  }
  if(!paused && readyForPump && text.dialogue && colDetect(playerRect, shipRect)){
    Game.instructional = 'Press shoot to talk'

    if((KEY_STATUS['space'] ||ifButtonsPressed()) && !Game.textSequence.length){
      readyForPump = false
      Game.textSequence = text.dialogue
      Game.textSequence.name = text.name
      Game.textSequence.portrait = 'ship'
      Game.instructional = ''
    } 
  }

  drawShip[facing](x, y, context, scale)
}


drawShip = {
  up : (x, y, context, scale) => {
    context.strokeStyle='white'
    context.beginPath();
    context.moveTo(x + (.75 * scale), y + (0 * scale));
    context.lineTo(x + (1.5 * scale), y + (2.2 * scale));
    context.lineTo(x + (0 * scale), y + (2.2 * scale));
    context.lineTo(x + (.75 * scale), y + (0 * scale));
    context.stroke();
  },

  left : (x, y, context, scale) => {
    context.strokeStyle='white'
    context.beginPath();
    context.moveTo(x + (2.2 * scale), y + (0 * scale));
    context.lineTo(x + (0 * scale), y + (.75 * scale));
    context.lineTo(x + (2.2 * scale), y + (1.5 * scale));
    context.lineTo(x + (2.2 * scale), y + (0 * scale));
    context.stroke();
  },

  right : (x, y, context, scale) => {
    context.strokeStyle='white'
    context.beginPath();
    context.moveTo(x + (0 * scale), y + (0 * scale));
    context.lineTo(x + (0 * scale), y + (1.5 * scale));
    context.lineTo(x + (2.2 * scale), y + (.75 * scale));
    context.lineTo(x + (0 * scale), y + (0 * scale));
    context.stroke();
  },

  upleft : (x, y, context, scale) => {
    context.strokeStyle='white'
    context.beginPath();
    context.moveTo(x + (1 * scale), y + (2.2 * scale));
    context.lineTo(x + (2.2 * scale), y + (1 * scale));
    context.lineTo(x + (0 * scale), y + (0 * scale));
    context.lineTo(x + (1 * scale), y + (2.2 * scale));
    context.stroke();
  },

  downright : (x, y, context, scale) => {
    context.strokeStyle='white'
    context.beginPath();
    context.moveTo(x + (0 * scale), y + (1 * scale));
    context.lineTo(x + (2.2 * scale), y + (2.2 * scale));
    context.lineTo(x + (1 * scale), y + (0 * scale));
    context.lineTo(x + (0 * scale), y + (1 * scale));
    context.stroke();
  },

  downleft : (x, y, context, scale) => {
    context.strokeStyle='white'
    context.beginPath();
    context.moveTo(x + (2.2 * scale), y + (1 * scale));
    context.lineTo(x + (0 * scale), y + (2.2 * scale));
    context.lineTo(x + (1 * scale), y + (0 * scale));
    context.lineTo(x + (2.2 * scale), y + (1 * scale));
    context.stroke();
  },

  down : (x, y, context, scale) => {
    context.strokeStyle='white'
    context.beginPath();
    context.moveTo(x + (0 * scale), y + (0 * scale));
    context.lineTo(x + (1.5 * scale), y + (0 * scale));
    context.lineTo(x + (.75 * scale), y + (2.25 * scale));
    context.lineTo(x + (0 * scale), y + (0 * scale));
    context.stroke();
  }
}


KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  70: 'f',
  71: 'g',
  72: 'h',
  77: 'm',
  80: 'p'
}

KEY_STATUS = { keyDown:false };
for (code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}

var readyForPump = true
$(window).keydown(function (e) {
  KEY_STATUS.keyDown = true;
  if (KEY_CODES[e.keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[e.keyCode]] = true;
  }
}).keyup(function (e) {
  KEY_STATUS.keyDown = false;
  if (KEY_CODES[e.keyCode]) {
    e.preventDefault();

    if(KEY_CODES[e.keyCode] === 'space' && !paused) {
      console.log("in key up")
      readyForPump = true
    }
    KEY_STATUS[KEY_CODES[e.keyCode]] = false;
  }
});

GRID_SIZE = 60;

Matrix = function (rows, columns) {
  var i, j;
  this.data = new Array(rows);
  for (i = 0; i < rows; i++) {
    this.data[i] = new Array(columns);
  }

  this.configure = function (rot, scale, transx, transy) {
    var rad = (rot * Math.PI)/180;
    var sin = Math.sin(rad) * scale;
    var cos = Math.cos(rad) * scale;
    this.set(cos, -sin, transx,
             sin,  cos, transy);
  };

  this.set = function () {
    var k = 0;
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns; j++) {
        this.data[i][j] = arguments[k];
        k++;
      }
    }
  }

  this.multiply = function () {
    var vector = new Array(rows);
    for (i = 0; i < rows; i++) {
      vector[i] = 0;
      for (j = 0; j < columns; j++) {
        vector[i] += this.data[i][j] * arguments[j];
      }
    }
    return vector;
  };
};

Sprite = function () {
  this.init = function (name, points) {
    this.name     = name;
    this.points   = points;

    this.vel = {
      x:   0,
      y:   0,
      rot: 0
    };

    this.acc = {
      x:   0,
      y:   0,
      rot: 0
    };
  };

  this.children = {};

  this.visible  = false;
  this.reap     = false;
  this.bridgesH = true;
  this.bridgesV = true;

  this.collidesWith = [];

  this.x     = 0;
  this.y     = 0;
  this.rot   = 0;
  this.scale = 1;

  this.currentNode = null;
  this.nextSprite  = null;

  this.preMove  = null;
  this.postMove = null;

  this.run = function(delta) {

    this.move(delta);
    this.updateGrid();

    this.context.save();
    this.configureTransform();
    this.draw();

    var canidates = this.findCollisionCanidates();

    this.matrix.configure(this.rot, this.scale, this.x, this.y);
    this.checkCollisionsAgainst(canidates);

    this.context.restore();

    if (this.bridgesH && this.currentNode && this.currentNode.dupe.horizontal) {
      this.x += this.currentNode.dupe.horizontal;
      this.context.save();
      this.configureTransform();
      this.draw();
      this.checkCollisionsAgainst(canidates);
      this.context.restore();
      if (this.currentNode) {
        this.x -= this.currentNode.dupe.horizontal;
      }
    }
    if (this.bridgesV && this.currentNode && this.currentNode.dupe.vertical) {
      this.y += this.currentNode.dupe.vertical;
      this.context.save();
      this.configureTransform();
      this.draw();
      this.checkCollisionsAgainst(canidates);
      this.context.restore();
      if (this.currentNode) {
        this.y -= this.currentNode.dupe.vertical;
      }
    }
    if (this.bridgesH && this.bridgesV &&
        this.currentNode &&
        this.currentNode.dupe.vertical &&
        this.currentNode.dupe.horizontal) {
      this.x += this.currentNode.dupe.horizontal;
      this.y += this.currentNode.dupe.vertical;
      this.context.save();
      this.configureTransform();
      this.draw();
      this.checkCollisionsAgainst(canidates);
      this.context.restore();
      if (this.currentNode) {
        this.x -= this.currentNode.dupe.horizontal;
        this.y -= this.currentNode.dupe.vertical;
      }
    }
  };
  this.move = function (delta) {
    if (!this.visible) return;
    this.transPoints = null; // clear cached points

    if ($.isFunction(this.preMove)) {
      this.preMove(delta);
    }

    this.vel.x += this.acc.x * delta;
    this.vel.y += this.acc.y * delta;
    this.x += this.vel.x * delta;
    this.y += this.vel.y * delta;
    this.rot += this.vel.rot * delta;
    if (this.rot > 360) {
      this.rot -= 360;
    } else if (this.rot < 0) {
      this.rot += 360;
    }

    if ($.isFunction(this.postMove)) {
      this.postMove(delta);
    }
  };
  this.updateGrid = function () {
    if (!this.visible) return;
    var gridx = Math.floor(this.x / GRID_SIZE);
    var gridy = Math.floor(this.y / GRID_SIZE);
    gridx = (gridx >= this.grid.length) ? 0 : gridx;
    gridy = (gridy >= this.grid[0].length) ? 0 : gridy;
    gridx = (gridx < 0) ? this.grid.length-1 : gridx;
    gridy = (gridy < 0) ? this.grid[0].length-1 : gridy;
    var newNode = this.grid[gridx][gridy];
    if (newNode != this.currentNode) {
      if (this.currentNode) {
        this.currentNode.leave(this);
      }
      newNode.enter(this);
      this.currentNode = newNode;
    }

    if (KEY_STATUS.g && this.currentNode) {
      this.context.lineWidth = 3.0;
      this.context.strokeStyle = 'green';
      this.context.strokeRect(gridx*GRID_SIZE+2, gridy*GRID_SIZE+2, GRID_SIZE-4, GRID_SIZE-4);
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 1.0;
    }
  };
  this.configureTransform = function () {
    if (!this.visible) return;

    var rad = (this.rot * Math.PI)/180;

    this.context.translate(this.x, this.y);
    this.context.rotate(rad);
    this.context.scale(this.scale, this.scale);
  };
  this.draw = function () {
    if (!this.visible) return;

    this.context.strokeStyle="white"

    this.context.lineWidth = 1.0 / this.scale;

    for (child in this.children) {
      this.children[child].draw();
    }

    this.context.beginPath();

    this.context.moveTo(this.points[0], this.points[1]);
    for (var i = 1; i < this.points.length/2; i++) {
      var xi = i*2;
      var yi = xi + 1;
      this.context.lineTo(this.points[xi], this.points[yi]);
    }

    this.context.closePath();
    this.context.stroke();
  };
  this.findCollisionCanidates = function () {
    if (!this.visible || !this.currentNode) return [];
    var cn = this.currentNode;
    var canidates = [];
    if (cn.nextSprite) canidates.push(cn.nextSprite);
    if (cn.north.nextSprite) canidates.push(cn.north.nextSprite);
    if (cn.south.nextSprite) canidates.push(cn.south.nextSprite);
    if (cn.east.nextSprite) canidates.push(cn.east.nextSprite);
    if (cn.west.nextSprite) canidates.push(cn.west.nextSprite);
    if (cn.north.east.nextSprite) canidates.push(cn.north.east.nextSprite);
    if (cn.north.west.nextSprite) canidates.push(cn.north.west.nextSprite);
    if (cn.south.east.nextSprite) canidates.push(cn.south.east.nextSprite);
    if (cn.south.west.nextSprite) canidates.push(cn.south.west.nextSprite);
    return canidates
  };
  this.checkCollisionsAgainst = function (canidates) {
    for (var i = 0; i < canidates.length; i++) {
      var ref = canidates[i];
      do {
        this.checkCollision(ref);
        ref = ref.nextSprite;
      } while (ref)
    }
  };
  this.checkCollision = function (other) {
    if (!other.visible ||
         this == other ||
         this.collidesWith.indexOf(other.name) == -1) return;
    var trans = other.transformedPoints();
    var px, py;
    var count = trans.length/2;
    for (var i = 0; i < count; i++) {
      px = trans[i*2];
      py = trans[i*2 + 1];
      // mozilla doesn't take into account transforms with isPointInPath >:-P
      if (($.browser.mozilla) ? this.pointInPolygon(px, py) : this.context.isPointInPath(px, py)) {
        other.collision(this);
        this.collision(other);
        return;
      }
    }
  };
  this.pointInPolygon = function (x, y) {
    var points = this.transformedPoints();
    var j = 2;
    var y0, y1;
    var oddNodes = false;
    for (var i = 0; i < points.length; i += 2) {
      y0 = points[i + 1];
      y1 = points[j + 1];
      if ((y0 < y && y1 >= y) ||
          (y1 < y && y0 >= y)) {
        if (points[i]+(y-y0)/(y1-y0)*(points[j]-points[i]) < x) {
          oddNodes = !oddNodes;
        }
      }
      j += 2
      if (j == points.length) j = 0;
    }
    return oddNodes;
  };
  this.collision = function () {
  };
  this.die = function () {
    this.visible = false;
    this.reap = true;
    if (this.currentNode) {
      this.currentNode.leave(this);
      this.currentNode = null;
    }
  };
  this.transformedPoints = function () {
    if (this.transPoints) return this.transPoints;
    var trans = new Array(this.points.length);
    this.matrix.configure(this.rot, this.scale, this.x, this.y);
    for (var i = 0; i < this.points.length/2; i++) {
      var xi = i*2;
      var yi = xi + 1;
      var pts = this.matrix.multiply(this.points[xi], this.points[yi], 1);
      trans[xi] = pts[0];
      trans[yi] = pts[1];
    }
    this.transPoints = trans; // cache translated points
    return trans;
  };
  this.isClear = function () {
    if (this.collidesWith.length == 0) return true;
    var cn = this.currentNode;
    if (cn == null) {
      var gridx = Math.floor(this.x / GRID_SIZE);
      var gridy = Math.floor(this.y / GRID_SIZE);
      gridx = (gridx >= this.grid.length) ? 0 : gridx;
      gridy = (gridy >= this.grid[0].length) ? 0 : gridy;
      cn = this.grid[gridx][gridy];
    }
    return (cn.isEmpty(this.collidesWith) &&
            cn.north.isEmpty(this.collidesWith) &&
            cn.south.isEmpty(this.collidesWith) &&
            cn.east.isEmpty(this.collidesWith) &&
            cn.west.isEmpty(this.collidesWith) &&
            cn.north.east.isEmpty(this.collidesWith) &&
            cn.north.west.isEmpty(this.collidesWith) &&
            cn.south.east.isEmpty(this.collidesWith) &&
            cn.south.west.isEmpty(this.collidesWith));
  };
  this.wrapPostMove = function () {
    if(this.name === 'ship'){
      if(Game.flags.bod_engine_on){
        if (this.x > Game.canvasWidth) {
          this.x = 0;
          Game.mapX++
          SFX.partymusic.pause()

          if(Game.mapX > 6) Game.mapX = 0
        } else if (this.x < 0) {
          this.x = Game.canvasWidth;
          Game.mapX--
          SFX.partymusic.pause()

          if(Game.mapX < 0) Game.mapX = 6
        }
        if (this.y > Game.canvasHeight) {
          this.y = 0;
          Game.mapY++
          SFX.partymusic.pause()

          if(Game.mapY > 6) Game.mapY = 0
        } else if (this.y < 0) {
          this.y = Game.canvasHeight;
          Game.mapY--
          SFX.partymusic.pause()

          if(Game.mapY < 0) Game.mapY = 6
        }
      }else{
        if (this.x > Game.canvasWidth) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = Game.canvasWidth;
        }
        if (this.y > Game.canvasHeight) {
          this.y = 0;
        } else if (this.y < 0) {
          this.y = Game.canvasHeight;
        }
      }
    }else if(!Game.flags.bod_engine_on){
      if (this.x > Game.canvasWidth) {
        this.x = 0;
      } else if (this.x < 0) {
        this.x = Game.canvasWidth;
      }
      if (this.y > Game.canvasHeight) {
        this.y = 0;
      } else if (this.y < 0) {
        this.y = Game.canvasHeight;
      }
    }
  };

};

Ship = function () {
  this.init("ship",
            [-5,   4,
              0, -12,
              5,   4]);

  this.children.exhaust = new Sprite();
  this.children.exhaust.init("exhaust",
                             [-3,  6,
                               0, 11,
                               3,  6]);

  this.bulletCounter = 0;

  this.postMove = this.wrapPostMove;

  this.collidesWith = ["asteroid", "bigalien", "alienbullet"];

  this.preMove = function (delta) {

    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads[0]) {
      // alert('gamepad disconnected');
      gamepads = [{axes: [5,5,5], buttons:[5,5,5]}]
    }

    // if(gamepads[0].buttons[0].pressed === true) alert("shoot!")

    // if(gamepads[0].axes[0] === -1) alert('0, -1')
    // if(gamepads[0].axes[0] === 1) alert('0, 1')


    // if(gamepads[0].axes[1] === -1) alert('1, -1')
    // if(gamepads[0].axes[1] === 1) alert('1, 1')

    if (gamepads[0].axes[0] === 1 || KEY_STATUS.left) {
      this.vel.rot = -6;
    } else if (gamepads[0].axes[0] === -1 || KEY_STATUS.right) {
      this.vel.rot = 6;
    } else {
      this.vel.rot = 0;
    }

    if (KEY_STATUS.up || gamepads[0].buttons[0].pressed) {
      var rad = ((this.rot-90) * Math.PI)/180;
      this.acc.x = 0.35 * Math.cos(rad);
      this.acc.y = 0.35 * Math.sin(rad);
      this.children.exhaust.visible = Math.random() > 0.1;
    } else {
      this.acc.x = 0;
      this.acc.y = 0;
      this.children.exhaust.visible = false;
    }

    if (this.bulletCounter > 0) {
      this.bulletCounter -= delta;
    }

    if (KEY_STATUS.space || gamepads[0].buttons[1].pressed) {
      if (this.bulletCounter <= 0) {
        this.bulletCounter = 10;
        for (var i = 0; i < this.bullets.length; i++) {
          if (!this.bullets[i].visible) {
            SFX.laser.play();
            var bullet = this.bullets[i];
            var rad = ((this.rot-90) * Math.PI)/180;
            var vectorx = Math.cos(rad);
            var vectory = Math.sin(rad);
            // move to the nose of the ship
            bullet.x = this.x + vectorx * 4;
            bullet.y = this.y + vectory * 4;
            bullet.vel.x = 6 * vectorx + this.vel.x;
            bullet.vel.y = 6 * vectory + this.vel.y;
            bullet.visible = true;
            break;
          }
        }
      }
    }

    // limit the ship's speed
    let max = 3

    if (KEY_STATUS.up || gamepads[0].buttons[0].pressed) max = 6

    if (Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y) > max) {
      this.vel.x *= 0.95;
      this.vel.y *= 0.95;
    }
  };

  this.collision = function (other) {
    SFX.explosion.play();
    Game.explosionAt(other.x, other.y);
    Game.FSM.state = 'player_died';
    this.visible = false;
    this.currentNode.leave(this);
    this.currentNode = null;
    Game.lives--;
  };

};
Ship.prototype = new Sprite();

BigAlien = function () {
  this.init("bigalien",
            [-20,   0,
             -12,  -4,
              12,  -4,
              20,   0,
              12,   4,
             -12,   4,
             -20,   0,
              20,   0]);

  this.children.top = new Sprite();
  this.children.top.init("bigalien_top",
                         [-8, -4,
                          -6, -6,
                           6, -6,
                           8, -4]);
  this.children.top.visible = true;

  this.children.bottom = new Sprite();
  this.children.bottom.init("bigalien_top",
                            [ 8, 4,
                              6, 6,
                             -6, 6,
                             -8, 4]);
  this.children.bottom.visible = true;

  this.collidesWith = ["asteroid", "ship", "bullet"];

  this.bridgesH = false;

  this.bullets = [];
  this.bulletCounter = 0;

  this.newPosition = function () {
    if (Math.random() < 0.5) {
      this.x = -20;
      this.vel.x = 1.5;
    } else {
      this.x = Game.canvasWidth + 20;
      this.vel.x = -1.5;
    }
    this.y = Math.random() * Game.canvasHeight;
  };

  this.setup = function () {
    this.newPosition();

    for (var i = 0; i < 3; i++) {
      var bull = new AlienBullet();
      this.bullets.push(bull);
      Game.sprites.push(bull);
    }
  };

  this.preMove = function (delta) {
    var cn = this.currentNode;
    if (cn == null) return;

    var topCount = 0;
    if (cn.north.nextSprite) topCount++;
    if (cn.north.east.nextSprite) topCount++;
    if (cn.north.west.nextSprite) topCount++;

    var bottomCount = 0;
    if (cn.south.nextSprite) bottomCount++;
    if (cn.south.east.nextSprite) bottomCount++;
    if (cn.south.west.nextSprite) bottomCount++;

    if (topCount > bottomCount) {
      this.vel.y = 1;
    } else if (topCount < bottomCount) {
      this.vel.y = -1;
    } else if (Math.random() < 0.01) {
      this.vel.y = -this.vel.y;
    }

    this.bulletCounter -= delta;
    if (this.bulletCounter <= 0) {
      this.bulletCounter = 22;
      for (var i = 0; i < this.bullets.length; i++) {
        if (!this.bullets[i].visible) {
          bullet = this.bullets[i];
          var rad = 2 * Math.PI * Math.random();
          var vectorx = Math.cos(rad);
          var vectory = Math.sin(rad);
          bullet.x = this.x;
          bullet.y = this.y;
          bullet.vel.x = 6 * vectorx;
          bullet.vel.y = 6 * vectory;
          bullet.visible = true;
          SFX.laser.play();
          break;
        }
      }
    }

  };

  BigAlien.prototype.collision = function (other) {
    if (other.name == "bullet") Game.score += 200;
    SFX.explosion.play();
    Game.explosionAt(other.x, other.y);
    this.visible = false;
    this.newPosition();
  };

  this.postMove = function () {
    if (this.y > Game.canvasHeight) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = Game.canvasHeight;
    }

    if ((this.vel.x > 0 && this.x > Game.canvasWidth + 20) ||
        (this.vel.x < 0 && this.x < -20)) {
      // why did the alien cross the road?
      this.visible = false;
      this.newPosition();
    }
  }
};
BigAlien.prototype = new Sprite();

Bullet = function () {
  this.init("bullet", [0, 0]);
  this.time = 0;
  this.bridgesH = false;
  this.bridgesV = false;
  this.postMove = this.wrapPostMove;
  // asteroid can look for bullets so doesn't have
  // to be other way around
  //this.collidesWith = ["asteroid"];

  this.configureTransform = function () {};
  this.draw = function () {
    if (this.visible) {
      this.context.strokeStyle="white";
      this.context.save();
      this.context.lineWidth = 2;
      this.context.beginPath();
      this.context.moveTo(this.x-1, this.y-1);
      this.context.lineTo(this.x+1, this.y+1);
      this.context.moveTo(this.x+1, this.y-1);
      this.context.lineTo(this.x-1, this.y+1);
      this.context.stroke();
      this.context.restore();
    }
  };
  this.preMove = function (delta) {
    if (this.visible) {
      this.time += delta;
    }
    if (this.time > 50) {
      this.visible = false;
      this.time = 0;
    }
  };
  this.collision = function (other) {
    this.time = 0;
    this.visible = false;
    this.currentNode.leave(this);
    this.currentNode = null;
  };
  this.transformedPoints = function (other) {
    return [this.x, this.y];
  };

};
Bullet.prototype = new Sprite();

AlienBullet = function () {
  this.init("alienbullet");

  this.draw = function () {
    if (this.visible) {
      this.context.save();
      this.context.lineWidth = 2;
      this.context.beginPath();
      this.context.moveTo(this.x, this.y);
      this.context.lineTo(this.x-this.vel.x, this.y-this.vel.y);
      this.context.stroke();
      this.context.restore();
    }
  };
};
AlienBullet.prototype = new Bullet();

Asteroid = function () {
  this.init("asteroid",
            [-10,   0,
              -5,   7,
              -3,   4,
               1,  10,
               5,   4,
              10,   0,
               5,  -6,
               2, -10,
              -4, -10,
              -4,  -5]);

  this.visible = true;
  this.scale = 6;
  this.postMove = this.wrapPostMove;

  this.collidesWith = ["ship", "bullet", "bigalien", "alienbullet"];

  this.collision = function (other) {
    SFX.explosion.play();
    if (other.name == "bullet") Game.score += 120 / this.scale;
    this.scale /= 3;
    if (this.scale > 0.5) {
      // break into fragments
      for (var i = 0; i < 3; i++) {
        var roid = $.extend(true, {}, this);
        roid.vel.x = Math.random() * 6 - 3;
        roid.vel.y = Math.random() * 6 - 3;
        if (Math.random() > 0.5) {
          roid.points.reverse();
        }
        roid.vel.rot = Math.random() * 2 - 1;
        roid.move(roid.scale * 3); // give them a little push
        Game.sprites.push(roid);
      }
    }
    Game.explosionAt(other.x, other.y);
    this.die();
  };
};
Asteroid.prototype = new Sprite();

Explosion = function () {
  this.init("explosion");

  this.bridgesH = false;
  this.bridgesV = false;

  this.lines = [];
  for (var i = 0; i < 5; i++) {
    var rad = 2 * Math.PI * Math.random();
    var x = Math.cos(rad);
    var y = Math.sin(rad);
    this.lines.push([x, y, x*2, y*2]);
  }

  this.draw = function () {
    if (this.visible) {
      this.context.save();
      this.context.lineWidth = 1.0 / this.scale;
      this.context.beginPath();
      for (var i = 0; i < 5; i++) {
        var line = this.lines[i];
        this.context.moveTo(line[0], line[1]);
        this.context.lineTo(line[2], line[3]);
      }
      this.context.stroke();
      this.context.restore();
    }
  };

  this.preMove = function (delta) {
    if (this.visible) {
      this.scale += delta;
    }
    if (this.scale > 8) {
      this.die();
    }
  };
};
Explosion.prototype = new Sprite();

GridNode = function () {
  this.north = null;
  this.south = null;
  this.east  = null;
  this.west  = null;

  this.nextSprite = null;

  this.dupe = {
    horizontal: null,
    vertical:   null
  };

  this.enter = function (sprite) {
    sprite.nextSprite = this.nextSprite;
    this.nextSprite = sprite;
  };

  this.leave = function (sprite) {
    var ref = this;
    while (ref && (ref.nextSprite != sprite)) {
      ref = ref.nextSprite;
    }
    if (ref) {
      ref.nextSprite = sprite.nextSprite;
      sprite.nextSprite = null;
    }
  };

  this.eachSprite = function(sprite, callback) {
    var ref = this;
    while (ref.nextSprite) {
      ref = ref.nextSprite;
      callback.call(sprite, ref);
    }
  };

  this.isEmpty = function (collidables) {
    var empty = true;
    var ref = this;
    while (ref.nextSprite) {
      ref = ref.nextSprite;
      empty = !ref.visible || collidables.indexOf(ref.name) == -1
      if (!empty) break;
    }
    return empty;
  };
};

// borrowed from typeface-0.14.js
// http://typeface.neocracy.org
Text = {
  renderGlyph: function (ctx, face, char) {

    var glyph = face.glyphs[char];

    if (glyph.o) {

      var outline;
      if (glyph.cached_outline) {
        outline = glyph.cached_outline;
      } else {
        outline = glyph.o.split(' ');
        glyph.cached_outline = outline;
      }

      var outlineLength = outline.length;
      for (var i = 0; i < outlineLength; ) {

        var action = outline[i++];

        switch(action) {
          case 'm':
            ctx.moveTo(outline[i++], outline[i++]);
            break;
          case 'l':
            ctx.lineTo(outline[i++], outline[i++]);
            break;

          case 'q':
            var cpx = outline[i++];
            var cpy = outline[i++];
            ctx.quadraticCurveTo(outline[i++], outline[i++], cpx, cpy);
            break;

          case 'b':
            var x = outline[i++];
            var y = outline[i++];
            ctx.bezierCurveTo(outline[i++], outline[i++], outline[i++], outline[i++], x, y);
            break;
        }
      }
    }
    if (glyph.ha) {
      ctx.translate(glyph.ha, 0);
    }
  },

  renderText: function(text, size, x, y, glyph = true) {
    this.context.save();

    this.context.translate(x, y);

    var pixels = size * 72 / (this.face.resolution * 100);
    this.context.scale(pixels, -1 * pixels);
    this.context.beginPath();
    var chars = text.split('');
    var charsLength = chars.length;
    for (var i = 0; i < charsLength; i++) {
      if(glyph) this.renderGlyph(this.context, this.face, chars[i]);
      else{
        this.context.font ="14pt Calibri"

        this.context.fillStyle="white"
        this.context.fillText(text, 0,0)
      } 
    }
    this.context.fill();

    this.context.restore();
  },

  context: null,
  face: null
};

SFX = {
  laser:     new Audio('39459__THE_bizniss__laser.wav'),
  explosion: new Audio('51467__smcameron__missile_explosion.wav'),
  partymusic: new Audio('dontdreamitsover.wav'),
  opendoor: new Audio('open.wav'),
  closedoor: new Audio('close.wav')
};

SFX.laser.volume = .6


SFX.partymusic.loop = true

// SFX.laser.play()

// preload audio
// for (var sfx in SFX) {
//   (function () {
//     var audio = SFX[sfx];
//     audio.muted = true;
//     audio.play();

//     SFX[sfx] = function () {
//       if (!this.muted) {
//         if (audio.duration == 0) {
//           // somehow dropped out
//           audio.load();
//           audio.play();
//         } else {
//           audio.muted = false;
//           audio.currentTime = 0;
//         }
//       }
//       return audio;
//     }
//   })();
// }
// pre-mute audio
SFX.muted = false;
SFX.laser.load()

Game = {
  score: 0,
  totalAsteroids: 5,
  lives: 0,
  mapX: 0,
  mapY:0,
  textSequence: [],
  flags: {},
  inside:'',

  canvasWidth: 819,
  canvasHeight: 600,

  sprites: [],
  ship: null,
  bigAlien: null,

  nextBigAlienTime: null,


  spawnAsteroids: function (count) {
    if (!count) count = this.totalAsteroids;
    for (var i = 0; i < count; i++) {
      var roid = new Asteroid();
      roid.x = Math.random() * this.canvasWidth;
      roid.y = Math.random() * this.canvasHeight;
      while (!roid.isClear()) {
        roid.x = Math.random() * this.canvasWidth;
        roid.y = Math.random() * this.canvasHeight;
      }
      roid.vel.x = Math.random() * 4 - 2;
      roid.vel.y = Math.random() * 4 - 2;
      if (Math.random() > 0.5) {
        roid.points.reverse();
      }
      roid.vel.rot = Math.random() * 2 - 1;
      Game.sprites.push(roid);
    }
  },

  explosionAt: function (x, y) {
    var splosion = new Explosion();
    splosion.x = x;
    splosion.y = y;
    splosion.visible = true;
    Game.sprites.push(splosion);
  },

  FSM: {
    boot: function () {
      Game.spawnAsteroids(5);
      this.state = 'waiting';
    },
    waiting: function () {
      Text.renderText(window.ipad ? 'Touch Screen to Start' : 'Press shoot to Start', 36, Game.canvasWidth/2 - 270, Game.canvasHeight/2);
      var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
      
      if (!gamepads[0]) {
        // alert('gamepad disconnected');
        gamepads = [{axes: [5,5,5], buttons:[5,5,5]}]
      }

      if (KEY_STATUS.space || window.gameStart || gamepads[0].buttons[0].pressed || gamepads[0].buttons[1].pressed) {
        KEY_STATUS.space = false; // hack so we don't shoot right away
        window.gameStart = false;
        this.state = 'start';
      }
    },
    start: function () {
      for (var i = 0; i < Game.sprites.length; i++) {
        if (Game.sprites[i].name == 'asteroid') {
          Game.sprites[i].die();
        } else if (Game.sprites[i].name == 'bullet' ||
                   Game.sprites[i].name == 'bigalien') {
          Game.sprites[i].visible = false;
        }
      }

      Game.startTime = Date.now();

      Game.score = 0;
      Game.lives = 2;
      Game.totalAsteroids = 2;
      // Game.spawnAsteroids();

      setTimeout(() => {
        Game.instructional = '<< Transmission Incoming >>'
      }, test ? 500 : 10000)

      setTimeout(() => {
        Game.instructional = ''
        Game.flags.bod_engine_on = true
        readyForPump = false
        Game.textSequence = ['WHERE\'D THE ASTEROIDS GO??', 'WOW...YOU DID IT!!!! THE ASTEROIDS ARE GONE !!!!!', 'YOU DEFEATED THEM','Holy....COW!!! Let the GRAND CELEBRATION begin. WE ARE SAVED', 'YOU ARE A HERO!!! I knew u could do it','Ok I\'m getting the party started right now I invited EVERY1!!!', 'GET HERE AS SOON AS YOU CAN WE ARe ALL waiting for u', 'We R partying at your place at X:4 Y:2 BABY!', 'Everyones gonna B there Waitin 4 u... X:4 Y:2, dont forget about us!']
        Game.textSequence.portrait = 'soundwave'
        Game.textSequence.name = 'Transmission from Connie'
      }, test ? 1000 : 20000)




      // Game.nextBigAlienTime = Date.now() + 30000 + (30000 * Math.random());

      this.state = 'spawn_ship';
    },
    spawn_ship: function () {
      Game.ship.x = Game.canvasWidth / 2;
      Game.ship.y = Game.canvasHeight / 2;
      if (Game.ship.isClear()) {
        Game.ship.rot = 0;
        Game.ship.vel.x = 0;
        Game.ship.vel.y = 0;
        Game.ship.visible = true;
        this.state = 'run';
      }
    },
    run: function () {
      for (var i = 0; i < Game.sprites.length; i++) {
        if (Game.sprites[i].name == 'asteroid') {
          break;
        }
      }
      if (i == Game.sprites.length) {
        this.state = 'new_level';
      }
      // if (!Game.bigAlien.visible &&
      //     Date.now() > Game.nextBigAlienTime) {
      //   Game.bigAlien.visible = true;
      //   Game.nextBigAlienTime = Date.now() + (30000 * Math.random());
      // }
    },
    new_level: function () {
      if (this.timer == null) {
        this.timer = Date.now();
      }
      // wait a second before spawning more asteroids
      if (Date.now() - this.timer > 1000) {
        this.timer = null;
        Game.totalAsteroids++;
        if (Game.totalAsteroids > 12) Game.totalAsteroids = 12;
        // Game.spawnAsteroids();
        this.state = 'run';
      }
    },
    player_died: function () {
      if (Game.lives < 0) {
        this.state = 'end_game';
      } else {
        if (this.timer == null) {
          this.timer = Date.now();
        }
        // wait a second before spawning
        if (Date.now() - this.timer > 1000) {
          this.timer = null;
          this.state = 'spawn_ship';
        }
      }
    },
    end_game: function () {
      Text.renderText('GAME OVER', 50, Game.canvasWidth/2 - 160, Game.canvasHeight/2 + 10);
      if (this.timer == null) {
        this.timer = Date.now();
      }
      // wait 5 seconds then go back to waiting state
      if (Date.now() - this.timer > 5000) {
        this.timer = null;
        this.state = 'waiting';
      }

      window.gameStart = false;
    },

    execute: function () {
      this[this.state]();
    },
    state: 'boot'
  }

};


var player
var paused = false;

$(function () {
  var canvas = $("#canvas");
  Game.canvasWidth  = canvas.width();
  Game.canvasHeight = canvas.height();

  var context = canvas[0].getContext("2d");

  Text.context = context;
  Text.face = vector_battle;

  var gridWidth = Math.round(Game.canvasWidth / GRID_SIZE);
  var gridHeight = Math.round(Game.canvasHeight / GRID_SIZE);
  var grid = new Array(gridWidth);
  for (var i = 0; i < gridWidth; i++) {
    grid[i] = new Array(gridHeight);
    for (var j = 0; j < gridHeight; j++) {
      grid[i][j] = new GridNode();
    }
  }

  // set up the positional references
  for (var i = 0; i < gridWidth; i++) {
    for (var j = 0; j < gridHeight; j++) {
      var node   = grid[i][j];
      node.north = grid[i][(j == 0) ? gridHeight-1 : j-1];
      node.south = grid[i][(j == gridHeight-1) ? 0 : j+1];
      node.west  = grid[(i == 0) ? gridWidth-1 : i-1][j];
      node.east  = grid[(i == gridWidth-1) ? 0 : i+1][j];
    }
  }

  // set up borders
  for (var i = 0; i < gridWidth; i++) {
    grid[i][0].dupe.vertical            =  Game.canvasHeight;
    grid[i][gridHeight-1].dupe.vertical = -Game.canvasHeight;
  }

  for (var j = 0; j < gridHeight; j++) {
    grid[0][j].dupe.horizontal           =  Game.canvasWidth;
    grid[gridWidth-1][j].dupe.horizontal = -Game.canvasWidth;
  }

  var sprites = [];
  Game.sprites = sprites;

  // so all the sprites can use it
  Sprite.prototype.context = context;
  Sprite.prototype.grid    = grid;
  Sprite.prototype.matrix  = new Matrix(2, 3);

  var ship = new Ship();
  player = ship

  ship.x = Game.canvasWidth / 2;
  ship.y = Game.canvasHeight / 2;

  sprites.push(ship);

  ship.bullets = [];
  for (var i = 0; i < 10; i++) {
    var bull = new Bullet();
    ship.bullets.push(bull);
    sprites.push(bull);
  }
  Game.ship = ship;

  var bigAlien = new BigAlien();
  bigAlien.setup();
  sprites.push(bigAlien);
  Game.bigAlien = bigAlien;

  var extraDude = new Ship();
  extraDude.scale = 0.6;
  extraDude.visible = true;
  extraDude.preMove = null;
  extraDude.children = [];

  var i, j = 0;

  var startTime = null;

  var showFramerate = false;
  var avgFramerate = 0;
  var frameCount = 0;
  var elapsedCounter = 0;

  var lastFrame = Date.now();
  var thisFrame;
  var elapsed;
  var delta;

  var canvasNode = canvas[0];

  // shim layer with setTimeout fallback
  // from here:
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (/* function */ callback, /* DOMElement */ element) {
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  var mainLoop = function () {
    //clear screen
    context.fillStyle='black'
    context.fillRect(0, 0, Game.canvasWidth, Game.canvasHeight);
    context.fillStyle='white'

    Game.FSM.execute();

    //draw currentMap
    let coords = `x${Game.mapX}y${Game.mapY}`
        // console.log(coords, Map[coords])
    if(Game.inside.length) Inside[Game.inside](context)
    else if(Map[coords]) Map[coords](context)

    // if (KEY_STATUS.g) {
    //   context.beginPath();
    //   for (var i = 0; i < gridWidth; i++) {
    //     context.moveTo(i * GRID_SIZE, 0);
    //     context.lineTo(i * GRID_SIZE, Game.canvasHeight);
    //   }
    //   for (var j = 0; j < gridHeight; j++) {
    //     context.moveTo(0, j * GRID_SIZE);
    //     context.lineTo(Game.canvasWidth, j * GRID_SIZE);
    //   }
    //   context.closePath();
    //   context.stroke();
    // }

    thisFrame = Date.now();
    elapsed = thisFrame - lastFrame;
    lastFrame = thisFrame;
    delta = elapsed / 30;

    for (i = 0; i < sprites.length; i++) {

      sprites[i].run(delta);

      if (sprites[i].reap) {
        sprites[i].reap = false;
        sprites.splice(i, 1);
        i--;
      }
    }

    frameCount++;
    elapsedCounter += elapsed;
    if (elapsedCounter > 1000) {
      elapsedCounter -= 1000;
      avgFramerate = frameCount;
      frameCount = 0;
    }

    renderGUI(false)

    if (paused) {
      // Text.renderText('PAUSED', 72, Game.canvasWidth/2 - 160, 120);
    } else {
      requestAnimFrame(mainLoop, canvasNode);
    }


  };

  mainLoop();


  //helper funcs
  function renderGUI(notUpdating){
    if(notUpdating){
      context.fillStyle='black'
      context.fillRect(0, 0, Game.canvasWidth, Game.canvasHeight);
      context.fillStyle='white'

      let coords = `x${Game.mapX}y${Game.mapY}`
      if(Game.inside.length) Inside[Game.inside](context)
      else if(Map[coords]) Map[coords](context)

      for (i = 0; i < sprites.length; i++) {
        sprites[i].run(0);
      }
    }

    if(Game.specialImage) context.drawImage(Game.specialImage, 20,38)

    var score_text = ''+Game.score;
    if(test) context.fillText(`X:${Game.mapX} Y:${Game.mapY}`, Game.canvasWidth - 100, 20);
    else Text.renderText(score_text, 18, Game.canvasWidth - 14 * score_text.length, 20);
    
    if(test){
      context.fillText(`mouseX:${mouseX} mouseY:${mouseY}`, Game.canvasWidth -500, 80);
    } 

    // extra dudes
    for (i = 0; i < Game.lives; i++) {
      context.save();
      extraDude.x = Game.canvasWidth - (8 * (i + 1));
      extraDude.y = 32;
      extraDude.configureTransform();
      extraDude.draw();
      context.restore();
    }

    if (showFramerate) {
      Text.renderText(''+avgFramerate, 24, Game.canvasWidth - 38, Game.canvasHeight - 2);
    }

    if(Game.instructional){
      context.fillStyle='white'
      let text = Game.instructional
      context.font ="24pt Arial"
      let length = context.measureText(text).width
      context.fillText(text, Game.canvasWidth/2 - length/2, 400)
      if(Game.instructional !== '<< Transmission Incoming >>') Game.instructional = ''
    }

    if(Game.textSequence.length){

      //textbox
      context.fillStyle="rgba(255,255,255, 0.1)"
      context.fillRect(Game.canvasWidth/2 - 210, 210, 420, 95)

      //portrait
      if(Game.textSequence.portrait){
        //portrait outline
        context.fillStyle="rgba(255,255,255,.1)"
        context.fillRect(Game.canvasWidth/2 - 200, 140, 80, 70)

        if(Game.textSequence.portrait === 'ship'){
          drawShip.down(Game.canvasWidth/2 - 183, 147, context, 25)
        }else{
          context.drawImage(IMAGES[Game.textSequence.portrait], Game.canvasWidth/2 - 198, 142, 76, 66)
        }
      } 

      //portrait name
      context.font ="24pt Arial"
      context.fillStyle="white"
      context.fillText(Game.textSequence.name ? Game.textSequence.name : '???', Game.canvasWidth/2 - 110, 205)

      //text
      let text = Game.textSequence[0]
      context.font ="18pt Arial"
      wrapText(context, text, Game.canvasWidth/2 - 200, 240, 410, 25)

      // more text icon
      if(Game.textSequence.length > 1){
        let x = Game.canvasWidth/2
        context.fillRect(x+190, 285, 10, 10)
      }

      paused = true;
    }

    if(Game.flags.bod_engine_on){
      //coordinates
      context.font ="20pt Arial"
      context.fillStyle="white"
      context.fillText("X:" + Game.mapX + " Y:" + Game.mapY, 10, 25)
    }

  }

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
      
  function unpause(){
    // start up again
    paused = false
    lastFrame = Date.now();
    mainLoop();
  }

  var gamepadconnected = false
  var readyForAxis = false
  window.addEventListener("gamepadconnected", () => {
    var gamepadconnected = true
    setInterval(pollGamepads, 5)
  });

  function pollGamepads() {
    if(ifButtonsPressed() && readyForPump){
      if(Game.textSequence.length){
        Game.textSequence.shift()
        readyForPump = false
        renderGUI(true);
        if(!Game.textSequence.length){
          unpause()
        }
      }
      if(Game.flags.unlockingCombo){
        $('.cyclic_input').css({display:'none'})
        readyForPump = false
        Game.flags.unlockingCombo = false
        checkCombo()
        unpause()
      }
    }

    if(!ifButtonsPressed() && readyForPump == false){
      readyForPump = true
      // console.log("ready for pump again")
    }

    if(ifAxisCentered() && readyForAxis == false){
      readyForAxis = true
      // console.log('ready for axis again')
    }

    if(readyForAxis && ifAxisPressed() && Game.flags.unlockingCombo){
      let input = $('.cyclic_input').filter((num, el) => {
        return el === document.activeElement
      })[0]

      input = $(input)

      let val = $(input).text();

      var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
      if (!gamepads[0]) {
        gamepads = [{axes: [5,5,5], buttons:[5,5,5]}]
      }

      // right
      if(gamepads[0].axes[0] === -1){
        readyForAxis = false
        input.next().focus();
      } 

      // left
      if(gamepads[0].axes[0] === 1){
        readyForAxis = false
        input.prev().focus();
      } 

      //down
      if(gamepads[0].axes[1] === -1){
        readyForAxis = false
        input.text(advanceCharBy(val, 1));
      }
      
      //up
      if(gamepads[0].axes[1] === 1){
        readyForAxis = false
        input.text(advanceCharBy(val, -1));
      } 
    }

  }

  KEYCODES = { left: 37, up: 38, right: 39, down: 40 };

  $('.cyclic_input').keydown(function(ev){

      input = $(this);
      val = $(this).text();
      
      switch (ev.keyCode) {   
        case KEYCODES.right:
          input.next().focus();
          break;
        case KEYCODES.left:
          input.prev().focus();
          break;
        case KEYCODES.up:
          input.text(advanceCharBy(val, 1));
          break;
        case KEYCODES.down:
          input.text(advanceCharBy(val, -1));
          break;
        default:
          if (ev.keyCode >= 65 && ev.keyCode <= 65 + 26) {
              input.text(String.fromCharCode(ev.keyCode));
              input.next().focus();
          }
      };
      ev.preventDefault();
  });

  advanceCharBy = function(char, distance) {
      oldCode = char.charCodeAt(0);
      newCode = 65 + (oldCode - 65 + 26 + distance) % 26;
      return String.fromCharCode(newCode);
  };

  $(window).keydown(function (e) {
    switch (KEY_CODES[e.keyCode]) {
      case 'space':
        if(Game.textSequence.length){
          Game.textSequence.shift()
          renderGUI(true);
          if(!Game.textSequence.length){
            unpause()
          }
        }
        if(Game.flags.unlockingCombo){
          $('.cyclic_input').css({display:'none'})
          Game.flags.unlockingCombo = false
          checkCombo()
          unpause()
        }
        break;
      case 'f': // show framerate
        showFramerate = !showFramerate;
        break;
      // case 'p': // pause
      //   paused = !paused;
      //   if (!paused) {
      //     // start up again
      //     unpause()
      //   }
      //   break;
      case 'm': // mute
        SFX.muted = !SFX.muted;
        break;
    }
  });
});


var mouseX = 0
var mouseY = 0

document.onmousemove=function(ev){
  mouseX = event.clientX
  mouseY = event.clientY
}

// vim: fdl=0
