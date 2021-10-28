import { SiteRoutes } from '../../../routes';

export function Footer() {
  return (
    <footer className="max-w-lg mx-auto flex justify-center text-white">
      <a href={`${process.env.REACT_APP_PROJECT_WEB_URL}${SiteRoutes.Terms}`}>
        <span className="hover:underline">Termos</span>
      </a>
      <span className="mx-3">•</span>
      <a href={`${process.env.REACT_APP_PROJECT_WEB_URL}${SiteRoutes.Privacity}`}>
        <span className="hover:underline">Privacidade</span>
      </a>
    </footer>
  );
}

export default Footer;
