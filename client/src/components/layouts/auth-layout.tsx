import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  // if (session) {
  // 	redirect("/");
  // }

  return (
    <main className="grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link
          to={"/"}
          className="z-20 flex items-center gap-1 text-lg font-medium"
        >
          Shortr
        </Link>
        <div className="z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Your story is unique, why shouldnt your links be.&rdquo;
            </p>
            <footer className="text-sm">Creator of Shortr</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <Outlet />
      </div>
    </main>
  );
}
