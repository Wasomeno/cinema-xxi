import { useRouter } from "next/router";
import { HiChevronLeft } from "react-icons/hi";

const ManagerHeader = ({ children }) => {
  const { back } = useRouter();
  return (
    <div className="flex items-center justify-start">
      <div className="space-y-1">
        <h1 className="font-poppins text-sm font-medium lg:text-xl">
          {children}
        </h1>
      </div>
    </div>
  );
};

export default ManagerHeader;
