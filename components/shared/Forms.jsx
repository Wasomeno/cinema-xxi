export const FormContainer = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex w-full flex-col items-center justify-start gap-2"
    >
      {children}
    </form>
  );
};

export const FormTextArea = ({ id, value, setValue, width }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      className={
        "h-40 rounded-lg border border-slate-500 p-2 font-poppins text-xs lg:text-sm" +
        " " +
        "w-" +
        width
      }
    />
  );
};

export const FormInput = ({
  type,
  width,
  value,
  setValue,
  id,
  placeholder,
}) => {
  return (
    <input
      type={type}
      value={value}
      id={id}
      className={
        (width ? "w-" + width : "w-3/6") +
        " h-8 rounded-lg border border-slate-500 p-2 font-poppins text-xs lg:text-sm"
      }
      placeholder={placeholder}
      onChange={(event) => setValue(event.target.value)}
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
        " rounded-lg bg-slate-900 p-2 font-poppins text-xs font-medium text-white lg:text-sm"
      }
    />
  );
};
