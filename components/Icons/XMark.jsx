import CustomizeIcon from "./CustomizeIcon";

const XMark = () => {
  return (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  );
};

export default CustomizeIcon(XMark);
