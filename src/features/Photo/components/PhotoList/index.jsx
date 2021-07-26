import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import PhotoCard from '../Photocard';

PhotoList.propTypes = {
  photoList: PropTypes.array,
  onPhotoEditClick: PropTypes.func,
  onPhotoRemoveClick: PropTypes.func,
};
PhotoList.defaultProps = {
  photolist: [],
  onPhotoEditClick: null,
  onPhotoRemoveClick: null,
};

function PhotoList(props) {
  const { photoList, onPhotoEditClick, onPhotoRemoveClick } = props;

  return (
    <Row>
      {photoList.map((photo) => (
        <Col key={photo.title} xs="12" md="6" lg="3">
          <PhotoCard
            photo={photo}
            onEditClick={onPhotoEditClick}
            onRemoveClick={onPhotoRemoveClick}
          />
        </Col>
      ))}
    </Row>
  );
}

export default PhotoList;
