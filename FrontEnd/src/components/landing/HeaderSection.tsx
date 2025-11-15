interface HeaderProps {
  title: string;
  loginText: string;
  loginHref: string;
  registerText: string;
  registerHref: string;
}

const Header = ({
  title,
  loginText,
  loginHref,
  registerText,
  registerHref,
}: HeaderProps) => {
  const navButtonClass =
    "btn btn-outline btn-primary text-sm normal-case px-4 h-10 hover:bg-primary hover:text-white transition";

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-800 sticky top-0 z-50 gap-3 md:gap-0">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>

      <div className="flex flex-col md:flex-row gap-3 mt-2 md:mt-0 w-full md:w-auto">
        <a href={loginHref} className="w-full md:w-auto">
          <button className={`${navButtonClass} w-full md:w-auto`}>{loginText}</button>
        </a>
        <a href={registerHref} className="w-full md:w-auto">
          <button className={`${navButtonClass} w-full md:w-auto`}>{registerText}</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
