import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button/button';
import { useModal } from '@/components/modal-views/context';
import { WalletContext } from '@/lib/hooks/use-connect';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const AdminPanelPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(7);
  const [pages, setPages] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const lastUserIndex = currentPage * userPerPage;
  const firstUserIndex = lastUserIndex - userPerPage;
  const { openModal } = useModal();
  const Usuario = useSelector((state: any) => state.Usuario);

  const currentUser = userData.slice(firstUserIndex, lastUserIndex);

  const getUsers = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getUsers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setUserData(response);
      });
  };

  const Setter = (tipo) => {
    if (tipo == 'mas' && currentPage < pages.length) {
      const set = currentPage + 1;
      setCurrentPage(set);
      console.log(currentUser);
    } else if (tipo !== 'mas') {
      if (currentPage > 1) {
        const _set = currentPage - 1;
        setCurrentPage(_set);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(currentUser);
    if (pages.length == 0) {
      for (let i = 1; i <= Math.ceil(userData.length / userPerPage); i++) {
        pages.push(i);
        console.log(pages);
      }
    }
  }, [userData]);

  const openM = (add, action) => {
    window.localStorage.setItem('Add', add);
    window.localStorage.setItem('Action', action);
    openModal('BAN');
  };

  const openMC = (add) => {
    window.localStorage.setItem('CHA', add);
    openModal('CHANGE');
  };

  useEffect(() => {
    if (Usuario.rol !== 'Admin') {
      window.location.href = '/';
    }
  });

  const search = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (busqueda) => {
    var resultadoBusqueda = userData.filter((elemento) => {
      if (
        elemento.Address.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Nombre.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUserData(resultadoBusqueda);

    if (busqueda.length == 0) {
      getUsers();
    }
  };

  const { isConnect } = useSelector((state) => state.blockchain);

  const { disconnectWallet } = useContext(WalletContext);
  useEffect(() => {
    if (!isConnect) {
      disconnectWallet();
    }
  }, []);

  return (
    <>
      <NextSeo
        title="Panel de control"
        description="Administracion de Usuarios"
      />

      <form>
        <label
          for="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="row flex w-full justify-center">
          <div className="mb-10 flex  w-[40%]">
            <input
              onChange={(e) => search(e)}
              type="search"
              id="default-search"
              className="block h-12 w-full border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Buscar Address"
            />
            <Button
              onClick={() => alert('Buscando Address,' + busqueda)}
              className="font-small rounded-tl-sm  rounded-bl-sm px-4 py-2 text-sm focus:outline-none focus:ring-4 "
            >
              Search
            </Button>
          </div>
        </div>
      </form>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="w-full table-auto ">
                <thead className="border-b">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Address</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Ban Wallet</th>
                    <th scope="col">Cambiar Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser.map((item, index) => (
                    <tr key={index} className=" border-b ">
                      <td
                        key={index}
                        className=" whitespace-nowrap py-4 text-center text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {item.Nombre}
                      </td>
                      <td
                        key={index}
                        className=" whitespace-nowrap py-4 text-center text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {item.Address}
                      </td>
                      <td
                        key={index}
                        className="whitespace-nowrap py-4 text-center text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {item.Rol}
                      </td>
                      <td
                        key={index}
                        className=" whitespace-nowrap py-4 text-center text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {!item.Ban ? (
                          <Button onClick={() => openM(item.Address, 'ban')}>
                            {' '}
                            Ban{' '}
                          </Button>
                        ) : (
                          <Button onClick={() => openM(item.Address, 'unban')}>
                            {' '}
                            UnBan{' '}
                          </Button>
                        )}{' '}
                      </td>
                      <td
                        key={index}
                        className=" whitespace-nowrap py-4 text-center text-sm font-medium text-gray-900 dark:text-white"
                      >
                        <Button onClick={() => openMC(item.Address)}>
                          {' '}
                          Change rol{' '}
                        </Button>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="inline-flex items-center -space-x-px">
          <li onClick={() => Setter('menos')}>
            <a
              href="#"
              className="ml-0 block rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          {pages.map((item, index) => (
            <li key={index}>
              <p
                onClick={() => setCurrentPage(item)}
                className="cursor-pointer border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {item}
              </p>
            </li>
          ))}

          <li onClick={() => Setter('mas')}>
            <a
              href="#"
              className="block rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

AdminPanelPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AdminPanelPage;
