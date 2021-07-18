import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import React from 'react';
// import Banner from '../../../../components/Banner';
// import PhotoForm from '../../components/PhotoForm';
import './styles.scss';

AddEditpage.propTypes = {};

function AddEditpage(props) {
  return (
    <div className="photo-edit">
      <Banner title="pick your amazing photo 😍" />

      <div className="photo-edit__form">
        <PhotoForm
          onSubmit={(values) => console.log('Form submit: ', values)}
        />
      </div>
    </div>
  );
}

export default AddEditpage;
