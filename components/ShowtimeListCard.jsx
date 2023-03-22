import { Paragraph } from "./shared/Texts";

const ShowtimeListCard = ({ showtime }) => {
  return (
    <div className="h-10 w-4/6 rounded-md bg-slate-100 p-3 text-center shadow-md">
      <Paragraph size="xs" style="medium" margin="auto">
        {showtime}
      </Paragraph>
    </div>
  );
};

export default ShowtimeListCard;
