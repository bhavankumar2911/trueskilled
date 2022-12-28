import React from "react";
import Logo from "../../components/utils/Logo";

const Login = () => {
  return (
    <main>
      {/* top */}
      <section className="bg-[url(/auth.jpg)] min-h-[200px] bg-no-repeat bg-center bg-cover relative after:content-[''] after:bg-black after:absolute after:inset-0 after:opacity-80 after:z-10 flex items-center justify-center">
        <div className="relative z-20">
          <Logo white={true} />
          <h2 className="text-white text-xl uppercase mt-3">login</h2>
        </div>
      </section>

      {/* bottom */}
      <section>
        <form className="w-3/4 mx-auto mt-10">
          <input
            type="email"
            name="email"
            id="email"
            className="border rounded-sm w-full hover:border-red-600 outline-none p-3"
            placeholder="Email"
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded-sm w-full hover:border-red-600 outline-none p-3"
            placeholder="Password"
          />
          <br />
          <br />
          <input
            type="submit"
            value="log in"
            className="w-full rounded-sm uppercase px-4 py-3 bg-red-600 text-white"
          />
        </form>
      </section>
    </main>
  );
};

export default Login;
