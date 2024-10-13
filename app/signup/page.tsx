import SignupForm from "./SignupForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <SignupForm />
      </div>
    </div>
  );
}