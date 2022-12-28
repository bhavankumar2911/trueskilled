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
      <section></section>
    </main>
  );
};

export default Login;
