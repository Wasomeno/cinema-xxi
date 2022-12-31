export const FormContainer = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col justify-start items-center gap-5"
    >
      {children}
    </form>
  );
};

export const FormInput = ({ type, width, value, onChange }) => {
  return (
    <input
      type={type}
      value={value}
      className={
        (width ? "w-" + width : "w-3/6") +
        " h-8 p-2 font-poppins text-center border border-slate-500 rounded-lg text-sm"
      }
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export const FormSubmit = ({ width, value }) => {
  return (
    <input
      type="submit"
      value={value}
      className={
        (width ? "w-" + width : "w-full") +
        " text-white font-poppins bg-slate-900 font-medium text-sm p-2 rounded-lg"
      }
    />
  );
};
