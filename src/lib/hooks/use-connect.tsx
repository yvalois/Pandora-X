import { useEffect, useState, createContext, ReactNode } from 'react';

import { ethers } from 'ethers';
//import { setProvider } from '../../NFTROL';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useDispatch, useSelector } from 'react-redux';

import {
  connectWallet,
  disconectWallet,
} from '../../redux/Blockchain/blockchainAction';
import { useDisconnect } from 'wagmi';

const web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';

export const WalletContext = createContext<any>({});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [rol, setRol] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  //const Usuario = useSelector((state: any) => state.Usuario);

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          5: 'https://eth-goerli.g.alchemy.com/v2/__HJ4LpJdyM1YHBkGqQf9-SRJ1ZVjP0s',
        },
      },
    },
  };

  //agregar provider options

  const { accountAddress, isUSer } = useSelector((state) => state.blockchain);

  /* This effect will fetch wallet address if user has already connected his/her wallet */
  useEffect(() => {
    async function checkConnection() {
      try {
        if (window && window.ethereum) {
          // Check if web3modal wallet connection is available on storage
          if (localStorage.getItem(web3modalStorageKey)) {
            await connectToWallet();
          }
        } else {
          console.log('window or window.ethereum is not available');
        }
      } catch (error) {
        console.log(error, 'Catch error Account is not connected');
      }
    }
    checkConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*const setWalletAddress = async (provider: any) => {
    try {
      const signer = provider.getSigner();
      if (signer) {
        const web3Address = await signer.getAddress();
        setAddress(web3Address);
        console.log(address);
        await conectar(web3Address);

        getBalance(provider, web3Address);
      }
    } catch (error) {
      console.log(
        'Account not connected; logged from setWalletAddress function'
      );
    }
  };*/

  //wallet address saldra

  /*const conectar = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API }/login/${accountAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response !== null) {
          console.log(response);
          connectToMongo(response.Rol, response.Nombre);
        } else {
          connectToMongo('usuario', 'usuario');
        }
      });
  };*/

  /*const disconect = () => {
    dispatch(disconectWallet());
  };*/

  /*const connectBLockchain = (p) => {
    dispatch(connectBLockchain(p));
    console.log('e');
  };*/

  /*const connect = (cuenta: string) => {
    dispatch(
      connectSuccess({
        account: cuenta,
        //web3: web3Modal,
      })
    );

    Usuario.account;
  };*/

  /* const connectToMongo = (_rol: string, _nombre: string) => {
    dispatch(
      connectSuccessToMongo({
        rol: _rol,
        nombre: _nombre,
      })
    );
  };*/

  /*const getBalance = async (provider: any, walletAddress: string) => {
    const walletBalance = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(walletBalance);
    setBalance(balanceInEth);
  };*/

  const { disconnect } = useDisconnect();

  const disconnectWallet = async () => {
    //setAddress('');
    disconnect();
    /*  window.localStorage.removeItem('wagmi.cache');
    window.localStorage.removeItem('wagmi.wallet');
    window.localStorage.removeItem('wagmi.store');
    window.localStorage.removeItem('wagmi.connected');
    window.localStorage.removeItem('wagmi.injected.shimDisconnect');    */

    await dispatch(disconectWallet());
    //disconect();
  };

  /*const checkIfExtensionIsAvailable = () => {
    if (
      (window && window.web3 === undefined) ||
      (window && window.ethereum === undefined)
    ) {
      setError(true);
      web3Modal && web3Modal.toggleModal();
    }
  };*/
  // seteamos el provider
  const connectToWallet = async () => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${Number(137).toString(16)}` }],
    });
    //request();

    try {
      setLoading(true);
      //checkIfExtensionIsAvailable();
      await dispatch(connectWallet());
      setLoading(false);
      setAddress(accountAddress);
      //conectar()
      /*const connection = web3Modal && (await web3Modal.connect());
      const provider = new ethers.providers.Web3Provider(connection);
      await subscribeProvider(connection);

      setProvider(provider);
      setWalletAddress(provider);

      connect(address);
      dispatch(connectWalletToBLock(provider))
      */
    } catch (error) {
      setLoading(false);
      console.log(
        error,
        'got this error on connectToWallet catch block while connecting the wallet'
      );
    }
  };

  /*const subscribeProvider = async (connection: any) => {
    connection.on('close', () => {
      disconnectWallet();
    });
    connection.on('accountsChanged', async (accounts: string[]) => {
      if (accounts?.length) {
        setAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(connection);
        getBalance(provider, accounts[0]);
        connect(accounts[0]);
      } else {
        disconnectWallet();
      }
    });
  };*/

  return (
    <WalletContext.Provider
      value={{
        balance,
        loading,
        error,
        connectToWallet,
        disconnectWallet,
        isUSer,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

WalletContext.displayName = 'use-connect';
