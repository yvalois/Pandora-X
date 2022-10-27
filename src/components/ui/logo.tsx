import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import lightLogo from '@/assets/images/logo.svg';
import darkLogo from '@/assets/images/logo-white.svg';
import logo from '@/assets/images/PandoraX.png'

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();

  return (
    <AnchorLink
      href="/"
      className="flex w-38 outline-none sm:w-38 4xl:w-45"
      {...props}
    >
      <span className="relative flex overflow-hidden">
        {isMounted && isDarkMode && (
          <Image  src={logo} alt="Criptic" priority />
        )}
        {isMounted && !isDarkMode && (
          <Image  src={logo} alt="Criptic" priority />
        )}
      </span>
    </AnchorLink>
  );
};

export default Logo;
