const form = document.querySelector(".search");
const input = document.querySelector(".searchTerm");
const searchBtn = document.querySelector(".searchButton");
let city;

////////////// элементы из карточки //////////////
const cityName = document.querySelector('.city');
const cityTemp_c = document.querySelector('.temp_now');
const cityFeelslike_c = document.querySelector('.temp_feel');
const cityConditionText = document.querySelector('.weather');
const cityLocalDay = document.querySelector('.day');
const cityLocalTime = document.querySelector('.time');
const cityWeatherIcon = document.querySelector('.weather_img')
const btnSwitchTemp = document.querySelector('.switch__btn-temp')

//////////////////////////////////////////////////////////


// создаем асинхронную функцию для получения данных о погоде
async function getWeatherData(city) {
  const weatherApiKey = "45ae069833aa4900af474813232206"; // записываем в переменную ключ Weather API
  // записываем в переменную ссылку на API
  const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&days=5&aqi=yes`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    return data; // вывод данных при успешно выполненом запросе
  } else {
    throw new Error(` ${response.statusText}`); // генерируем ошибку при невыполнении запроса
  }
}

// создаем обработчик отправки формы
form.addEventListener("submit", async function (evt) {
  evt.preventDefault();
  city = input.value.trim();
  console.log(city);
  try {
    const data = await getWeatherData(city);

    //////// записываем данные в карточку + добавление иконки ////////////
    cityName.textContent = data.location.name;
    cityTemp_c.textContent = data.current.temp_c + " °C";
    cityFeelslike_c.textContent =
      "Feels like: " + data.current.feelslike_c + " °C";
    cityConditionText.textContent = data.current.condition.text;
    const cityDate = new Date(data.location.localtime);
    cityLocalDay.textContent = cityDate.toDateString().slice(4);
    cityLocalTime.textContent = "Local time: " + cityDate.toTimeString().slice(0, 5);
    const icon = data.current.condition.icon;
    cityWeatherIcon.innerHTML = `<img src="${icon}" alt="${data.current.condition.text}" />`;

    ////////////////////////////////////////////////////
  } catch (error) {
    console.log(error);
    alert(`${error.message}.Try again`);
  }
  // передача данных между страницами
  window.location.href = `forecast.html?city=${city}`;
//
  // Очищаем поля формы
  evt.target.reset();
});


////Ирина код для карусели начало////
const carouselItems = document.querySelector(".scroller__container_items"); //определяем элемент карусели
//определяем переменные для кнопок прокрутки
const nextBtn = document.querySelector(".scroller__container_btn-right");
const prevBtn = document.querySelector(".scroller__container_btn-left");

//функция для рассчета ширины элемента карусели
const updateItemWidth = function () {
  const carouselWidth = carouselItems.offsetWidth; //определяем ширину элемента карусели
  const itemPerRow = 4; // количество элементов в одном ряду
  return carouselWidth / itemPerRow; //рассчитываем ширину одного фрагмента
};

let itemWidth = updateItemWidth(); //начальное значение ширины фрагмента
let currentPosition = 0; //запоминаем текущую позицию карусели


//вешаем обработчик события на загрузку страницы
document.addEventListener("DOMContentLoaded", function () {
  nextBtn.addEventListener("click", function () {
    currentPosition -= itemWidth;
    //проверяем, чтобы не смещаться за пределы круга
    if (currentPosition < -3 * itemWidth) {
      currentPosition = 0;
    }
    //при клике на кнопку, смещаем элемент влево на ширину одного элемента
    carouselItems.style.transform = "translateX(" + currentPosition + "px)";
  });

  prevBtn.addEventListener("click", function () {
    currentPosition += itemWidth;
    //проверяем, чтобы не смещаться за пределы круга
    if (currentPosition > 0) {
      currentPosition = -3 * itemWidth;
    }
    //при клике на кнопку, смещаем элемент обратно
    carouselItems.style.transform = "translateX(" + currentPosition + "px)";
  });

  // Обновление ширины фрагмента при изменении размера окна
  window.addEventListener("resize", function () {
    itemWidth = updateItemWidth();
    carouselItems.style.transform = "translateX(" + currentPosition + "px)"; // Перемещение карусели на текущую позицию
  });
});
////Ирина код для карусели конец////
