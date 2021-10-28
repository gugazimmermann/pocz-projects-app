export function Header() {
  return (
    <header className="max-w-lg mx-auto">
      <a href={`${process.env.REACT_APP_PROJECT_APP_URL}`}>
        <h1 className="text-4xl font-bold text-white text-center tracking-wider">
          {process.env.REACT_APP_PROJECT_NAME}
        </h1>
      </a>
    </header>
  );
}

export default Header;
