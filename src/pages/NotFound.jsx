const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080817] text-white">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="mt-4 text-gray-400">Oops! Page not found.</p>
      <a href="/" className="mt-6 text-blue-400">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;