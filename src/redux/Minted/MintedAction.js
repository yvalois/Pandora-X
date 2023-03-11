import { ethers } from 'ethers';
import productoMinterAbi from '../../abi/ProductoMinter.json'; //Buscar
import inversionMinterAbi from '../../abi/InversionMinter.json'; //Buscar
import { contract } from '../blockchainRoutes';
import { items } from '../../utils/constant'; //Buscar
import { provider } from '@/NFTROL';
//import {provider} from "../../NFTROL"
import frenchiesAbi from '../../abi/FrenchiesBlues.json';

const ROUTER = contract();
const RPC_URL = ROUTER.RPC_URL;
const PRODUCTOS_MINTER_ADDRESS = ROUTER.productoMinter;
const INVERSION_MINTER_ADDRESS = ROUTER.inversionMinter;

let Productos = [];
let Inversiones = [];
let nfts = new Map();

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

const upfrench = (payload) => ({
  type: 'UPDATE_FRENCH',
  payload,
});

const getProductos = async () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL); //cambiar provider que se obtiene en NFTRO
  const productosMinter = new ethers.Contract(
    PRODUCTOS_MINTER_ADDRESS,
    productoMinterAbi,
    provider
  );
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getProducto`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      response.map(async (item, index) => {
        const precio = await productosMinter.buyPrice(
          item.tipoN,
          '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
        );
        const price = parseFloat(ethers.utils.formatUnits(precio, 6)).toFixed(
          2
        );
        Productos[index] = item;
        Productos[index].precio = price;
      });
    })
    .catch((error) => console.error('Error:', error));
};

const rpc_ETH =
  'https://eth-mainnet.g.alchemy.com/v2/q9zvspHI6cAhD0JzaaxHQDdJp_GqXNMJ';
const provider_ETH = new ethers.providers.JsonRpcProvider(rpc_ETH);

const frenchiesMinterContract = new ethers.Contract(
  '0x32bfb6790B3536a7269185278B482A0FA0385362',
  frenchiesAbi,
  provider_ETH
);

export const getAllNFts = () => async (dispatch) => {
  /*const totalSupply = await frenchiesMinterContract.totalSupply();
  const promises = [];

  for (let i = 0; i < totalSupply; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          fetch(`https://lime-geographical-angelfish-53.mypinata.cloud/ipfs/bafybeiawpvggels6zvzlluqjw5b6a72xnigo2647o24qpep7org3pht26a/${i+1}`, {
            method: 'GET',
          })
            .then((res) => res.json())
            .then((response) => {
              const nft = response;
              if (nft != undefined) {
                let a = nft.image.split('/');
                const prod = {
                  name: nft.name,
                  image: 'https://gateway.pinata.cloud/ipfs/' + a[2],
                  precio: 0.3,
                  descripcion: nft.description,
                  id: i,
                  attributes: nft.attributes,
                };
                resolve(prod);
              } else {
                resolve(null);
              }
            })
            .catch((error) => {
              console.error(error);
              resolve(null);
            });
        }, 5000); // establecemos un tiempo de espera de 5 segundos
      })
    );
  }

  const results = await Promise.all(promises);
  const nfts = results.filter((nft) => nft !== null);
  console.log(nfts);
  dispatch(upfrench({ frenchs: nfts }));*/
  console.log('UA');
};

const getInversiones = async () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const inversionesMinter = new ethers.Contract(
    INVERSION_MINTER_ADDRESS,
    inversionMinterAbi,
    provider
  );
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getInversion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      response.map(async (item) => {
        const precio = await inversionesMinter.buyPrice(item.tipoN);
        const price = parseFloat(ethers.utils.formatUnits(precio, 6)).toFixed(
          2
        );
        Inversiones[item.tipoN - 1] = item;
        Inversiones[item.tipoN - 1].precio = price;
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
    setTimeout(async function () {
      await dispatch(
        mintedLoaded({
          productos: Productos,
          inversiones: Inversiones,
        })
      );
    }, 500);
  } catch (error) {
    dispatch(mintedError(error.message));
  }
};
