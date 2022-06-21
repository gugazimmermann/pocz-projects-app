export function Header() {
  return (
    <header className="max-w-lg mx-auto">
      <a href={`${process.env.REACT_APP_PROJECT_APP_URL}`}>
        <div className="flex flex-row justify-center items-center">
          <img src="/logo64.png" alt="logo" />
          <h1 className="text-4xl font-bold text-white text-center tracking-wider">
            {process.env.REACT_APP_PROJECT_NAME}
          </h1>
        </div>
      </a>
    </header>
  );
}

export default Header;
