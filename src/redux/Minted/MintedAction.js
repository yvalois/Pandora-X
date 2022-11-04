import { ethers } from 'ethers';
import nudaraMinterAbi from '../../abi/nudaraMinter.json'; //Buscar
import { contract } from '../blockchainRoutes';
import { items } from '../../utils/constant'; //Buscar
//import {provider} from "../../NFTROL"

const ROUTER = contract();
const RPC_URL = ROUTER.RPC_URL;
const NUDARA_MINTER_ADDRESS = ROUTER.nudaraMinter;

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

export const getMintedNft = () => async (dispatch) => {
  dispatch(mintedLoading());

  try {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://eth-goerli.g.alchemy.com/v2/6Cz9qwj5jNWtAYbDl84MK1Z9XR05MjXV'
    ); //cambiar provider que se obtiene en NFTRO
    const nudaraMinter = new ethers.Contract(
      '0x6BB9547894806539C1465AeBafb3018adB0a313E',
      nudaraMinterAbi,
      provider
    ); //Contracto del marketPlace
    const mintedNft = await nudaraMinter.getNftInContract();
    const disponibleNft = [];
    const mintedNftArray = [];
    mintedNft.map((item) => {
      mintedNftArray.push(parseInt(item));
    });
    console.log(mintedNftArray);
    items.map((item) => {
      if (mintedNftArray.includes(item.number)) {
        //si no lo tiene los manda
        disponibleNft.push(item);
      }
    });
    const nftPrice = await nudaraMinter.getPricePlusFee();
    const priceFormat = parseFloat(
      ethers.utils.formatUnits(nftPrice, 18)
    ).toFixed(2);
    console.log(priceFormat);
    console.log('a');
    dispatch(mintedLoaded({ disponibleNft, mintedNft, priceFormat }));
  } catch (error) {
    dispatch(mintedError(error.message));
  }
};
