/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React from 'react';

export default function PointForm({ OneEvent }) {
  // const [coordinates, setCoordinates] = useState([]);
  React.useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    ymaps.ready(init);
    function init() {
      // eslint-disable-next-line no-unused-vars
      const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 4,
        controls: [],
      }, {
        minZoom: 1,
      });

      const balloonLayout = ymaps.templateLayoutFactory.createClass("<div class='my-balloon'>"
        + `
        <p>Тут покушать</p>
        <button class='close' type="button">ОК</button>
      `, {

        build() {
          balloonLayout.superclass.build.call(this);
          this._$element = $('.my-balloon', this.getParentElement());
          $('#button').bind('click', this.onCounterClick);
          this._$element.find('.close')
            .on('click', $.proxy(this.onCloseClick, this));
        },

        onCloseClick(e) {
          e.preventDefault();
          this.events.fire('userclose');
        },

        onCounterClick() {
          setSwitcher(true);
          console.log(switcher);
        },
      });

      const multiRoute = new ymaps.multiRouter.MultiRoute({
        // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
        referencePoints: [
          ...JSON.parse(OneEvent.coordinates),
        ],
      }, {
        // Автоматически устанавливать границы карты так,
        // чтобы маршрут был виден целиком.
        boundsAutoApply: true,
        balloonLayout,
        // Отключаем режим панели для балуна.
        balloonPanelMaxMapArea: 1,
      });

      myMap.geoObjects.add(multiRoute);

      multiRoute.model.events.add('requestsuccess', () => {
        // Коллекция путевых точек маршрута.
        const wayPoints = multiRoute.getWayPoints();
        // console.log('=================', wayPoints);
        // Проход по коллекции путевых точек.
        // Для каждой точки зададим содержимое меток.
        // const arrPoints = [];
        wayPoints.each((point) => {
          // eslint-disable-next-line no-underscore-dangle
          // координаты метки маршрута point.geometry._coordinatesarrPoints.push(point.geometry._coordinates);
          // arrPoints.push(point.geometry._coordinates);
          point.options.set({
            // iconContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.request|raw }}'),
          });
        });
        // setCoordinates(arrPoints);
      });
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
