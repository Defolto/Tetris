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

let x = 5, y = 15; // установили первоначальные координаты для фигур (временно)
let mainArr = [
    //палка
    [
        [0,1],[0,2],[0,3]
    ],
    //квадрат
    [
        [1,0],[0,1],[1,1]
    ],
    //Буква L
    [
        [1,0],[0,1],[0,2]
    ],
    //Буква L (зеркальная)
    [
        [1,0],[1,1],[1,2]
    ],
    //Молния (право)
    [
        [1,0],[-1,1],[0,1]
    ],
    //Молния (лево)
    [
        [1,0],[1,1],[2,1]
    ],
    //Лего
    [
        [1,0],[2,0],[1,1]
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

function move() {
    let moveflag = true;
    let coordinates = [ // создание массива для фигуры
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
    ];
    for(let i = 0; i < coordinates.length; i++){// проверка на то, что мы можем двигаться вниз
        if(coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1]-1}"]`).classList.contains('set')){
            moveflag = false;
            break;
        }
    }

    if(moveflag){// если можем двигаться дальше
        for (let i=0; i<figureBody.length; i++){
            figureBody[i].classList.remove('figure'); //убираем предыдущую зарисовку
        }
        figureBody = [// заполнение массива со смещёнными координатами
            document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1]-1}"]`)
        ];
        for (let i=0; i < figureBody.length; i++){
            figureBody[i].classList.add('figure'); //зарисовка нужных клеточек (смещённых на -1)
        }
    }
    else{// если не можем двигаться дальше
        for(let i = 0; i < figureBody.length; i++){
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }
        create();// создаём новую фигуру
    }
}

let interval = setInterval(() => {
    move();
}, 300);
