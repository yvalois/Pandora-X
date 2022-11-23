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

//images
import AuthorImage from '@/assets/images/author.jpg';
import { useEffect } from 'react';

export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
    /*dropdownItems: [
      {
        name: 'Modern',
        href: routes.home,
      },
      {
        name: 'Minimal',
        href: routes.minimal,
      },
      {
        name: 'Retro',
        href: routes.retro,
      },
      {
        name: 'Classic',
        href: routes.classic,
      },
    ],*/
  },
  /*{
    name: 'Farm',
    icon: <FarmIcon />,
    href: routes.farms,
  },*/
  /*{
    name: 'Swap',
    icon: <ExchangeIcon />,
    href: routes.swap,
  },*/
  /*{
    name: 'Liquidity',
    icon: <PoolIcon />,
    href: routes.liquidity,
  },*/
  {
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
  {
    name: 'NFT Marketplace',
    icon: <CompassIcon />,
    href: routes.search,
  },
  {
    name: 'Staking',
    icon: <PlusCircle />,
    href: routes.staking,
  },
  {
    name: 'Comunidad',
    icon: <VoteIcon />,
    href: '',
    dropdownItems: [
      {
        name: 'Discord',
        href: routes.vote,
      },
      {
        name: 'Academia X',
        href: routes.proposals,
      },
      {
        name: 'Alpha Report',
        href: routes.createProposal,
      },
      {
        name: 'Investing Value',
        href: routes.createProposal,
      },
      {
        name: 'Coaching',
        href: routes.createProposal,
      },
      {
        name: 'Podcast',
        href: routes.createProposal,
      },
    ],
  },
  /*{
    name: 'NFT Details',
    icon: <DiskIcon />,
    href: routes.nftDetails,
  },*/

  /*{
    name: 'Vote',
    icon: <VoteIcon />,
    href: routes.vote,
    dropdownItems: [
      {
        name: 'Explore',
        href: routes.vote,
      },
      {
        name: 'Vote with pools',
        href: routes.proposals,
      },
      {
        name: 'Create proposal',
        href: routes.createProposal,
      },
    ],
  
  },*/
  /*{
    name: 'Crear Usuario',
    icon: <PlusCircle />,
    href: routes.createuser,
  },*/
  {
    name: 'Crear NFT',
    icon: <PlusCircle />,
    href: routes.createNft,
  },
  {
    name: 'Referidos',
    icon: <PlusCircle />,
    href: routes.createuser,
  },
  {
    name: 'Configuracion',
    icon: <PlusCircle />,
    href: '',
  },
];

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const Usuario = useSelector((state: any) => state.blockchain.rol);
  const { closeDrawer } = useDrawer();

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className
      )}
    >
      <div className="relative flex h-24 w-full items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
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
          <AuthorCard image={AuthorImage} name="Root" role="admin" />

          <div className="mt-12">
            {menuItems.map((item, index) =>
              (Usuario !== 'Admin' && item.name == 'Referidos') ||
              (Usuario !== 'Admin' && item.name == 'Crear NFT') ||
              (Usuario !== 'Admin' &&
                Usuario !== 'usuario' &&
                Usuario !== 'cliente' &&
                item.name == 'Profile') ||
              (Usuario !== 'Admin' &&
                Usuario !== 'usuario' &&
                Usuario !== 'cliente' &&
                item.name == 'Staking') ? (
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
      </Scrollbar>
    </aside>
  );
}
