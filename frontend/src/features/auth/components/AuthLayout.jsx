/**
 * AuthLayout.jsx
 * Shared page shell for all auth screens.
 * Renders the top nav bar (CL monogram + nav link) and centers the form body.
 */

import { Link } from "react-router-dom";

/**
 * @param {object}  props
 * @param {string}  props.navLinkTo   - Route path for the top-right nav link
 * @param {string}  props.navLinkText - Plain text (e.g. "Already have an account?")
 * @param {string}  props.navLinkCta  - Bold CTA portion of the nav link (e.g. "LOGIN")
 * @param {React.ReactNode} props.children - The form content to render in the body
 */
const AuthLayout = ({ navLinkTo, navLinkText, navLinkCta, children }) => {
  return (
    <div className="h-screen overflow-hidden bg-cream flex flex-col relative">

      {/* ── Top Navigation Bar ── */}
      <nav className="flex items-center justify-between px-12 h-16 shrink-0 z-10">
        {/* Brand monogram — links to home */}
        <Link to="/" className="font-body font-bold text-lg tracking-[0.2em] uppercase text-black flex items-center relative z-10">
          CL
        </Link>

        {/* Top-right navigation text link */}
        <Link to={navLinkTo} className="font-body text-[11px] font-medium tracking-[0.25em] uppercase text-black transition-colors duration-150 group">
          {navLinkText}&nbsp;<span className="font-bold group-hover:underline group-hover:decoration-accent group-hover:underline-offset-2">{navLinkCta}</span>
        </Link>
      </nav>

      {/* ── Centered Form Body ── */}
      <main className="flex-1 overflow-y-auto flex flex-col p-6 relative z-0">
        {children}
      </main>

    </div>
  );
};

export default AuthLayout;
