let tetris = document.createElement('div');
tetris.classList.add('tetris');//Создали новый div с классом .tetris

for (let i = 1; i < 181; i++) 
{ 
    let excel = document.createElement('div');
    excel.classList.add('excel');   
    tetris.appendChild(excel);  // создаём 180 ячеек для тетриса
}

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris); // добавление тетриса в main

let excel = document.getElementsByClassName('excel'); // записываем в excel все 180 ячеек
let i = 0;

for (let y = 18; y > 0; y--){
    for(let x = 1; x<11; x++){
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY',y); // установление координат
        i++;
    }
}

let x = 5, y = 10; // установили первоначальные координаты для фигур (временно)
let mainArr = [
    //палка
    [
        [0,1],[0,2],[0,3]
    ],
    //квадрат
    [
        [1,0],[0,1],[1,1]
    ]
]

let currentFigure = 0; // вспомогательная для рандома
let figureBody = 0; // вспомогательная

function create(){//создание фигуры
    function getRandom(){
        return Math.round(Math.random()*(mainArr.length-1))//рандомная фигура (индекс массива)
    }
    currentFigure = getRandom();
    figureBody = [ // выбор нужных клеточек
        document.querySelector(`[posx = "${x}"][posy = "${y}"]`),
        document.querySelector(`[posx = "${x + mainArr[currentFigure][0][0]}"][posy = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posx = "${x + mainArr[currentFigure][1][0]}"][posy = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posx = "${x + mainArr[currentFigure][2][0]}"][posy = "${y + mainArr[currentFigure][2][1]}"]`),
    ]

    for (let i=0; i<figureBody.length; i++){
        figureBody[i].classList.add('figure'); //зарисовка нужных клеточек
    }
}

create();