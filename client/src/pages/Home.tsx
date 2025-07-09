import {
  HeroWrapper,
  HeroPictureWrapper,
  HeroContent,
  HeroTitle,
  HeroButton,
} from '../styles/Home.styles';

import heroDesktop from '../assets/hero-desktop.jpg';
import heroMobile from '../assets/hero-mobile.jpg';

const Home = () => {
  return (
    <HeroWrapper>
      <HeroPictureWrapper>
        <source srcSet={heroMobile} media='(max-width: 767px)' />
        <img
          src={heroDesktop}
          alt='Stylish women in casual clothing sitting at outdoor café'
        />
      </HeroPictureWrapper>
      <HeroContent>
        <HeroTitle>Modern Looks for Daily Life</HeroTitle>
        <HeroButton>EXPLORE COLLECTION</HeroButton>
      </HeroContent>
    </HeroWrapper>
  );
};

export default Home;
