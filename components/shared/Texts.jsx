export const Title = ({ text, isLoading }) => {
  return isLoading ? (
    <TitleLoading />
  ) : (
    <h1 className="font-poppins font-medium text-sm tracking-wide">{text}</h1>
  );
};

const TitleLoading = () => {
  return <div className="w-3/6 h-8 bg-slate-500 rounded-md animate-pulse" />;
};
