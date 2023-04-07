export const Title = ({ children }) => {
  return (
    <h1 className="font-poppins text-sm font-medium tracking-wide md:text-base lg:text-lg">
      {children}
    </h1>
  );
};

export const Paragraph = ({ children, size, style, margin }) => {
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
      {children}
    </p>
  );
};

export const Subtitle = ({ children, size }) => {
  return (
    <h2
      className={
        "font-inter font-medium " + (size ? "text-" + size : "text-base")
      }
    >
      {children}
    </h2>
  );
};

const TitleLoading = () => {
  return <div className="h-8 w-3/6 animate-pulse rounded-md bg-slate-500" />;
};
