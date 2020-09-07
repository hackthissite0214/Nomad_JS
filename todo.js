const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector('input'),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

/*
function filterFn(toDo) {
    // toDo의 id가 1인 경우만 리턴
    return toDo.id === 1
}
*/

let toDos = [];

function deleteToDo(event) {
    //  어떤 버튼이 클릭되었는지
    //  버튼의 부모가 누구인지
    // console.log(event.target.parentNode);

    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    // filter는 마치 forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행
    // filter는 array의 모든 아이템을 통해 함수를 실행하고 
    // 그리고 true인 아이템들만 가지고 새로운 array를 만들고 
    //  const cleanToDos = toDos.filter(filterFn);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });

    //console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    // localStorage는 무조건 string만 저장
    // 자바스크립트 object를 string 바꿔준다
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
   const li = document.createElement('li');
   const delBtn = document.createElement('button');
   const span = document.createElement('span');
   const newId = toDos.length + 1;
   delBtn.innerText = "❌";
   delBtn.addEventListener('click', deleteToDo);
   span.innerText = text;
   li.appendChild(delBtn);
   li.appendChild(span);
   li.id = newId;
   toDoList.appendChild(li);
   const toDoObj = {
       text: text,
       id: newId
   }
   toDos.push(toDoObj);
   saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        //  불러온것은 json으로 변환된 object가 아닌 string이다.
        //  다시 object로 변환
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
