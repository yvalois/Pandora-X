import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import { Transition } from '@/components/ui/transition';
import DashboardLayout from '@/layouts/_dashboard';
import { RadioGroup } from '@/components/ui/radio-group';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Uploader from '@/components/ui/forms/uploader';
import InputLabel from '@/components/ui/input-label';
import ToggleBar from '@/components/ui/toggle-bar';
import { TagIcon } from '@/components/icons/tag-icon';
import { LoopIcon } from '@/components/icons/loop-icon';
import { SandClock } from '@/components/icons/sand-clock';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Ethereum } from '@/components/icons/ethereum';
import { Flow } from '@/components/icons/flow';
import { Warning } from '@/components/icons/warning';
import { Unlocked } from '@/components/icons/unlocked';
import Avatar from '@/components/ui/avatar';
//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import { MintProducts, MintInversion } from '@/redux/Minted/MintedAction';
import { useDispatch, useSelector } from 'react-redux';

const PriceOptions = [
  {
    name: 'Fixed price',
    value: 'fixed',
    icon: <TagIcon className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  {
    name: 'Open for bids',
    value: 'bids',
    icon: <LoopIcon className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  {
    name: 'Timed auction',
    value: 'auction',
    icon: <SandClock className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
];

const NftsOptions = [
  {
    id: 1,
    name: 'Productos',
    value: 'productos',
    //icon: <Ethereum />,
  },
  {
    id: 2,
    name: 'Inversion',
    value: 'inversion',
    //icon: <Flow />,
  },
];

const NftsInversionOptions = [
  {
    id: 1,
    name: '1K',
    value: 1,
    //icon: <Ethereum />,
  },
  {
    id: 2,
    name: '2K',
    value: 2,
    //icon: <Flow />,
  },
  {
    id: 3,
    name: '3K',
    value: 3,
    //icon: <Ethereum />,
  },
  {
    id: 4,
    name: '4K',
    value: 4,
    //icon: <Flow />,
  },
  {
    id: 5,
    name: '5K',
    value: 5,
    //icon: <Ethereum />,
  },
];

type PriceTypeProps = {
  value: string;
  onChange: (value: string) => void;
};

function PriceType({ value, onChange }: PriceTypeProps) {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="grid grid-cols-3 gap-3"
    >
      {PriceOptions.map((item, index) => (
        <RadioGroup.Option value={item.value} key={index}>
          {({ checked }) => (
            <span
              className={`relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-solid bg-white text-center text-sm font-medium tracking-wider shadow-card transition-all hover:shadow-large dark:bg-light-dark ${
                checked ? 'border-brand' : 'border-white dark:border-light-dark'
              }`}
            >
              <span className="relative flex h-28 flex-col items-center justify-center gap-3 px-2 text-center text-xs uppercase sm:h-36 sm:gap-4 sm:text-sm">
                {item.icon}
                {item.name}
              </span>
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

const CreateNFTPage: NextPageWithLayout = () => {
  const numero = 1000000; //cambiar
  //let [publish, setPublish] = useState(true);
  //let [explicit, setExplicit] = useState(false);
  //let [unlocked, setUnlocked] = useState(false);
  //let [priceType, setPriceType] = useState('fixed');
  const dispatch = useDispatch<AppDispatch>();
  const [nombre, setNombre] = useState('PandoraX');
  const [url, setUrl] = useState(
    'https://gateway.pinata.cloud/ipfs/QmZWEA9aiEE4E1iWwS5KGU8mVhGhNESrueGArXsHBjZgoE'
  );
  const [descripcion, setDescripcion] = useState('NFts Products');
  const [supply, setSupply] = useState(0);
  let [tipo, setTipo] = useState(NftsOptions[0]);
  let [tipoInv, setTipoInv] = useState(NftsInversionOptions[0]);
  let [price, setPrice] = useState(0);
  const {
    productoMinter,
    inversionMinter,
    isConnect,
    accountAddress,
    usdtContract,
    tokenContract,
  } = useSelector((state) => state.blockchain);
  const Usuario = useSelector((state: any) => state.Usuario);
  const [status, setStatus] = useState(0);

  let Inversiones = 0;
  let Productos = 0;

  const productosAR = [
    {
      Nombre: 'Podcast-Streaming',
      img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Streaming%20%282%29.gif',
      precio: 0,
      tipo: 'PS',
      tipoN: 1,
      descripcion:
        'Los contenidos gratuitos de Pandora X, en sus diferntes formatos visuales y audiovisuales estan repletos de ideas importantes para crear riqueza en el mundo criptográfico. Además, será una herramienta poderosa para acercar a potenciales estudiantes, inversores y coleccionistas al ecosistema PX.',
    },
    {
      Nombre: 'Podcast-Academia',
      img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Podcast-Academia%20%281%29.gif',
      precio: 0,
      tipo: 'PA',
      tipoN: 2,
      descripcion:
        ' Nuestra Academia contará con cursos y capacitaciones desde el nivel básico hasta niveles más avanzados, donde nuestros participantes podrán acceder a estos contenidos que fomentan el conocimiento y aprendizaje sobre el mercado cripto.',
    },
    {
      Nombre: ' NFT Studio',
      img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20NFT%20Studio%20%282%29.gif',
      precio: 0,
      tipo: 'NS',
      tipoN: 3,
      descripcion:
        'Nos estamos preparando para el futuro. Pandora X Studios es nuestro brazo dedicado al mundo Web 3.0 y los Tokens no Fungibles, nuestra comunidad podrá tener acceso a nuestras colecciones en preventa y artículos NFT de manera exclusiva. Además de conocer de primera mano los proyectos asociados a nuestro Studio.',
    },
    {
      Nombre: 'Investing Value',
      img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Investing%20Value%20%282%29.gif',
      precio: 0,
      tipo: 'IV',
      tipoN: 4,
      descripcion:
        'Nuestra estrategia de inversión se basa en el Investing Value, es donde nuestra comunidad puede de forma individual llevar su portafolio y puede ver de primera mano como estamos manejando nuestro Portafolio para que puedan copiar y pegar nuestros pasos como inversores inteligentes. Puntos de compra y venta a lo largo de los periodos. Donde cada uno asume la responsabilidad de sus acciones nosotros nos convertimos en esa guía para tomar decisiones.',
    },
    {
      Nombre: 'Comunidad Privada',
      img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Privada.gif',
      precio: 0,
      tipo: 'CP',
      tipoN: 5,
      descripcion:
        'Ingresa a nuestra comunidad privada de forma gratuita o regresa para hacerte un miembro activo.En la comunidad aprendar mucho de forma gratuita pero si quieres tener contenido explusivo opta por otra de nuestras opciones.',
    },
    {
      Nombre: 'Comunidad Gratuita',
      img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Comunidad%20Gratuita.gif',
      precio: 0,
      tipo: 'CG',
      tipoN: 6,
      descripcion:
        'Ingresa a nuestra comunidad privada de forma gratuita o regresa para hacerte un miembro activo.En la comunidad aprendar mucho de forma gratuita pero si quieres tener contenido explusivo opta por otra de nuestras opciones.',
    },
    {
      Nombre: 'Coaching',

      precio: 0,
      img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Coaching.gif',
      tipo: 'NC',
      tipoN: 7,
      descripcion:
        'En este programa de entrenamiento, el inversor o coleccionista puede tener una o más secciones, con una duración de 45 minutos cada una, con alguno de nuestros Coaches acreditados, para iniciar en el mundo cripto, analizar su Portafolio o simplemente hablar sobre algún tema relevante del mercado cripto.',
    },
    {
      Nombre: 'Alpha Report',
      img: 'https://gateway.pinata.cloud/ipfs/QmPhafbTm1y5M9o4kCwkDPorvgzYQK9QwbioNf4X8Jo4Tf/Pandora%20X%20NFT%20-%20Alpha%20Report.gif',
      precio: 0,
      tipo: 'AP',
      tipoN: 8,
      descripcion:
        'Nuestro Alpha Report, se trata de un reporte mensual que realizamos para nuestra comunidad, en el cual hacemos (compilamos diferentes análisis del mercado que realizamos, gracias a la experiencia que hemos adquirido durante nuestros años en el mundo cripto).',
    },
  ];

  const inversionesAR = [
    {
      Nombre: 'UBX Card 100',
      img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100.gif',
      precio: 0,
      tipo: '100',
      tipoN: 1,
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
    },
    {
      Nombre: 'UBX Card 1K',
      img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%201k%20%281%29.gif',
      precio: 0,
      tipo: '1K',
      tipoN: 2,
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
    },
    {
      Nombre: 'UBX Card 5K',
      img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%205k.gif',
      precio: 0,
      tipo: '5K',
      tipoN: 3,
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
    },
    {
      Nombre: 'UBX Card 10K',
      img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2010k.gif',
      precio: 0,
      tipo: '10K',
      tipoN: 4,
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
    },
    {
      Nombre: 'UBX Card 20K',
      img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2020k.gif',
      precio: 0,
      tipo: '20K',
      tipoN: 5,
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
    },
    {
      Nombre: 'UBX Card 50K',
      img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%2050k.gif',
      precio: 0,
      tipo: '50K',
      tipoN: 6,
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
    },
    {
      Nombre: 'UBX Card 100K',
      img: 'https://gateway.pinata.cloud/ipfs/QmNZiL3puhFyLYqqX9rL8WD9GoWDbBfuQn6azgZ1MFaCK6/UBX%20Card%20-%20100k.gif',
      precio: 0,
      tipo: '100K',
      tipoN: 7,
      descripcion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis rerum veniam, qui est id maxime tenetur minima fugiat quos debitis sunt corporis cumque molestiae alias quasi voluptatem autem repellat obcaecati.',
    },
  ];

  const getProductos = async () => {
    fetch(`https://shark-app-w9pvy.ondigitalocean.app/api/getProducto`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        Productos = response.length;
      })
      .catch((error) => console.error('Error:', error));
  };

  const getInversiones = async () => {
    fetch(`https://shark-app-w9pvy.ondigitalocean.app/api/getInversion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        Inversiones = response.length;
      })
      .catch((error) => console.error('Error:', error));
  };

  const CrearProducto = async (objeto) => {
    fetch(`https://shark-app-w9pvy.ondigitalocean.app/api/CrearNftProducto`, {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
        if (res.status == 200) {
          setStatus(res.status);
        } else {
          setStatus(100);
        }
      })
      .then(() => {})
      .catch((error) => console.error('Error:', error));
  };

  const CrearInversion = async (objeto) => {
    fetch(`https://shark-app-w9pvy.ondigitalocean.app/api/CrearNftInversion`, {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
        if (res.status == 200) {
          setStatus(res.status);
        } else {
          setStatus(100);
        }
      })
      .then(() => {})
      .catch((error) => console.error('Error:', error));
  };

  const createNFTs = async () => {
    let i;

    await CrearProducto(productosAR[7]);

    /*if (tipo.value == 'productos') {
      let i;
      const txResult = await productoMinter.Mint(supply, price);
      console.log(txResult);
      await txResult.wait();
      console.log(txResult);
      if (txResult.status == 1) {
        for (i = 0; i < supply; i++) {
          const NFT = {
            name: `${nombre} #${ i + 1}`,
            description: descripcion,
            image: url,
            dna: Productos + i,
            edition: Productos + i,
            number: Productos + i,
          };
          await CrearProducto(NFT);
        }
      } else {
        setStatus(100);
      }
    } else if (tipo.value === 'inversion') {
      let i;
      const txResult = await inversionMinter.Mint(supply, price);
      await txResult.wait();
      if (txResult.status == 1) {
        for (i = 0; i < supply; i++) {
          const NFT = {
            name: `${nombre} #${i + 1}`,
            description: descripcion,
            image: url,
            dna: Inversiones + i,
            edition: Inversiones + i,
            number: Inversiones + i,
            tipo: tipoInv
          };
          await CrearInversion(NFT);
        }
      } else {
        setStatus(100);
      }
    }*/
  };
  useEffect(() => {
    if (Usuario.rol !== 'Admin') {
      window.location.href = '/';
    }
    /*getInversiones();
    getProductos();*/
  });

  useEffect(() => {
    setTimeout(() => {
      setStatus(0);
    }, 5000);
  }, [status]);

  return (
    <>
      <NextSeo
        title="Create NFT"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
        <h2 className="mb-6 text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-10 sm:text-2xl">
          Create New Item
        </h2>
        <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Name */}
            <div className="mb-8">
              <InputLabel title="Name" important />
              <Input
                type="text"
                placeholder="Item name"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
              />
            </div>

            {/* External link */}
            <div className="mb-8">
              <InputLabel
                title="URL imagen"
                //subTitle="We will include a link to this URL on this item's detail page, so that users can click to learn more about it."
              />
              <Input
                type="text"
                placeholder="https://yourimage.io/item/123"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <InputLabel
                title="Description"
                subTitle="The description will be included on the item's detail page underneath its image."
              />
              <Textarea
                placeholder="Provide a detailed description of your item"
                onChange={(e) => setDescripcion(e.target.value)}
                value={descripcion}
              />
            </div>
            {/* File uploader */}
            {/*<div className="mb-8">
              <InputLabel title="Upload file" important />
              <Uploader />
              </div>*/}

            {/* NFT price type */}
            {/*<div className="flex items-center justify-between gap-4">
              <InputLabel
                title="Put on marketplace"
                subTitle="Enter price to allow users instantly purchase your NFT"
              />
              <div className="shrink-0">
                <Switch checked={publish} onChange={() => setPublish(!publish)}>
                  <div
                    className={cn(
                      publish ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700',
                      'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                    )}
                  >
                    <span
                      className={cn(
                        publish
                          ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                          : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                        'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                      )}
                    />
                  </div>
                </Switch>
              </div>
            </div>
          {publish && <PriceType value={priceType} onChange={setPriceType} />}*/}
            <div className="mb-8">
              <InputLabel
                title="Supply"
                subTitle="The number of items that can be minted."
              />

              <Input
                type="number"
                placeholder="1"
                onChange={(e) => setSupply(e.target.value)}
                value={supply}
              />
              <div className="mt-4">
                <InputLabel title="Price" />
                <Input
                  type="number"
                  placeholder="1"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="mb-8">
                <InputLabel title="Tipo" />
                <div className="relative">
                  <Listbox value={tipo} onChange={setTipo}>
                    <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                      <div className="flex items-center">
                        {/*<span className="ltr:mr-2 rtl:ml-2">{tipo.icon}</span>*/}
                        {tipo.name}
                      </div>
                      <ChevronDown />
                    </Listbox.Button>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                        {NftsOptions.map((option) => (
                          <Listbox.Option key={option.id} value={option}>
                            {({ selected }) => (
                              <div
                                className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                                  selected
                                    ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                                }`}
                              >
                                <span className="ltr:mr-2 rtl:ml-2">
                                  {option.icon}
                                </span>
                                {option.name}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </Listbox>
                </div>
              </div>

              {tipo.value == 'inversion' && (
                <div className="mb-8">
                  <InputLabel title="Categoria" />
                  <div className="relative">
                    <Listbox value={tipoInv} onChange={setTipoInv}>
                      <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                        <div className="flex items-center">
                          {/*<span className="ltr:mr-2 rtl:ml-2">{tipo.icon}</span>*/}
                          {tipoInv.name}
                        </div>
                        <ChevronDown />
                      </Listbox.Button>
                      <Transition
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                          {NftsInversionOptions.map((option) => (
                            <Listbox.Option key={option.id} value={option}>
                              {({ selected }) => (
                                <div
                                  className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                                    selected
                                      ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                                  }`}
                                >
                                  <span className="ltr:mr-2 rtl:ml-2">
                                    {option.icon}
                                  </span>
                                  {option.name}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  </div>
                </div>
              )}

              <Button shape="rounded" onClick={() => createNFTs()}>
                CREATE
              </Button>
            </div>
          </div>

          <div className="hidden flex-col lg:flex">
            {/* NFT preview */}
            <InputLabel title="Preview" />
            <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
              {/*<div className="flex items-center p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
                <Avatar
                  size="sm"
                  image={AuthorImage}
                  alt="Cameronwilliamson"
                  className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
                />
                @Cameronwilliamson
            </div>*/}
              <div className="relative block w-full pb-full">
                <Image
                  //src={NFT1}
                  src={url}
                  //placeholder="blur"
                  layout="fill"
                  objectFit="cover"
                  alt="Pulses of Imagination #214"
                />
              </div>
              <div className="p-5">
                <div className="text-sm font-medium text-black dark:text-white">
                  {nombre}
                </div>
                <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  1.30 USDT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        {/*<div className="mb-8">
          <InputLabel title="Price" important />
          <Input
            min={0}
            type="number"
            placeholder="Enter your price"
            inputClassName="spin-button-hidden"
          />
          </div>*/}

        {/* Name */}
        {/*<div className="mb-8">
          <InputLabel title="Name" important />
          <Input type="text" placeholder="Item name" />
        </div>*/}

        {/* External link */}
        {/*<div className="mb-8">
          <InputLabel
            title="URL imagen"
            //subTitle="We will include a link to this URL on this item's detail page, so that users can click to learn more about it."
          />
          <Input type="text" placeholder="https://yourimage.io/item/123" />
      </div>*/}

        {/* Description */}
        {/*<div className="mb-8">
          <InputLabel
            title="Description"
            subTitle="The description will be included on the item's detail page underneath its image."
          />
          <Textarea placeholder="Provide a detailed description of your item" />
        </div>*/}

        {/* Unlockable content */}
        {/*<div className="mb-3">
          <ToggleBar
            title="Unlockable Content"
            subTitle="Include unlockable content that can only be revealed by the owner of the item."
            icon={<Unlocked />}
            checked={unlocked}
            onChange={() => setUnlocked(!unlocked)}
          >
            {unlocked && (
              <Textarea placeholder="Enter content (access key, code to redeem, link to a file, etc.)" />
            )}
          </ToggleBar>
            </div>*/}

        {/* Explicit content */}
        {/*<div className="mb-8">
          <ToggleBar
            title="Explicit &amp; Sensitive Content"
            subTitle="Set this item as explicit and sensitive content"
            icon={<Warning />}
            checked={explicit}
            onChange={() => setExplicit(!explicit)}
          />
          </div>*/}

        {/* Supply */}
        {/*<div className="mb-8">
          <InputLabel
            title="Supply"
            subTitle="The number of items that can be minted."
          />
          <Input type="number" placeholder="1" />
        </div>*/}

        {/* Blockchain */}
        {/*<div className="mb-8">
          <InputLabel title="Tipo" />
          <div className="relative">
            <Listbox value={blockchain} onChange={setBlockChain}>
              <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                <div className="flex items-center">
                  {<span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span>}
                  {blockchain.name}
                </div>
                <ChevronDown />
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                  {NftsOptions.map((option) => (
                    <Listbox.Option key={option.id} value={option}>
                      {({ selected }) => (
                        <div
                          className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                            selected
                              ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                          }`}
                        >
                          <span className="ltr:mr-2 rtl:ml-2">
                            {option.icon}
                          </span>
                          {option.name}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div> */}

        {/*<Button shape="rounded">CREATE</Button>*/}
      </div>

      {status == 200 && (
        <div
          className="absolute top-24 right-[680px] mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg bg-green-200 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Nft creado correctamente</span>
        </div>
      )}

      {status == 100 && (
        <div
          className="absolute top-24 right-[680px] mb-4 mt-[0px] w-[300px] justify-center self-center rounded-lg bg-red-200  p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">operacion fallo en el minteo</span>
        </div>
      )}
    </>
  );
};

CreateNFTPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateNFTPage;
