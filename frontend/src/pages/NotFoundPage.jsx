import { Link } from "react-router-dom";
import { HiOutlineFaceFrown } from "react-icons/hi2";

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-6 text-center dark:bg-gray-950">
    <HiOutlineFaceFrown size={56} className="text-primary-500" />
    <h1 className="text-4xl font-extrabold">404</h1>
    <p className="max-w-sm text-gray-500">
      The page you&apos;re looking for doesn&apos;t exist or may have been moved.
    </p>
    <Link to="/" className="btn-primary">
      Back to Home
    </Link>
  </div>
);

export default NotFoundPage;
