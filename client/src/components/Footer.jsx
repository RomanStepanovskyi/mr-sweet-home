import { Logo } from './Header.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo />
        <p>Residential remodeling · Charlotte, North Carolina</p>
        <p className="footer-credit">
          © {new Date().getFullYear()} Mr. Sweet Home LLC · Site built by{' '}
          <a href="https://github.com/RomanStepanovskyi" target="_blank" rel="noreferrer">
            Roman Stepanovskyi
          </a>
        </p>
      </div>
    </footer>
  );
}
