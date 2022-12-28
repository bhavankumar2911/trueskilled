import Link from "next/link";
import React from "react";
import Logo from "../../components/utils/Logo";

const Login = () => {
  return (
    <main className="sm:grid sm:grid-cols-3">
      {/* top */}
      <section className="bg-[url(/auth.jpg)] min-h-[200px] bg-no-repeat bg-center bg-cover relative after:content-[''] after:bg-black after:absolute after:inset-0 after:opacity-80 after:z-10 flex items-center justify-center sm:after:content-none sm:h-screen">
        <div className="relative flex items-center z-20 sm:hidden">
          <Logo white={true} />
          <span className="bg-white block h-10 w-[1px] mx-3"></span>
          <h2 className="text-white text-xl capitalize">login</h2>
        </div>
      </section>

      {/* bottom */}
      <section className="sm:col-span-2 sm:h-screen sm:flex sm:items-center">
        <form className="w-3/4 mx-auto mt-10 max-w-[384px] sm:mt-0">
          <div className="hidden sm:items-center sm:flex mb-10">
            <Logo />
            <span className="bg-gray-800 block h-10 w-[1px] mx-5"></span>
            <h2 className="text-gray-800 text-xl capitalize font-semibold">
              login
            </h2>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="border rounded-sm w-full hover:border-gray-400 outline-none p-2"
            placeholder="Email"
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded-sm w-full hover:border-gray-400 outline-none p-2"
            placeholder="Password"
          />
          <br />
          <br />
          <button
            className="w-full rounded-sm capitalize px-4 py-2 text-sm font-semibold bg-green-500 text-white hover:bg-indigo-900 transition"
            type="submit"
          >
            log in
          </button>
          <p className="text-center text-sm mt-5 text-gray-500">
            New user? <Link href="/">Sign Up</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
