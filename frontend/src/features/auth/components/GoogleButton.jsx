/**
 * GoogleButton.jsx
 * Google OAuth sign-in/sign-up button that strictly follows Google's
 * official branding guidelines (white bg, Google G logo, Roboto font, #3c4043 text).
 *
 * Props:
 * @param {Function} props.onClick - Handler for button click (leave empty — backend handles OAuth)
 */

const GoogleButton = ({ onClick }) => {
  return (
    /* Google-spec button: white bg, #dadce0 border, Roboto font */
    <button
      type="button"
      id="google-auth-btn"
      className="flex items-center justify-center w-full h-[44px] px-5 bg-white text-[#3c4043] border border-[#dadce0] rounded-none font-google text-sm font-medium cursor-pointer gap-3 transition-shadow duration-150 hover:shadow-[0_1px_8px_rgba(0,0,0,0.15)] active:bg-[#f8f9fa]"
      onClick={onClick}
      aria-label="Continue with Google"
    >
      {/* Official Google 4-color "G" SVG logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="20"
        height="20"
        aria-hidden="true"
      >
        <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 7.9 2.9l5.9-5.9C34.3 3.5 29.5 1.5 24 1.5 14.8 1.5 7 7.4 3.8 15.5l6.9 5.4C12.3 14.6 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v8.6h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.3 37 46.5 31 46.5 24z" />
        <path fill="#FBBC05" d="M10.7 28.5A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.1.8-4.5l-6.9-5.4A22.5 22.5 0 0 0 1.5 24c0 3.6.9 7 2.4 9.9l6.8-5.4z" />
        <path fill="#34A853" d="M24 46.5c5.4 0 9.9-1.8 13.2-4.8l-7.5-5.8c-1.8 1.2-4.1 1.9-5.7 1.9-6.3 0-11.7-5.1-13.3-11.4l-6.9 5.4C7 40.6 14.8 46.5 24 46.5z" />
        <path fill="none" d="M1.5 1.5h45v45h-45z" />
      </svg>

      {/* Button text — Roboto is specified in Google's brand guidelines */}
      <span style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, fontSize: "14px", color: "#3c4043" }}>
        Continue with Google
      </span>
    </button>
  );
};

export default GoogleButton;
