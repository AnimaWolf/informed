import React from 'react';
import { TextInput } from 'react-native';
import asField from '../../HOC/asField';

const Text = ({ fieldApi, fieldState, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const {
    onChange,
    onBlur,
    field,
    initialValue,
    forwardedRef,
    ...rest
  } = props;
  return (
    <TextInput
      {...rest}
      name={field}
      ref={forwardedRef}
      value={!value && value !== 0 ? '' : value}
      onChangeText={newValue => {
        setValue(newValue);
        if (onChangeText) {
          onChange(newValue);
        }
      }}
      onBlur={e => {
        setTouched();
        if (onBlur) {
          onBlur(e);
        }
      }}
    />
  );
};

export { Text as BasicText };

export default asField(Text);
