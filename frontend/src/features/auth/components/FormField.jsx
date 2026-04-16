/**
 * FormField.jsx
 * Reusable labeled input field with optional error display.
 * Supports text, email, password types and an optional eye-toggle slot.
 */

/**
 * @param {object}   props
 * @param {string}   props.id          - Unique input id (for label association)
 * @param {string}   props.label       - Uppercase label text above the input
 * @param {string}   props.type        - Input type: "text" | "email" | "password"
 * @param {string}   props.name        - Input name attribute
 * @param {string}   props.value       - Controlled input value
 * @param {Function} props.onChange    - Change handler
 * @param {string}   [props.error]     - Validation error message to display
 * @param {React.ReactNode} [props.rightSlot] - Icon slot (e.g. eye-toggle button)
 */
const FormField = ({ id, label, type = "text", name, value, onChange, error, rightSlot }) => {
  return (
    <div className="relative w-full pb-4">
      {/* Field label */}
      <label htmlFor={id} className="block font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-black mb-1">{label}</label>

      {/* Input wrapper — uses relative positioning for optional right icon */}
      <div className="relative flex items-center">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full h-11 px-4 font-body text-sm font-normal text-black bg-white border-[1.5px] border-black rounded-none outline-none transition-all duration-150 placeholder:text-black/30 focus:border-[1.5px] focus:bg-cream appearance-none ${rightSlot ? "pr-12" : ""}`}
          autoComplete="off"
          spellCheck={false}
        />
        {/* Eye-toggle or other right-side icon slot */}
        {rightSlot && rightSlot}
      </div>

      {/* Inline validation error safely sitting in the pb-4 area without pushing layout */}
      {error && <p className="font-body text-[9px] font-medium tracking-[1px] uppercase text-[#CC0000] absolute bottom-0 left-0 m-0">{error}</p>}
    </div>
  );
};

export default FormField;
