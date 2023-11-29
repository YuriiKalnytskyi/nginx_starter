import { ReactNode } from 'react';

import { IStartIcon } from '@/module/common/types/buttons.type';

import { IMargin } from './styles.type';

interface ISize {
  height?: string;
  width?: string;
}

interface IInputDefault {
  name: string;
  label?: string;
  placeholder?: string;
}

export interface IInputPropsStyles {
  innerPads?: string;
  isError?: boolean;
  gapFromLabel?: string;
  placeholderColor?: string;
}

export interface IInputProps extends IMargin, ISize, IInputDefault {
  gapFromLabel?: string;
  type?: string;
  value?: any;
  startIcon?: IStartIcon;
  endIcon?: IStartIcon;
  innerPads?: string;
  required?: boolean;
  id?: string;
  readOnly?: boolean;
  placeholderColor?: string;
  className?: string;
  labelClassName?: string;
  maxLength?: number;

  inputType?: 1 | 2;
  width?: string;
  isOptional?: boolean;
  isError?: boolean;
  isCache?: boolean;
}

export interface IInputMatchedWordsProps extends IWProps, ISize, IInputDefault {
  matchedWords: string[] | any[];
  isFilter?: boolean;
  isChip?: boolean;
  isDontChange?: boolean;
  isInput?: boolean;
  innerPads?: string;
  readOnly?: boolean;
  readOnlyKeyboard?: boolean;
  focused?: boolean;
  isEdit?: boolean;
  isFilterVisibleAllData?: boolean;
  visibleItem?: string;
}

export interface IInputMatchedWordsDynamic extends IMargin, ISize, IInputDefault {
  readOnly?: boolean;
}

export interface IInputMask extends IInputProps, Omit<IInputDefault, 'placeholder' | 'label'> {
  mask: string;
  label: string;
  name: string;
  isHidePhone?: boolean;
}

export interface IWProps extends IMargin {
  readOnly?: boolean;
  isLabel?: boolean;
  top?: string;
}

export interface IInputTextareaProps extends IMargin, IInputDefault {
  rows: number;
  margin?: string;
  isEmail?: boolean;
  maxLength?: number;
  resizable?: boolean;
  readOnly?: boolean;

  value?: string;
  onChange?: (value: any) => void;
}

export interface ICheckBox extends IMargin {
  label: string;
  onClick: () => void;
  isChecked: boolean;
  height?: string;
  colorText?: string;
  background?: string;
}

export interface ISwitch {
  name: string;
  label?: string;
}

export interface ICheckBoxFormik extends IMargin, Omit<IInputDefault, 'placeholder' | 'label'> {
  name: string;
  label: string | ReactNode;
  labelValue?: string;
  height?: string;
  colorText?: string;
  background?: string;
  isMulti?: boolean;
}
