import { useField } from 'formik';
import React, { FormEvent, forwardRef, useRef } from 'react';

import { useAutoResizeTextArea } from '@/module/common/hooks';
import { IInputTextareaProps } from '@/module/common/types';

import * as StyledCommon from '../input/input.styled';
import * as Styled from './input-text-area.styled';

export const InputTextArea = forwardRef<HTMLDivElement, IInputTextareaProps>(
  (
    {
      rows,
      value: propsValue,
      onChange,
      label,
      name,
      resizable = true,
      placeholder,
      margin,
      maxLength,
      readOnly,
      ...props
    },
    ref
  ) => {
    const returnData = () => {
      if (onChange && propsValue !== null && propsValue !== undefined) {
        return {
          value: propsValue,
          onChange: (e: FormEvent<HTMLInputElement>) => onChange(e.target.value),
          isError: false,
          error: '',
          field: {}
        };
      }

      const [field, { touched, error, value }] = useField(name);

      return {
        value,
        isError: !!error && touched,
        error,
        onChange: (e: FormEvent<HTMLInputElement>) => field.onChange(e),
        field
      };
    };

    const { value, onChange: _onChange, error, isError, field } = returnData();

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useAutoResizeTextArea(resizable ? textAreaRef.current : null, value, rows);

    return (
      <Styled.InputContainer margin={margin || ''} ref={ref} {...props}>
        {label && (
          <StyledCommon.Label isError={isError} htmlFor={name}>
            {label}
          </StyledCommon.Label>
        )}

        <Styled.Input
          {...field}
          ref={resizable ? textAreaRef : null}
          isError={isError}
          rows={rows}
          id={name}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={readOnly}
          value={value}
          onChange={_onChange}
        />

        {maxLength ? (
          <Styled.MaxLength>
            <Styled.MaxLengthText>
              {value?.length}/{maxLength}
            </Styled.MaxLengthText>
          </Styled.MaxLength>
        ) : null}

        {isError && error !== 'is required' ? (
          <Styled.ErrorInfoContainer>
            <Styled.ErrorInfoText>{error}</Styled.ErrorInfoText>
          </Styled.ErrorInfoContainer>
        ) : null}
      </Styled.InputContainer>
    );
  }
);
