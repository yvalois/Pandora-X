import { ethers } from 'ethers';
import productoMinterAbi from '../../abi/ProductoMinter.json'; //Buscar
import inversionMinterAbi from '../../abi/InversionMinter.json'; //Buscar
import { contract } from '../blockchainRoutes';
import { items } from '../../utils/constant'; //Buscar
import { provider } from '@/NFTROL';
//import {provider} from "../../NFTROL"

const ROUTER = contract();
const RPC_URL = ROUTER.RPC_URL;
const PRODUCTOS_MINTER_ADDRESS = ROUTER.productoMinter;
const INVERSION_MINTER_ADDRESS = ROUTER.inversionMinter;

const mintedLoading = () => ({
  type: 'MINTED_LOADING',
});

const mintedLoaded = (payload) => ({
  type: 'MINTED_LOADED',
  payload,
});

const mintedError = (payload) => ({
  type: 'MINTED_ERROR',
  payload,
});

let Productos = [];
let Inversiones = [];

/*export const CrearProducto = async(objeto)=>{
    fetch(`${process.env.BACKEND_API}/api/CrearNftProducto`, {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('listo Producto');
        console.log(value);
      })
      .catch((error) => console.error('Error:', error));
  } 

export const CrearInversion = async(objeto)=>{
    fetch(`${process.env.BACKEND_API}/api/CrearNftInversion`, {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('listo Producto');
        console.log(value);
      })
      .catch((error) => console.error('Error:', error));
  } 

  const getProductos = async()=>{
    fetch(`${process.env.BACKEND_API}/api/getProducto`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        Productos = response
      })
      .catch((error) => console.error('Error:', error));
  }*/

const getProductos = async () => {
  fetch(`${process.env.BACKEND_API}/getProducto`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      Productos = data;
    });
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

export const getMintedNftProducts = () => async (dispatch) => {
  dispatch(mintedLoading());

  try {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL); //cambiar provider que se obtiene en NFTRO
    const productosMinter = new ethers.Contract(
      PRODUCTOS_MINTER_ADDRESS,
      productoMinterAbi,
      provider
    ); //Contracto del marketPlace
    const inversionesMinter = new ethers.Contract(
      INVERSION_MINTER_ADDRESS,
      inversionMinterAbi,
      provider
    ); //Contracto del marketPlace
    const mintedNftProductos = await productosMinter.getNftInContract();
    const mintedNftInversiones = await inversionesMinter.getNftInContract();

    const disponibleNftp = [];
    const mintedNftpArray = [];
    const disponibleNfti = [];
    const mintedNftiArray = [];

    await getProductos();
    await getInversiones();

    mintedNftProductos.map((item) => {
      mintedNftpArray.push(parseInt(item));
    });

    mintedNftInversiones.map((item) => {
      mintedNftiArray.push(parseInt(item));
    });

    Productos.map((item) => {
      if (mintedNftpArray.includes(item.number)) {
        //si no lo tiene los manda
        disponibleNftp.push(item);
      }
    });

    Inversiones.map((item) => {
      if (mintedNftiArray.includes(item.number)) {
        //si no lo tiene los manda
        disponibleNfti.push(item);
      }
    });

    const nftPrice = await productosMinter.getPricePlusFee();
    const priceFormat = parseFloat(
      ethers.utils.formatUnits(nftPrice, 18)
    ).toFixed(2);
    dispatch(
      mintedLoaded({
        disponibleNftp,
        mintedNftProductos,
        disponibleNfti,
        mintedNftInversiones,
        priceFormat,
      })
    );
  } catch (error) {
    dispatch(mintedError(error.message));
  }
};

export const MintProducts = (supply) => async (dispatch) => {
  dispatch(mintedLoading());
  dispatch(mintedLoading());

  try {
    /*const provider = new ethers.providers.JsonRpcProvider(
      RPC_URL
    );*/ //cambiar provider que se obtiene en NFTRO

    const signer = provider.getSigner();

    const productoMinter = new ethers.Contract(
      PRODUCTOS_MINTER_ADDRESS,
      productoMinterAbi,
      signer
    );

    const tx = await productoMinter.Mint(supply);
  } catch (error) {
    dispatch(mintedError(error.message));
  }
};

export const MintInversion = (supply) => async (dispatch) => {
  dispatch(mintedLoading());
  dispatch(mintedLoading());

  try {
    /*const provider = new ethers.providers.JsonRpcProvider(
      RPC_URL
    );*/ //cambiar provider que se obtiene en NFTRO
    const signer = provider.getSigner();
    const inversionMinter = new ethers.Contract(
      INVERSION_MINTER_ADDRESS,
      inversionMinterAbi,
      signer
    );
    const tx = await inversionMinter.Mint(supply);
  } catch (error) {
    dispatch(mintedError(error.message));
  }
};
