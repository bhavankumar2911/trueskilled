import Link from "next/link";
import React, { Fragment } from "react";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Logo from "../../utils/Logo";
import Props from "./Props";

const Auth: React.FC<Props> = ({ service }) => {
  return (
    <main className="pb-10 sm:grid sm:grid-cols-3 sm:pb-0">
      {/* top */}
      <section className="bg-[url(/auth.jpg)] min-h-[200px] bg-no-repeat bg-center bg-cover relative after:content-[''] after:bg-black after:absolute after:inset-0 after:opacity-80 after:z-10 flex items-center justify-center sm:after:content-none sm:h-screen">
        <div className="relative flex items-center z-20 sm:hidden">
          <Logo white={true} />
          <span className="bg-white block h-10 w-[1px] mx-3"></span>
          <h2 className="text-white text-xl capitalize">{service}</h2>
        </div>
      </section>

      {/* bottom */}
      <section className="sm:col-span-2 sm:h-screen sm:flex sm:items-center">
        <form className="w-3/4 mx-auto mt-10 max-w-[384px] sm:mt-0">
          <div className="hidden sm:items-center sm:flex mb-10">
            <Logo />
            <span className="bg-gray-800 block h-10 w-[1px] mx-5"></span>
            <h2 className="text-gray-800 text-xl capitalize font-semibold">
              {service}
            </h2>
          </div>
          {service == "signup" && (
            <Fragment>
              <div className="sm:grid sm:grid-cols-2 sm:gap-3">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="sm:col-span-1"
                  block
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="sm:col-span-1"
                  block
                />
              </div>
            </Fragment>
          )}
          <Input type="email" placeholder="Email" block />
          <Input type="password" placeholder="Password" block />
          {service == "signup" && (
            <Input type="password" placeholder="Repeat Password" block />
          )}
          <Button type="submit" block>
            {service == "login" ? "log in" : "sign up"}
          </Button>
          <p className="text-center text-sm mt-5 text-gray-500">
            {service == "login" ? (
              <>
                New User? <Link href="/signup">Sign up</Link>
              </>
            ) : (
              <>
                Already have an account? <Link href="/login">Log in</Link>
              </>
            )}
          </p>
        </form>
      </section>
    </main>
  );
};

export default Auth;
