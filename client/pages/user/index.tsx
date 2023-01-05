import React from "react";
import UserPageLayout from "../../components/user/Template";
import UserProvider from "../../providers/User";

const User = () => {
  return (
    <UserProvider>
      <UserPageLayout />
    </UserProvider>
  );
};

export default User;
