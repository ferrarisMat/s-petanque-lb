import { createGlobalStyle } from 'styled-components';
import { FONTS } from './fonts';

import SFProDisplayRegularWoff2 from '../assets/fonts/SF-Pro-Display-Regular.woff2';
import SFProDisplayRegularWoff from '../assets/fonts/SF-Pro-Display-Regular.woff';
import SFProDisplayMediumWoff2 from '../assets/fonts/SF-Pro-Display-Medium.woff2';
import SFProDisplayMediumWoff from '../assets/fonts/SF-Pro-Display-Medium.woff';
import SFProDisplaySemiboldWoff2 from '../assets/fonts/SF-Pro-Display-Semibold.woff2';
import SFProDisplaySemiboldWoff from '../assets/fonts/SF-Pro-Display-Semibold.woff';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SF Pro Display';
    src: url('${SFProDisplayRegularWoff2}') format('woff2'),
         url('${SFProDisplayRegularWoff}') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF Pro Display';
    src: url('${SFProDisplayMediumWoff2}') format('woff2'),
         url('${SFProDisplayMediumWoff}') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF Pro Display';
    src: url('${SFProDisplaySemiboldWoff2}') format('woff2'),
         url('${SFProDisplaySemiboldWoff}') format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --color-gold-light: #FFF3D2;
    --color-silver-light: #F4F4F4;
    --color-bronze-light: #FFDAB9;
    --color-gold: #FFE26E;
    --color-silver: #CFCFCF;
    --color-bronze: #FFB265;
    --color-black: #000000;
    --color-white: #FFFFFF;
    --color-red: #FF3B3B;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${FONTS.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .grid-container {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 24px;
	}
	.center-wrapper {
		grid-column: 4 / 10;
		display: flex;
		flex-direction: column;
		gap: 8px;
    @media screen and (max-width: 1200px) {
      grid-column: 2 / 12;
    }
    @media screen and (max-width: 900px) {
      grid-column: 1 / 13; 
    }
	}
`;