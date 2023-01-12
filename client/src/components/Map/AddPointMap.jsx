/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable quotes */
/* eslint-disable no-undef */
import React from 'react';

export default function AddPointMap({ setCoordinates }) {
  React.useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    ymaps.ready(init);
    function init() {
      const myMap = new ymaps.Map('Map', {
        center: [55.76, 37.64],
        zoom: 5,
        controls: ['searchControl', 'typeSelector'],
      }, {
        minZoom: 1,
      });
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
        ],
        params: {
          // reverseGeocoding: true,
        },
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
      });

      // Создает метку и добавляет ее на карту
      multiRoute.model.events.add('requestsuccess', () => {
        // Коллекция путевых точек маршрута.
        const wayPoints = multiRoute.getWayPoints();
        // Проход по коллекции путевых точек.
        // Для каждой точки зададим содержимое меток.
        const arrPoints = [];
        wayPoints.each((point) => {
          // eslint-disable-next-line no-underscore-dangle
          arrPoints.push(point.geometry._coordinates);
          point.options.set({
            // iconContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.request|raw }}'),
          });
        });
        setCoordinates(arrPoints);
      });

      // А вот так можно отключить режим редактирования.
      // multiRoute.editor.stop();

      // Добавление маршрута на карту.
      myMap.geoObjects.add(multiRoute);
    }
  }, []);
  return (
    <div id="Map" style={{ width: '530px', height: '400px', margin: '10px 0 10px 0' }} />
  );
}
