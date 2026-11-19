import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Our work' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
];

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Mr. Sweet Home — home">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M6 21 20 9l14 12" className="logo-roof" />
        <path d="M11 19v13h18V19" className="logo-walls" />
      </svg>
      <span>
        Mr. Sweet Home
        <small>Remodeling · Charlotte</small>
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo />
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>
        <nav id="site-nav" className={`nav ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a href="#quote" className="btn btn-small" onClick={close}>
            Get a quote
          </a>
        </nav>
      </div>
    </header>
  );
}
