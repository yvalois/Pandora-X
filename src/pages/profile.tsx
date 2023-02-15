import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';
import AuthorInformation from '@/components/author/author-information';
import ProfileTab from '@/components/profile/profile-tab';
import ProfileTabUser from '@/components/profile/ProfileTabUser';
import AvatarP from '@/components/ui/AvatarP';
// static data
import { authorData } from '@/data/static/author';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '@/assets/images/Banner/Banner-Profile.jpg';
import PeerX from '@/assets/images/profile/PEER-X.jpg';
import BlockCreator from '@/assets/images/profile/BLOCKCREATOR.jpg';
import BlockElite from '@/assets/images/profile/BLOCKELITE.jpg';
import BlockMaster from '@/assets/images/profile/BLOCKMASTER.jpg';
import Generic from '@/assets/images/profile/GENERIC.jpg';
import edit from '@/assets/images/edit-svgrepo-com.svg';
import Input from '@/components/ui/forms/input';
import {
  uFrench,
  update,
  uStakingF,
} from '@/redux/Blockchain/blockchainAction';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { provider } from '@/NFTROL';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const AuthorProfilePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(authorData.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  };

  const Usuario = useSelector((state: any) => state.Usuario);
  const { accountAddress } = useSelector((state) => state.blockchain);
  const [copiado, setCopiado] = useState(false);
  const [link, setLink] = useState('');
  const [editIsActivated, setEditIsActivated] = useState(false);
  const [editIsActivatedP, setEditIsActivatedP] = useState(false);
  const [editIsActivatedB, setEditIsActivatedB] = useState(false);
  const [prevBanner, setPrevBanner] = useState('');
  const [prevProfile, setPrevProfile] = useState('');
  const [newName, setNewName] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

  const editphotoB = async (e) => {
    const file = e.target.files[0];
    const base64 = await encodeFileAsBase64URL(file);
    setPrevBanner(base64);
    activateB();
  };

  const editphotoP = async (e) => {
    const file = e.target.files[0];
    const base64 = await encodeFileAsBase64URL(file);
    setPrevProfile(base64);
    activateP();
  };

  const activate = () => {
    if (!editIsActivated) {
      setEditIsActivated(true);
    } else {
      setEditIsActivated(false);
    }
  };

  const activateP = () => {
    if (!editIsActivatedP) {
      setEditIsActivatedP(true);
    } else {
      setEditIsActivatedP(false);
      setPrevProfile('');
    }
  };

  const activateB = () => {
    if (!editIsActivatedB) {
      setEditIsActivatedB(true);
    } else {
      setEditIsActivatedB(false);
      setPrevBanner('');
    }
  };

  useEffect(() => {
    if (
      Usuario.rol !== 'Admin' &&
      Usuario.rol !== 'usuario' &&
      Usuario.rol !== 'cliente'
    ) {
      window.location.href = '/';
    }
  });

  const UploadBanner = async () => {
    const hola = prevBanner.toString();
    const banner = {
      banner: hola,
    };

    fetch(`${process.env.BACKEND_API}/updatebanner/${accountAddress}`, {
      method: 'PUT',
      body: JSON.stringify(banner),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();

        activateB();
        dispatch(update(accountAddress));
      })
      .then(() => {})
      .catch((error) => console.error('Error:', error));
  };

  const UploadNombre = async () => {
    const name = {
      nombre: newName,
    };
    fetch(`${process.env.BACKEND_API}/updatename/${accountAddress}`, {
      method: 'PUT',
      body: JSON.stringify(name),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();

        activate();
        dispatch(update(accountAddress));
      })
      .then(() => {})
      .catch((error) => console.error('Error:', error));
  };

  const UploadProfile = async () => {
    console.log(prevProfile);
    const aux = prevProfile.toString();
    const perfil = {
      perfil: aux,
    };
    fetch(`${process.env.BACKEND_API}/updateprofile/${accountAddress}`, {
      method: 'PUT',
      body: JSON.stringify(perfil),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();

        activateP();
        dispatch(update(accountAddress));
      })
      .then(() => {})
      .catch((error) => console.error('Error:', error));
  };

  const copiar = () => {
    const aux = window.location.href;
    const a = aux.split('profile');
    const e = a[0];
    setLink(e);
    navigator.clipboard.writeText(`${e}principal/${accountAddress}`);

    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopiado(false);
      window.localStorage.removeItem('Wallet');
    }, 2000);
  }, [copiado]);

  const { isConnect } = useSelector((state) => state.blockchain);

  const { disconnectWallet } = useContext(WalletContext);
  useEffect(() => {
    if (!isConnect) {
      disconnectWallet();
    }
  }, []);

  useEffect(() => {
    //dispatch(uFrench(accountAddress));
    dispatch(uStakingF(accountAddress));
  }, []);

  return (
    <>
      <NextSeo
        title="Profile"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      {/* Profile Cover Image */}
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 sm:w-[100%] md:h-64 md:w-[100%] xl:h-80 xl:w-[100%] 2xl:h-96 3xl:h-[448px]">
        <div className="relative h-full w-full">
          {Usuario.banner?.length > 0 && prevBanner.length == 0 ? (
            <Image
              src={Usuario.banner}
              //placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt="Cover Image"
            />
          ) : Usuario.banner?.length > 0 && prevBanner.length > 0 ? (
            <Image
              src={prevBanner}
              //placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt="Cover Image"
            />
          ) : (
            <Image
              src={Banner}
              //placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt="Cover Image"
            />
          )}

          <div
            aria-hidden="true"
            className="group absolute inset-0 hidden h-full w-full cursor-pointer items-center  justify-center opacity-60 transition duration-500 hover:bg-gray-200 lg:flex xl:flex"
          >
            <Button className="z-10 hidden group-hover:block">
              <label htmlFor="bgfile">Cambiar Imagen</label>
            </Button>

            <input
              type="file"
              id="bgfile"
              onChange={(e) => {
                editphotoB(e);
              }}
              className="  file:border-1 absolute z-10 hidden text-transparent opacity-0 file:rounded file:border-gray-400 group-hover:block"
            />
          </div>
        </div>
        {/* <div className="relative h-full w-full">
          {Usuario.banner?.length > 0 && prevBanner.length == 0 ? (
            <Image
              src={Usuario.banner}
              //placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt="Cover Image"
            />
          ) : Usuario.banner?.length > 0 && prevBanner.length > 0 ? (
            <Image
              src={prevBanner}
              //placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt="Cover Image"
            />
          ) : (
            <Image
              src={Banner}
              //placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt="Cover Image"
            />
          )}

          <div
            aria-hidden="true"
            className="group absolute inset-0 hidden h-full w-full cursor-pointer items-center  justify-center opacity-60 transition duration-500 hover:bg-gray-200 lg:flex xl:flex"
          >
            <Button className="z-10 hidden group-hover:block">
              <label htmlFor="bgfile">Cambiar Imagen</label>
            </Button>

            <input
              type="file"
              id="bgfile"
              onChange={(e) => {
                editphotoB(e);
              }}
              className="  file:border-1 absolute z-10 hidden text-transparent opacity-0 file:rounded file:border-gray-400 group-hover:block"
            />

        {<img className="hidden group-hover:block w-[5%]" src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />}
          </div>
        </div>  */}
      </div>

      {/* Profile Container */}
      <div className="justify mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        {/* Profile Image */}
        {Usuario.perfil?.length == 0 && Usuario.rango == 'peerx' ? (
          <div className="row flex w-full">
            <AvatarP
              size="xl"
              image={PeerX}
              alt="Author"
              className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
              activate={activateP}
              is={editIsActivatedP}
              setPrevProfile={setPrevProfile}
              prevProfile={prevProfile}
            />
            {editIsActivatedP && (
              <div>
                <Button onClick={UploadProfile} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateP}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
            {editIsActivatedB && (
              <div>
                <Button onClick={UploadBanner} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateB}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        ) : Usuario.perfil?.length == 0 && Usuario.rango == 'blockelite' ? (
          <div className="row flex w-full">
            <AvatarP
              size="xl"
              image={BlockElite}
              alt="Author"
              className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
              activate={activateP}
              setPrevProfile={setPrevProfile}
              prevProfile={prevProfile}
            />
            {editIsActivatedP && (
              <div>
                <Button onClick={UploadProfile} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateP}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
            {editIsActivatedB && (
              <div>
                <Button onClick={UploadBanner} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateB}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        ) : Usuario.perfil?.length == 0 && Usuario.rango == 'blockmaster' ? (
          <div className="row flex w-full">
            <AvatarP
              size="xl"
              image={BlockMaster}
              alt="Author"
              className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
              activate={activateP}
              setPrevProfile={setPrevProfile}
              prevProfile={prevProfile}
            />{' '}
            {editIsActivatedP && (
              <div>
                <Button onClick={UploadProfile} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateP}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
            {editIsActivatedB && (
              <div>
                <Button onClick={UploadBanner} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateB}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        ) : Usuario.perfil?.length == 0 && Usuario.rango == 'blockcreator' ? (
          <div className="row flex w-full">
            <AvatarP
              size="xl"
              image={BlockCreator}
              alt="Author"
              className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
              activate={activateP}
              setPrevProfile={setPrevProfile}
              prevProfile={prevProfile}
            />{' '}
            {editIsActivatedP && (
              <div>
                <Button onClick={UploadProfile} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateP}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
            {editIsActivatedB && (
              <div>
                <Button onClick={UploadBanner} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateB}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        ) : Usuario.perfil?.length > 0 ? (
          <div className="row flex w-full">
            <AvatarP
              size="xl"
              image={Usuario.perfil}
              alt="Author"
              className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
              activate={activateP}
              setPrevProfile={setPrevProfile}
              prevProfile={prevProfile}
            />{' '}
            {editIsActivatedP && (
              <div>
                <Button onClick={UploadProfile} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateP}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
            {editIsActivatedB && (
              <div>
                <Button onClick={UploadBanner} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateB}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="row flex w-full">
            <AvatarP
              size="xl"
              image={Generic}
              alt="Author"
              className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
              activate={activateP}
              setPrevProfile={setPrevProfile}
              prevProfile={prevProfile}
            />{' '}
            {editIsActivatedP && (
              <div>
                <Button onClick={UploadProfile} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateP}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
            {editIsActivatedB && (
              <div>
                <Button onClick={UploadBanner} className="rounded-r-sm">
                  Aceptar
                </Button>
                <Button
                  onClick={activateB}
                  className="rounded-l-sm bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        )}
        {/* Profile Info */}
        <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row xl:pt-12">
          <div className=" shrink-2  .0.order-dashed flex w-full justify-center border-gray-200  dark:border-gray-700 md:block md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 xl:ltr:pr-14 xl:rtl:pl-14 2xl:w-80 3xl:w-96 3xl:ltr:pr-16 3xl:rtl:pl-16">
            <div className="mb-4 w-full md:mb-0 md:text-center ltr:md:text-left rtl:md:text-right ">
              {/*Name */}
              <div className="flex w-full justify-start">
                {!editIsActivated && (
                  <div className="row flex items-center space-x-2">
                    <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
                      {Usuario.nombre}
                    </h2>

                    <div className="h-4 w-4 cursor-pointer">
                      {!editIsActivated && (
                        <div onClick={activate}>
                          <Image
                            className="dark:color-white h-2 dark:text-white"
                            src={edit}
                            alt="Criptic"
                            priority
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {editIsActivated && (
                  <div className="column w-full">
                    <div>
                      <Input
                        onChange={(e) => {
                          setNewName(e.target.value);
                        }}
                        placeholder="Nombre"
                      />
                    </div>

                    <div className="mt-2 flex w-full justify-center">
                      <Button
                        onClick={UploadNombre}
                        size="small"
                        className="w-[40%] rounded-r-sm text-sm"
                      >
                        Aceptar
                      </Button>
                      <Button
                        size="small"
                        onClick={activate}
                        className="h-10 w-[40%] rounded-l-sm  bg-gray-500 text-sm"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex w-full justify-start">
                <div className="justify-start">
                  {Usuario.rol == 'usuario' && (
                    <div className="mt-5 inline-flex h-9 items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6">
                      <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                        Referido
                      </div>
                      <div className="text w-28 grow-0 truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:w-32 sm:text-sm">
                        {`${link}principal/${accountAddress}`}
                      </div>
                      <div
                        className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        title="Copy Address"
                        onClick={copiar}
                      >
                        {copyButtonStatus ? (
                          <Check className="h-auto w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-auto w-3.5" />
                        )}
                      </div>
                    </div>
                  )}

                  {Usuario.rol == 'Admin' && (
                    <div className=" mt-5 inline-flex h-9 items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6">
                      <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                        Referido
                      </div>
                      <div className="text w-28 grow-0 truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:w-32 sm:text-sm">
                        {`${link}principal/${accountAddress}`}
                      </div>
                      <div
                        className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        title="Copy Address"
                        onClick={copiar}
                      >
                        {copyButtonStatus ? (
                          <Check className="h-auto w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-auto w-3.5" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {
              <AuthorInformation
                className="hidden md:block"
                data={authorData}
              />
            }
          </div>

          <div className=" flex-column grow justify-center align-middle md:ml-6 ">
            {Usuario.rol == 'usuario' || Usuario.rol == 'Admin' ? (
              <ProfileTabUser />
            ) : (
              <ProfileTab />
            )}
          </div>
          <AuthorInformation data={authorData} />
        </div>
      </div>
      {copiado && (
        <div
          className="absolute top-[60px] left-[685px] mb-4 ml-[60px] mt-[30px] flex w-[200px] justify-center self-center rounded-lg bg-green-100 p-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="text-center font-medium">Link copiado</span>
        </div>
      )}
    </>
  );
};

AuthorProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AuthorProfilePage;
function dispatch(arg0: (dispatch: any) => Promise<void>) {
  throw new Error('Function not implemented.');
}
