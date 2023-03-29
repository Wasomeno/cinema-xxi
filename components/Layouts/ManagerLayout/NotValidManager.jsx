import Link from "next/link";

const NotValidManager = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-50 bg-opacity-95 dark:bg-slate-800">
      <div className="text-center">
        <h1 className="font-poppins font-medium lg:text-lg">
          You&lsquo;re not a manager
        </h1>
      </div>
      <p className="text-light font-poppins text-xs lg:text-base">
        Please go back to the app page.
      </p>
      <Link
        href="/app"
        className="rounded-md bg-slate-800 p-2 px-4 font-poppins text-sm text-white dark:bg-slate-700"
      >
        Back to App
      </Link>
    </main>
  );
};

export default NotValidManager;
