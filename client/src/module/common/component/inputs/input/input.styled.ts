import styled, { css } from 'styled-components';

import { Fonts, IconCommon } from '@/module/common/styles';
import { IInputProps, IWProps } from '@/module/common/types/inputs.type';
import { COLORS, FONTS, MEDIA, SHADOWS, SPACES } from '@/theme';

export const commonStyles = css<IInputProps>`
  margin: 0;
  padding: ${({ innerPads }) => innerPads ?? `${SPACES.xs} ${SPACES.m}`};

  border: 1px solid ${({ isError }) => (isError ? COLORS.mainRed : COLORS.black)};
  border-radius: ${SPACES.xxs};
  box-shadow: ${SHADOWS.xxs};
  background-color: ${COLORS.white};

  &:not(:focus-within) {
    cursor: pointer;
  }

  &::placeholder {
    color: ${({ placeholderColor }) => placeholderColor ?? COLORS.gray};
  }

  &:focus-within {
    border: 1px solid ${COLORS.green};
    outline: none;
  }
`;

export const Wrapper = styled.div<IWProps>`
  position: relative;
  width: 100%;

  opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};

  margin-left: ${({ ml }) => ml ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
  margin-bottom: ${({ mb }) => mb ?? '0'};
  margin-top: ${({ mt }) => mt ?? '0'};

  & .startIcon {
    position: absolute;
    top: ${({ top }) => top ?? '50%'};
    left: ${SPACES.l};
    opacity: 1;
  }

  & .endIcon {
    position: absolute;
    top: ${({ top }) => top ?? '50%'};
    right: ${SPACES.l};

    pointer-events: none;
  }
`;

export const Label = styled.label<{ required?: boolean; isError: boolean }>`
  position: relative;
  display: block;
  ${Fonts};

  text-transform: capitalize;

  color: ${({ isError }) => (isError ? COLORS.mainRed : COLORS.black)};

  ${({ required }) =>
    required &&
    css`
      &::after {
        content: '*';
        right: 0;
        top: 0;
      }
    `}
`;

export const LabelOptional = styled.label`
  ${Fonts};
  color: ${COLORS.gray};
  margin-left: 2px;
`;

export const Input = styled.input`
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => `${height} !important` ?? '100%'};

  ${commonStyles}

  &:focus-within {
    outline: ${({ readOnly }) => readOnly && 'none'};
  }

  background: ${({ readOnly }) => readOnly && COLORS.white};
  margin-top: ${({ gapFromLabel }) => gapFromLabel ?? SPACES.xxxs};
  position: relative;

  caret-color: ${COLORS.green};

  cursor: ${({ readOnly }) => (readOnly ? 'initial' : 'pointer')};
  pointer-events: ${({ readOnly }) => (readOnly ? 'none' : 'initial')};

  &[type='number'] {
    appearance: none;
    -moz-appearance: textfield;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
  }
`;

export const Input2 = styled.input<IInputProps, { top?: string }>`
  position: relative;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '100%'};

  ${commonStyles}

  outline: none;
  transition: 0.5s;

  &&:valid ~ label,
  &&:focus ~ label {
    color: ${COLORS.black};
    transform: translateX(10px) translateY(${({ top }) => `calc(-${top} - 10px)` ?? '7px'});
    font-size: ${SPACES.xs};
    padding: 0 ${SPACES.xs};
    background: ${COLORS.white};
    border-left: 1px solid ${COLORS.white};
    border-right: 1px solid ${COLORS.white};
    letter-spacing: 0.2em;
  }
`;

export const Label2 = styled.label<{ top?: string }>`
  position: absolute;
  left: 0;
  top: ${({ top }) => top ?? '0'};
  padding-left: ${SPACES.xs};

  pointer-events: none;
  color: ${COLORS.black};
  transition: 0.5s;

  ${Fonts};
`;

export const Error = styled.div`
  position: absolute;
  left: ${SPACES.xxxxxs};
  font-size: ${FONTS.SIZES.s};
  color: ${COLORS.mainRed};
`;

export const ErrorPasswordContainer = styled.div`
  width: 100%;
  position: absolute;
  left: ${SPACES.xxxxxs};
  bottom: -${SPACES.xxxs};
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  @media screen and (max-width: ${MEDIA.mobile_l}) {
    flex-wrap: wrap;
    position: relative;
  }
  @media screen and (max-width: ${MEDIA.tablet}) {
    flex-wrap: wrap;
    position: relative;
  }
`;

export const ErrorPassword = styled.div<{ isError: boolean; isSuccess: boolean }>`
  ${Fonts};
  color: ${({ isError }) => (isError ? COLORS.mainRed : COLORS.gray)};
  ${({ isSuccess }) =>
    isSuccess &&
    css`
      color: ${COLORS.green};
    `}

  display: flex;
  gap: 2px;
`;

export const VisibilityIcon = styled(IconCommon)<{ height?: string }>`
  height: 1.5rem;
  aspect-ratio: 1/1;
  color: ${COLORS.black};
  cursor: pointer;
  position: absolute;
  top: 2rem;
  top: ${({ height }) => height};
  right: ${SPACES.xs};
`;

export const Icon = styled.div<{ isError: boolean; isSuccess: boolean }>`
  width: 13px;
  aspect-ratio: 1/1;
  background: ${({ isError }) => (isError ? COLORS.mainRed : COLORS.gray)};

  ${({ isSuccess }) =>
    isSuccess &&
    css`
      background: ${COLORS.green};
    `}
`;

export const CloseIcon = styled.div`
  width: 13px;
  aspect-ratio: 1/1;
  background: ${COLORS.black};
  cursor: pointer;
  pointer-events: initial !important;
`;

export const InputFile = styled.input<{ height?: string }>`
  position: absolute;
  top: 25px;
  left: 0;
  width: 100%;
  height: ${({ height }) => height ?? '100%'};
  opacity: 0;
  overflow: hidden;
  cursor: pointer;
`;
