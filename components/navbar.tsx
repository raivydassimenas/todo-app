import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";

import { auth } from "@/auth";


export default async function Navbar() {
  const session = await auth();

  return (
    <nav>
      {session ? <SignOut /> : <SignIn />}
    </nav>
  );
};
