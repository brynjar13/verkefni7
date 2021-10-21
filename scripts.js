/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** breytur fyrir while lykkjuna */
let j;
let k;
/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  let bestof = parseInt(bestOf,10)
  if (bestof < 10 && bestof%2 === 1) {
    return true;
  }

  return false;
}
// console.assert(isValidBestOf(1) === true, '1 er valid best of');
// console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
// console.assert(isValidBestOf(9) === true, '9 er valid best of');
// console.assert(isValidBestOf(-3) === false, '-3 er valid bestof');

function playAsText(play) {
  let num = parseInt(play,10)
  if (num === 1) {
    return 'Skæri';
  }

  if (num === 2) {
    return 'Blað';
  }

  if (num === 3); {
    return 'Steinn';
  }
}
// console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
// console.assert(playAsText('2') === 'Blað', '2 táknar blað');
// console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
// console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  let player_number = parseInt(player,10);
  let computer_number = parseInt(computer,10);
  if (player_number === 1 && computer_number === 2 || player_number === 2 && computer_number === 3 || player_number === 3 && computer_number === 1) {
    return 1;
  }

  if (player_number === 1 && computer_number === 3 || player_number === 2 && computer_number === 1 || player_number === 3 && computer_number === 2) {
    return -1;
  }

  if (player_number === 1 && computer_number === 1 || player_number === 2 && computer_number === 2 || player_number === 3 && computer_number === 3) {
    return 0;
  }
}
// console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
// console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
// console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
// console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
// console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  // TODO útfæra
  // 1. Spyrja um hvað spilað, ef cancel, hætta
  let player = prompt('Veldu 1 fyrir skæri, 2 fyrir blað, 3 fyrir steinn');
  if (player === null) {
    return null;
  }
  player = parseInt(player)
  // 2. Ef ógilt, tölva vinnur
  if (player !== 1 && player !== 2 && player !== 3) {
    alert('þetta er ekki löglegt gildi, tölva vinnur');
    return -1;
  }
  // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 2 + 1)` sem skilar heiltölu á [1, 3]
  let computer = Math.floor(Math.random() * 2 + 1);
  // 4. Nota `checkGame()` til að finna hver vann
  if (checkGame(player,computer) === -1) {
    alert(`þú valdir ${playAsText(player)} og tölvan valdi ${playAsText(computer)}, þú tapar`);
    return -1;
  }
  
  if (checkGame(player,computer) === 0) {
    alert(`þú valdir ${playAsText(player)} og tölvan valdi ${playAsText(computer)}, það er jafntefli`);
    return 0;
  }

  if (checkGame(player,computer) === 1) {
    alert(`þú valdir ${playAsText(player)} og tölvan valdi ${playAsText(computer)}, þú vinnur`);
    return 1;
  }
}
// 5. Birta hver vann
// 6. Skila hver vann
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  // 1. Spyrja um fjölda leikja
  let fl = parseInt(prompt('Hvernig bestof leik viltu? þarf að vera oddatala minni en 10'),10);
  // 2. Staðfesta að fjöldi leikja sé gilt gildi
  if (isValidBestOf(fl) === false) {
    return console.error('þarf að vera oddatala á bilinu 0-10');
  }
  // 3. Keyra fjölda leikja og spila umferð þar til sigurvegari er krýndur

  switch (fl) {
    case 1:
      for (let i = 0; i < fl;) {
        let r = round();
        if (r === 1) {
          i++;
          wins++;
          return wins;
        }
        else if (r === -1) {
          i++;
          losses++;
          return losses;
        }
        else if (r === null) {
          alert('Þú hættir við leik');
          break;
        }
        else {
          {};
        }
      }
    
    case 3:
    j = 0;
    k = 0;
    while (true) {
      let r = round();
      if (r === 1) {
        j++;       
        wins++;
        if (j === 2) {
          alert('Þú vinnur')
          break;
        }
      }
      else if (r === -1) {
        k--;
        losses++;
        if (k === -2) {
          alert('þú tapar')
          break;
        }
      }
      else if (r === null) {
        alert('Þú hættir við leik');
        break;
      }
      else {
        {};
      }
    }

    case 5:
      j = 0;
      k = 0;
      while (true) {
        let r = round();
        if (r === 1) {
          j++;       
          wins++;
          if (j === 3) {
            alert('Þú vinnur')
            break;
          }
        }
        else if (r === -1) {
          k--;
          losses++;
          if (k === -3) {
            alert('þú tapar')
            break;
          }
        }
        else if (r === null) {
          alert('Þú hættir við leik');
          break;
        }
        else {
          {};
        }
      }

    case 7:
      j = 0;
      k = 0;
      while (true) {
        let r = round();
        if (r === 1) {
          j++;       
          wins++;
          if (j === 4) {
            alert('Þú vinnur')
            break;
          }
        }
        else if (r === -1) {
          k--;
          losses++;
          if (k === -4) {
            alert('þú tapar')
            break;
          }
        }
        else if (r === null) {
          alert('Þú hættir við leik');
          break;
        }
        else {
          {};
        }
      }

    case 9:
      j = 0;
      k = 0;
      while (true) {
        let r = round();
        if (r === 1) {
          j++;       
          wins++;
          if (j === 5) {
            alert('Þú vinnur')
            break;
          }
        }
        else if (r === -1) {
          k--;
          losses++;
          if (k === -5) {
            alert('þú tapar')
            break;
          }
        }
        else if (r === null) {
          alert('Þú hættir við leik');
          break;
        }
        else {
          {};
        }
      }
  }
  // 4. Birta hvort spilari eða tölva vann
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  // TODO útfæra
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
