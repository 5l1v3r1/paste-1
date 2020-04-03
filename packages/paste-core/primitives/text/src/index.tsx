import * as PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {compose, space, display, verticalAlign, overflow, typography, system, position} from 'styled-system';
import css from '@styled-system/css';
import {CursorProperty} from 'csstype';
import {
  SpaceProps,
  Display,
  VerticalAlign,
  OverflowProps,
  PositionProps,
  TypographyProps,
  isFontFamilyTokenProp,
  isFontSizeTokenProp,
  isFontWeightTokenProp,
  isLineHeightTokenProp,
  isSpaceTokenProp,
  isTextColorTokenProp,
  ResponsiveProp,
} from '@twilio-paste/style-props';
import {PseudoPropStyles} from './PseudoPropStyles';

interface BaseTextProps
  extends Omit<React.HTMLAttributes<any>, 'color'>,
    SpaceProps,
    OverflowProps,
    PositionProps,
    TypographyProps {
  content?: string;
  cursor?: CursorProperty;
  display?: Display;
  verticalAlign?: VerticalAlign;
}

interface PseudoStylesProps {
  _after?: BaseTextProps;
  _before?: BaseTextProps;
  _focus?: BaseTextProps;
  _hover?: BaseTextProps;
  _active?: BaseTextProps;
  _pressed?: BaseTextProps;
  _selected?: BaseTextProps;
  _focusWithin?: BaseTextProps;
  _invalid?: BaseTextProps;
  _disabled?: BaseTextProps;
  _grabbed?: BaseTextProps;
  _expanded?: BaseTextProps;
  _checked?: BaseTextProps;
  _mixed?: BaseTextProps;
  _odd?: BaseTextProps;
  _even?: BaseTextProps;
  _visited?: BaseTextProps;
  _readOnly?: BaseTextProps;
  _first?: BaseTextProps;
  _last?: BaseTextProps;
  _notFirst?: BaseTextProps;
  _notLast?: BaseTextProps;
}

export interface TextProps extends BaseTextProps, PseudoStylesProps {
  as: keyof JSX.IntrinsicElements;
}

const extraConfig = system({
  color: {
    property: 'color',
    scale: 'textColors',
  },
  cursor: true,
});

const textDecoration = system({textDecoration: true});

const getPseudoStyles = (props: TextProps): {} => {
  const pseudoProps = Object.keys(props).filter(propName => propName.startsWith('_'));

  if (pseudoProps.length === 0) {
    return {};
  }

  const pseudoStyles = {};
  pseudoProps.forEach(pseudoProp => {
    pseudoStyles[PseudoPropStyles[pseudoProp]] = props[pseudoProp];
  });

  return css(pseudoStyles);
};

/* eslint-disable emotion/syntax-preference */
// @ts-ignore
const Text = styled.span(
  {
    margin: 0,
    padding: 0,
  },
  compose(
    space,
    display,
    verticalAlign,
    overflow,
    position,
    textDecoration,
    typography,
    extraConfig
  ),
  getPseudoStyles
  // we do this because the default typings of emotion styled
  // means Text gets typed as a span, and can't be extended
  // correctly to utilise the as prop. The new HTML element attributes
  // always clash with the span html attributes. To override this,
  // we retype as a basic functional component which is easy to extend
) as React.FC<TextProps>;
/* eslint-enable */

Text.displayName = 'Text';

Text.defaultProps = {
  fontSize: 'fontSize30',
  lineHeight: 'lineHeight30',
  color: 'colorText',
};

if (process.env.NODE_ENV === 'development') {
  Text.propTypes = {
    as: PropTypes.string as any,
    display: ResponsiveProp(PropTypes.string),
    cursor: ResponsiveProp(PropTypes.string),
    content: ResponsiveProp(PropTypes.string),
    fontFamily: isFontFamilyTokenProp,
    fontSize: isFontSizeTokenProp,
    fontStyle: ResponsiveProp(PropTypes.string),
    fontWeight: isFontWeightTokenProp,
    lineHeight: isLineHeightTokenProp,
    letterSpacing: ResponsiveProp(PropTypes.string),
    margin: isSpaceTokenProp,
    marginTop: isSpaceTokenProp,
    marginRight: isSpaceTokenProp,
    marginBottom: isSpaceTokenProp,
    marginLeft: isSpaceTokenProp,
    padding: isSpaceTokenProp,
    paddingTop: isSpaceTokenProp,
    paddingRight: isSpaceTokenProp,
    paddingBottom: isSpaceTokenProp,
    paddingLeft: isSpaceTokenProp,
    overflow: ResponsiveProp(PropTypes.string),
    overflowX: ResponsiveProp(PropTypes.string),
    overflowY: ResponsiveProp(PropTypes.string),
    textAlign: ResponsiveProp(PropTypes.string),
    color: isTextColorTokenProp,
    textDecoration: ResponsiveProp(PropTypes.string),
    textOverflow: ResponsiveProp(PropTypes.string),
    verticalAlign: ResponsiveProp(PropTypes.string),
    whiteSpace: ResponsiveProp(PropTypes.string),
  };
}

export {Text};

export * from './SafelySpreadProps';
