import { Paragraph } from "@/components/shared/Texts";

const AdminListCard = ({ address }) => {
  return (
    <div className="flex h-12 w-4/6 items-center justify-center rounded-md bg-slate-100 p-2 shadow-sm">
      <div className="text-center">
        <Paragraph
          text={address.slice(0, 12) + "...."}
          size="sm"
          style="medium"
        />
      </div>
    </div>
  );
};

export default AdminListCard;
