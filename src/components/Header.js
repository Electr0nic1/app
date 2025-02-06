import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.jpg'
import AuthContext from '../AuthContext';


const Header = () => {
  const { user, logout } = useContext(AuthContext)




  return (
    <header className="bg-white border-b shadow-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-16 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <div className="hidden lg:flex lg:gap-x-12">

      {user ? (
        <>
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
        Заказ на Луне
      </Link>
      <Link to="/gagarin" className="text-sm font-semibold leading-6 text-gray-900">
        Гагарин
      </Link>
      <Link to="/missions" className="text-sm font-semibold leading-6 text-gray-900">
        Миссии
      </Link> 
      <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
        Рейсы
      </Link>
      <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
        Поиск
      </Link>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <button onClick={logout} className="text-sm font-semibold leading-6 text-gray-900">
        Выход <span aria-hidden="true">→</span>
      </button>
    </div>
        </>
      ) : (
        <>
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Авторизация
          </Link>
          <Link to="/registration" className="text-sm font-semibold leading-6 text-gray-900">
            Регистрация
          </Link>
        </>
      )}
      
      
    </div>
    
  </nav>
</header>

  );
};

export default Header;