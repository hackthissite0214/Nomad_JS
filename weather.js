const weather = document.querySelector('.js-weather');

/* https://openweathermap.org/api
   weather api keys */
const API_KET ="266fd3bcc3f24e5626c609de4bebf647";
const COORDS = 'coords';

/* javascript는 웹사이트로 Request를 보내고 응답을 통해서 데이터를 얻을 수 있는데
   가져온 데이터를 Refresh 없이도 나의 웹사이트에 적용시킬 수 있기 떄문
   예를 들어서, 이메일을 확인할 때 웹사이트를 새로고침하지 않아도 실시간으로
   메일이 오는 것을 확인할 수 있다.
   왜냐하면, javascript가 보이지 않는 곳에서 계속 데이터를 가져오고 있기 때문*/

function getWeather(lat, lng) {
    /* then: 데이터 다받고 함수 출력 */
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KET}&units=metric`).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoordes(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        /* 
        객체의 변수 이름과 객체의 key의 이름이 같을 때 아래와 같이 가능
        latitude,
        longitude
        */
        latitude: latitude,
        longitude: longitude
    };
    saveCoordes(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can`t access geo location");
}

function askForCoords() {
    //  navigator api
    //  first : 좌표를 가져오는데 성공했을 때를 처리하는 함수
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

//  위치 값 읽기
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    //  로컬스토리지에 위치 값 없으면 묻는다.
    if(loadedCoords === null) {
        askForCoords();
    }else {
        //  getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();