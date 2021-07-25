import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { randomNumber } from 'utils/common';

AddEditpage.propTypes = {};

function AddEditpage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (values) => {
    return new Promise((resolve) => {
      console.log('Form submmit: ', values);
      setTimeout(() => {
        const newPhoto = {
          ...values,
          id: randomNumber(10000, 99999),
        };
        const action = addPhoto(newPhoto);
        console.log({ action });
        dispatch(action);

        history.push('/photos');
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="photo-edit">
      <Banner title="pick your amazing photo 😍" />

      <div className="photo-edit__form">
        <PhotoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default AddEditpage;
