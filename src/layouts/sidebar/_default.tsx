import cn from 'classnames';
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import routes from '@/config/routes';
import { useDrawer } from '@/components/drawer-views/context';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { Close } from '@/components/icons/close';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { InfoCircle } from '@/components/icons/info-circle';
import { useDispatch, useSelector } from 'react-redux';
import PeerX from '@/assets/images/profile/PEER-X.jpg';
import BlockCreator from '@/assets/images/profile/BLOCKCREATOR.jpg';
import BlockElite from '@/assets/images/profile/BLOCKELITE.jpg';
import BlockMaster from '@/assets/images/profile/BLOCKMASTER.jpg';
import Generic from '@/assets/images/profile/GENERIC.jpg';
import NoProfile from '@/assets/images/profile/NoProfile.jpg';

//images
import AuthorImage from '@/assets/images/author.jpg';
import { useEffect, useState } from 'react';
import AnchorLink from '@/components/ui/links/anchor-link';

export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
  {
    name: 'NFT Marketplace',
    icon: <CompassIcon />,
    href: routes._profile,
  },
  {
    name: 'Comunidad',
    icon: <VoteIcon />,
    href: routes.comunidad,
    dropdownItems: [
      {
        name: 'Comunidad Gratuita',
        href: routes.cg,
      },
      {
        name: 'Comunidad Privada',
        href: routes.comunidadp,
      },
      {
        name: 'Academia X',
        href: routes.academiaX,
      },
      {
        name: 'Alpha Report',
        href: routes.alphaR,
      },
      {
        name: 'Investing Value',
        href: routes.investingV,
      },
      {
        name: 'Coaching',
        href: routes.coaching,
      },
      {
        name: 'Podcast',
        href: routes.podcast,
      },
      {
        name: 'Nft Studio',
        href: routes.nft,
      },
    ],
  },
  {
    name: 'Inversiones',
    icon: <VoteIcon />,
    href: routes.inversion,
    dropdownItems: [
      {
        name: '100',
        href: routes.cien,
      },
      {
        name: '1k',
        href: routes.unK,
      },
      {
        name: '5k',
        href: routes.cincoK,
      },
      {
        name: '10K',
        href: routes.diezK,
      },
      {
        name: '20k',
        href: routes.veinteK,
      },
      {
        name: '50k',
        href: routes.cincuentaK,
      },
      {
        name: '100k',
        href: routes.cienK,
      },
    ],
  },
  {
    name: 'Referidos',
    icon: <PlusCircle />,
    href: routes.createuser,
  },

  {
    name: 'Admin Panel',
    icon: <PlusCircle />,
    href: routes.admin,
  },

  {
    name: 'Staking',
    icon: <PlusCircle />,
    href: '#',
    dropdownItems: [
      {
        name: 'Stakear Frenchies',
        href: routes.stak,
      },
      {
        name: 'Stakear Inversion',
        href: '/profile?view=staking',
      },
    ],
  },
  {
    name: 'En staking',
    icon: <PlusCircle />,
    href: '#',
    dropdownItems: [
      {
        name: 'Frenchies en Staking',
        href: routes.staking,
      },
    ],
  },
  {
    name: 'Panel de retiro',
    icon: <PlusCircle />,
    href: routes.panel,
  },
];

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const UsuarioR = useSelector((state: any) => state.blockchain.rol);
  const { closeDrawer } = useDrawer();
  const Usuario = useSelector((state: any) => state.Usuario);

  const {
    inventoryp,
    inventoryi,
    productoMinter,
    accountAddress,
    balanceI,
    isConnect,
    inversionMinter,
    inventoryf,
    inventorysf,
    inventorys,
  } = useSelector((state: any) => state.blockchain);
  const [nos, setNos] = useState(false);
  const [noi, setNoi] = useState(false);

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className
      )}
    >
      <Logo />

      <div className="relative mb-12 flex h-24 w-full items-center justify-between overflow-hidden px-6 py-4 2xl:px-8 ">
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-5 2xl:px-8">
          {isConnect &&
          Usuario.perfil?.length == 0 &&
          Usuario.rango == 'peerx' ? (
            <AuthorCard image={PeerX} name={Usuario.nombre} role={UsuarioR} />
          ) : isConnect &&
            Usuario.perfil?.length == 0 &&
            Usuario.rango == 'blockelite' ? (
            <AuthorCard
              image={BlockElite}
              name={Usuario.nombre}
              role={UsuarioR}
            />
          ) : isConnect &&
            Usuario.perfil?.length == 0 &&
            Usuario.rango == 'blockmaster' ? (
            <AuthorCard
              image={BlockMaster}
              name={Usuario.nombre}
              role={UsuarioR}
            />
          ) : isConnect &&
            Usuario.perfil?.length == 0 &&
            Usuario.rango == 'blockcreator' ? (
            <AuthorCard
              image={BlockCreator}
              name={Usuario.nombre}
              role={UsuarioR}
            />
          ) : isConnect && Usuario.perfil?.length > 0 ? (
            <AuthorCard
              image={Usuario.perfil}
              name={Usuario.nombre}
              role={UsuarioR}
            />
          ) : isConnect ? (
            <AuthorCard image={Generic} name={Usuario.nombre} role={UsuarioR} />
          ) : (
            !isConnect && (
              <AuthorCard
                image={Generic}
                name={'Inicia Sesion'}
                role={'No haz iniciado sesion'}
              />
            )
          )}

          <div className="mt-12">
            {menuItems.map((item, index) =>
              (UsuarioR !== 'Admin' && item.name == 'Referidos') ||
              (UsuarioR !== 'Admin' && item.name == 'Crear NFT') ||
              (UsuarioR !== 'Admin' && item.name == 'Admin Panel') ||
              (UsuarioR !== 'Admin' &&
                UsuarioR !== 'usuario' &&
                UsuarioR !== 'cliente' &&
                item.name == 'Profile') ||
              (inventoryf.length == 0 &&
                inventorys.length == 0 &&
                item.name == 'Staking') ||
              (inventorysf.length == 0 && item.name == 'En staking') ||
              (UsuarioR !== 'Admin' &&
                UsuarioR !== 'usuario' &&
                item.name == 'Inversiones') ||
              (UsuarioR !== 'Admin' && item.name == 'Panel de retiro') ? (
                <div key={index}></div>
              ) : (
                <MenuItem
                  key={index}
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                  dropdownItems={item.dropdownItems}
                />
              )
            )}
          </div>
        </div>

        <div className="ml-10 h-[50%] w-[80%] cursor-pointer bg-blue-200">
          <a
            href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFVhreHv0g&#x2F;view?utm_content=DAFVhreHv0g&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
            target="_blank"
            rel="noopener noreferrer"
            className=" absolute h-full w-full cursor-pointer"
          />
          <div
            className=" relative; pt-[190.0000%]; padding-bottom: 0;
 box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px;
 will-change: transform; z-100 h-[100%] w-[100%]"
          >
            <iframe
              loading="lazy"
              className=" absolute; t-0; l-0 none m-0; h-[100%] w-[100%] p-0"
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFVhreHv0g&#x2F;view?embed"
            ></iframe>
          </div>
        </div>
      </Scrollbar>
    </aside>
  );
}
