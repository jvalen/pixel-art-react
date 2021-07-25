import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, css } from 'styled-components';
import theme from 'styled-theming';

const colors = {
  silver: '#bbb',
  mineShaft: '#313131',
  doveGray: '#707070',
  tundora: '#4b4949',
  lotus: '#803c3c',
  buccaneer: '#733939',
  cowboy: '#552a2a',
  steelblue: '#5786c1',
  sanMarino: '#4171ae',
  eastBay: '#3a587f',
  chathamsBlue: '#164075',
  chambray: '#2f5382',
  cloudBurst: '#253c5a',
  alto: '#e0e0e0',
  silveChalice: '#a0a0a0',
  nobel: '#b7b7b7',
  shrub: '#0e8044'
};

const textColor = theme.variants('mode', 'variant', {
  default: { default: colors.silver },
  action: { default: colors.silver },
  close: { default: colors.silver },
  info: { default: colors.silver },
  white: { default: 'black' },
  proceed: { default: colors.silver }
});

const bgColor = theme.variants('mode', 'variant', {
  default: { default: colors.mineShaft },
  action: { default: colors.lotus },
  close: { default: colors.steelblue },
  info: { default: colors.chathamsBlue },
  white: { default: colors.alto },
  proceed: { default: colors.shrub }
});

const boxShadowColor = theme.variants('mode', 'variant', {
  default: { default: colors.doveGray },
  action: { default: colors.buccaneer },
  close: { default: colors.sanMarino },
  info: { default: colors.chambray },
  white: { default: colors.silveChalice },
  proceed: { default: colors.nobel }
});

const bgActiveColor = theme.variants('mode', 'variant', {
  default: { default: colors.tundora },
  action: { default: colors.cowboy },
  close: { default: colors.eastBay },
  info: { default: colors.cloudBurst },
  white: { default: colors.nobel },
  proceed: { default: colors.shrub }
});

const ButtonCSS = css`
  background: none;
  border: none;
  outline: none;
  border-radius: 2px;
  padding: 10px;
  font-size: 1em;
  text-decoration: none;
  transition-duration: 0.1s;
  color: ${textColor};
  background-color: ${bgColor};
  box-shadow: 0 5px 0 0 ${boxShadowColor};
  margin: 0 auto;
  &:hover,
  &.selected {
    background-color: ${bgActiveColor};
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translate(0, 5px);
    box-shadow: 0 1px 0 ${bgActiveColor};
    background-color: ${bgActiveColor};
  }

  ${props => {
    const widthOptions = { full: '100%', half: '50%', normal: 'auto' };
    const size = widthOptions[props.size];
    return (
      props.size &&
      css`
        width: ${size};
      `
    );
  }};
`;

const ButtonStyled = styled.button.attrs(props => ({
  disabled: props.disabled
}))`
  ${ButtonCSS}
  ${props =>
    props.size &&
    css`
      opacity: ${props.disabled ? '0.5' : '1'};
    `};
`;

const InputFileLabelStyled = styled.label.attrs({
  htmlFor: 'load-image-input'
})`
  ${ButtonCSS}
  cursor: pointer;
`;

const InputFileStyled = styled.input.attrs({
  type: 'file',
  id: 'load-image-input',
  role: 'button'
})`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const Button = ({
  children,
  variant,
  onClick,
  onChange,
  type,
  size,
  ariaLabel,
  disabled = false
}) => (
  <ThemeProvider theme={{ mode: 'default' }}>
    {type === 'file' ? (
      <>
        <InputFileLabelStyled variant={variant} size={size}>
          {children}
        </InputFileLabelStyled>
        <InputFileStyled aria-label={ariaLabel} onChange={onChange} />
      </>
    ) : (
      <ButtonStyled
        variant={variant}
        onClick={onClick}
        size={size}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </ButtonStyled>
    )}
  </ThemeProvider>
);
Button.propTypes = {
  variant: PropTypes.oneOf([
    'default',
    'info',
    'close',
    'action',
    'white',
    'proceed'
  ]),
  size: PropTypes.oneOf(['normal', 'half', 'full']),
  ariaLabel: PropTypes.string.isRequired,
  onClick(props, ...rest) {
    if (!props.type) {
      return PropTypes.func.isRequired(props, ...rest);
    }
    return PropTypes.func(props, ...rest);
  }
};

Button.defaultProps = {
  variant: 'default',
  size: 'normal',
  onClick: () => {}
};

export default Button;
