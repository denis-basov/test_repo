// получаем элемент для размещения в нем списка авто
let carsContainer = document.querySelector('.cars');
// получаем элемент для размещения данных об одном авто
let oneCarContainer = document.querySelector('.one__car');


/**
 *
 * асинхронная функция для получения данных и отображения по одному авто (id)
 *
 */
let showOneCar = async function(id = 1){
    // 1 получаем данные от сервера
    let res = await fetch(`server/oneCar.php?id=${id}`);
    //console.log(res);

    // 2 проверяем, получен ли результат
    if(!res.ok){
        throw new Error('Ошибка');
        console.log('Error');
    }

    // 3 раскодируем данные
    let data = await res.json();// data - объект
    //console.log(data);

    // 4 формируем разметку и данные для вывода на страницу
    let markup = `
        <div class="one-car__item">
            <!-- блок данных -->
            <div class="one-car__item-text">
                <p>Производитель: <span>${data.maker}</span></p>
                <p>Модель: <span>${data.model}</span></p>
                <p>Год выпуска: <span>${data.madeYear}</span></p>
                <p>Мощность: <span>${data.power} л.с.</span></p>
                <p>Вес: <span>${data.weight} кг</span></p>
                <p>Максимальная скорость: <span>${data.topSpeed} км/ч</span></p>
                <p>Разгон до 100 км/ч за: <span>${data.accelerationTo100} секунд</span></p>
            </div>
            <!-- блок с картинкой -->
            <div class="one-car__item-img">
                <img src="${data.image}" alt="${data.maker}-${data.model}">
            </div>
        </div>
    `;
    //console.log(markup);

    // 5 очищаем имеющиеся данные
    oneCarContainer.innerHTML = '';
    // 6 помещаем новые
    oneCarContainer.insertAdjacentHTML('beforeend', markup);
}
// вызываем функцию отображения одно авто
showOneCar();


/**
 *
 *
 * функция для выбора и отображения данных по списку авто
 *
 */
let showCars = async function(){

    // 1 получаем данные
    let res = await fetch(`server/carslist.php`);
    //console.log(res);
    // 2 обрабатываем ошибку
    if(!res.ok){
        throw new Error('Ошибка');
        console.log('Error');
    }
    // 3 раскодируем
    let data = await res.json();// data - объект
    console.log(data);

    // 4 формируем разметку
    // 4.1 формирование массива строк, которые содержат данные из объекта + разметку
    let markupArr = data.map(function(car){
        return `<li class="car__item">
                    <p>Производитель: ${car.maker}</p>
                    <p>Модель: ${car.model}</p>
                    <p class="link">Подробнее</p>
                </li>`;
    });
    // 4.2 объединяем массив строк в одну строку
    let markup = markupArr.join('');
    //console.log(markup);

    // 5 выводим в документ
    carsContainer.insertAdjacentHTML('beforeend', markup);


    /**
     *
     * при клике на кнопку будем выводить в блок class="one__car" данные
     * о выбранном авто
     *
     */
    // 1 получаем все кнопки
    let carsId = document.querySelectorAll('.link');
    //console.log(carsId);

    // 2 перебираем все кнопки
    carsId.forEach( function( item, i ){
        // 3 добавляем каждой кнопке обработчик события клик мыши
        item.addEventListener('click', function(){
            // 4 получаем идентификатор автомобиля
            let id = data[i].id;
            //console.log( i,  id);
            // 5 вызываем функцию для отображения одно авто по переданному ID
            showOneCar(id);
        });
    });
}
showCars();