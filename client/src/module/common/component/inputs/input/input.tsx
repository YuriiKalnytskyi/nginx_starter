import { getIn, useField, useFormikContext } from 'formik';
import { memo, useEffect, useRef, useState } from 'react';

import successIcon from '@/assets/icons/default/success-icon.svg';
import visibilityOnIcon from '@/assets/icons/default/visibility-icon.svg';
import visibilityOffIcon from '@/assets/icons/default/visibility-off-icon.svg';
import { RegexConst, passwordError } from '@/module/common/constants';
import { IconCommon } from '@/module/common/styles';
import { IInputProps } from '@/module/common/types';
import { SPACES } from '@/theme';

import * as Styled from './input.styled';

export const Input = memo(
  ({
    name,
    label,
    gapFromLabel,
    height = '3rem',
    startIcon,
    endIcon,
    innerPads,
    required,
    className,
    type = 'text',
    labelClassName,
    inputType = 1,
    isOptional = false,
    ...props
  }: IInputProps) => {
    const [field, { touched, error }] = useField(name);

    const { values } = useFormikContext();
    const value = getIn(values, name);

    const isCommonError = touched && error;

    const pads =
      (startIcon ? `${SPACES.xs} ${SPACES.xxxxxxl_}` : innerPads) ||
      (type === 'password' ? `${SPACES.xs} ${SPACES.xxxxxxl} ${SPACES.xs} ${SPACES.m}` : undefined);

    const [types, setTypes] = useState(type);
    const [isPassword, setIsPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string[]>([]);

    useEffect(() => {
      if (type === 'password' && isPassword) {
        setTypes('text');
      } else {
        setTypes(type);
      }
    }, [type, isPassword]);

    useEffect(() => {
      if (name.includes('password')) {
        const addStr = (str: string) => {
          if (!successMessage.includes(str)) {
            setSuccessMessage((prev) => [...prev, str]);
          }
        };
        const deleteStr = (str: string) => {
          const index = successMessage.indexOf(str);

          if (index > -1) {
            setSuccessMessage((prev: any) => {
              prev.splice(index, 1);

              return [prev];
            });
          }
        };
        const is = (reservation: any, _error: string) => {
          if (reservation) {
            addStr(_error);
          } else {
            deleteStr(_error);
          }
        };

        is(RegexConst.LOWERCASE.test(value), passwordError[0]);
        is(RegexConst.CAPITAL.test(value), passwordError[1]);
        is(RegexConst.SPECIAL.test(value), passwordError[2]);
        is(value?.length >= 8, passwordError[3]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, value]);

    const onClickPassword = () => {
      setIsPassword(!isPassword);
    };

    const isPasswordError = !!isCommonError && passwordError.includes(error ?? '');

    const ref = useRef<HTMLDivElement | null>(null);

    const [top, setTop] = useState('50%');

    useEffect(() => {
      if (type === 'password' || startIcon || endIcon || inputType === 2) {
        const calculateTopHeight = () => {
          const childrenRef = ref.current?.children;
          // @ts-ignore
          const childrenRefHTML = Array.from(childrenRef ?? []) as HTMLCollectionOf<HTMLElement>;
          const childrenRefHTMLArray = Array.from(childrenRefHTML).splice(
            0,
            inputType === 1 ? 2 : 1
          );

          return (
            childrenRefHTMLArray.reduce((acc, child, i) => {
              if (i === 1) {
                return acc + child.offsetHeight / 2.5;
              }

              if (inputType === 2) {
                return acc + child.offsetHeight / 3.5;
              }

              return acc + child.offsetHeight;
            }, 0) + 'px'
          );
        };

        setTop(calculateTopHeight());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Styled.Wrapper className={className} {...props} ref={ref} top={top}>
        {label && inputType === 1 && (
          <Styled.Label
            isError={!!isCommonError}
            required={required}
            htmlFor={name}
            className={labelClassName}
          >
            {label}
            {isOptional && <Styled.LabelOptional>· Optional</Styled.LabelOptional>}
          </Styled.Label>
        )}

        {inputType === 1 ? (
          <Styled.Input
            height={height}
            id={name}
            autoComplete='off'
            isError={!!isCommonError}
            gapFromLabel={gapFromLabel}
            innerPads={pads}
            type={types}
            {...field}
            {...props}
          />
        ) : (
          <Styled.Input2
            isError={!!isCommonError}
            id={name}
            type={types}
            top={top}
            height={height}
            required
            {...field}
            {...props}
          />
        )}

        {label && inputType === 2 && (
          <Styled.Label2 htmlFor={name} top={top} className={labelClassName}>
            {label}
          </Styled.Label2>
        )}

        {startIcon && <IconCommon {...startIcon} className='startIcon' />}
        {endIcon && <IconCommon {...endIcon} className='endIcon' />}

        {type === 'password' && (
          <Styled.VisibilityIcon
            icon={isPassword ? visibilityOnIcon : visibilityOffIcon}
            height={top}
            onClick={onClickPassword}
          />
        )}

        {isCommonError &&
        !passwordError.includes(error ?? '') &&
        error !== 'is required' &&
        error !== 'invalid date' ? (
          <Styled.Error>{error}</Styled.Error>
        ) : null}

        {isPasswordError ? (
          <Styled.ErrorPasswordContainer>
            {passwordError.map((text, index) => {
              const isError = text === error;
              const isSuccess = successMessage.includes(text);
              return (
                <Styled.ErrorPassword isError={isError} isSuccess={isSuccess} key={index}>
                  <Styled.Icon
                    isError={isError}
                    isSuccess={isSuccess}
                    style={{
                      WebkitMaskImage: `url(${successIcon})`,
                      WebkitMaskSize: '100% 100%',
                      maskImage: `url(${successIcon})`
                    }}
                  />

                  {text}
                </Styled.ErrorPassword>
              );
            })}
          </Styled.ErrorPasswordContainer>
        ) : null}
      </Styled.Wrapper>
    );
  }
);
