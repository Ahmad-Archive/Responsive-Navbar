import { useState, useEffect } from 'react'
import "@fontsource-variable/plus-jakarta-sans"
import "@fontsource-variable/inter"
import './App.css'

const navLinks = ['Home', 'About', 'Projects', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(n => n.toLowerCase());
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sec); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <>
    <div className="bg-orb bg-orb-1" />
    <div className="bg-orb bg-orb-2" />
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">
        <h3>Ahmad - <span>Archive</span></h3>
      </div>
      <ul className="nav-links">
        {navLinks.map(item => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className={activeSection === item.toLowerCase() ? "active" : ""}
              onClick={e => { e.preventDefault(); scrollTo(item.toLowerCase()); }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={e => { e.preventDefault(); scrollTo(item.toLowerCase()); }}
          >
            {item}
          </a>
        ))}
      </div>
      </nav>
    </>
  )
}
