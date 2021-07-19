import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import Images from 'constants/images';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Label } from 'reactstrap';

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};
PhotoForm.defaultProps = {
  onSubmit: null,
};

function PhotoForm(props) {
  const inittialValues = {
    title: '',
    categoryId: null,
  };

  return (
    <Formik initialValues={inittialValues}>
      {(formikProps) => {
        // do someting here ...
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="EG: Wow nature ..."
            />
            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="what's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FormGroup>
              <Label for="categoryId">Photo</Label>

              <div>
                <Button type="button" outline color="primary">
                  Random a photo
                </Button>
              </div>
              <div>
                <img width="200px" src={Images.COLORFUL_BG} alt="colorful-bg" />
              </div>
            </FormGroup>

            <FormGroup>
              <Button color="primary">Add to album</Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
