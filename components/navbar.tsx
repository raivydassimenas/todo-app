import { auth, currentUser } from '@clerk/nextjs/server';
import SignIn from './sign-in';
import SignOut from "./sign-out";

export default async function Navbar() {
  const { userId } = auth();

  return (
    <nav>
      {userId ? <SignOut /> : <SignIn />}
    </nav>
  );
};
