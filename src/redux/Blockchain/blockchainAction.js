import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { contract } from '../blockchainRoutes';
import abiErc20 from '../../abi/abiERC20.json'; //Buscar
import nudaraMinterAbi from '../../abi/nudaraMinter.json'; //Buscar
import { items } from '../../utils/constant'; //Buscar

const router = contract();

const BUSD_ADDRESS = router.busdContract;
const USDT_ADDRESS = router.usdtContract;
const USDC_ADDRESS = router.usdcContract;
const DAI_ADDRESS = router.daiContract;
const NUDARA_MINTER_ADDRESS = router.nudaraMinter;
const RPC_URL = router.RPC_URL;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        137: RPC_URL,
      },
    },
  },
};

/*const web3Modal = new Web3Modal({
    disableInjectedProvider: false,
    cacheProvider: true,
    providerOptions
});*/

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

export const connectWalletToBLock = () => async (dispatch, _provider) => {
  dispatch(loading());
  try {
    //const instance = await web3Modal.connect(providerOptions);
    //const provider = new ethers.providers.Web3Provider(instance);
    console.log(_provider);
    const signer = _provider.getSigner();

    const accounts = await _provider.listAccounts();

    const networkId = await _provider.getNetwork();

    console.log(accounts[0], networkId);

    const busdContract = new ethers.Contract(BUSD_ADDRESS, abiErc20, signer);
    const usdtContract = new ethers.Contract(USDT_ADDRESS, abiErc20, signer);
    const usdcContract = new ethers.Contract(USDC_ADDRESS, abiErc20, signer);
    const daiContract = new ethers.Contract(DAI_ADDRESS, abiErc20, signer);
    const nudaraMinterContract = new ethers.Contract(
      NUDARA_MINTER_ADDRESS,
      nudaraMinterAbi,
      signer
    );
    const nftBalance = await nudaraMinterContract.getMyInventory(accounts[0]);
    const inventory = [];
    nftBalance.map((item) => {
      // if inventory id in items push to inventory
      if (items[item]) {
        inventory.push(items[item.id]);
      }
    });
    console.log(inventory);

    const busdBalance = await busdContract.balanceOf(accounts[0]);
    const usdtBalance = await usdtContract.balanceOf(accounts[0]);
    const usdcBalance = await usdcContract.balanceOf(accounts[0]);
    const daiBalance = await daiContract.balanceOf(accounts[0]);

    const balanceFormat = ethers.utils.formatUnits(busdBalance, 18);
    const balanceFormat2 = ethers.utils.formatUnits(usdtBalance, 6);
    const balanceFormat3 = ethers.utils.formatUnits(usdcBalance, 6);
    const balanceFormat4 = ethers.utils.formatUnits(daiBalance, 18);

    dispatch(
      dataLoaded({
        usdtContract,
        busdContract,
        usdcContract,
        daiContract,
        nudaraMinter: nudaraMinterContract,
        accountAddress: accounts[0],
        busdBalance: balanceFormat,
        usdtBalance: balanceFormat2,
        usdcBalance: balanceFormat3,
        daiBalance: balanceFormat4,
        inventory,
      })
    );

    instance.on('accountsChanged', async (accounts) => {
      const busdBalance = await busdContract.balanceOf(accounts[0]);
      const usdtBalance = await usdtContract.balanceOf(accounts[0]);
      const usdcBalance = await usdcContract.balanceOf(accounts[0]);
      const daiBalance = await daiContract.balanceOf(accounts[0]);
      const nftBalance = await nudaraMinterContract.getMyInventory(accounts[0]);
      const inventory = [];
      nftBalance.map((item) => {
        // if inventory id in items push to inventory
        if (items[item]) {
          inventory.push(items[item.id]);
        }
      });

      const accountAddress = accounts[0];

      const balanceFormat = ethers.utils.formatUnits(busdBalance, 18);
      const balanceFormat2 = ethers.utils.formatUnits(usdtBalance, 6);
      const balanceFormat3 = ethers.utils.formatUnits(usdcBalance, 6);
      const balanceFormat4 = ethers.utils.formatUnits(daiBalance, 18);

      dispatch(
        updateBalance({
          accountAddress,
          busdBalance: balanceFormat,
          usdtBalance: balanceFormat2,
          usdcBalance: balanceFormat3,
          daiBalance: balanceFormat4,
          inventory,
        })
      );
      dispatch(userChange());
      dispatch(adminChange());
    });
    /*else {
            if (process.env.NODE_ENV === 'production') {
                try {
                    await provider.provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: `0x${Number(137).toString(16)}` }],
                    })
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        try {
                            await provider.provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: `0x${Number(137).toString(16)}`,
                                    chainName: 'Matic Mainnet',
                                    nativeCurrency: {
                                        name: 'Matic',
                                        symbol: 'MATIC',
                                        decimals: 18,
                                    },
                                    rpcUrls: [RPC_URL],
                                    blockExplorerUrls: ['https://polygonscan.com/'],
                                }],
                            })
                        } catch (addError) {
                            console.log(addError)
                        }
                    }
                }
            }
            if (process.env.NODE_ENV === 'development') {
                try {
                    await provider.provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: `0x${Number(80001).toString(16)}` }],
                    })
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        try {
                            await provider.provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: `0x${Number(80001).toString(16)}`,
                                    chainName: 'Matic Testnet Mumbai',
                                    nativeCurrency: {
                                        name: 'Matic',
                                        symbol: 'MATIC',
                                        decimals: 18,
                                    },
                                    rpcUrls: [RPC_URL],
                                    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                                }],
                            })
                        } catch (addError) {
                            console.log(addError)
                        }
                    }
                }
            }
        }*/
  } catch (err) {
    dispatch(error(err));
  }
};
