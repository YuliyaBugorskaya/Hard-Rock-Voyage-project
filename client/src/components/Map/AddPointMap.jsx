/* eslint-disable no-undef */
import React from 'react';
// import axios from 'axios';

export default function AddPointMap() {
  const [pointArr, setPointArr] = React.useState([]);
  React.useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    ymaps.ready(init);
    function init() {
      const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 4,
        controls: ['searchControl', 'typeSelector'],
      }, {
        minZoom: 1,
      });

      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
        ],
      }, {
        // Опция editorDrawOver запрещает ставить точки поверх объектов карты
        // (в режиме добавления новых точек). Это нужно для того,
        // чтобы пользователи могли создавать промежуточные
        // точки по линии маршрута.
        editorDrawOver: false,
        // Опция editorMidPointsType задает тип промежуточных точек,
        // которые будут создаваться на маршруте.
        // "via" - будут создаваться транзитные точки;
        // "way" - путевые точки.
        editorMidPointsType: 'via',
      });
      // Включение режима редактирования.
      multiRoute.editor.start({
        // При включении опции addWayPoints пользователи смогут создавать
        // путевые точки по клику на карте.
        addWayPoints: true,
        // При включении опции removeWayPoints пользователи смогут удалять
        // путевые точки.
        // Для удаления точки нужно дважды кликнуть по ней.
        removeWayPoints: true,
        // При включении опции addMidPoints пользователи смогут создавать
        // новые промежуточные точки.
        // Чтобы создать промежуточную точку, нужно кликнуть по линии маршрута и,
        // удерживая кнопку, переместить точку в нужную позицию на карте.
        // Тип промежуточной точки (путевая или транзитная) задается в опции
        // editorMidPointsType.
        addMidPoints: true,

        // событие на клик
        click: multiRoute.events.add('click', () => {
          // тут может быть балоон
          // console.log(wayPoints.get(1).geometry.getCoordinates());
        }),

      });

      // Создает метку и добавляет ее на карту
      multiRoute.model.events.add('requestsuccess', () => {
        // Коллекция путевых точек маршрута.
        const wayPoints = multiRoute.getWayPoints();
        // console.log('=================', wayPoints);
        // Проход по коллекции путевых точек.
        // Для каждой точки зададим содержимое меток.
        const arrPoints = [];
        wayPoints.each((point) => {
          // eslint-disable-next-line no-underscore-dangle
          arrPoints.push(point.geometry._coordinates);
          point.options.set({
            iconContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.request|raw }}'),
          });
        });
        setPointArr(arrPoints);
      });

      // А вот так можно отключить режим редактирования.
      // multiRoute.editor.stop();

      // Добавление маршрута на карту.
      myMap.geoObjects.add(multiRoute);
      // myMap.geoObjects.add(myCollection);
    }
  }, []);
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const response = await axios.post('/points', pointArr);
  //   if (response.ok) {
  //     console.log('horosho');
  //   } else {
  //     alert('Ne horosho!');
  //   }
  // };
  const clickHandler = () => (console.log(pointArr));
  return (
    // eslint-disable-next-line react/style-prop-object
    // <form onSubmit={submitHandler}>
    <>
      <div id="map" style={{ width: '900px', height: '800px' }} />
      <button type="button" onClick={clickHandler}>Нажми</button>
    </>
    // {/* </form> */}
  );
}

// // Функция ymaps.ready() будет вызвана, когда
// // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
// ymaps.ready(init);
// function init() {

//   // Создание карты.
//   var myMap = new ymaps.Map("map", {
//     // Координаты центра карты.
//     // Порядок по умолчанию: «широта, долгота».
//     // Чтобы не определять координаты центра карты вручную,
//     // воспользуйтесь инструментом Определение координат.
//     center: [55.76, 37.64],
//     // Уровень масштабирования. Допустимые значения:
//     // от 0 (весь мир) до 19.
//     zoom: 4
//   });
// }

// const myCollection = new ymaps.GeoObjectCollection({}, {
//   preset: 'islands#darkGreenGardenIcon', // все метки красные
//   draggable: true, // и их можно перемещать
// });
