import Image from '@/components/ui/image';
import cn from 'classnames';
import { StaticImageData } from 'next/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import pandorax from '@/assets/images/Pandora-X-icon-04.svg';

type ItemType = {
  id?: string | number;
  name: string;
  slug: string;
  title: string;
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
  const { nombre, slug, title, cover_image, image, number_of_artwork, user } =
    item ?? {};
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1 ',
        className
      )}
    >
      <div className="relative flex aspect-[11/11]  justify-center overflow-hidden rounded-lg">
        <Image
          src={image}
          placeholder="blur"
          layout="fill"
          quality={100}
          objectFit="cover"
          alt={nombre}
        />
      </div>
      <div className="absolute top-0 left-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <AnchorLink
          href={'/search'}
          className="absolute top-0 left-0 z-10 h-full w-full"
        />
        <div className="flex justify-between gap-3">
          <div
            className="-px-4 inline-flex h-8 shrink-0 items-center rounded-2xl bg-white/20 text-xs font-medium uppercase -tracking-wide text-white
          backdrop-blur-[40px]"
          >
            {nombre}
          </div>
        </div>
        <div className="block">
          <h2 className="mb-1.5 truncate text-lg font-medium -tracking-wider text-white">
            {title}
          </h2>
          {/*<div className="text-sm font-medium -tracking-wide text-[#B6AAA2]">
            {number_of_artwork} Artworks
      </div>*/}
          <div className="relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
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
