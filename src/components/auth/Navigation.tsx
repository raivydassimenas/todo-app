import Link from 'next/link';

interface NavigationProps {
  type: 'signin' | 'signup';
}

export default function Navigation({ type }: NavigationProps) {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      {type === 'signin' ? (
        <>
          Don't have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </>
      ) : (
        <>
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </>
      )}
    </p>
  );
}
