// Initial numbers
const prompt = require('prompt-sync')();

let playerHP = 20;
let playerSP = 20;

let enemyHP = 20;
let enemySP = 20;

let playerChargeCount = 0;
let enemyChargeCount = 0;

let defendActive = false;
let enemyDefendActive = false;

let healTurn = 0;
let enemyHealTurn = 0;

let maxPlayerHP = 20;
let maxPlayerSP = 20;
let maxEnemyHP = 20;
let maxEnemySP = 20;

// Main turn-code
for(let turn = 0; enemyHP > 0 && playerHP > 0; turn++) {
    if (turn % 2 === 1) {playerHealing(); let validAction = false;
        while (!validAction) {
         let choice = prompt("Choose: 1-Attack, 2-Heal, 3-Fireball, 4-Charge, 5-Defend");
         validAction = playerAction(Number(choice));}} else {enemyHealing(); enemyAction();}
    console.log("Enemy health: " + enemyHP, "Enemy SP: " + enemySP);
    console.log("Player's health: " + playerHP, "Player`s SP: " + playerSP);
};

endGame(playerHP, enemyHP);

function turnChange () {
    playerAction = !playerAction;
};

function firstTurn() {
    switch(Math.floor(Math.random() * 2)) {
        case 0: return playerAction;
        break;
        case 1: return enemyAction;
        break;
    }
};
// Player actions and choosing system
function playerAction(choice) {
  if (choice === 1) {
    playerAttack();
    return true;
  } else if (choice === 2) {
    if (playerSP >= 4) {
    playerSP -= 4;
    healTurn += 3;
    playerHealing();
    return true} else {console.log('Not enough SP'); return false};
  } else if (choice === 3) {
    if (playerSP >= 6) {
    playerSP -= 6;
    return playerFireball()} else {console.log('Not enough SP'); return false};
  } else if (choice === 4) {
    if (playerSP >= 8) {
    playerSP -= 8;
    return playerCharge()} else {console.log('Not enough SP'); return false};
  } else if (choice === 5) {
    playerSP = Math.min(playerSP + 5, maxPlayerSP);
    playerDefence();
    return true;
  }
};

function playerAttack() {
  let damage;
  if (playerChargeCount === 0) {
    damage = Math.floor(Math.random() * 4) + 1; 
  } else {
    damage = (Math.floor(Math.random() * 4) + 1) * 2; 
    playerChargeCount--;
  }
  if (enemyDefendActive) {
    damage = Math.floor(damage / 3);
    enemyDefendActive = false;
  }
  enemyHP -= damage;
  console.log(`You attack for ${damage} damage!`);
}



function playerHealing() {
  if (healTurn > 0) {
    let healCharge = Math.floor(Math.random() * 4);
    playerHP = Math.min(playerHP + healCharge, 20);
    healTurn--;
    console.log(`Healed for ${healCharge} HP!`);
    return true;
  }
};

function playerFireball() {
  let blast = Math.floor(Math.random() * 8) + 1;
  let damage;
  if (playerChargeCount === 0) {
    damage = blast;
  } else {
    damage = blast * 2;
    playerChargeCount--;
  }
  if (enemyDefendActive) {
    damage = Math.floor(damage / 3);
    enemyDefendActive = false;
  }
  enemyHP -= damage;
  console.log(`Fireball hits for ${damage} damage!`);
  return true;
}

function playerCharge() {
  if (playerChargeCount === 0) {
  playerChargeCount++;
  console.log("Next attack or fireball will be stronger.");
  return true;} else {console.log("Already charged!"); return false }
}

function playerDefence() {
  defendActive = true;
  console.log("Defense up!");
  return true;
}
// Enemy actions and main system for random choosing
function enemyAction() {
    let enemyValidAction = false;
    while (!enemyValidAction) {
    let move = Math.floor(Math.random() * 5);
        if (move === 0) {enemyAttack(); enemyValidAction = true;}
        else if (move === 1) {if (enemySP >= 4) {enemySP -= 4; enemyHealTurn += 3; enemyHealing(); enemyValidAction = true;} else {enemySP = Math.min(enemySP + 5, maxEnemySP);
; enemyDefence(); enemyValidAction = true;}}
        else if (move === 2) {if (enemySP >= 6) {enemySP -= 6; enemyFireball(); enemyValidAction = true} else {enemySP = Math.min(enemySP + 5, maxEnemySP);
; enemyDefence(); enemyValidAction = true;}}
        else if (move === 3) {if (enemySP >= 8 && enemyChargeCount === 0) {enemySP -= 8; enemyCharge(); enemyValidAction = true} else {enemySP = Math.min(enemySP + 5, maxEnemySP);
; enemyDefence(); enemyValidAction = true;}}
        else if (move === 4) {enemySP = Math.min(enemySP + 5, maxEnemySP);
; enemyDefence(); enemyValidAction = true;}
    }
};

function enemyAttack() {
  let damage;
  if (enemyChargeCount === 0) {
    damage = Math.floor(Math.random() * 4) + 1; 
  } else {
    damage = (Math.floor(Math.random() * 4) + 1) * 2; 
    enemyChargeCount--;
  }
  if (defendActive) {
    damage = Math.floor(damage / 3);
    defendActive = false;
  }
  playerHP -= damage;
  console.log(`Enemy attacks for ${damage} damage!`);
}

function enemyHealing() {
  if (enemyHealTurn > 0) {
    let enemyHealCharge = Math.floor(Math.random() * 4);
    enemyHP = Math.min(enemyHP + enemyHealCharge, 20);
    enemyHealTurn--;
    console.log(`Enemy heals for ${enemyHealCharge} HP!`);
  }
};

function enemyFireball() {
  let blast = Math.floor(Math.random() * 8) + 1;
  let damage;
  if (enemyChargeCount === 0) {
    damage = blast;
  } else {
    damage = blast * 2;
    enemyChargeCount--;
  }
  if (defendActive) {
    damage = Math.floor(damage / 3);
    defendActive = false;
  }
  playerHP -= damage;
  console.log(`Fireball hits for ${damage} damage!`);
}


function enemyCharge() {
  enemyChargeCount++;
  console.log("Enemy`s next attack or fireball will be stronger.");
}

function enemyDefence() {
  enemyDefendActive = true;
  console.log("Enemy`s defense up!");
  return true;
}
// Game over function
function endGame(playerHP, enemyHP) {
    if (playerHP === 0 || playerHP < 0) {console.log("You Lose!")} else if (enemyHP === 0 || enemyHP < 0) {console.log("You Win!")};
    if (playerHP === 0 || enemyHP === 0 || playerHP < 0 || enemyHP < 0) {console.log("Game Over!")};
};
