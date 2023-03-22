import XMark from "./Icons/XMark";

const DeleteModeButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-14 w-11/12 items-center justify-evenly rounded-md bg-slate-50 p-1 text-sm shadow-md"
    >
      <span className="w-1/6">
        <XMark size="4" />
      </span>
      <span className="w-4/6 text-center">
        <p className="font-poppins text-xs">{children}</p>
      </span>
    </button>
  );
};

export default DeleteModeButton;
