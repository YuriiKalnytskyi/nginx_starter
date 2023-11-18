import styled, { css } from 'styled-components';

import { Center, DivCommon, Fonts } from '@/module/common/styles';
import { IInputMatchedWordsProps } from '@/module/common/types';
import { COLORS, FONTS, MEDIA, SPACES } from '@/theme';

export const InputBlock = styled.div<Partial<IInputMatchedWordsProps>>`
  width: ${({ width }) => width ?? '100%'};
  position: relative;

  opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};

  & .inputIcon {
    position: absolute;
    top: ${({ label }) => (label ? '6.25rem' : '40%')};
    left: ${SPACES.l};
    transform: translateY(-50%);
  }

  margin-left: ${({ ml }) => ml ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
  margin-bottom: ${({ mb }) => mb ?? '0'};
  margin-top: ${({ mt }) => mt ?? '0'};
`;

export const Arrow = styled.img<{ focused: boolean; isLabel: boolean; isNewWindow?: boolean }>`
  ${({ isNewWindow }) =>
    !isNewWindow &&
    css`
      width: 0.75rem;
      height: 0.375rem;
    `}
  position: absolute;
  top: ${({ isLabel }) => (isLabel ? '3.25rem' : '45%')};
  right: ${SPACES.l};
  transform: translateY(-50%) rotate(${({ focused }) => (focused ? '-180deg' : '0')});
`;

export const PlusIcon = styled.img<{ top: string }>`
  height: 1rem;
  aspect-ratio: 1/1;
  cursor: pointer;

  position: absolute;
  top: ${({ top }) => top ?? '45%'};
  right: ${SPACES.l};
  transform: translateY(20%);
`;

export const SuggestedBlock = styled.ul`
  background: ${COLORS.white};
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 14rem;
  position: absolute;
  z-index: 1;
  box-shadow: 0 0 4px ${COLORS.gray100};

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.1px;
    background-color: ${COLORS.green};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.black};
  }
  &::-webkit-scrollbar-thumb {
    background-color: node;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const HintOption = styled.li<{
  selected: boolean;
  isChip: boolean;
  padding?: string;
  isNewWindow?: boolean;
}>`
  padding: ${({ padding }) => padding ?? `${SPACES.xs} ${SPACES.m}`} ;
  cursor: pointer;
  background: ${({ selected }) => (selected ? COLORS.green : COLORS.white)};
  
  &:hover {
    ${({ selected }) =>
      selected &&
      css`
        background: ${COLORS.white200};
      `}
   
    ${({ isChip, selected }) =>
      isChip && selected
        ? css`
            background: ${COLORS.white200};
          `
        : css`
            background: ${COLORS.white200};
          `}}
 
  }
  
  ${({ isNewWindow }) =>
    isNewWindow &&
    css`
      border-radius: 8px;
    `}
`;

export const ChipContainer = styled(DivCommon)`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: ${SPACES.xxs};
`;

export const Chip = styled.div`
  width: fit-content;
  cursor: pointer;

  gap: ${SPACES.xs};

  ${Center};
  ${Fonts};
  font-weight: ${FONTS.WEIGHTS.semi_bold};

  padding: ${SPACES.xxs} ${SPACES.s};
  background: ${COLORS.white100};
  border-radius: 4px;

  word-break: break-word;
`;

export const ErrorInfoContainer = styled.div<{ mb?: string }>`
  display: flex;
  align-items: center;
  position: absolute;

  left: 0;
  bottom: -10px
    ${({ mb }) =>
      mb &&
      css`
        margin-bottom: ${mb};
      `};
`;

export const ErrorInfoText = styled.div`
  box-sizing: border-box;
  font-family: ${FONTS.FAMILIES.inter};
  font-style: normal;
  font-weight: ${FONTS.WEIGHTS.normal};
  font-size: ${FONTS.SIZES.m};
  line-height: ${FONTS.SIZES.xxl};
  color: ${COLORS.mainRed};
`;

export const FirstLayoutStyled = css`
  & > .children {
    @media screen and (max-width: ${MEDIA.tablet}) {
      padding: ${SPACES.l};
    }
  }
`;
