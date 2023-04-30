const container = document.querySelector('.container');
const slider = document.querySelector('#myRange');
const sliderValue = document.querySelector('#rangeValue');
const buttons = document.querySelectorAll('input');
const paletteColor = document.querySelector('#colorPicker');
const gridCheck = document.querySelector('#myonoffswitch');



const drawButton = document.querySelector('#drawerButton');
const rainbowButton = document.querySelector('#rainbowButton');
const eraserButton = document.querySelector("#eraserButton");

let rainbowMode = false;
let color = '';

document.addEventListener('DOMContentLoaded', firstLaunch());
slider.addEventListener('mouseup', modifyCells);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        manageAction(button.value);
    });
});

gridCheck.addEventListener('click', () => {
    if (gridCheck.checked) {
        stateGrid(true);
    } else if (gridCheck.checked != true) {
        stateGrid(false);
    }
});

bordersState.addEventListener("click", () => {
    if (bordersState.checked) {
        stateBorders(true);
    } else if (bordersState.checked != true) {
        stateBorders(false);
    }
})

paletteColor.addEventListener("input", () => {
    let colorSelected = '';
    if(rainbowMode){
        colorSelected = color;
    } else {
        colorSelected = getColor();
    }
    container.style.boxShadow = `0px 0px 20px 10px ${colorSelected}`;
    drawButton.style.boxShadow = `0px 0px 10px 3px ${colorSelected}`;

});

function firstLaunch() {
    createGrid(16, 16);
    paletteColor.value = 'black';
    container.style.boxShadow = `0px 0px 20px 10px ${getColor()}`;
    drawButton.style.boxShadow = `0px 0px 10px 3px ${getColor()}`;
    stateGrid(true);
    slider.value = '16';
}


function stateGrid(status) {
    let cells = getCells();
    if (status) {
        cells.forEach(cell => {
            cell.style.border = '1px solid rgba(201, 199, 199, 0.429)';
        });
    } else {
        cells.forEach(cell => {
            cell.style.border = '0px';
        });
    }
}

function modifyCells() {
    cleanGrid();
    const cells = slider.value;
    sliderValue.textContent = `${cells} x ${cells}`;
    createGrid(cells, cells);
    stateGrid(true);
}

function cleanGrid() {
    let gridCells = getCells();
    gridCells.forEach(cell => cell.remove());
}

function getCells() {
    return container.querySelectorAll('div');
}

function createGrid(rows, cols) {
    for (let i = 1; i <= (rows * cols); i++) {
        container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        const cell = document.createElement('div');
        container.appendChild(cell).className = 'gridItem';
    }
}

function manageAction(action) {
    if(action !== 'Rainbow'){
        rainbowMode = false;
    }
    styleBorder(action);
    if (action === 'Drawer') {
        drawer();
    } else if (action === 'Eraser') {
        eraser();
    } else if (action === 'Rainbow') {
        rainbowMode = true;
        drawer();
    }
}


function styleBorder(elementChose) {
        if (elementChose === 'Drawer') {
            container.style.boxShadow = `0px 0px 20px 10px ${getColor()}`;
            drawButton.style.boxShadow = `0px 0px 10px 3px ${getColor()}`;
            rainbowButton.style.boxShadow = 'none';
            eraserButton.style.boxShadow = "none";
        } else if (elementChose === 'Eraser') {
            container.style.boxShadow = '0px 0px 80px 80px black';
            drawButton.style.boxShadow = 'none';
            rainbowButton.style.boxShadow = 'none';
            eraserButton.style.boxShadow = '0px 0px 80px 40px black';
            paletteColor.value = 'transparent';
        } else if (elementChose = 'Rainbow') {
            container.style.boxShadow = 'none';
            drawButton.style.boxShadow = 'none';
            rainbowButton.style.boxShadow = `none`;
            eraserButton.style.boxShadow = 'none';
        } 
}


function drawer() {
    let cells = getCells();
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            color = getColor();
            if (rainbowMode) {
                rainbowButton.style.boxShadow = `0px 0px 10px 3px ${color}`;
                container.style.boxShadow = `0px 0px 20px 10px ${color}`;
                paletteColor.value = color;
            }
            cell.style.backgroundColor = color;
        });
    });
}


function eraser() {
    let cells = getCells();
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = 'transparent';
            cell.style.opacity = 1;
        });
    });
}

function getColor() {
    if (rainbowMode) {
        return getRandomColor();
    } else {
        return paletteColor.value;
    }
}

function getRandomColor() {
    var color = Math.floor(Math.random() * 16777216).toString(16);
    return '#000000'.slice(0, -color.length) + color;
}