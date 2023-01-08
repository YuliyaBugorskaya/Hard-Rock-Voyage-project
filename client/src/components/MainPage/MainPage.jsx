import axios from 'axios';
import React, { useCallback, useState } from 'react';

export default function MainPage() {
  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const sendFile = useCallback(async () => {
    console.log('ya zdes--');
    try {
      const data = new FormData();
      console.log(data, 'data-------->');
      data.append('avatar', img);
      console.log(data, '--------->>>');
      await axios.post('/upload/avatar', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        // .then((res) => console.log(res.data));
        .then((res) => setAvatar(res.data.path));
    } catch (error) {}
  }, [img]);

  return (
    <div>
      MainPage

      <div className="fotoFromVoyage">
        {
          avatar
            ? <img className="logo" src={`${avatar}`} alt="avatar" />
            : <img className="logo" src="/css/images/_7Fr1kwBRRM.jpeg" alt="avatar" />
        }

      </div>
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button type="submit" className="btn" onClick={sendFile}>Добавить фото</button>
    </div>

  );
}
