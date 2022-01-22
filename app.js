/** Ajoute la classe 'selectedColor' à l'élément choisi*/
const colorChoice = document.querySelectorAll(".color");
colorChoice.forEach(element => {
    element.addEventListener('click', (e) => {
        if (getChoosedColorDot()) getChoosedColorDot().classList.remove("selectedColor");
        e.target.classList.add("selectedColor");
    });
});

//let toto = activeDot();
function activeDot() {
    return document.querySelectorAll(".grid>.activeLine>.dot");
}

function colorTheDot(e) {
    if (e.parentNode.classList.contains("activeLine")) {
        e.style.backgroundColor = getChoosedColor();
    }
}

activeTheDot();
/** Colorie le rond cliqué avec la couleur choisie */
function activeTheDot() {
    activeDot().forEach(element => {
        element.addEventListener('click', ()=>colorTheDot(element));
    });
}

// function removeListener(){
//     console.log(toto);
//     activeDot().forEach(element => {
//         element.removeEventListener('click', colorTheDot(element) );
//         });
// }

/** retourne le point de couleur choisi */
function getChoosedColorDot() {
    return document.querySelector(".selectedColor");
}
/** retourne la couleur sélectionnée */
function getChoosedColor() {
    return getComputedStyle(getChoosedColorDot()).backgroundColor;
}


/**
 *
 * Génération du puzzle aléatoire
 * @return array
 */
let puzzle = generatePuzzle();
function generatePuzzle() {
    let nbColors = 5;
    const colorArray = ["rgb(5, 231, 92)", "rgb(255, 64, 4)", "rgb(12, 136, 251)", "rgb(168, 30, 247)", "rgb(243, 247, 30)"];
    const puzzleArray = [];
    for (let index = 0; index < nbColors; index++) {
        puzzleArray.push(colorArray[Math.floor(Math.random() * (colorArray.length))])
    }
    return puzzleArray;
}


/**
 *
 * Vérification et retour du résultat
 *
 */
function getGuessedColor() {
    const guessedColor = [];
    activeDot().forEach((element) => {
        guessedColor.push(getComputedStyle(element).backgroundColor);
    });
    return guessedColor;
}

function compareGuessedToGenerated() {
    let result = [];
    let colorTrue = "green";
    let colorMisplaced = "gold";
    let colorFalse = "white";
    const guessedColorArray = getGuessedColor();
    const savedArray = [];
    for (let i = 0; i < guessedColorArray.length; i++) {
        if (guessedColorArray[i] === puzzle[i]) {
            result.push(colorTrue);
            savedArray.push(i);
        } else if (puzzle.indexOf(guessedColorArray[i]) == -1) {
            result.push(colorFalse);
        } else {
            let exit = false;
            puzzle.forEach((element, index) => {
                //si on trouve une même couleur dans le tableau et que l'index de la couleur n'est pas dans le tableau alors misplaced
                if (element == guessedColorArray[i] && element != guessedColorArray[index] && !savedArray.includes(index) && !exit) {
                    //on sauvegarde l'index et on ajoute la couleur misplaced
                    savedArray.push(index);
                    result.push(colorMisplaced);
                    exit = true;
                }
            });
            if (!exit) result.push(colorFalse);
        };
    }
    console.table(result);

    return result;
}


/**
 * Comportement du bouton
 *
 * au clic on vérifie la solution
 */


const buttonValidation = document.querySelector(".checkResult");
buttonValidation.addEventListener('click', () => { checkResult() });

function checkResult() {
    let array = compareGuessedToGenerated();
    let i = 0;
    array.forEach((element) => {
        i++;
        document.querySelector(".result>.activeLine>.dot:nth-child(" + i + ")").style.backgroundColor = element;
    });
    changeActiveLine();
}

function changeActiveLine() {
    const activeLine = document.querySelectorAll(".activeLine");
    // removeListener();
    activeLine.forEach((element)=>{
        element.classList.remove("activeLine");
        element.nextElementSibling.classList.add("activeLine");
    });

    //toto = activeDot();
    activeTheDot();

}



