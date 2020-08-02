import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const FormFieldWrapper = styled.div`
  position: relative;
  margin-bottom: 45px;

  textarea {
    min-height: 150px;
  }
  input[type="color"] {
    padding-left: 56px;
  }
`;

const Label = styled.label`
`;

Label.Text = styled.span`
  color: #E5E5E5;
  height: 57px;
  position: absolute; 
  top: 0;
  left: 16px;
  
  display: flex;
  align-items: center;
  
  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  
  transition: .1s ease-in-out;
`;

const Input = styled.input`
  background: #53585D;
  color: #E5E5E5;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 17px;
  
  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585D;
  
  padding: 16px 16px;
  
  resize: none;
  border-radius: 4px;
  transition: border-color .3s;
  
  &:focus {
    border-bottom-color: var(--primary);
  }
  &:focus:not([type='color']) + ${Label.Text} {
    transform: scale(.6) translateY(-10px);
    color: var(--primary);
  }
  ${({ value }) => {
    const hasValue = value.length > 0;
    return hasValue && css`
        &:not([type='color']) + ${Label.Text} {
          transform: scale(.6) translateY(-10px);
          color: var(--primary);
        }
      `;
    }
  }
`;

const Span = styled.span`
  color: red;
  font-size: 15px;

`;

function FormField({
  label, type, value, name, onChange, sugestoes, error
}) {
  const fieldId = `id_${name}`; 
  const isTextArea = type === 'textarea';
  //se for textarea, atribui a const, senao, atribui input 
  const tag = isTextArea ? 'textarea' : 'input';
  const hasSuggestions = Boolean(sugestoes.length);

  return (
    <FormFieldWrapper>
      <Label
        htmlFor={fieldId}
      >
        <Input
          as= {tag}
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
              sugestoes.map((suggestion) => (
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
  sugestoes: [],
  error: '',
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string, 
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  sugestoes: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
};

export default FormField;
