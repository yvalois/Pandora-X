import cn from 'classnames';
import dayjs from 'dayjs';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { ArrowLinkIcon } from '@/components/icons/arrow-link-icon';
import { StaticImageData } from 'next/image';
type ItemType = {
  id?: string | number;
  label: string;
  name: string;
  authorSlug: string;
  avatar?: StaticImageData;
  created_at: Date | string;
  amount?: number | null;
  transactionUrl?: String;
};
type FeaturedCardProps = {
  item: ItemType;
  className?: string;
};

export default function FeaturedCard({ item, className }: FeaturedCardProps) {
  const {
    label,
    name,
    avatar,
    authorSlug,
    created_at,
    amount,
    transactionUrl,
  } = item;
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg bg-white p-3 text-xs font-medium shadow-card dark:bg-light-dark',
        className
      )}
    >
      <div className="flex w-[100%] items-center">
        <div className="truncate ltr:ml-2 rtl:mr-2">
          <div className="mb-0.5 truncate text-sm font-medium -tracking-wider text-gray-900 dark:text-white">
            {label} por{' '}
            <AnchorLink
              href={authorSlug}
              className="-tracking-wide text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              @{name}
            </AnchorLink>
          </div>
        </div>
      </div>
    </div>
  );
}
