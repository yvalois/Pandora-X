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

let Productos = [];
let Inversiones = [];
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

const getProductos = async () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL); //cambiar provider que se obtiene en NFTRO
  const productosMinter = new ethers.Contract(
    PRODUCTOS_MINTER_ADDRESS,
    productoMinterAbi,
    provider
  );
  fetch(`https://pandoraxapi1.herokuapp.com/api/getProducto`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      response.map(async (item) => {
        Productos[item.tipoN - 1] = item;
      });
      Productos.map(async (item) => {
        const precio = await productosMinter.buyPrice(item.tipoN);
        const price = ethers.utils.formatUnits(precio, 18);
        Productos[item.tipoN - 1].precio = parseInt(price);
      });
    })
    .catch((error) => console.error('Error:', error));
};

const getInversiones = async () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const inversionesMinter = new ethers.Contract(
    INVERSION_MINTER_ADDRESS,
    inversionMinterAbi,
    provider
  );
  fetch(`https://pandoraxapi1.herokuapp.com/api/getInversion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      response.map(async (item) => {
        Inversiones[item.tipoN - 1] = item;
      });
      Inversiones.map(async (item) => {
        const precio = await inversionesMinter.buyPrice(item.tipoN);
        const price = ethers.utils.formatUnits(precio, 18);
        Inversiones[item.tipoN - 1].precio = parseInt(price);
      });
    })
    .catch((error) => console.error('Error:', error));
};

export const getMintedNftProducts = () => async (dispatch) => {
  dispatch(mintedLoading());

  try {
    //Contracto del marketPlace
    //Contracto del marketPlace
    await getProductos();

    await getInversiones();

    await dispatch(
      mintedLoaded({
        productos: Productos,
        inversiones: Inversiones,
      })
    );
  } catch (error) {
    dispatch(mintedError(error.message));
  }
};
