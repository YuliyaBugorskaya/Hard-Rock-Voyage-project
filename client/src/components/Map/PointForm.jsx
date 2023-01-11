/* eslint-disable no-undef */
import React from 'react';
import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getAllCoords } from '../../redux/MaratSlices/coordSlice';

export default function PointForm({ setSwitcher, switcher }) {
  const coords = useSelector((state) => state.coords);

  React.useEffect(() => {
    // setTimeout(() => (
    //   ), 1000);
    // eslint-disable-next-line no-use-before-define
    ymaps.ready(init);
    function init() {
      // eslint-disable-next-line no-unused-vars
      // console.log(JSON.parse(coords.coordinates), 'coords, pointForm');
      const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 4,
        controls: ['searchControl', 'typeSelector'],
      }, {
        minZoom: 1,
      });
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
        referencePoints: [
          ...JSON.parse(coords.coordinates),
        ],
      }, {
        // Автоматически устанавливать границы карты так,
        // чтобы маршрут был виден целиком.
        boundsAutoApply: true,
      });
      myMap.geoObjects.add(multiRoute);
    }
  }, []);
  const submitHandler = () => (
    setSwitcher(!switcher)
  );
  return (
    <form onSubmit={submitHandler}>
      <div id="map" style={{ width: '900px', height: '800px' }} />
      <button type="submit">Нажми</button>
    </form>
  );
}
