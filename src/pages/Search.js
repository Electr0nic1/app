import React, { useState } from 'react';
import api from '../api';
import Header from '../components/Header';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await api.search(searchTerm);
      console.log(results)
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setError('Произошла ошибка при выполнении поиска.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSearch}>
            <div>
              <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
                Поиск
              </label>
              <div className="mt-2">
                <input
                  id="search"
                  onChange={handleSearchTermChange}
                  name="search"
                  type="search"
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Найти
              </button>
            </div>
          </form>
          <div className="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
            {searchResults &&
              Array.isArray(searchResults) &&
              searchResults.map((result) => (
                <div key={result.name} className="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
                  <div className="flex justify-between w-full items-center p-6">
                    <h2 className="text-base font-semibold leading-7 text-sky-600 text-xl">
                      Название миссии: {result.name}
                    </h2>
                  </div>
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100 p-4">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Тип</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {result.type}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Дата запуска
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {result.launch_date}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Дата посадки
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {result.landing_date}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Место посадки
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {result.landing_site.name}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Широта места посадки
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {result.landing_site.coordinates.latitude}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Долгота места посадки
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {result.landing_site.coordinates.longitude}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="p-4">
                    Экипаж:
                    {result.crew.map((member) => (
                      <div key={member.name}>
                        <p className="mr-2">ФИО - {member.name}</p>
                        <p className="mr-2">Роль -  {member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
