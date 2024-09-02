import Navbar from '@/components/navbar';
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const { userId } = auth();

  return (
    <main>
      {/* <Navbar /> */}
      {userId ? <p>Welcome</p> : <p>You need to sign in</p>}
    </main>
  )
}
