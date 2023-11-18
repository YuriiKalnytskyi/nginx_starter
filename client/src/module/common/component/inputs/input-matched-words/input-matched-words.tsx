import { getIn, useFormikContext } from 'formik';
import React, { ChangeEvent, useRef, useState } from 'react';

import arrowBottomIcon from '@/assets/icons/default/arrow-bottom-icon.svg';
import closeIcon from '@/assets/icons/default/close-icon.svg';
import { useClickOutside } from '@/module/common/hooks';
import { IconCommon } from '@/module/common/styles';
import { IInputMatchedWordsProps } from '@/module/common/types';
import { COLORS } from '@/theme';
import { searchKeyPressControlScrol } from '@/utils';

import * as StyledCommon from '../input/input.styled';
import { InputHint } from './input-hint';
import * as Styled from './input-matched-words.styled';

export const InputMatchedWords = ({
  name,
  placeholder,
  matchedWords,
  isFilter = false,
  isFilterVisibleAllData = false,
  isChip = false,
  isDontChange = false,
  isInput = false,
  readOnly = false,
  readOnlyKeyboard = false,
  isEdit = false,
  width,
  height = '3rem',
  label,
  innerPads,
  visibleItem,
  ...props
}: IInputMatchedWordsProps) => {
  const {
    values,
    handleChange,
    setValues,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    setFieldError
  } = useFormikContext();

  const value = getIn(values, name);
  const touche = getIn(touched, name);
  const error = getIn(errors, name);

  const isChipChecking = Array.isArray(value) || isChip;

  const [selectedHint, setSelectedHint] = useState<number | null>(null);
  const [input, setInput] = useState<string>(isEdit ? value ?? '' : '');
  const [focused, setFocused] = useState(false);
  const [isOnChange, setIsOnChange] = useState(false);

  const inputHintBlockRef = useRef<HTMLUListElement | null>(null);

  const onTransfonmValue = (_value: string | any): string =>
    visibleItem ? _value[visibleItem] : _value ?? '';

  const isIncludesValue = (filterString: string, filterArray?: []) => {
    const array = filterArray ?? matchedWords;

    const filterData = array?.filter((v: any) => {
      const transfonmValue = onTransfonmValue(v);

      return transfonmValue?.toLowerCase()?.includes(filterString?.trim().toLowerCase());
    });

    return !!filterData.length;
  };

  const onSetTouched = (flag: boolean) => {
    if (!readOnly) {
      setFieldTouched(name, flag);

      setFocused(flag);

      flag && inputHintBlockRef.current && inputHintBlockRef.current.focus();
    }
  };

  const setValue = (str: string | any, ind: number) => {
    const _value = onTransfonmValue(str);
    onSetTouched(false);
    setIsOnChange(false);
    setSelectedHint(ind);
    isChipChecking || !isFilterVisibleAllData ? setInput('') : setInput(_value);

    isIncludesValue(_value) &&
      setValues((v: any) => {
        const prevValueName = getIn(v, name);
        const nextValueName = isChipChecking
          ? isIncludesValue(_value, prevValueName)
            ? [...prevValueName]
            : [...prevValueName, str]
          : str;

        return { ...v, [name]: nextValueName };
      });
  };

  const deleteItem = (srt: string) => {
    const nextValue = value?.filter((v: any) => {
      const transfonmValue = onTransfonmValue(v);
      const deleteValue = onTransfonmValue(srt);

      return transfonmValue !== deleteValue;
    });

    setFieldValue(name, nextValue);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setInput(inputValue);
    setIsOnChange(true);

    !isIncludesValue(inputValue) && setFieldError(name, 'No Options found');
  };

  const filterItem = isChipChecking || isFilter ? input : onTransfonmValue(value);
  const filterData = filterItem?.length
    ? matchedWords?.filter((v: any) => {
        const transfonmValue = onTransfonmValue(v);
        return transfonmValue?.toLowerCase().includes(filterItem.toLowerCase());
      })
    : matchedWords;

  const data = isFilter && isOnChange ? filterData : matchedWords;

  const pads = innerPads;

  const { ref } = useClickOutside(() => {
    if (focused) {
      setFocused(false);
    }
  });

  const isError = !!error && touche;

  const _value = isChipChecking || isFilter ? input : onTransfonmValue(value);

  return (
    <Styled.InputBlock width={width} focused={focused} readOnly={readOnly} ref={ref} {...props}>
      {label && (
        <StyledCommon.Label isError={!focused && isError} htmlFor='avatar'>
          {label}
        </StyledCommon.Label>
      )}
      <StyledCommon.Input
        autoComplete='off'
        isError={isError}
        width={width}
        height={height}
        name={name}
        value={_value}
        id={name}
        innerPads={pads}
        readOnly={readOnly || readOnlyKeyboard}
        placeholder={placeholder}
        onClick={onSetTouched.bind(this, !focused)}
        onChange={(e) => {
          isChipChecking || isFilter ? onChange(e) : isDontChange ? () => {} : handleChange(e);
        }}
        onKeyDown={searchKeyPressControlScrol({
          selectedHint,
          setInputValue: setValue,
          setSelectedHint,
          matchedWords: data,
          ref: inputHintBlockRef
        })}
        touche={touche}
      />

      <Styled.Arrow focused={focused} isLabel={!!label} src={arrowBottomIcon} alt='arrowIcon' />

      {focused && data?.length > 0 && (
        <Styled.SuggestedBlock ref={inputHintBlockRef}>
          {data.map((str, ind) => {
            const str_value = onTransfonmValue(str);
            const selected = isChipChecking
              ? isIncludesValue(str_value, value)
              : str_value === onTransfonmValue(value) || ind === selectedHint;

            return (
              <InputHint
                str={str_value}
                key={`${ind}-${value}-${selectedHint}`}
                setValue={() => setValue(str, ind)}
                selected={selected}
                isChip={isChipChecking}
              />
            );
          })}
        </Styled.SuggestedBlock>
      )}

      {isError && error !== 'is required' ? (
        <Styled.ErrorInfoContainer>
          <Styled.ErrorInfoText>{error}</Styled.ErrorInfoText>
        </Styled.ErrorInfoContainer>
      ) : null}

      {isChipChecking && !isInput && value?.length ? (
        <Styled.ChipContainer>
          {value.map((str: string, index: number) => (
            <Styled.Chip onClick={deleteItem.bind(this, str)} key={index}>
              {onTransfonmValue(str)}
              <IconCommon
                height='0.625rem'
                cursor='pointer'
                icon={closeIcon}
                background={COLORS.black}
              />
            </Styled.Chip>
          ))}
        </Styled.ChipContainer>
      ) : null}
    </Styled.InputBlock>
  );
};
