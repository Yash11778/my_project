import { Link } from "react-router-dom";

const HamburgerMenu = ({ openNavigation, navigation, handleClick }) => {
  return (
    <div className="flex flex-col h-[calc(100vh-100px)] lg:hidden p-6 bg-n-8">
      <ul className="flex flex-col gap-4">
        {navigation.map((item) => (
          <li key={item.id} className="py-3">
            {item.url.startsWith("/") ? (
              <Link
                to={item.url}
                className="text-xl font-code text-n-1 hover:text-color-1 transition-colors"
                onClick={handleClick}
              >
                {item.title}
              </Link>
            ) : (
              <a
                href={item.url}
                className="text-xl font-code text-n-1 hover:text-color-1 transition-colors"
                onClick={handleClick}
              >
                {item.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HamburgerMenu;
