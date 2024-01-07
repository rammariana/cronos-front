import { useContext } from 'react';
import { Color } from '../App';
import './Footer.css';

function Footer() {
  const { appcolor } = useContext(Color);

  return (
    <>
      <footer className={appcolor}>Footer</footer>
    </>
  );
}
export default Footer;
