import Link from "next/link";

const NotValidManager = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="font-poppins text-lg font-medium">
          You&lsquo;re not a manager
        </h1>
      </div>

      <Link
        href="/app"
        className="rounded-md bg-slate-900 p-2 px-4 font-poppins text-sm text-white"
      >
        Back to App
      </Link>
    </main>
  );
};

export default NotValidManager;
