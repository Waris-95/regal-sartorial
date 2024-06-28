import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <h1 className='thanks'>Your stop by is appreciated</h1>
      <div className='contact-info'>
        <div className='other-proj'>Feel free to check out my other projects at:</div>
        <div className='links-container'>
          <a className='link' href="https://github.com/Waris-95" target="_blank" rel="noopener noreferrer">
            <FaGithub className='icon' /> 
          </a>
          <a className='link' href="https://www.linkedin.com/in/abdul-waris-aa1234aw/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className='icon' /> 
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
