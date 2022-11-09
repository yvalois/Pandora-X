import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { contract } from '../blockchainRoutes';
import abiErc20 from '../../abi/abiERC20.json'; //Buscar
import productoMinterAbi from '../../abi/ProductoMinter.json'; //Buscar
import inversionMinterAbi from '../../abi/InversionMinter.json';
import { items } from '../../utils/constant'; //Buscar
import { setProvider } from '../../NFTROL';
const router = contract();

const USDT_ADDRESS = router.usdtContract;
const TokenPrueba_ADDRESS = router.tokenPrueba;
const PRODUCTOS_MINTER_ADDRESS = router.productoMinter;
const INVERSION_MINTER_ADDRESS = router.inversionMinter;
const RPC_URL = router.RPC_URL;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        5: RPC_URL,
      },
    },
  },
};

let Productos = [];
let Inversiones = [];

const loading = () => ({
  type: 'LOADING',
});

const dataLoaded = (payload) => ({
  type: 'DATA_LOADED',
  payload,
});

const error = (payload) => ({
  type: 'ERROR',
  payload,
});

const updateBalance = (payload) => ({
  type: 'UPDATE_BALANCE',
  payload,
});

const userChange = () => ({
  type: 'USER_CHANGE',
});

const adminChange = () => ({
  type: 'ADMIN_CHANGE',
});

export const connectSuccessToMongo = (payload) => {
  return {
    type: 'CONNECT_TO_MONGO',
    payload: payload,
  };
};
export const disconectWallet = () => {
  return {
    type: 'DISCONECT_WALLET',
  };
};

export const register = () => {
  return {
    type: 'REGISTER',
  };
};

const subscribeProvider = (connection) => async (dispatch) => {
  connection.on('close', () => {
    dispatch(disconectWallet());
  });

  connection.on('accountsChanged', async (accounts) => {
    if (accounts?.length) {
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      //const usdtContract = new ethers.Contract(USDT_ADDRESS, abiErc20, signer);
      //const tokenContract = new ethers.Contract(TokenPrueba_ADDRESS, abiErc20, signer);
      const productoMinterContract = new ethers.Contract(
        PRODUCTOS_MINTER_ADDRESS,
        productoMinterAbi,
        signer
      );
      const inversionMinterContract = new ethers.Contract(
        INVERSION_MINTER_ADDRESS,
        inversionMinterAbi,
        signer
      );

      const nftpBalance = await productoMinterContract.getMyInventory(
        accounts[0]
      );
      const nftiBalance = await inversionMinterContract.getMyInventory(
        accounts[0]
      );

      const inventoryp = [];
      const inventoryi = [];

      nftpBalance.map((item) => {
        // if inventory id in items push to inventory
        if (items[item]) {
          inventoryp.push(items[item.id]);
        }
      });

      nftiBalance.map((item) => {
        // if inventory id in items push to inventory
        if (items[item]) {
          inventoryi.push(items[item.id]);
        }
      });

      const accountAddress = accounts[0];

      dispatch(
        updateBalance({
          accountAddress: accountAddress,
          //busdBalance: balanceFormat,
          //usdtBalance: balanceFormat2,
          inventoryp,
          inventoryi,
        })
      );
      dispatch(userChange());
      dispatch(adminChange());
    } else {
      dispatch(disconectWallet());
    }
  });
};

const getProductos = async () => {
  fetch(`${process.env.BACKEND_API}/getProducto`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      Productos = response;
    })
    .catch((error) => console.error('Error:', error));
};

const getInversiones = async () => {
  fetch(`${process.env.BACKEND_API}/getInversion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      Inversiones = response;
    })
    .catch((error) => console.error('Error:', error));
};

const conectar = (accountAddress) => async (dispatch) => {
  fetch(`${process.env.BACKEND_API}/login/${accountAddress}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response !== null) {
        dispatch(
          connectSuccessToMongo({
            rol: response.Rol,
            nombre: response.Nombre,
          })
        );
      } else {
        dispatch(register());
      }
    });
};

export const connectWallet = () => async (dispatch) => {
  dispatch(loading());
  try {
    const web3Modal =
      typeof window !== 'undefined' &&
      new Web3Modal({
        cacheProvider: true,
      });

    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    setProvider(provider);
    const signer = provider.getSigner();

    const accounts = await provider.listAccounts();

    const networkId = await provider.getNetwork();

    if (1 == 1) {
      const usdtContract = new ethers.Contract(USDT_ADDRESS, abiErc20, signer);
      const tokenContract = new ethers.Contract(
        TokenPrueba_ADDRESS,
        abiErc20,
        signer
      );

      const productoMinterContract = new ethers.Contract(
        PRODUCTOS_MINTER_ADDRESS,
        productoMinterAbi,
        signer
      );

      const inversionMinterContract = new ethers.Contract(
        INVERSION_MINTER_ADDRESS,
        inversionMinterAbi,
        signer
      );

      await getProductos();
      await getInversiones();

      const nftpBalance = await productoMinterContract.getMyInventory(
        accounts[0]
      );
      const nftiBalance = await inversionMinterContract.getMyInventory(
        accounts[0]
      );

      const inventoryp = [];
      const inventoryi = [];

      nftpBalance.map((item) => {
        // if inventory id in items push to inventory
        if (Productos[item]) {
          inventoryp.push(items[item]);
        }
      });

      nftiBalance.map((item) => {
        // if inventory id in items push to inventory
        if (Inversiones[item]) {
          inventoryi.push(items[item]);
        }
      });

      //const usdtBalance = await usdtContract.balanceOf(accounts[0]);
      //const tokenBalance = await tokenContract.balanceOf(accounts[0]);

      //const balanceFormat = ethers.utils.formatUnits(usdtBalance, 6);|
      //const balanceFormat2 = ethers.utils.formatUnits(tokenBalance, 18);

      dispatch(subscribeProvider(instance));
      await dispatch(
        dataLoaded({
          usdtContract,
          tokenContract,
          productoMinter: productoMinterContract,
          inversionMinter: inversionMinterContract,
          accountAddress: accounts[0],
          //usdtBalance: balanceFormat,
          //tokenBalance: balanceFormat2,
          inventoryp: inventoryp,
          inventoryi: inventoryi,
          instance: instance,
        })
      );
      dispatch(conectar(accounts[0]));

      /*instance.on('close',() => {
      web3Modal && web3Modal.clearCachedProvider();
      dispatch(disconectWallet())
  });*/

      //esto se llama desde el use-connect

      /* instance.on('accountsChanged', async (accounts) => {

     // const usdtBalance = await usdtContract.balanceOf(accounts[0]);
      //const tokenBalance = await tokenContract.balanceOf(accounts[0]);
      const nftBalance = await nudaraMinterContract.getMyInventory(accounts[0]);
      const inventory = [];
      nftBalance.map((item) => {
        // if inventory id in items push to inventory
        if (items[item]) {
          inventory.push(items[item.id]);
        }
      });

      const accountAddress = accounts[0];

      //const balanceFormat = ethers.utils.formatUnits(tokenBalance, 18);
      //const balanceFormat2 = ethers.utils.formatUnits(usdtBalance, 6);

      dispatch(
        updateBalance({
          accountAddress:accountAddress ,
          //busdBalance: balanceFormat,
          //usdtBalance: balanceFormat2,
          inventory,
        })
      );
      dispatch(userChange());
      dispatch(adminChange());
    });*/
    } else {
      if (process.env.NODE_ENV === 'production') {
        try {
          await provider.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${Number(5).toString(16)}` }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await provider.provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: `0x${Number(5).toString(16)}`,
                    chainName: 'Red de prueba Goerli',
                    nativeCurrency: {
                      name: 'Red de prueba Goerli',
                      symbol: 'GoerliETH',
                      decimals: 18,
                    },
                    rpcUrls: [RPC_URL],
                    blockExplorerUrls: [
                      'https://eth-goerli.g.alchemy.com/v2/__HJ4LpJdyM1YHBkGqQf9-SRJ1ZVjP0s',
                    ],
                  },
                ],
              });
            } catch (addError) {
              console.log(addError);
            }
          }
        }
      }
      if (process.env.NODE_ENV === 'development') {
        try {
          await provider.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${Number(5).toString(16)}` }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await provider.provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: `0x${Number(5).toString(16)}`,
                    chainName: 'Red de prueba Goerli',
                    nativeCurrency: {
                      name: 'Red de prueba Goerli',
                      symbol: 'GoerliETH',
                      decimals: 18,
                    },
                    rpcUrls: [RPC_URL],
                    blockExplorerUrls: [
                      'https://eth-goerli.g.alchemy.com/v2/__HJ4LpJdyM1YHBkGqQf9-SRJ1ZVjP0s',
                    ],
                  },
                ],
              });
            } catch (addError) {
              console.log(addError);
            }
          }
        }
      }
    }
  } catch (err) {
    dispatch(error(err));
  }
};
