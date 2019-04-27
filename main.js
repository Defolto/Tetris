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
        [0,1],[0,2],[0,3],
        // поворот на 90 градусов
        [
            [-1,1],[0,0],[1,-1],[2,-2]
        ],
        // на 180 градусов
        [
            [1,-1],[0,0],[-1,1],[-2,2]
        ],
        // поворот на 270 градусов
        [
            [-1,1],[0,0],[1,-1],[2,-2]
        ],
        // на 360 градусов
        [
            [1,-1],[0,0],[-1,1],[-2,2]
        ]
    ],
    //квадрат
    [
        [1,0],[0,1],[1,1],
        // поворот на 90 градусов
        [
            [0,0],[0,0],[0,0],[0,0]
        ],
        // на 180 градусов
        [
            [0,0],[0,0],[0,0],[0,0]
        ],
        // поворот на 270 градусов
        [
            [0,0],[0,0],[0,0],[0,0]
        ],
        // на 360 градусов
        [
            [0,0],[0,0],[0,0],[0,0]
        ]
    ],
    //Буква L
    [
        [1,0],[0,1],[0,2],
        // поворот на 90 градусов
        [
            [0,0],[-1,1],[1,0],[2,-1]
        ],
        // на 180 градусов
        [
            [1,-1],[1,-1],[-1,0],[-1,0]
        ],
        // поворот на 270 градусов
        [
            [-1,0],[0,-1],[2,-2],[1,-1]
        ],
        // на 360 градусов
        [
            [0,-1],[0,-1],[-2,0],[-2,0]
        ]
    ],
    //Буква L (зеркальная)
    [
        [1,0],[1,1],[1,2],
        // поворот на 90 градусов
        [
            [0,0],[0,0],[1,-1],[-1,-1]
        ],
        // на 180 градусов
        [
            [0,-1],[-1,0],[-2,1],[1,0]
        ],
        // поворот на 270 градусов
        [
            [2,0],[0,0],[1,-1],[1,-1]
        ],
        // на 360 градусов
        [
            [-2,0],[1,-1],[0,0],[-1,1]
        ]
    ],
    //Молния (право)
    [
        [1,0],[-1,1],[0,1],
        // поворот на 90 градусов
        [
            [0,-1],[-1,0],[2,-1],[1,0]
        ],
        // на 180 градусов
        [
            [0,0],[1,-1],[-2,0],[-1,-1]
        ],
        // поворот на 270 градусов
        [
            [0,-1],[-1,0],[2,-1],[1,0]
        ],
        // на 360 градусов
        [
            [0,0],[1,-1],[-2,0],[-1,-1]
        ]
    ],
    //Молния (лево)
    [
        [1,0],[1,1],[2,1],
        // поворот на 90 градусов
        [
            [2,-1],[0,0],[1,-1],[-1,0]
        ],
        // на 180 градусов
        [
            [-2,0],[0,-1],[-1,0],[1,-1]
        ],
        // поворот на 270 градусов
        [
            [2,-1],[0,0],[1,-1],[-1,0]
        ],
        // на 360 градусов
        [
            [-2,0],[0,-1],[-1,0],[1,-1]
        ]
    ],
    //Лего
    [
        [1,0],[2,0],[1,1],
        // поворот на 90 градусов
        [
            [1,-1],[0,0],[0,0],[0,0]
        ],
        // на 180 градусов
        [
            [0,0],[-1,0],[-1,0],[1,-1]
        ],
        // поворот на 270 градусов
        [
            [1,-1],[1,-1],[1,-1],[0,0]
        ],
        // на 360 градусов
        [
            [-2,0],[0,-1],[0,-1],[-1,-1]
        ]
    ]
]

let currentFigure = 0; // вспомогательная для рандома
let figureBody = 0; // вспомогательная
let rotate = 1; // отслеживаем поворот единицы

function create(){//создание фигуры
    function getRandom(){
        return Math.round(Math.random()*(mainArr.length-1))//рандомная фигура (индекс массива)
    }
    rotate = 1;
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

let score = 0;
let input = document.getElementsByTagName('input')[0];
input.value = `Ваши очки: ${score}`;

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
        for(let i =1; i<15; i++){// проверка на заполненность ряда
            let count = 0;
            for(let k=1; k<11; k++){
                if(document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')){ // если ряд полностью забит
                    count++;
                    if(count == 10){
                        score += 10;
                        input.value = `Ваши очки: ${score}`;
                        for (let m =1; m<11; m++){
                            document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');// удаление ряда
                        }
                        let set = document.querySelectorAll('.set'); // все элементы с классом set
                        let newSet = []; // для нового поля
                        for (let s=0; s<set.length; s++){
                            let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')]; // получение x и y
                            if(setCoordinates[1] > i){// удаление set и запись их в массив newSet
                                set[s].classList.remove('set');
                                newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1]-1}"]`));                               
                            }
                        }
                        for(let a = 0; a<newSet.length; a++){ // зарисовка клеток из массива newSet
                            newSet[a].classList.add('set');
                        }
                        i--;
                    }
                }
            }
        }
        for(let n=1; n<11; n++){// проверка на конец игры
            if(document.querySelector(`[posX = "${n}"][posY = "${15}"]`).classList.contains('set')){
                clearInterval(interval);
                    alert(`Игра окончена! Ваши очки ${score}`);
                    break;
            }
        }
        create();// создаём новую фигуру
    }
}

let interval = setInterval(() => {
    move();
}, 300);

let flag = true;
window.addEventListener('keydown', function (e){
    let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

    function getNewState(a) {
        flag = true;
        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`)
        ];

        for(let i = 0; i<figureNew.length; i++){
            if(!figureNew[i] || figureNew[i].classList.contains('set')){
                flag = false;
            }
        }
        if(flag == true){
            for (let i=0; i<figureBody.length; i++){
                figureBody[i].classList.remove('figure'); //убираем предыдущую зарисовку
            }  
            figureBody = figureNew;
            for (let i=0; i<figureBody.length; i++){
                figureBody[i].classList.add('figure'); //убираем предыдущую зарисовку
            }
        }
    }
    if(e.keyCode == 37){
        getNewState(-1);
    }
    else
    if(e.keyCode == 39){
        getNewState(1);
    }
    else
    if(e.keyCode == 40){
        move();
    }
    else
    if(e.keyCode == 38){
        flag = true;
        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate+2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate+2][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate+2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate+2][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate+2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate+2][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate+2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate+2][3][1]}"]`)
        ];

        for(let i = 0; i<figureNew.length; i++){
            if(!figureNew[i] || figureNew[i].classList.contains('set')){
                flag = false;
            }
        }
        if(flag == true){
            for (let i=0; i<figureBody.length; i++){
                figureBody[i].classList.remove('figure'); //убираем предыдущую зарисовку
            }  
            figureBody = figureNew;
            for (let i=0; i<figureBody.length; i++){
                figureBody[i].classList.add('figure'); //добавляем предыдущую зарисовку
            }
            if(rotate < 4){
                rotate++;
            }
            else{
                rotate = 1;
            }
        }
    }
});


