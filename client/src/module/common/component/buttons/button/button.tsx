import { memo } from 'react';

import { IButtonProps } from '@/module/common/types';

import * as Styled from './button.styled';

export const Button = memo(
  ({
    content,
    type,
    id,
    variant = 'primary',
    startIcon,
    endIcon,
    onClick,
    ...restProps
  }: IButtonProps) => (
    <Styled.StyledButton
      id={id}
      type={type ?? 'button'}
      variant={variant}
      {...restProps}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {startIcon && <Styled.IconStart className='start' {...startIcon} />}
      {content}
      {endIcon && <Styled.IconEnd className='end' {...endIcon} />}
    </Styled.StyledButton>
  )
);
