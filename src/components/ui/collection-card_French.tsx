import Image from '@/components/ui/image';
import cn from 'classnames';
import { StaticImageData } from 'next/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import pandorax from '@/assets/images/Pandora-X-icon-04.svg';

type ItemType = {
  id?: string | number;
  nombre: string;
  slug: string;
  title: string;
  select?: boolean;
  tipo: string;
  cover_image: StaticImageData;
  image?: StaticImageData;
  number_of_artwork: number;
  user: {
    avatar?: StaticImageData;
    name: string;
    slug: string;
  };
};

type CardProps = {
  item: ItemType;
  className?: string;
};

export default function CollectionCard({ item, className = '' }: CardProps) {
  const {
    nombre,
    slug,
    title,
    select,
    cover_image,
    image,
    number_of_artwork,
    user,
    tipo,
  } = item ?? {};
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1 ',
        className
      )}
    >
      <div className="relative flex aspect-[4/5] justify-center  overflow-hidden rounded-lg sm:aspect-[11/11]">
        {select == true && (
          <div className="column z-10 flex h-full w-full cursor-pointer items-center justify-center bg-black opacity-60 ">
            <h1 className="font-small text-xs   md:text-xl md:font-medium xl:text-3xl xl:font-medium ">
              Seleccionado
            </h1>
          </div>
        )}
        <Image
          src={image}
          //placeholder="blur"
          layout="fill"
          quality={100}
          objectFit="cover"
          alt={nombre}
        />
      </div>

      <div className="absolute top-0 left-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        {/*<AnchorLink
          href={`/details/${tipo}`}
          className="absolute top-0 left-0 z-10 h-full w-full"
        />*/}
        <div className="flex justify-between gap-3">
          <div
            className="font-hairline hidden h-8 shrink-0 items-center   rounded-2xl bg-white/20 px-4 text-xs uppercase -tracking-wide text-white backdrop-blur-[50px] md:inline-flex md:h-6
          md:px-4"
          >
            {nombre}
          </div>
        </div>
        <div className="hidden lg:block">
          <h2 className=" font-hairline truncate text-lg -tracking-wider text-white md:mb-1.5 md:h-6 md:px-4 md:text-xs">
            {title}
          </h2>
          {/*<div className="text-sm font-medium -tracking-wide text-[#B6AAA2]">
            {number_of_artwork} Artworks
      </div>*/}
          <div className="relative z-10 mt-3.5 hidden items-center  rounded-3xl bg-white/20 p-2 backdrop-blur-[40px] md:inline-flex">
            <Avatar
              //@ts-ignore
              image={pandorax}
              alt={user?.name}
              size="xs"
              width={24}
              height={24}
              className="rounded-full"
            />

            <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
              @PandoraX
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
