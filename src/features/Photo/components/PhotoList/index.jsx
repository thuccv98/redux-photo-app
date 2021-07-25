import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import PhotoCard from '../Photocard';

PhotoList.propTypes = {
  photoList: PropTypes.array,
};
PhotoList.defaultProps = {
  photolist: [],
};

function PhotoList(props) {
  const { photoList } = props;

  return (
    <Row>
      {photoList.map((photo) => (
        <Col key={photo.title} xs="12" md="6" lg="3">
          <PhotoCard photo={photo} />
        </Col>
      ))}
    </Row>
  );
}

export default PhotoList;
