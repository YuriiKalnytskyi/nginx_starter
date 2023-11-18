import { getIn, useFormikContext } from 'formik';
import React from 'react';

import { ICheckBoxFormik } from '../../../../types';
import * as Styled from './check-box-formik.styled';

export const CheckBoxFormik = ({
  name,
  label,
  colorText,
  background,
  isMulti,
  labelValue = '',
  ...props
}: ICheckBoxFormik) => {
  const { values, setFieldValue, setValues } = useFormikContext();

  const value = getIn(values, name);

  const isValue = labelValue ? labelValue : label;

  const _value = isMulti && Array.isArray(value) ? value.includes(isValue) : value;

  const onChange = () => {
    if (isMulti && Array.isArray(value)) {
      setValues((v: any) => {
        const prevValue = getIn(v, name);
        if (prevValue.includes(isValue)) {
          prevValue.splice(prevValue.indexOf(isValue), 1);
        } else {
          prevValue.push(isValue);
        }

        return { ...v, [name]: prevValue };
      });
    } else {
      setFieldValue(name, !value);
    }
  };

  return (
    <Styled.Label {...props}>
      <Styled.Input
        name={name}
        type='checkbox'
        checked={_value}
        onChange={onChange}
        background={background}
      />
      <Styled.Span className='text' colorText={colorText} background={background}>
        <span>{label}</span>
      </Styled.Span>
    </Styled.Label>
  );
};
