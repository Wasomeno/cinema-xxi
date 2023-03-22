import ChevronLeft from "@/components/Icons/ChevronLeft";
import ChevronRight from "@/components/Icons/ChevronRight";

const StudioAmountInput = ({
  studioAmount,
  setStudioAmount,
  setStudioCapacities,
}) => {
  const decrementStudioAmount = () => {
    if (studioAmount <= 2) return;
    setStudioAmount((currentAmount) => currentAmount - 1);
    setStudioCapacities((currentAmount) =>
      currentAmount.filter((studio, index) => {
        return index !== studioAmount - 1;
      })
    );
  };

  const incrementStudioAmount = () => {
    if (studioAmount >= 10) return;
    setStudioAmount((currentAmount) => currentAmount + 1);
    setStudioCapacities((currentAmount) => [...currentAmount, ""]);
  };

  return (
    <div className="flex w-5/12 flex-col items-center justify-center gap-1">
      <label id="studioAmount" className="font-poppins text-xs lg:text-sm">
        Studio Amount
      </label>
      <div className="flex w-full items-center justify-center gap-1">
        <button
          type="button"
          className="rounded-lg bg-black p-1.5"
          onClick={decrementStudioAmount}
        >
          <ChevronLeft size="4" color="white" />
        </button>
        <input
          type="number"
          value={studioAmount}
          readOnly={true}
          className="h-8 w-4/12 rounded-lg border border-slate-400 p-2 text-center font-poppins text-xs"
        />
        <button
          type="button"
          className="rounded-lg bg-black p-1.5"
          onClick={incrementStudioAmount}
        >
          <ChevronRight size="4" color="white" />
        </button>
      </div>
    </div>
  );
};

export default StudioAmountInput;
