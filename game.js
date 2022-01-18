let rectangleNumber = 6; //количество прямоугольников
let curUser = localStorage.getItem('nickname');
let usersList = '';


if (localStorage.getItem('nickname')) {
  document.getElementById('start_game').disabled = false
  document.querySelector('.moveto_nextlvl').disabled = false
  document.querySelector('.retrylvl').disabled = false
  document.querySelector('.general_results').disabled = false
}

if (localStorage.getItem('username')) {
  usersList = localStorage.getItem('username').split('**');
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("dropdownDiff").classList.toggle("show");
  //установка сложности
  document.getElementById('dropdownDiff').addEventListener("click", function (ev) {
    let target = ev.target
    localStorage.setItem('difficulty', target.textContent);
    // document.querySelector('.dropbtn').textContent = target.textContent //смена кнопки сложности

  });
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



//таймер
let time;//время
function timer(timeMinut) {
  let timerCont = document.querySelector('.timer');

  timeMinut = timeMinut * 60;
  timerCont.innerHTML = "";
  clearInterval(time);

  time = setInterval(function () {
    let seconds = timeMinut % 60 // Получаем секунды
    // let minutes = timeMinut / 60 % 60 // Получаем минуты

    if (timeMinut <= -1) {
      console.log('gregnkje')

      clearInterval(time);
      // Выводит сообщение что время закончилось
    } else { // Иначе

      let strTimer = `${seconds}`;
      timerCont.innerHTML = strTimer;
    }
    --timeMinut; // Уменьшаем таймер
  }, 1000)
}

// if(document.querySelector('.timer').textContent == 0){
//   console.log('pqpqptowop')
//   let currRectanglesShow = document.querySelectorAll('.square_rand')
//     for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
//       currRectanglesShow[i].remove()
//     }
//     clearInterval(time);
//     localStorage.setItem(`${localStorage.getItem('nickname')}**${localStorage.getItem('level')}**${localStorage.getItem('difficulty')}`, 0);

// }



//change button
document.getElementById('dropdownDiff').addEventListener("click", function (event) {
  document.querySelector('.dropbtn').innerHTML = event.target.innerHTML;
});

//hide menu -> show game
document.getElementById('start_game').addEventListener("click", function () {
  if (!localStorage.getItem('difficulty')) {
    localStorage.setItem('difficulty', 'Простой');
  }

  if (localStorage.getItem('difficulty') == 'Простой') {//смена кол-ва от сложности
    rectangleNumber = 6;
  }
  else if (localStorage.getItem('difficulty') == 'Сложный') {
    rectangleNumber = 9;
  }

  document.querySelector('.main_menu').style.display = 'none';
  document.querySelector('.game').style.display = 'block';
  document.querySelector('.timer').style.display = 'flex';
  document.querySelector('.dop_timer').style.display = 'block';
  document.querySelector('.dop_timer_2').style.display = 'block';
  

  if (finish) {
    finish = false
    level_1();
  }
  else {
    if (localStorage.getItem('level')) {
      let currLevel = +localStorage.getItem('level');
      switch (currLevel) {
        case 1:
          level_1();
          break;
        case 2:
          level_2();
          break;
        case 3:
          level_3();
          break;
        case 4:
          level_4();
          break;
        case 5:
          localStorage.setItem('level', 1);
          level_1();
          break;
      }
    }
    else {
      level_1();
    }
  }
});


//установка никнейма
document.getElementById('nickname_submit').addEventListener("click", function () {
  document.getElementById('start_game').disabled = false
  document.querySelector('.moveto_nextlvl').disabled = false
  document.querySelector('.retrylvl').disabled = false
  document.querySelector('.general_results').disabled = false
  curUser = localStorage.getItem('nickname');

  if (!document.getElementById('nickname').value.includes('**') && document.getElementById('nickname').value != '') {
    let inputNickname = document.getElementById('nickname');
    localStorage.setItem('nickname', inputNickname.value);
    document.querySelector('.greeting_user').innerHTML = `Привет, ${localStorage.getItem('nickname')}`
    document.getElementById('authorisation').style.display = 'none'
    document.getElementById('logged_in').style.display = 'flex'

    if (localStorage.getItem('username')) {
      usersList = localStorage.getItem('username').split('**');
    }

    if (localStorage.getItem('username') != null && !usersList.includes(localStorage.getItem('nickname'))) {

      localStorage.setItem('username', localStorage.getItem('username') + '**' + localStorage.getItem('nickname'));

    }
    else if (!usersList.includes(localStorage.getItem('nickname'))) {
      localStorage.setItem('username', localStorage.getItem('nickname'));
    }
  }
});

//удаление никнейма из памяти
document.getElementById('user_exit').addEventListener("click", function () {
  document.getElementById('start_game').disabled = true
  document.querySelector('.moveto_nextlvl').disabled = true
  document.querySelector('.retrylvl').disabled = true
  document.querySelector('.general_results').disabled = true
  document.getElementById('logged_in').style.display = 'none'
  document.getElementById('authorisation').style.display = 'block'
  localStorage.removeItem('nickname')
  localStorage.removeItem('level')

  let currRectanglesShow = document.querySelectorAll('.square_rand')
  for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
    currRectanglesShow[i].remove()
  }
  document.getElementById('goal_text').innerHTML = '';//удаление цели
  document.querySelector('.main_menu').style.display = 'block';
  document.querySelector('.game').style.display = 'none';
  document.querySelector('.game_results').style.display = 'none';
  document.querySelector('.check_results').style.display = 'none'
  document.querySelector('.moveto_nextlvl').style.display = 'block'
  document.querySelector('.results_page').style.display = 'none'
  
  clearInterval(time);


});

if (localStorage.getItem('nickname')) {
  document.getElementById('authorisation').style.display = 'none'
  document.getElementById('logged_in').style.display = 'flex'
  document.querySelector('.greeting_user').innerHTML = `Привет, ${localStorage.getItem('nickname')}`

}

//массив цветов
const colorMatching = {
  'red': 'красный',
  'yellow': 'жёлтый',
  'orange': 'оранжевый',
  'orchid': 'светло-лиловый',
  'aqua': 'голубой',
  'lime': 'лаймовый',
  'greenyellow': 'желто-зелёный',
  'grey': 'серый',
  'crimson': 'малиновый',
  'green': 'тёмно-зелёный',
  'blue': 'синий',
  'black': 'чёрный',
  'brown': 'коричневый',
  'chocolate': 'шоколадный',
  'indigo': 'индиго',
  'purple': 'фиолетовый',

}

const keys = Object.keys(colorMatching)//набор с ключами цветов
const colorValues = Object.values(colorMatching)//набор со значениями цветов
let finish = false;

function getRandomSet(low, high, numb) { //получение рандомного набора неповторяющихся значений
  var res = new Set();
  while (res.size < numb) res.add(Math.floor(Math.random() * (high - low + 1)) + low);
  return res;
}




//функция перехода на следующий уровень
document.querySelector('.moveto_nextlvl').addEventListener("click", function () {
  document.querySelector('.game').style.display = 'block';
  document.querySelector('.game_results').style.display = 'none';
  document.querySelector('.timer').style.display = 'flex';
  document.querySelector('.dop_timer').style.display = 'block';
  document.querySelector('.dop_timer_2').style.display = 'block';

  let currLevel = +localStorage.getItem('level');
  switch (currLevel) {
    case 0:
      level_1();
      break;
    case 1:
      level_1();
      break;
    case 2:
      level_2();
      break;
    case 3:
      level_3();
      break;
    case 4:
      level_4();
      break;
    case 5:
      level_5();
      break;
  }
});
//переигровка уровня
document.querySelector('.retrylvl').addEventListener("click", function () {
  document.querySelector('.game').style.display = 'block';
  document.querySelector('.game_results').style.display = 'none';
  document.querySelector('.check_results').style.display = 'none'
  document.querySelector('.moveto_nextlvl').style.display = 'block'
  document.querySelector('.timer').style.display = 'flex';
  document.querySelector('.dop_timer').style.display = 'block';
  document.querySelector('.dop_timer_2').style.display = 'block';

  let currLevel = +localStorage.getItem('level');
  console.log(currLevel)
  switch (currLevel - 1) {
    case -1:
      level_1();
      break;
    case 0:
      level_1();
      break;
    case 1:
      level_1();
      break;
    case 2:
      level_2();
      break;
    case 3:
      level_3();
      break;
    case 4:
      level_4();
      break;
    case 5:
      level_5();
      break;
  }
});

//функция перехода к главному меню
document.querySelector('.moveto_menu').addEventListener("click", function () {
  document.querySelector('.main_menu').style.display = 'block';
  document.querySelector('.game').style.display = 'none';
  document.querySelector('.game_results').style.display = 'none';
  document.querySelector('.check_results').style.display = 'none'
  document.querySelector('.moveto_nextlvl').style.display = 'block'
});

function level_1() {
  let keysControlPanelArr = Array.from(getRandomSet(0, keys.length - 1, rectangleNumber))//массив случайных различных цветов
  let reverseKeysColorSet = Array.from(keysControlPanelArr).reverse()//обратный к set массив различных цветов, но ссылается на arr
  document.querySelector('.current_level_info').innerHTML = 'Текущий уровень: 1'
  localStorage.setItem('level', 1);
  let faleCount = 0;

  if (localStorage.getItem('difficulty') == 'Простой') {//смена кол-ва от сложности
    timer(0.1);
  }
  else if (localStorage.getItem('difficulty') == 'Сложный') {
    timer(0.2);
  }

  for (let i = 0; i < rectangleNumber; i++) {
    let currRandomColor = keysControlPanelArr[i] //через массив
    let reverseRandomName = reverseKeysColorSet[i]
    let randomNameColor = colorValues[currRandomColor]
    let square = document.createElement('div');
    let caption = document.createTextNode(randomNameColor)
    let caption_m = document.createElement('H2')
    caption_m.appendChild(caption)//добавление текста в тег h2
    square.className = 'square_rand';
    caption_m.className = 'caption_rand'//присвоение классов
    square.setAttribute('id', `square_${i}`)
    // square.setAttribute('class', `squares_targets`)
    document.getElementById('game_proccess').appendChild(square)
    document.getElementById(`square_${i}`).appendChild(caption_m)
    document.getElementById(`square_${i}`).style.color = keys[reverseRandomName]//смена цвета текста
  }
  let correctAnswer = Math.floor(Math.random() * rectangleNumber)//выбор случайного правильного ответа
  let goalText = document.createTextNode(`Нажмите на прямоугольник со следующей надписью: ${colorValues[keysControlPanelArr[correctAnswer]]} `)
  document.getElementById('goal_text').appendChild(goalText)//добавление фразы в хтмл
  //рабочий обработчик нажатия на 1 прямоугольник
  // document.getElementById(`square_${correctAnswer}`).addEventListener("click", function () {
  //   let currRectanglesShow = document.querySelectorAll('.square_rand')
  //   for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
  //     currRectanglesShow[i].remove()
  //   }
  //   document.getElementById('goal_text').innerHTML = '';//удаление цели
  //   document.querySelector('.game_results').style.display = 'flex'
  //   if(localStorage.getItem('nickname')){
  //     localStorage.setItem('level', 2);
  //   }
  // });



  //делегирование
  document.getElementById('game_proccess').addEventListener("click", function (ev) {
    let target = ev.target.closest('.square_rand')
    if (target.className != 'square_rand' && target.className != 'caption_rand') return;
    if (target.id == `square_${correctAnswer}`) {
      let currRectanglesShow = document.querySelectorAll('.square_rand')
      for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
        currRectanglesShow[i].remove()
      }
      clearInterval(time);
      let pointsLevel = +document.querySelector('.timer').textContent * 15 - 4 * faleCount
      let curUser = localStorage.getItem('nickname');
      let locLvlCur = localStorage.getItem('level');
      let curDiff = localStorage.getItem('difficulty');
      if (pointsLevel <= 0) {
        localStorage.setItem(`${curUser}**${locLvlCur}**${curDiff}`, 0);


      }
      else {
        localStorage.setItem(`${curUser}**${locLvlCur}**${curDiff}`, pointsLevel);

      }

      correctAnswer = -1;
      document.getElementById('goal_text').innerHTML = '';//удаление цели
      document.querySelector('.game_results').style.display = 'flex'
      document.querySelector('.timer').style.display = 'none';
      document.querySelector('.dop_timer').style.display = 'none';
      document.querySelector('.dop_timer_2').style.display = 'none';



      document.querySelector('.res_fails').textContent = `Количество ошибок: ${faleCount}`;

      if (localStorage.getItem('nickname')) {
        localStorage.setItem('level', 2);
      }

    }
    else {
      faleCount += 1;
    }

  });
}



function level_2() {
  let keysControlPanelArr = Array.from(getRandomSet(0, keys.length - 1, rectangleNumber))//массив случайных различных цветов
  let reverseKeysColorSet = Array.from(keysControlPanelArr).reverse()//обратный к set массив различных цветов, но ссылается на arr
  document.querySelector('.current_level_info').innerHTML = 'Текущий уровень: 2';
  localStorage.setItem('level', 2);
  let faleCount = 0;

  if (localStorage.getItem('difficulty') == 'Простой') {//смена кол-ва от сложности
    timer(0.1);
  }
  else if (localStorage.getItem('difficulty') == 'Сложный') {
    timer(0.2);
  }

  for (let i = 0; i < rectangleNumber; i++) {
    let currRandomColor = keysControlPanelArr[i] //через массив
    let reverseRandomName = reverseKeysColorSet[i]
    let randomNameColor = colorValues[currRandomColor]
    let square = document.createElement('div');
    let caption = document.createTextNode(randomNameColor)
    let caption_m = document.createElement('H2')
    caption_m.appendChild(caption)//добавление текста в тег h2
    square.className = 'square_rand';
    caption_m.className = 'caption_rand'//присвоение классов
    square.setAttribute('id', `square_${i}`)
    document.getElementById('game_proccess').appendChild(square)
    document.getElementById(`square_${i}`).appendChild(caption_m)
    document.getElementById(`square_${i}`).style.color = keys[reverseRandomName]//смена цвета текста
  }
  let correctAnswer = Math.floor(Math.random() * rectangleNumber)//выбор случайного правильного ответа
  let goalText = document.createTextNode(`Нажмите на текст следующего цвета: ${colorValues[keysControlPanelArr[correctAnswer]]} `)

  document.getElementById('goal_text').appendChild(goalText)//добавление фразы в хтмл
  // document.getElementById(`square_${rectangleNumber - correctAnswer - 1}`).addEventListener("click", function () {
  //   let currRectanglesShow = document.querySelectorAll('.square_rand')
  //   for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
  //     currRectanglesShow[i].remove()
  //   }
  //   document.getElementById('goal_text').innerHTML = '';//удаление цели
  //   document.querySelector('.game_results').style.display = 'flex'
  //   document.querySelector('.timer').style.display = 'none';

  //   if (localStorage.getItem('nickname')) {
  //     localStorage.setItem('level', 3);
  //   }
  // });


  document.getElementById('game_proccess').addEventListener("click", function (ev) {
    let target = ev.target.closest('.square_rand')
    if (target.className != 'square_rand' && target.className != 'caption_rand') return;
    if (target.id == `square_${rectangleNumber - correctAnswer - 1}`) {
      let currRectanglesShow = document.querySelectorAll('.square_rand')
      for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
        currRectanglesShow[i].remove()
      }
      clearInterval(time);

      let pointsLevel = +document.querySelector('.timer').textContent * 15 - 4 * faleCount
      let curUser = localStorage.getItem('nickname');
      let locLvlCur = localStorage.getItem('level');
      let curDiff = localStorage.getItem('difficulty');
      if (pointsLevel <= 0) {
        localStorage.setItem(`${curUser}**${locLvlCur}**${curDiff}`, 0);


      }
      else {
        localStorage.setItem(`${curUser}**${locLvlCur}**${curDiff}`, pointsLevel);


      }

      correctAnswer = -1;
      document.getElementById('goal_text').innerHTML = '';//удаление цели
      document.querySelector('.game_results').style.display = 'flex'
      document.querySelector('.timer').style.display = 'none';
      document.querySelector('.dop_timer').style.display = 'none';
      document.querySelector('.dop_timer_2').style.display = 'none';
      
      document.querySelector('.res_fails').textContent = `Количество ошибок: ${faleCount}`;
      if (localStorage.getItem('nickname')) {
        localStorage.setItem('level', 3);
      }
    }
    else {
      faleCount += 1;
    }
  });
}


function level_3() {
  let keysControlPanelArr = Array.from(getRandomSet(0, keys.length - 1, rectangleNumber))//массив случайных различных цветов
  let keysControlPanelArrBackground = Array.from(getRandomSet(0, keys.length - 1, rectangleNumber))//массив случайных различных цветов
  let reverseKeysColorSet = Array.from(keysControlPanelArr).reverse()//обратный к set массив различных цветов, но ссылается на arr
  document.querySelector('.current_level_info').innerHTML = 'Текущий уровень: 3';
  localStorage.setItem('level', 3);
  let faleCount = 0;

  if (localStorage.getItem('difficulty') == 'Простой') {//смена кол-ва от сложности
    timer(0.1);
  }
  else if (localStorage.getItem('difficulty') == 'Сложный') {
    timer(0.2);
  }

  for (let i = 0; i < rectangleNumber; i++) {
    let currRandomColor = keysControlPanelArr[i] //через массив
    let reverseRandomName = reverseKeysColorSet[i]
    let randomNameColor = colorValues[currRandomColor]
    let square = document.createElement('div');
    let caption = document.createTextNode(randomNameColor)
    let caption_m = document.createElement('H2')
    caption_m.appendChild(caption)//добавление текста в тег h2
    square.className = 'square_rand';
    caption_m.className = 'caption_rand'//присвоение классов
    square.setAttribute('id', `square_${i}`)
    document.getElementById('game_proccess').appendChild(square)
    document.getElementById(`square_${i}`).appendChild(caption_m)
    document.getElementById(`square_${i}`).style.color = keys[reverseRandomName]//смена цвета текста



    while (reverseKeysColorSet[i] == keysControlPanelArrBackground[i]) {
      keysControlPanelArrBackground[i] = Math.floor(Math.random() * (keys.length - 1))

    }

    document.getElementById(`square_${i}`).style.backgroundColor = keys[keysControlPanelArrBackground[i]]//смена цвета текста


  }
  let correctAnswer = Math.floor(Math.random() * rectangleNumber)//выбор случайного правильного ответа
  let goalText = document.createTextNode(`Нажмите на прямоугольник со следующей надписью: ${colorValues[keysControlPanelArr[correctAnswer]]} `)

  document.getElementById('goal_text').appendChild(goalText)//добавление фразы в хтмл
  // document.getElementById(`square_${correctAnswer}`).addEventListener("click", function () {
  //   let currRectanglesShow = document.querySelectorAll('.square_rand')
  //   for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
  //     currRectanglesShow[i].remove()
  //   }
  //   document.getElementById('goal_text').innerHTML = '';//удаление цели
  //   document.querySelector('.game_results').style.display = 'flex'
  //   document.querySelector('.timer').style.display = 'none';

  //   if (localStorage.getItem('nickname')) {
  //     localStorage.setItem('level', 4);
  //   }
  // });

  document.getElementById('game_proccess').addEventListener("click", function (ev) {
    let target = ev.target.closest('.square_rand')
    if (target.className != 'square_rand' && target.className != 'caption_rand') return;
    if (target.id == `square_${correctAnswer}`) {
      let currRectanglesShow = document.querySelectorAll('.square_rand')

      for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
        currRectanglesShow[i].remove()
      }
      clearInterval(time);

      let pointsLevel = +document.querySelector('.timer').textContent * 15 - 4 * faleCount
      let curUser = localStorage.getItem('nickname');
      let locLvlCur = localStorage.getItem('level');
      let curDiff = localStorage.getItem('difficulty');
      if (pointsLevel <= 0) {
        localStorage.setItem(`${curUser}**${locLvlCur}**${curDiff}`, 0);

      }
      else {
        localStorage.setItem(`${curUser}**${locLvlCur}**${curDiff}`, pointsLevel);

      }

      correctAnswer = -1;
      document.getElementById('goal_text').innerHTML = '';//удаление цели
      document.querySelector('.game_results').style.display = 'flex'
      document.querySelector('.timer').style.display = 'none';
      document.querySelector('.dop_timer').style.display = 'none';
      document.querySelector('.dop_timer_2').style.display = 'none';
      document.querySelector('.res_fails').textContent = `Количество ошибок: ${faleCount}`;


      if (localStorage.getItem('nickname')) {
        localStorage.setItem('level', 4);
      }
    }
    else {
      faleCount += 1;
    }

  });

}


function level_4() {
  let keysControlPanelArr = Array.from(getRandomSet(0, keys.length - 1, rectangleNumber))//массив случайных различных цветов
  let keysControlPanelArrBackground = Array.from(getRandomSet(0, keys.length - 1, rectangleNumber))//массив случайных различных цветов
  let reverseKeysColorSet = Array.from(keysControlPanelArr).reverse()//обратный к set массив различных цветов, но ссылается на arr
  document.querySelector('.current_level_info').innerHTML = 'Текущий уровень: 4';
  localStorage.setItem('level', 4);
  let faleCount = 0;

  if (localStorage.getItem('difficulty') == 'Простой') {//смена кол-ва от сложности
    timer(0.1);
  }
  else if (localStorage.getItem('difficulty') == 'Сложный') {
    timer(0.2);
  }
  for (let i = 0; i < rectangleNumber; i++) {
    let currRandomColor = keysControlPanelArr[i] //через массив
    let reverseRandomName = reverseKeysColorSet[i]
    let randomNameColor = colorValues[currRandomColor]
    let square = document.createElement('div');
    let caption = document.createTextNode(randomNameColor)
    let caption_m = document.createElement('H2')
    caption_m.appendChild(caption)//добавление текста в тег h2
    square.className = 'square_rand';
    caption_m.className = 'caption_rand'//присвоение классов
    square.setAttribute('id', `square_${i}`)
    document.getElementById('game_proccess').appendChild(square)
    document.getElementById(`square_${i}`).appendChild(caption_m)
    document.getElementById(`square_${i}`).style.color = keys[reverseRandomName]//смена цвета текста

    while (reverseKeysColorSet[i] == keysControlPanelArrBackground[i]) {
      keysControlPanelArrBackground[i] = Math.floor(Math.random() * (keys.length - 1))

    }

    document.getElementById(`square_${i}`).style.backgroundColor = keys[keysControlPanelArrBackground[i]]//смена цвета текста

  }
  let correctAnswer = Math.floor(Math.random() * rectangleNumber)//выбор случайного правильного ответа
  let goalText = document.createTextNode(`Нажмите на текст следующего цвета: ${colorValues[keysControlPanelArr[correctAnswer]]} `)

  document.getElementById('goal_text').appendChild(goalText)//добавление фразы в хтмл
  // document.getElementById(`square_${rectangleNumber - correctAnswer - 1}`).addEventListener("click", function () {
  //   let currRectanglesShow = document.querySelectorAll('.square_rand')
  //   for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
  //     currRectanglesShow[i].remove()
  //   }
  //   document.getElementById('goal_text').innerHTML = '';//удаление цели
  //   document.querySelector('.game_results').style.display = 'flex'
  //   document.querySelector('.check_results').style.display = 'block'
  //   document.querySelector('.moveto_nextlvl').style.display = 'none'
  //   document.querySelector('.timer').style.display = 'none';




  //   if (localStorage.getItem('nickname')) {
  //     localStorage.setItem('level', 5);
  //     finish = true;
  //   }

  // });

  document.getElementById('game_proccess').addEventListener("click", function (ev) {
    let target = ev.target.closest('.square_rand')
    if (target.className != 'square_rand' && target.className != 'caption_rand') return;
    if (target.id == `square_${rectangleNumber - correctAnswer - 1}`) {
      let currRectanglesShow = document.querySelectorAll('.square_rand')
      for (let i = 0; i < currRectanglesShow.length; i++) {//удаление прямоугольников
        currRectanglesShow[i].remove()
      }
      clearInterval(time);

      let pointsLevel = +document.querySelector('.timer').textContent * 15 - 4 * faleCount
      let curUser = localStorage.getItem('nickname');
      let locLvlCur = localStorage.getItem('level');
      let curDiff = localStorage.getItem('difficulty');
      if (pointsLevel <= 0) {
        localStorage.setItem(`${curUser}**${locLvlCur}**${curDiff}`, 0);


      }
      else {
        localStorage.setItem(`${curUser}**${locLvlCur}**${curDiff}`, pointsLevel);


      }

      correctAnswer = -1;
      document.getElementById('goal_text').innerHTML = '';//удаление цели
      document.querySelector('.game_results').style.display = 'flex'
      document.querySelector('.check_results').style.display = 'block'
      document.querySelector('.moveto_nextlvl').style.display = 'none'
      document.querySelector('.timer').style.display = 'none';
      document.querySelector('.dop_timer').style.display = 'none';
      document.querySelector('.dop_timer_2').style.display = 'none';
      document.querySelector('.res_fails').textContent = `Количество ошибок: ${faleCount}`;

      if (localStorage.getItem('nickname')) {
        localStorage.setItem('level', 5);
      }
    }
    else {
      faleCount += 1;
    }
  });

}


function openScores() {
  let usersContainer = document.querySelector('.users-container');
  //при вызове функции, работаем с текущем никнеймом
  document.querySelector('.game').style.display = 'none';
  document.querySelector('.game_results').style.display = 'none';
  document.querySelector('.check_results').style.display = 'none'
  document.querySelector('.moveto_nextlvl').style.display = 'block'

  document.querySelector('.main_menu').style.display = 'none';
  document.querySelector('.results_page').style.display = 'flex';

  if (localStorage.getItem('username')) {
    usersList = localStorage.getItem('username').split('**');
  }
  else {
    usersList = [];
  }
  someUser = localStorage.getItem('nickname');
  usersContainer.innerHTML = "";

  //добавление кнопок
  if (usersList != 0) {
    usersList.forEach(element => {

      if (element == curUser)
        usersContainer.innerHTML += `<button onclick="showScoresForUser(event)" class="img-opacity">${element}</button>`
      else
        usersContainer.innerHTML += `<button onclick="showScoresForUser(event)">${element}</button>`

    });//при нажатии на кнопку, данные юзера выводит


    let t_sum = 0;
    for (let i = 1; i <= 4; i++) {
      t_sum += +localStorage.getItem(`${someUser}**${i}**Простой`)

    }
    document.querySelector('.result_ez').innerHTML = t_sum;
    let t_sum_h = 0;
    for (let i = 1; i <= 4; i++) {
      t_sum_h += +localStorage.getItem(`${someUser}**${i}**Сложный`)

    }
    document.querySelector('.result_hard').innerHTML = t_sum_h;

  }

}


function showScoresForUser(event) {
  let buttons = document.querySelectorAll('.users-container button');
  let target = event.target
  buttons.forEach(element => {
    element.classList.remove("img-opacity");
  });
  event.target.classList.add("img-opacity")
  someUser = target.textContent
  let t_sum = 0;
  for (let i = 1; i <= 4; i++) {
    t_sum += +localStorage.getItem(`${someUser}**${i}**Простой`)

  }
  document.querySelector('.result_ez').innerHTML = t_sum;
  let t_sum_h = 0;
  for (let i = 1; i <= 4; i++) {
    t_sum_h += +localStorage.getItem(`${someUser}**${i}**Сложный`)

  }
  document.querySelector('.result_hard').innerHTML = t_sum_h;


}

function openMenu() {
  document.querySelector('.main_menu').style.display = 'block';
  document.querySelector('.game').style.display = 'none';
  document.querySelector('.game_results').style.display = 'none';
  document.querySelector('.check_results').style.display = 'none'
  document.querySelector('.moveto_nextlvl').style.display = 'block'
  document.querySelector('.results_page').style.display = 'none';
}



function toggleTheme() {
  var theme = document.getElementsByTagName('link')[0];
  if (theme.getAttribute('href') == 'styles.css') {
      theme.setAttribute('href', 're_style.css');
  } else {
      theme.setAttribute('href', 'styles.css');
  }
}