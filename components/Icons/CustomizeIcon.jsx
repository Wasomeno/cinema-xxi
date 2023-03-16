const CustomizeIcon = (Icon) => {
  const CustomizedIcon = ({ size, color }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={
          "w-" +
          (size ? size : "6") +
          " " +
          "h-" +
          (size ? size : "6") +
          " " +
          "mx-auto" +
          " " +
          color
        }
      >
        <Icon />
      </svg>
    );
  };
  return CustomizedIcon;
};

export default CustomizeIcon;
