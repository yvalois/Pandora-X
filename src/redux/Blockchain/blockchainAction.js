import { ethers } from 'ethers';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { contract } from '../blockchainRoutes';
import abiErc20 from '../../abi/abiERC20.json'; //Buscar
import productoMinterAbi from '../../abi/ProductoMinter.json'; //Buscar
import inversionMinterAbi from '../../abi/InversionMinter.json';
import stakingPAbi from '../../abi/StakingPOL.json';
import stakingErAbi from '../../abi/StakingETH.json';
import frenchiesAbi from '../../abi/FrenchiesBlues.json';
import allFrenchies from '../../abi/ultimateDatos.json';
import auction from '../../abi/auction.json';
import ofertas from '../../abi/ofertas.json';
import ventas from '../../abi/ventas.json';

import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import { GOERLIClient } from 'wagmi';

import stakingAbi from '../../abi/staking.json';
import { setProvider } from '../../NFTROL';
import accessAbi from '../../abi/NftsRol.json';
//import WalletLink from 'walletlink'

const router = contract();

const USDT_ADDRESS = router.usdtContract;
const TokenPrueba_ADDRESS = router.tokenPrueba;
const MATIC_ADDRESS = router.maticContract;

const PRODUCTOS_MINTER_ADDRESS = router.productoMinter;
const INVERSION_MINTER_ADDRESS = router.inversionMinter;
const STAKING_ADDRESS = router.staking;
const STAKINGE_ADDRESS = router.stakingETH;
const STAKINGP_ADDRESS = router.stakingPOL;
const FRENCHIES_ADDRESS = router.frenchies;
const AUCTION_ADDRESS = router.auction;
const VENTA_ADDRESS = router.venta;
const OFERTAS_ADDRESS = router.offers;

const ACCESS_ADDRESS = router.Access;

const RPC_URL = router.RPC_URL;

const providerOptions = new WalletConnectProvider({
  walletconnect: {
    package: WalletConnectProvider, // required
  },
  infuraId: 'gcYJsxItcYNjfy01aHklipg1J6foSUFn',
  rpc: 'https://matic-mainnet.chainstacklabs.com',
});

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

let Productos = [];
let Inversiones = [];
let data = [];

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

export const Update = (payload) => {
  return {
    type: 'UPDATE_MONGO',
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
export const update_f = (payload) => {
  return {
    type: 'UPDATE_FRENCH',
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

export const update_sf = (payload) => {
  return {
    type: 'UPDATE_STAKINGF',
    payload: payload,
  };
};

export const uFrench = (address) => async (dispatch) => {
  fetch(`https://api.tatum.io/v3/nft/address/balance/ETH/${address}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'cc513a94-c5a2-4d2b-b28e-e0451fac5441_100',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      response.map((meta) => {
        if (
          meta.contractAddress == '0x32bfb6790b3536a7269185278b482a0fa0385362'
        ) {
          let token = meta.metadata;
          token.map((item) => {
            const id = parseInt(item.tokenId) + 1;
            fetch(
              `https://gateway.pinata.cloud/ipfs/bafybeiawpvggels6zvzlluqjw5b6a72xnigo2647o24qpep7org3pht26a/${id}`,
              {
                method: 'GET',
              }
            )
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
                    id: item.tokenId,
                    attributes: nft.attributes,
                  };
                  inventoryf.push(prod);
                }
              });
          });
        }
      });
    });
};

/*export const uProduct = () => async (dispatch) => {
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
  const tokenContract = new ethers.Contract(
    TokenPrueba_ADDRESS,
    abiErc20,
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
    const price = await productoMinterContract.buyPrice(
      tipo,
      tokenContract.address
    );
    const precio = ethers.utils.formatUnits(price, 6);
    if (Productos[tipo - 1].tipo == type) {
      const prod = {
        Nombre: Productos[item].nombre,
        img: Productos[item].img,
        precio: parseInt(precio),
        tipo: Productos[item].tipo,
        descripcion: Productos[item].descripcion,
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
};*/

export const uInvertion = (address) => async (dispatch) => {
  const rpc_MAC =
    'https://polygon-mainnet.g.alchemy.com/v2/XVy5Duyf5VwZzcxJaIlxyQEehwKzosov';
  const provider_MAC = new ethers.providers.JsonRpcProvider(rpc_MAC);

  const inversionMinterContract = new ethers.Contract(
    INVERSION_MINTER_ADDRESS,
    inversionMinterAbi,
    provider_MAC
  );

  const nftiBalance = await inversionMinterContract.getMyInventory(address);
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

    const precio = ethers.utils.formatUnits(price, 6);
    if (Inversiones[tipo - 1]?.tipo == type) {
      const inv = {
        Nombre: Inversiones[tipo - 1].Nombre,
        img: Inversiones[tipo - 1].img,
        precio: parseInt(precio),
        tipo: Inversiones[tipo - 1].tipo,
        descripcion: Inversiones[tipo - 1].descripcion,
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

export const uStakingF = (_address) => async (dispatch) => {
  const rpc_ETH =
    'https://eth-mainnet.g.alchemy.com/v2/q9zvspHI6cAhD0JzaaxHQDdJp_GqXNMJ';

  const provider_ETH = new ethers.providers.JsonRpcProvider(rpc_ETH);

  const stakingfrenEContract = new ethers.Contract(
    STAKINGE_ADDRESS,
    stakingErAbi,
    provider_ETH
  );
  const nftStakingF = await stakingfrenEContract.getNftsInStaking(_address);

  if (nftStakingF.length != undefined) {
    nftStakingF.map(async (item) => {
      const is = await stakingfrenEContract.nftIsStaking(_address, item);
      if (is == true) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getStaking/${item}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((response) => {
            const info = response;
            const id = parseInt(item) + 1;
            fetch(
              `https://lime-geographical-angelfish-53.mypinata.cloud/ipfs/bafybeiawpvggels6zvzlluqjw5b6a72xnigo2647o24qpep7org3pht26a/${id}`,
              {
                method: 'GET',
              }
            )
              .then((res) => res.json())
              .then((response) => {
                const nft = response;
                let a = nft.image.split('/');

                const dat = new Date(info.fechap);
                const date = dat.toLocaleDateString();
                const stak = {
                  id: parseInt(item),
                  fechaPago: {
                    fecha: info.fechap,
                    fechaM: date,
                    fechaL: info.fechald,
                  },
                  idCR: {
                    id: parseInt(item),
                    fechap: info.fechap,
                    fechaM: date,
                  },
                  idW: parseInt(item),
                  Nombre: nft.name,
                  image: 'https://gateway.pinata.cloud/ipfs/' + a[2],
                  precio: 0.3,
                  descripcion: nft.description,
                };
                inventorysf.push(stak);
                console.log(inventorysf);
              });
          });
      }
    });
  }
};

export const uStaking = (address) => async (dispatch) => {
  const rpc_MAC =
    'https://polygon-mainnet.g.alchemy.com/v2/XVy5Duyf5VwZzcxJaIlxyQEehwKzosov';
  const provider_MAC = new ethers.providers.JsonRpcProvider(rpc_MAC);

  const stakingContract = new ethers.Contract(
    STAKING_ADDRESS,
    stakingAbi,
    provider_MAC
  );

  const inversionMinterContract = new ethers.Contract(
    INVERSION_MINTER_ADDRESS,
    inversionMinterAbi,
    provider_MAC
  );
  let aux = true;
  const nftStaking = await stakingContract.getNftsInStaking(address);
  const inventorys = [];
  if (nftStaking.length != 0) {
    nftStaking.map(async (item) => {
      function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
      }

      const is = await stakingContract.NftIsStaking(address, item);
      const pr = await stakingContract.historicalStaking(address, item);

      const pre = await inversionMinterContract.getPricePlusFee(item);

      const ap = await stakingContract.tokenApr(address, item);

      const cpa = await stakingContract.rewardPerToken(item, address);

      const ind = await stakingContract.indiceArray(address, item);
      const dat = await stakingContract.getDate(ind);
      const precio = parseInt(ethers.utils.formatUnits(pre, 6));
      const cantpago = parseFloat(ethers.utils.formatUnits(cpa, 6)).toFixed(2);
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
          precio: precio, //getpricePlusfee
          fechaPago: date.toDateString(), //tratar de mandar a 0 y en la pagina en un useEffect cambiarlo para que cambie con el pago
          Apr: parseInt(apr), // getApr
          cantPago: cantpago, // rewardPerToken tratar de cambiar con un useEffect cuando se pague
          idCR: parseInt(item),
          idW: parseInt(item),
        };
        i++;
        inventorys.push(stak);
        console.log(inventorys);
      }
    });
  }
  dispatch(
    update_s({
      inventorys: inventorys,
    })
  );
};

/*const subscribeProvider = (connection) => async (dispatch) => {
  connection.on('close', () => {
    dispatch(disconectWallet());
  });
  window.localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
  connection.on('accountsChanged', async (accounts) => {
    await getProductos();
    await getInversiones();
    if (accounts?.length) {
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      //const usdtContract = new ethers.Contract(USDT_ADDRESS, abiErc20, signer);
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
      await getProductos();
      await getInversiones();
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
          const pr = await stakingContract.      const pr = await stakingContract.historicalStaking(address,item);
(item);
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
        const price = await productoMinterContract.buyPrice(
          tipo,
          tokenContract.address
        );
        const precio = ethers.utils.formatUnits(price, 6);
        if (Productos[tipo - 1].tipo == type) {
          const prod = {
            Nombre: Productos[tipo - 1].nombre,
            img: Productos[tipo - 1].img,
            precio: parseInt(precio),
            tipo: Productos[tipo - 1].tipo,
            descripcion: Productos[tipo - 1].descripcion,
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
        const price = await inversionMinterContract.buyPrice(
          tipo
        );
        //alert(price)
        alert("a")
        const precio = ethers.utils.formatUnits(price, 6);
        alert(precio)
        if (inversionesAR[tipo - 1].tipo == type) {
          const inv = {
            Nombre: inversionesAR[tipo - 1].nombre,
            img: inversionesAR[tipo - 1].img,
            precio: parseFloat(precio).toFixed(1),
            tipo: inversionesAR[tipo - 1].tipo,
            descripcion: inversionesAR[tipo - 1].descripcion,
            id: item,
          };
          inventoryi.push(inv);
        }
      });
      let balancei = 0;
      nftiBalance.map(async (item) => {
        const precio = await inversionMinterContract.getPricePlusFee(item);
        balancei += parseFloat(ethers.utils.formatUnits(precio, 6)).toFixed(2);
      });
      let balancep = 0;
      nftpBalance.map(async (item) => {
        const precio = await productoMinterContract.getPricePlusFee(item);
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
};*/

const getProductos = async () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getProducto`, {
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
      const paidFormat = parseFloat(ethers.utils.formatUnits(paid, 6)).toFixed(
        2
      );
      const w1 = wallet.slice(0, 6);
      const w = wallet.slice(wallet.length - 6);
      const wall = w1 + '...' + w;
      //setInfor((prevState) => ({ ...prevState, pago: paidFormat }))
      //setInfor((prevState) => ({ ...prevState, wallet: wallet }))
      let tipo = '';
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
        wallet: wall,
        porcentaje: porcentaje,
        tipo: tipo,
      };

      Pagos.push(pago1);
    }
  }
};
const infoPagosC = async (address, staking, rango, categoria) => {
  const cant = await staking.cantPagos(address);
  let i;
  if (Pagos.length < cant) {
    for (i = 0; i < cant; i++) {
      const paid = await staking.getPagoUser(address, i + 1);

      const wallet = await staking.getWallet(address, i + 1);
      const paidFormat = parseFloat(ethers.utils.formatUnits(paid, 6)).toFixed(
        2
      );
      const w1 = wallet.slice(0, 6);
      const w = wallet.slice(wallet.length - 6);
      const wall = w1 + '...' + w;
      //setInfor((prevState) => ({ ...prevState, pago: paidFormat }))
      //setInfor((prevState) => ({ ...prevState, wallet: wallet }))
      let tipo = '';
      if (categoria == 'BlockMaker') {
        tipo = 'Staking';
      }
      let porcentaje = '1%';

      const pago1 = {
        pago: paidFormat,
        wallet: wall,
        porcentaje: porcentaje,
        tipo: tipo,
      };
      Pagos.push(pago1);
    }
  }
};

const getInversiones = async () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getInversion`, {
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

const conectar = (accountAddress, stakingContract) => async (dispatch) => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login/${accountAddress}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response !== null) {
        if (response.Categoria == 'Agente X') {
          dispatch(
            connectSuccessToMongo({
              rol: response.Rol,
              nombre: response.Nombre,
              isreferido: response.IsReferido,
              referidor: response.Referidor,
              range: response.Range,
              type: response.Type,
              rango: response.Rango,
              categoria: response.Categoria,
              paid: Pagos,
              perfil: response.Perfil,
              banner: response.Banner,
              descripcion: response.Descripcion,
              ban: response.Ban,
            })
          );
        } else if (response.Categoria == 'BlockMaker') {
          infoPagosC(
            accountAddress,
            stakingContract,
            response.Rango,
            response.Categoria
          );
          dispatch(
            connectSuccessToMongo({
              rol: response.Rol,
              nombre: response.Nombre,
              isreferido: response.IsReferido,
              referidor: response.Referidor,
              range: response.Range,
              type: response.Type,
              rango: response.Rango,
              categoria: response.Categoria,
              paid: Pagos,
              perfil: response.Perfil,
              banner: response.Banner,
              descripcion: response.Descripcion,
              ban: response.Ban,
            })
          );
        } else {
          dispatch(
            connectSuccessToMongo({
              rol: response.Rol,
              nombre: response.Nombre,
              isreferido: response.IsReferido,
              referidor: response.Referidor,
              range: response.Range,
              type: response.Type,
              rango: response.Rango,
              paid: Pagos,
              perfil: response.Perfil,
              banner: response.Banner,
              descripcion: response.Descripcion,
              ban: response.Ban,
            })
          );
        }
      } else {
        dispatch(register());
      }
    });
};
export const update = (accountAddress) => async (dispatch) => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login/${accountAddress}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response !== null) {
        dispatch(
          Update({
            nombre: response.Nombre,
            perfil: response.Perfil,
            banner: response.Banner,
            descripcion: response.Descripcion,
          })
        );
      } else {
        dispatch(register());
      }
    });
};

function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}

export const connectWallet =
  (address, provider, signer) => async (dispatch) => {
    dispatch(loading());

    try {
      const chainID = provider._network.chainId;
      setProvider(signer);

      const rpc_ETH =
        'https://eth-mainnet.g.alchemy.com/v2/q9zvspHI6cAhD0JzaaxHQDdJp_GqXNMJ';

      const rpc_MAC =
        'https://polygon-mainnet.g.alchemy.com/v2/XVy5Duyf5VwZzcxJaIlxyQEehwKzosov';
      const provider_ETH = new ethers.providers.JsonRpcProvider(rpc_ETH);
      const provider_ETH2 = new ethers.providers.JsonRpcProvider(rpc_ETH);

      const provider_MAC = new ethers.providers.JsonRpcProvider(rpc_MAC);

      if (1 == 1) {
        const tokenContract = new ethers.Contract(
          TokenPrueba_ADDRESS,
          abiErc20,
          provider_MAC
        );

        const inversionMinterContract = new ethers.Contract(
          INVERSION_MINTER_ADDRESS,
          inversionMinterAbi,
          provider_MAC
        );

        const frenchiesMinterContract = new ethers.Contract(
          FRENCHIES_ADDRESS,
          frenchiesAbi,
          provider_ETH
        );

        const stakingContract = new ethers.Contract(
          STAKING_ADDRESS,
          stakingAbi,
          provider_MAC
        );

        const stakingfrenEContract = new ethers.Contract(
          STAKINGE_ADDRESS,
          stakingErAbi,
          provider_ETH
        );

        const stakingfrenPContract = new ethers.Contract(
          STAKINGP_ADDRESS,
          stakingPAbi,
          provider_ETH
        );

        const stakingContract1 = new ethers.Contract(
          STAKING_ADDRESS,
          stakingAbi,
          signer
        );

        const NftAccess = new ethers.Contract(
          ACCESS_ADDRESS,
          accessAbi,
          provider_ETH2
        );

        const NftAccess1 = new ethers.Contract(
          ACCESS_ADDRESS,
          accessAbi,
          signer
        );

        /*const auction = new ethers.Contract(
          AUCTION_ADDRESS,
          auction,
          signer
        );
          
        const ofertas = new ethers.Contract(
          OFERTAS_ADDRESS,
          ofertas,
          signer
        );

        const ventas = new ethers.Contract(
          VENTA_ADDRESS,
          ventas,
          signer
        );*/

        await getProductos();
        await getInversiones();

        const nftStaking = await stakingContract.getNftsInStaking(address);

        const nftStakingF = await stakingfrenEContract.getNftsInStaking(
          address
        );
        const french = await frenchiesMinterContract.getMyInventory(address);
        const nftiBalance = await inversionMinterContract.getMyInventory(
          address
        );
        const inventoryp = [];
        const inventoryi = [];
        const inventorys = [];
        const inventoryf = [];
        const inventorysf = [];

        let aux = true;

        nftStaking.map(async (item) => {
          function toDateTime(secs) {
            var t = new Date(1970, 0, 1); // Epoch
            t.setSeconds(secs);
            return t;
          }

          const is = await stakingContract.NftIsStaking(address, item);
          const pr = await stakingContract.historicalStaking(address, item);

          const pre = await inversionMinterContract.getPricePlusFee(item);

          const ap = await stakingContract.tokenApr(address, item);

          const cpa = await stakingContract.rewardPerToken(item, address);

          const ind = await stakingContract.indiceArray(address, item);
          const dat = await stakingContract.getDate(ind);
          const precio = parseInt(ethers.utils.formatUnits(pre, 6));
          const cantpago = parseFloat(ethers.utils.formatUnits(cpa, 6)).toFixed(
            2
          );
          const apr = ethers.utils.formatUnits(ap, 8);
          const i = 0;
          const date = toDateTime(dat);

          if (is == true) {
            if (parseInt(item) == 0 && aux == true) {
              aux = false;

              const stak = {
                id: parseInt(item),
                position: parseInt(i),
                positionR: parseInt(pr), //llamar funcion
                precio: precio, //getpricePlusfee
                fechaPago: date.toDateString(), //tratar de mandar a 0 y en la pagina en un useEffect cambiarlo para que cambie con el pago
                Apr: parseInt(apr), // getApr
                cantPago: cantpago, // rewardPerToken tratar de cambiar con un useEffect cuando se pague
                idCR: parseInt(item),
                idW: parseInt(item),
              };
              i++;
              inventorys.push(stak);
            } else if (parseInt(item) != 0) {
              const stak = {
                id: parseInt(item),
                position: parseInt(i),
                positionR: parseInt(pr), //llamar funcion
                precio: precio, //getpricePlusfee
                fechaPago: date.toDateString(), //tratar de mandar a 0 y en la pagina en un useEffect cambiarlo para que cambie con el pago
                Apr: parseInt(apr), // getApr
                cantPago: cantpago, // rewardPerToken tratar de cambiar con un useEffect cuando se pague
                idCR: parseInt(item),
                idW: parseInt(item),
              };
              i++;
              inventorys.push(stak);
            }
          }
        });

        nftStakingF.map(async (item) => {
          const is = await stakingfrenEContract.nftIsStaking(address, item);
          if (is == true) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/getStaking/${item}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((response) => {
                const id = parseInt(item);
                const info = allFrenchies[id];
                const dat = new Date(info.fechap);
                const date = dat.toLocaleDateString();
                const stak = {
                  id: parseInt(item),
                  fechaPago: {
                    fecha: info.fechap,
                    fechaM: date,
                    fechaL: info.fechald,
                  },
                  idCR: {
                    id: parseInt(item),
                    fechap: info.fechap,
                    fechaM: date,
                  },
                  idW: parseInt(item),
                  Nombre: info.name,
                  image: info.image,
                  precio: 0.3,
                  descripcion: info.description,
                };

                inventorysf.push(stak);
              });
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

          const precio = ethers.utils.formatUnits(price, 6);
          if (Inversiones[tipo - 1]?.tipo == type) {
            const inv = {
              Nombre: Inversiones[tipo - 1].Nombre,
              img: Inversiones[tipo - 1].img,
              precio: parseInt(precio),
              tipo: Inversiones[tipo - 1].tipo,
              descripcion: Inversiones[tipo - 1].descripcion,
              id: item,
            };
            inventoryi.push(inv);
          }
        });
        /*const getFren = async () => {
            for(let i = 43; i < 64; i++){
              
              const nft = allFrenchies[i]


              const prod = {
                name: nft.name,
                image: nft.image,
                precio: 0.3,
                descripcion: nft.description,
                id: i,
                attributes: nft.attributes,
              };
              inventoryf.push(prod);
            }

        };*/

        const getFren = async () => {
          fetch(`https://api.tatum.io/v3/nft/address/balance/ETH/${address}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'cc513a94-c5a2-4d2b-b28e-e0451fac5441_100',
            },
          })
            .then((res) => res.json())
            .then((response) => {
              response.map((meta) => {
                if (
                  meta.contractAddress ==
                  '0x32bfb6790b3536a7269185278b482a0fa0385362'
                ) {
                  let token = meta.metadata;
                  token.map((item) => {
                    const i = parseInt(item.tokenId);
                    const nft = allFrenchies[i];

                    const prod = {
                      name: nft.name,
                      image: nft.image,
                      precio: 0.3,
                      descripcion: nft.description,
                      id: item.tokenId,
                      attributes: nft.attributes,
                    };
                    inventoryf.push(prod);
                  });
                }
              });
            });
        };

        await getFren();
        let balancei = [];
        balancei[0] = 0;
        nftiBalance.map(async (item) => {
          const precio = await inversionMinterContract.getPricePlusFee(item);
          const aux = parseFloat(ethers.utils.formatUnits(precio, 6)).toFixed(
            2
          );
          const auxiliar = balancei[0];
          balancei[0] = parseFloat(auxiliar) + parseFloat(aux);
        });

        const usdtContract1 = new ethers.Contract(
          USDT_ADDRESS,
          abiErc20,
          signer
        );
        const tokenContract1 = new ethers.Contract(
          TokenPrueba_ADDRESS,
          abiErc20,
          signer
        );
        const maticContract1 = new ethers.Contract(
          MATIC_ADDRESS,
          abiErc20,
          signer
        );

        const productoMinterContract1 = new ethers.Contract(
          PRODUCTOS_MINTER_ADDRESS,
          productoMinterAbi,
          signer
        );

        const inversionMinterContract1 = new ethers.Contract(
          INVERSION_MINTER_ADDRESS,
          inversionMinterAbi,
          signer
        );

        const frenchiesMinterContract1 = new ethers.Contract(
          FRENCHIES_ADDRESS,
          frenchiesAbi,
          signer
        );

        const stakingfrenEContract1 = new ethers.Contract(
          STAKINGE_ADDRESS,
          stakingErAbi,
          signer
        );

        const stakingfrenPContract1 = new ethers.Contract(
          STAKINGP_ADDRESS,
          stakingPAbi,
          signer
        );

        setTimeout(async () => {
          await dispatch(
            dataLoaded({
              usdtContract: usdtContract1,
              tokenContract: tokenContract1,
              //maticContract: null,
              productoMinter: productoMinterContract1,
              inversionMinter: inversionMinterContract1,
              frenchiesMinter: frenchiesMinterContract1,
              stakingfrenEContract: stakingfrenEContract1,
              stakingfrenPContract: stakingfrenPContract1,
              //ventasContract: ventas,
              //auctionContract: auction,
              //ofertasContract: ofertas,
              staking: stakingContract1,
              NftAccessContract: NftAccess1,
              // stakinfETH: stakingfrenEContract,
              // stakingPOL: stakingfrenPContract,
              accountAddress: address,
              //usdtBalance: balanceFormat,
              //tokenBalance: balanceFormat2,
              inventoryp: inventoryp,
              inventoryi: inventoryi,
              inventorys: inventorys,
              inventoryf: inventoryf,
              inventorysf: inventorysf,
              instance: null,
              balancei: balancei,
              chainId: chainID,
            })
          );

          dispatch(conectar(address, stakingContract));
        }, 3000);
      } else {
        if (process.env.NODE_ENV === 'production') {
          try {
            await provider.provider.request({
              method: 'wallet_switchGOERLIChain',
              params: [
                {
                  chainId: `0x${Number(5).toString(16)}`,
                },
              ],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await provider.provider.request({
                  method: 'wallet_addGOERLIChain',
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
              method: 'wallet_switchGOERLIChain',
              params: [
                {
                  chainId: `0x${Number(5).toString(16)}`,
                },
              ],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await provider.provider.request({
                  method: 'wallet_addGOERLIChain',
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
