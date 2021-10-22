import styled from 'styled-components';

import bgImg from '../../assets/background.svg'

export const ContentWrapper = styled.main`
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 453px;
  column-gap: 120px;
  position: relative;
  
  /* &::before {
    content: '';
    height: 100vh;
    width: 100%;
    background: url(${bgImg}) no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    
    right: -800px;
  } */
`;