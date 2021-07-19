import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

SlectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

SlectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
};

function SlectField(props) {
  const { field, options, label, placeholder, disabled } = props;

  const { name, value } = field;
  const selectedOptions = options.find((option) => option.value === value);

  const handleSelectedOptionChange = (selectedOptions) => {
    const selectedValue = selectedOptions
      ? selectedOptions.value
      : selectedOptions;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Select
        id={name}
        {...field}
        value={selectedOptions}
        onChange={handleSelectedOptionChange}
        disabled={disabled}
        placeholder={placeholder}
        options={options}
      />
    </FormGroup>
  );
}

export default SlectField;
