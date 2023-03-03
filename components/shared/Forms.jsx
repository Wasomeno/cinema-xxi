export const FormContainer = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex w-full flex-col items-center justify-start gap-5"
    >
      {children}
    </form>
  );
};

export const FormTextArea = ({ id, value, setValue }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      className="font-poppins h-40 w-4/6 rounded-lg border border-slate-500 p-2 text-center text-xs"
    />
  );
};

export const FormInput = ({ type, width, value, setValue, id }) => {
  return (
    <input
      type={type}
      value={value}
      id={id}
      className={
        (width ? "w-" + width : "w-3/6") +
        " font-poppins h-8 rounded-lg border border-slate-500 p-2 text-center text-sm"
      }
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
        " font-poppins rounded-lg bg-slate-900 p-2 text-xs font-medium text-white lg:text-sm"
      }
    />
  );
};
