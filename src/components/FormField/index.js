import React from 'react';
import PropTypes from 'prop-types';

import { FormFieldWrapper, Label, Input, Span } from './styles';

function FormField({
  label, type, value, name, onChange, suggestions, error
}) {
  const fieldId = `id_${name}`; 
  //const isTextArea = type === 'textarea';

  //se for textarea, atribui a const, senao, atribui input 
  //const tag = isTextArea ? 'textarea' : 'input';

  const hasSuggestions = Boolean(suggestions.length);

  return (
    <FormFieldWrapper>
      <Label
        htmlFor={fieldId}
      >
        <Input
          //as= {tag}
          id={fieldId}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          autoComplete={hasSuggestions ? 'off' : 'on'}
          list={hasSuggestions ? `suggestionFor_${fieldId}` : undefined}
        />
        <Label.Text>
          {label}
        </Label.Text>

        <Span>{error}</Span>

        {
          hasSuggestions && (
            <datalist id={`suggestionFor_${fieldId}`}>
              {
              suggestions.map((suggestion) => (
                <option value={suggestion} key={`suggestionFor_${fieldId}_option${suggestion}`}>
                  {suggestion}
                </option>
              ))
            }
            </datalist>
          )
        }

      </Label>
    </FormFieldWrapper>
  );
}

FormField.defaultProps = {
  text: 'text',
  value: '',
  onChange: () => {},
  suggestions: [],
  error: '',
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string, 
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
};

export default FormField;
