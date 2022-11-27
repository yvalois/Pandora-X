import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { contract } from '../blockchainRoutes';
import abiErc20 from '../../abi/abiERC20.json'; //Buscar
import productoMinterAbi from '../../abi/ProductoMinter.json'; //Buscar
import inversionMinterAbi from '../../abi/InversionMinter.json';
import stakingAbi from '../../abi/staking.json';
import { items } from '../../utils/constant'; //Buscar
import { setProvider } from '../../NFTROL';

const router = contract();

const USDT_ADDRESS = router.usdtContract;
const TokenPrueba_ADDRESS = router.tokenPrueba;
const PRODUCTOS_MINTER_ADDRESS = router.productoMinter;
const INVERSION_MINTER_ADDRESS = router.inversionMinter;
const STAKING_ADDRESS = router.staking;
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

const productosAR = [
  {
    nombre: 'Pandora X NFT - Podcast-Streaming',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Streaming%20%282%29.gif',
    tipo: 'PS',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Podcast-Academia',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Academia%20%281%29.gif',
    tipo: 'PA',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - NFT Studio',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20NFT%20Studio%20%282%29.gif',
    tipo: 'NS',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Investing Value',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Investing%20Value%20%282%29.gif',
    tipo: 'IV',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Comunidad Privada',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Privada.gif',
    tipo: 'CP',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Comunidad Gratuita',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Gratuita.gif',
    tipo: 'CG',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Coaching',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Coaching.gif',
    tipo: 'NC',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'Pandora X NFT - Alpha Report',
    img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Alpha%20Report.gif',
    tipo: 'AP',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
];

const inversionesAR = [
  {
    nombre: 'UBX Card 100',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100.gif',
    tipo: '100',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 1K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%201k%20%281%29.gif',
    tipo: '1K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 5K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%205k.gif',
    tipo: '5K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 10K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2010k.gif',
    tipo: '10K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 20K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2020k.gif',
    tipo: '20K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 50K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2050k.gif',
    tipo: '50K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
  {
    nombre: 'UBX Card 100K',
    img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100k.gif',
    tipo: '100K',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
  },
];
let Pagos = [];

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

export const addpaids = (payload) => {
  return {
    type: 'ADD_PAID',
    payload: payload,
  };
};

export const update_p = (payload) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: payload,
  };
};

export const update_i = (payload) => {
  return {
    type: 'UPDATE_INVERTION',
    payload: payload,
  };
};

export const update_s = (payload) => {
  return {
    type: 'UPDATE_STAKING',
    payload: payload,
  };
};

export const uProduct = () => async (dispatch) => {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    // providerOptions // required
  });

  const instance = await web3Modal.connect(providerOptions);
  const provider = new ethers.providers.Web3Provider(instance);

  setProvider(provider);
  const signer = provider.getSigner();
  const accounts = await provider.listAccounts();
  const productoMinterContract = new ethers.Contract(
    PRODUCTOS_MINTER_ADDRESS,
    productoMinterAbi,
    signer
  );
  const nftpBalance = await productoMinterContract.getMyInventory(accounts[0]);
  const inventoryp = [];
  nftpBalance.map(async (item) => {
    const tipo = await productoMinterContract.getTipo(item);
    var type = '';
    if (tipo == 1) {
      var type = 'PS';
    } else if (tipo == 2) {
      var type = 'PA';
    } else if (tipo == 3) {
      var type = 'NS';
    } else if (tipo == 4) {
      var type = 'IV';
    } else if (tipo == 5) {
      var type = 'CP';
    } else if (tipo == 6) {
      var type = 'CG';
    } else if (tipo == 7) {
      var type = 'NC';
    } else if (tipo == 8) {
      var type = 'AP';
    }
    const price = await productoMinterContract.buyPrice(tipo);
    const precio = ethers.utils.formatUnits(price, 18);
    if (productosAR[tipo - 1].tipo == type) {
      const prod = {
        nombre: productosAR[item].nombre,
        img: productosAR[item].img,
        precio: parseInt(precio),
        tipo: productosAR[item].tipo,
        descripcion: productosAR[item].descripcion,
        id: item,
      };

      inventoryp.push(prod);
    }
  });
  await dispatch(
    update_p({
      inventoryp: inventoryp,
    })
  );
};

export const uInvertion = () => async (dispatch) => {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    // providerOptions // required
  });

  const instance = await web3Modal.connect(providerOptions);
  const provider = new ethers.providers.Web3Provider(instance);

  setProvider(provider);
  const signer = provider.getSigner();
  const accounts = await provider.listAccounts();
  const inversionMinterContract = new ethers.Contract(
    INVERSION_MINTER_ADDRESS,
    inversionMinterAbi,
    signer
  );
  const nftiBalance = await inversionMinterContract.getMyInventory(accounts[0]);
  const inventoryi = [];
  nftiBalance.map(async (item) => {
    const tipo = await inversionMinterContract.getTipo(item);
    var type = '';
    if (tipo == 1) {
      var type = '100';
    } else if (tipo == 2) {
      var type = '1K';
    } else if (tipo == 3) {
      var type = '5K';
    } else if (tipo == 4) {
      var type = '10K';
    } else if (tipo == 5) {
      var type = '20K';
    } else if (tipo == 6) {
      var type = '50K';
    } else if (tipo == 7) {
      var type = '100K';
    }

    const price = await inversionMinterContract.buyPrice(tipo);
    //alert(price)

    const precio = ethers.utils.formatUnits(price, 18);
    if (inversionesAR[tipo - 1].tipo == type) {
      const inv = {
        nombre: inversionesAR[tipo - 1].nombre,
        img: inversionesAR[tipo - 1].img,
        precio: parseInt(precio),
        tipo: inversionesAR[tipo - 1].tipo,
        descripcion: inversionesAR[tipo - 1].descripcion,
        id: item,
      };
      inventoryi.push(inv);
    }
  });

  dispatch(
    update_i({
      inventoryi: inventoryi,
    })
  );
};

export const uStaking = () => async (dispatch) => {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    // providerOptions // required
  });

  const instance = await web3Modal.connect(providerOptions);
  const provider = new ethers.providers.Web3Provider(instance);

  setProvider(provider);
  const signer = provider.getSigner();
  const accounts = await provider.listAccounts();

  const stakingContract = new ethers.Contract(
    STAKING_ADDRESS,
    stakingAbi,
    signer
  );
  const inversionMinterContract = new ethers.Contract(
    INVERSION_MINTER_ADDRESS,
    inversionMinterAbi,
    signer
  );
  let aux = true;
  const nftStaking = await stakingContract.getNfts();
  const inventorys = [];
  if (nftStaking.length != undefined) {
    nftStaking.map(async (item) => {
      function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
      }

      const is = await stakingContract.NftIsStaking(accounts[0], item);

      const pr = await stakingContract.getPosition(item);
      const pre = await inversionMinterContract.getPricePlusFee(item);
      const ap = await stakingContract.getApr();

      const cpa = await stakingContract.rewardPerToken(item);
      const ind = await stakingContract.getIndice(item);
      const dat = await stakingContract.getDate(ind);
      const precio = ethers.utils.formatUnits(pre, 18);
      const cantpago = parseFloat(ethers.utils.formatUnits(cpa, 18)).toFixed(2);
      const apr = ethers.utils.formatUnits(ap, 8);
      const i = 0;
      const date = toDateTime(dat);

      if (
        (parseInt(item) == 0 && is == true && aux == true) ||
        (parseInt(item) !== 0 && is == true)
      ) {
        if (parseInt(item) == 0) {
          aux = false;
        }
        const stak = {
          id: parseInt(item),
          position: parseInt(i),
          positionR: parseInt(pr), //llamar funcion
          precio: parseInt(precio), //getpricePlusfee
          fechaPago: date.toDateString(), //tratar de mandar a 0 y en la pagina en un useEffect cambiarlo para que cambie con el pago
          Apr: parseInt(apr), // getApr
          cantPago: cantpago, // rewardPerToken tratar de cambiar con un useEffect cuando se pague
          idCR: parseInt(item),
          idW: parseInt(item),
        };
        i++;
        inventorys.push(stak);
      }
    });
  }
  dispatch(
    update_s({
      inventorys: inventorys,
    })
  );
};

const subscribeProvider = (connection) => async (dispatch) => {
  connection.on('close', () => {
    dispatch(disconectWallet());
  });
  window.localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
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

      const stakingContract = new ethers.Contract(
        STAKING_ADDRESS,
        stakingAbi,
        signer
      );

      /*await getProductos();
      await getInversiones();*/
      const nftStaking = stakingContract.getNfts();

      const nftpBalance = await productoMinterContract.getMyInventory(
        accounts[0]
      );
      const nftiBalance = await inversionMinterContract.getMyInventory(
        accounts[0]
      );

      const inventoryp = [];
      const inventoryi = [];
      const inventorys = [];
      if (nftStaking.length != undefined) {
        nftStaking.map(async (item) => {
          const is = await stakingContract.NftIsStaking(accounts[0], item);
          const pr = await stakingContract.getPosition(item);
          const pre = await inversionMinterContract.getPricePlusFee(item);
          const ap = await stakingContract.getApr();
          const cpa = await stakingContract.rewardPerToken(item);
          const ind = await stakingContract.getIndice(item);
          const dat = await stakingContract.getDate(ind);
          const i = 0;
          if (is == true) {
            const stak = {
              id: item,
              position: i,
              positionR: pr, //llamar funcion
              precio: pre, //getpricePlusfee
              fechaPago: dat, //tratar de mandar a 0 y en la pagina en un useEffect cambiarlo para que cambie con el pago
              Apr: ap, // getApr
              cantPago: cpa, // rewardPerToken tratar de cambiar con un useEffect cuando se pague
            };
            i++;
            inventorys.push(stak);
          }
        });
      }

      nftpBalance.map(async (item) => {
        const tipo = await productoMinterContract.getTipo(item);
        var type = '';
        if (tipo == 1) {
          var type = 'PS';
        } else if (tipo == 2) {
          var type = 'PA';
        } else if (tipo == 3) {
          var type = 'NS';
        } else if (tipo == 4) {
          var type = 'IV';
        } else if (tipo == 5) {
          var type = 'CP';
        } else if (tipo == 6) {
          var type = 'CG';
        } else if (tipo == 7) {
          var type = 'NC';
        } else if (tipo == 8) {
          var type = 'AP';
        }
        const price = await productoMinterContract.buyPrice(tipo);
        const precio = ethers.utils.formatUnits(price, 18);
        if (productosAR[item].tipo == type) {
          const prod = {
            nombre: productosAR[item].nombre,
            img: productosAR[item].img,
            precio: parseInt(precio),
            tipo: productosAR[item].tipo,
            descripcion: productosAR[item].descripcion,
            id: item,
          };

          inventoryp.push(prod);
        }
      });

      nftiBalance.map(async (item) => {
        const tipo = await inversionMinterContract.getTipo(item);
        var type = '';
        if (tipo == 1) {
          var type = '100';
        } else if (tipo == 2) {
          var type = '1K';
        } else if (tipo == 3) {
          var type = '5K';
        } else if (tipo == 4) {
          var type = '10K';
        } else if (tipo == 5) {
          var type = '20K';
        } else if (tipo == 6) {
          var type = '50K';
        } else if (tipo == 7) {
          var type = '100K';
        }
        const price = await inversionMinterContract.buyPrice(tipo);
        //alert(price)
        const precio = ethers.utils.formatUnits(price, 18);
        if (inversionesAR[item].tipo == type) {
          const inv = {
            nombre: inversionesAR[item].nombre,
            img: inversionesAR[item].img,
            precio: parseInt(precio),
            tipo: inversionesAR[item].tipo,
            descripcion: inversionesAR[item].descripcion,
            id: item,
          };
          inventoryi.push(inv);
        }
      });

      let balancei = 0;

      nftiBalance.map(async (item) => {
        const precio = await inversionMinterContract.buyPrice(item);

        balancei += precio;
      });

      let balancep = 0;

      nftpBalance.map(async (item) => {
        const precio = await inversionMinterContract.buyPrice(item);

        balancep = precio;
      });

      const accountAddress = accounts[0];

      dispatch(
        updateBalance({
          accountAddress: accountAddress,
          //busdBalance: balanceFormat,
          //usdtBalance: balanceFormat2,
          inventoryp: inventoryp,
          inventoryi: inventoryi,
          inventorys: inventorys,
          balancep: balancep,
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
  fetch(`https://pandoraxapi1.herokuapp.com/api/getProducto`, {
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

const infoPagos = async (productoMinter, rango, categoria) => {
  const cant = await productoMinter.cantPagos();
  let i;
  if (Pagos.length < cant) {
    for (i = 0; i < cant; i++) {
      const paid = await productoMinter.getPagoUser(i + 1);
      const wallet = await productoMinter.getWallet(i + 1);
      const paidFormat = parseFloat(ethers.utils.formatUnits(paid, 18)).toFixed(
        2
      );
      //setInfor((prevState) => ({ ...prevState, pago: paidFormat }))
      //setInfor((prevState) => ({ ...prevState, wallet: wallet }))
      let tipo;
      if (categoria == 'Agente X') {
        tipo = 'Compra';
      }
      let porcentaje;
      if (rango == 'peerx') {
        porcentaje = '20%';
      } else if (rango == 'blockelite') {
        porcentaje = '25%';
      } else if (rango == 'blockmaster') {
        porcentaje = '35%';
      } else if (rango == 'blockcreator') {
        porcentaje = '40%';
      }
      const pago1 = {
        pago: paidFormat,
        wallet: wallet,
        porcentaje: porcentaje,
        tipo: tipo,
      };

      Pagos.push(pago1);
    }
  }
};

const getInversiones = async () => {
  fetch(`https://pandoraxapi1.herokuapp.com/api/getInversion`, {
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

const conectar =
  (accountAddress, productoMinterContract) => async (dispatch) => {
    fetch(`https://pandoraxapi1.herokuapp.com/api/login/${accountAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response !== null) {
          infoPagos(productoMinterContract, response.Rango, response.Categoria);

          dispatch(
            connectSuccessToMongo({
              rol: response.Rol,
              nombre: response.Nombre,
              isreferido: response.IsReferido,
              referidor: response.Referidor,
              range: response.Range,
              type: response.Type,
              categoria: response.Categoria,
              rango: response.Rango,
              paid: Pagos,
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
    /*const web3Modal =
      typeof window !== 'undefined' &&
      new Web3Modal({
        cacheProvider: true,
      });*/

    const web3Modal = new Web3Modal({
      cacheProvider: true,
      // providerOptions // required
    });

    const instance = await web3Modal.connect(providerOptions);
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

      const stakingContract = new ethers.Contract(
        STAKING_ADDRESS,
        stakingAbi,
        signer
      );

      /*await getProductos();
      await getInversiones();*/
      const nftStaking = await stakingContract.getNfts();

      const nftpBalance = await productoMinterContract.getMyInventory(
        accounts[0]
      );
      const nftiBalance = await inversionMinterContract.getMyInventory(
        accounts[0]
      );

      const inventoryp = [];
      const inventoryi = [];
      const inventorys = [];
      let aux = true;
      if (nftStaking.length != undefined) {
        nftStaking.map(async (item) => {
          function toDateTime(secs) {
            var t = new Date(1970, 0, 1); // Epoch
            t.setSeconds(secs);
            return t;
          }

          const is = await stakingContract.NftIsStaking(accounts[0], item);

          const pr = await stakingContract.getPosition(item);
          const pre = await inversionMinterContract.getPricePlusFee(item);
          const ap = await stakingContract.getApr();

          const cpa = await stakingContract.rewardPerToken(item);
          const ind = await stakingContract.getIndice(item);
          const dat = await stakingContract.getDate(ind);
          const precio = ethers.utils.formatUnits(pre, 18);
          const cantpago = parseFloat(
            ethers.utils.formatUnits(cpa, 18)
          ).toFixed(2);
          const apr = ethers.utils.formatUnits(ap, 8);
          const i = 0;
          const date = toDateTime(dat);

          if (is == true && aux == true) {
            if (parseInt(item) == 0) {
              aux = false;
            }
            const stak = {
              id: parseInt(item),
              position: parseInt(i),
              positionR: parseInt(pr), //llamar funcion
              precio: parseInt(precio), //getpricePlusfee
              fechaPago: date.toDateString(), //tratar de mandar a 0 y en la pagina en un useEffect cambiarlo para que cambie con el pago
              Apr: parseInt(apr), // getApr
              cantPago: cantpago, // rewardPerToken tratar de cambiar con un useEffect cuando se pague
              idCR: parseInt(item),
              idW: parseInt(item),
            };
            i++;
            inventorys.push(stak);
          }
        });
      }

      nftpBalance.map(async (item) => {
        const tipo = await productoMinterContract.getTipo(item);
        var type = '';
        if (tipo == 1) {
          var type = 'PS';
        } else if (tipo == 2) {
          var type = 'PA';
        } else if (tipo == 3) {
          var type = 'NS';
        } else if (tipo == 4) {
          var type = 'IV';
        } else if (tipo == 5) {
          var type = 'CP';
        } else if (tipo == 6) {
          var type = 'CG';
        } else if (tipo == 7) {
          var type = 'NC';
        } else if (tipo == 8) {
          var type = 'AP';
        }
        const price = await productoMinterContract.buyPrice(tipo);
        const precio = ethers.utils.formatUnits(price, 18);
        if (productosAR[tipo - 1].tipo == type) {
          const prod = {
            nombre: productosAR[item].nombre,
            img: productosAR[item].img,
            precio: parseInt(precio),
            tipo: productosAR[item].tipo,
            descripcion: productosAR[item].descripcion,
            id: item,
          };

          inventoryp.push(prod);
        }
      });

      nftiBalance.map(async (item) => {
        const tipo = await inversionMinterContract.getTipo(item);
        var type = '';
        if (tipo == 1) {
          var type = '100';
        } else if (tipo == 2) {
          var type = '1K';
        } else if (tipo == 3) {
          var type = '5K';
        } else if (tipo == 4) {
          var type = '10K';
        } else if (tipo == 5) {
          var type = '20K';
        } else if (tipo == 6) {
          var type = '50K';
        } else if (tipo == 7) {
          var type = '100K';
        }

        const price = await inversionMinterContract.buyPrice(tipo);
        //alert(price)

        const precio = ethers.utils.formatUnits(price, 18);
        if (inversionesAR[tipo - 1].tipo == type) {
          const inv = {
            nombre: inversionesAR[tipo - 1].nombre,
            img: inversionesAR[tipo - 1].img,
            precio: parseInt(precio),
            tipo: inversionesAR[tipo - 1].tipo,
            descripcion: inversionesAR[tipo - 1].descripcion,
            id: item,
          };
          inventoryi.push(inv);
        }
      });

      /*let balancei = 0

      nftiBalance.map(async(item)=>{
        const precio =  await inversionMinterContract.buyPrice(item)

        balancei += precio
      })

      let balancep = 0 ;

      nftpBalance.map(async(item)=>{
        const precio =  await inversionMinterContract.buyPrice(item)

        balancep = precio

      })*/

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
          staking: stakingContract,
          accountAddress: accounts[0],
          //usdtBalance: balanceFormat,
          //tokenBalance: balanceFormat2,
          inventoryp: inventoryp,
          inventoryi: inventoryi,
          inventorys: inventorys,
          instance: instance,
          balancep: 0,
        })
      );

      dispatch(conectar(accounts[0], productoMinterContract));

      /*instance.on('close',() => {
      web3Modal && web3Modal.clearCachedProvider();
      dispatch(disconectWallet())
  });*/

      //esto se llama desde el use-connect

      /* instance.on('accountsChanged', async (accounts) => {

     // const usdtBalance = await usdtContract.balanceOf(accounts[0]);
      //const tokenBalance = aw ait tokenContract.balanceOf(accounts[0]);
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
