import styled, { css } from 'styled-components';

import { Fonts, IconCommon, Margin } from '@/module/common/styles';
import { IButtonAppearances, IButtonProps, IIconButton } from '@/module/common/types';
import { COLORS, FONTS, MEDIA, SPACES, TRANSITIONS } from '@/theme';

const style = css<IButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '44px'};

  padding: ${({ pads }) => pads ?? `${SPACES.l} ${SPACES.xxxxl}`};

  ${Margin};
  ${Fonts};

  font-size: ${FONTS.SIZES.l};
  line-height: ${FONTS.SIZES.xxxxl};
  color: ${COLORS.white};

  border-radius: 1.5rem;

  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  background-color: transparent;

  transition: all ${TRANSITIONS.duration.fast} ${TRANSITIONS.function.linear};
  cursor: pointer;

  &:disabled {
    cursor: initial;
  }

  @media screen and (max-width: ${MEDIA.mobile_m}) {
    font-size: ${FONTS.SIZES.xxsm};
    line-height: ${FONTS.SIZES.xxxxl};
  }

  @media screen and (max-width: ${MEDIA.mobile_l}) {
    font-size: ${FONTS.SIZES.s};
    line-height: ${FONTS.SIZES.xxxxl};
  }
`;

const defaultStyledButton = css`
  &:hover,
  &:focus {
    filter: saturate(150%);
  }

  &:active {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;

    &:hover {
      pointer-events: none;
    }
  }
`;

const buttonAppearances: IButtonAppearances = {
  primary: `
    background-color: ${COLORS.green};
    border: 1px solid ${COLORS.green};
    color: ${COLORS.white};
        
  & > .start,
  & > .end {
   background-color: ${COLORS.white};
  }


  ${defaultStyledButton};  

`,
  inverse: `
    background-color: ${COLORS.gray};
    border: 1px solid ${COLORS.black};
    color: ${COLORS.black};
        
   & > .start,
  & > .end {
   background-color: ${COLORS.white};
  }


   ${defaultStyledButton};  
`
};

export const StyledButton = styled.button<IButtonProps>`
  ${style}
  ${({ variant }) => buttonAppearances[variant as keyof typeof buttonAppearances]}
  cursor: pointer;
`;

export const IconEnd = styled(IconCommon)<IIconButton>`
  height: ${({ widthIcon }) => (widthIcon ? `${widthIcon} !important` : '25px !important')};
  aspect-ratio: 1/1;
  margin-right: ${({ marginIcon }) => marginIcon ?? SPACES.xs};
  margin-left: ${({ marginIcon }) => marginIcon ?? SPACES.xs};
`;

export const IconStart = styled(IconCommon)<IIconButton>`
  height: ${({ widthIcon }) => (widthIcon ? `${widthIcon} !important` : '25px !important')};
  margin-right: ${({ marginIcon }) => marginIcon ?? SPACES.xs};
`;
