import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import lightLogo from '@/assets/images/logo.svg';
import darkLogo from '@/assets/images/logo-white.svg';
import logo from '@/assets/images/NFT STUDIO-01.png';
import logo1 from '@/assets/images/NFT STUDIO-02.png';

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();

  return (
    <AnchorLink
      href="/"
      className="mb-[-200px]  mt-[-40px] flex w-full justify-center align-middle outline-none"
      {...props}
    >
      <span className="relative flex w-full justify-center overflow-hidden align-middle">
        {isMounted && isDarkMode && (
          <Image src={logo1} alt="Criptic" width={200} height={200} priority />
        )}
        {isMounted && !isDarkMode && (
          <Image src={logo} alt="Criptic" width={200} height={200} priority />
        )}
      </span>
    </AnchorLink>
  );
};

export default Logo;
