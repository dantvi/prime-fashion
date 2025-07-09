import {
  HeroWrapper,
  HeroImage,
  HeroContent,
  HeroTitle,
  HeroButton,
} from '../styles/Home.styles';

const Home = () => {
  return (
    <HeroWrapper>
      <HeroImage
        src='https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='Woman in white dress and sunglasses posing in sunlight against a rustic stone wall'
      />
      <HeroContent>
        <HeroTitle>Modern Looks for Daily Life</HeroTitle>
        <HeroButton>EXPLORE COLLECTION</HeroButton>
      </HeroContent>
    </HeroWrapper>
  );
};

export default Home;
