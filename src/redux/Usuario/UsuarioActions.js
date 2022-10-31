import { ethers } from 'ethers';

// log

export const connectRequest = () => {
  return {
    type: 'CONNECTION_REQUEST',
  };
};

export const connectSuccess = (payload) => {
  return {
    type: 'CONNECTION_SUCCESS',
    payload: payload,
  };
};

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

export const connectFailed = (payload) => {
  return {
    type: 'CONNECTION_FAILED',
    payload: payload,
  };
};

export const updateAccountRequest = (payload) => {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: payload,
  };
};

const connectToWallet = async () => {
  try {
    //checkIfExtensionIsAvailable();
    const connection = web3Modal && (await web3Modal.connect());
    const provider = new ethers.providers.Web3Provider(connection);
    await subscribeProvider(connection);
    setProvider(provider);
  } catch (error) {
    console.log(
      error,
      'got this error on connectToWallet catch block while connecting the wallet'
    );
  }
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    try {
      if (1 == 1) {
        console.log('a');
        await connectToWallet();
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        //dispatch(connectToMongo(accounts[0]));
        dispatch(
          connectSuccess({
            account: '0x',
            web3: web3Modal,
          })
        );
      }
    } catch (err) {
      dispatch(connectFailed(err));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
