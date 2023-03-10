/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React from 'react';

export default function PointForm({ OneEvent }) {
  React.useEffect(() => {
    console.log(OneEvent, 'one Event');
    // const [coordinates, setCoordinates] = useState([]);
    function init() {
      const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 4,
        controls: [],
      }, {
        minZoom: 1,
      });
      // const balloonLayout = ymaps.templateLayoutFactory.createClass("<div class='my-balloon'>"
      //     + `
      //     <p>Тут покушать</p>
      //     <button class='close' type="button">ОК</button>
      //   `, {

      //   build() {
      //     balloonLayout.superclass.build.call(this);
      //     this._$element = $('.my-balloon', this.getParentElement());
      //     this._$element.find('.close')
      //       .on('click', $.proxy(this.onCloseClick, this));
      //   },

      //   onCloseClick(e) {
      //     e.preventDefault();
      //     this.events.fire('userclose');
      //   },
      // });

      const multiRoute = new ymaps.multiRouter.MultiRoute({
        // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
        referencePoints: [
          ...JSON.parse(OneEvent.coordinates),
        ],
      }, {
        // Автоматически устанавливать границы карты так,
        // чтобы маршрут был виден целиком.
        boundsAutoApply: true,
        // Отключаем режим панели для балуна.
        balloonPanelMaxMapArea: 1,
      });

      myMap.geoObjects.add(multiRoute);

      // multiRoute.model.events.add('requestsuccess', () => {
      //   // Коллекция путевых точек маршрута.
      //   // const wayPoints = multiRoute.getWayPoints();
      //   // console.log('=================', wayPoints);
      //   // Проход по коллекции путевых точек.
      //   // Для каждой точки зададим содержимое меток.
      //   // const arrPoints = [];
      //   // wayPoints.each((point) => {
      //   //   // eslint-disable-next-line no-underscore-dangle
      //   //   // координаты метки маршрута point.geometry._coordinatesarrPoints.push(point.geometry._coordinates);
      //   //   arrPoints.push(point.geometry._coordinates);
      //   //   point.options.set({
      //   //     // iconContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.request|raw }}'),
      //   //   });
      //   // });
      //   setCoordinates(arrPoints);
      // });
    }
    if (OneEvent) {
      // eslint-disable-next-line no-use-before-define
      ymaps.ready(init);
    }
  }, []);
  return (
    <div
      id="map"
      style={{
        width: '500px', height: '500px', margin: '10px 0 10px 0',
      }}
    />
  );
}
