export const Title = ({ text, isLoading }) => {
  return isLoading ? (
    <TitleLoading />
  ) : (
    <h1 className="font-poppins font-medium text-sm tracking-wide">{text}</h1>
  );
};

export const Paragraph = ({ text, size, style, margin }) => {
  return (
    <p
      className={
        "font-poppins " +
        (size ? "text-" + size : "text-base") +
        " " +
        (style ? "font-" + style : "font-normal") +
        " " +
        (margin ? "m-" + margin : "m-0")
      }
    >
      {text}
    </p>
  );
};

export const Subtitle = ({ text, size }) => {
  return (
    <h2
      className={
        "font-poppins font-medium " + (size ? "text-" + size : "text-base")
      }
    >
      {text}
    </h2>
  );
};

const TitleLoading = () => {
  return <div className="w-3/6 h-8 bg-slate-500 rounded-md animate-pulse" />;
};
