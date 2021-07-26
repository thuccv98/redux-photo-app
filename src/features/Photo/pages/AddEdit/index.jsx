import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './styles.scss';
import { randomNumber } from 'utils/common';

AddEditpage.propTypes = {};

function AddEditpage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;
  const editedPhoto = useSelector(
    (state) => state.photos.find((x) => x.id === +photoId) // lay ra cai id ma can chinh sua
  );

  const initialValues = isAddMode
    ? {
        title: '',
        categoryId: null,
        photo: '',
      }
    : editedPhoto;

  const handleSubmit = (values) => {
    return new Promise((resolve) => {
      console.log('Form submmit: ', values);

      setTimeout(() => {
        if (isAddMode) {
          const newPhoto = {
            ...values,
            id: randomNumber(10000, 99999),
          };
          const action = addPhoto(newPhoto);
          console.log({ action });
          dispatch(action);
        } else {
          // Do something here
          const action = updatePhoto(values);
          dispatch(action);
        }

        history.push('/photos');
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="photo-edit">
      <Banner title="pick your amazing photo 😍" />

      <div className="photo-edit__form">
        <PhotoForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditpage;
