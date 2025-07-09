import styled from 'styled-components';

export const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HeroContent = styled.div`
  position: absolute;
  top: 340px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeroTitle = styled.h1`
  font-family: 'Bodoni Moda', serif;
  font-size: 38.66px;
  font-style: italic;
  font-weight: bold;
  line-height: 43.5px;
  letter-spacing: 1.21px;
  color: #333333;
  opacity: 0.7;
  text-transform: uppercase;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroButton = styled.button`
  width: 253px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fcfcfc;
  border: none;
  border-radius: 30px;

  font-family: 'Tenor Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  cursor: pointer;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
