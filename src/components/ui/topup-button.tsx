import cn from 'classnames';
import { Plus } from '@/components/icons/plus';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { useSelector } from 'react-redux';

export default function TopupButton({
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const { nombre } = useSelector((state) => state.Usuario);
  return (
    <button
      className={cn(
        'flex h-10 w-full items-center whitespace-nowrap rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm uppercase tracking-wider text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:h-12 3xl:h-13',
        className
      )}
    >
      <span className="mr-3.5 flex-grow text-justify text-xs lg:text-sm">
        {nombre}
      </span>
    </button>
  );
}
