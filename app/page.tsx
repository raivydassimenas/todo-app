import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <p>
        You have to sign in
      </p>
    );
  }

  return (
    <p>This is the main page</p>
  );
}
