import { FormInput } from "@/components/shared/Forms";

const CinemaNameInput = ({ cinemaName, setCinemaName }) => {
  return (
    <div className="flex w-7/12 flex-col items-start justify-center gap-1">
      <label id="cinemaName" className="font-poppins text-xs lg:text-sm">
        Cinema Name
      </label>
      <FormInput
        id="cinemaName"
        value={cinemaName}
        setValue={setCinemaName}
        type="text"
        width="5/6"
      />
    </div>
  );
};

export default CinemaNameInput;
