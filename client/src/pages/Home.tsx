import { useNavigate } from 'react-router-dom';
import heroDesktop from '../assets/hero-desktop.jpg';
import heroMobile from '../assets/hero-mobile.jpg';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/shop');
  };

  return (
    <div className='hero-wrapper'>
      <picture className='hero-picture'>
        <source srcSet={heroMobile} media='(max-width: 767px)' />
        <img
          src={heroDesktop}
          alt='Stylish women in casual clothing sitting at outdoor café'
        />
      </picture>
      <div className='hero-content'>
        <h1 className='hero-title'>Modern Looks for Daily Life</h1>
        <button className='hero-button' onClick={handleExploreClick}>
          EXPLORE COLLECTION
        </button>
      </div>
    </div>
  );
};

export default Home;
