import React from 'react';

import * as Styled from './input-matched-words.styled';

interface IProps {
  str: string;
  selected: boolean;
  setValue: any;
  isChip: boolean;
  padding?: any;
  isNewWindow?: boolean;
}

export const InputHint = ({ str, setValue, selected, isChip, padding, isNewWindow }: IProps) => (
  <Styled.HintOption
    isNewWindow={isNewWindow}
    padding={padding}
    onClick={setValue}
    selected={selected}
    isChip={isChip}
  >
    {str}
  </Styled.HintOption>
);
