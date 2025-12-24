import { Link } from "react-router";

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-gray-600 mt-2">Page not found</p>

      <Link to="/dashboard" className="mt-4 text-violet-600 underline">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
