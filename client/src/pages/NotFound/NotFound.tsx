import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';

function NotFound() {
  return (
    <div className="h-screen bg-gray-50">
      <div className="p-8 flex flex-col items-center justify-center relative top-36">
        <h1 className="text-7xl font-bold text-slate-500">Page Not Found</h1>
        <div className="my-10 text-2xl text-center max-w-4xl leading-relaxed text-slate-900">
          <p>We couldn't find what you were looking for.</p>
          <p>
            Please contact the owner of the site that linked you to the original
            URL and let them know their link is broken.
          </p>
        </div>
        <Link to="/">
          <img src={logo} title="Go Home" alt="tawredaat" className="w-32" />
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
