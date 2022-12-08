import cn from 'classnames';
import Image from '@/components/ui/image';
import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface AvatarProps {
  image: StaticImageData;
  alt: string;
  className?: string;
  size?: SizeNames;
  shape?: ShapeNames;
  width?: number;
  height?: number;
}

type ShapeNames = 'rounded' | 'circle';
type SizeNames = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const sizes: Record<SizeNames, string[]> = {
  xl: [
    'border-white border-[5px] h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 3xl:h-40 3xl:w-40 3xl:border-8 shadow-large',
  ],
  lg: ['border-whitebor der-4 h-20 w-20 lg:h-24 lg:w-24'],
  md: ['border-white h-10 w-10 drop-shadow-main border-3'],
  sm: ['border-white h-8 w-8 border-2 shadow-card'],
  xs: ['h-6 w-6'],
};

const shapes: Record<ShapeNames, string[]> = {
  rounded: ['h-16 w-16 rounded-lg bg-white/20 p-2 backdrop-blur-[40px]'],
  circle: ['rounded-full'],
};

function AvatarP({
  image,
  alt,
  className,
  size = 'md',
  shape = 'circle',
  width,
  height,
  activate,
  is,
  setPrevProfile,
  prevProfile,
}) {
  const sizeClassNames = sizes[size];
  //const [prevProfile, setPrevProfile] = useState("")
  const { accountAddress } = useSelector((state) => state.blockchain);

  async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

  const editphotoP = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    const base64 = await encodeFileAsBase64URL(file);
    setPrevProfile(base64);

    activate();
  };

  const UploadProfile = async () => {
    alert('ya');
    const value = {
      profile: prevProfile,
    };
    fetch(
      `https://shark-app-w9pvy.ondigitalocean.app/api/updatebanner/${accountAddress}`,
      {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        res.json();
        alert(res.status);
      })
      .then(() => {})
      .catch((error) => console.error('Error:', error));
  };

  return (
    <figure
      className={cn(
        'relative shrink-0 overflow-hidden',
        className,
        shapes[shape],
        shape === 'circle' && sizeClassNames
      )}
    >
      {shape === 'circle' ? (
        size === 'xs' || 'sm' ? (
          <div>
            <div>
              {!is || prevProfile.length == 0 ? (
                <Image
                  src={image}
                  alt={alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={prevProfile}
                  alt={alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              )}
              <div className="group absolute  top-0 z-10  flex h-full w-full cursor-pointer items-center justify-center rounded-full opacity-60 transition duration-500 hover:bg-gray-200">
                <input
                  type="file"
                  onChange={(e) => {
                    editphotoP(e);
                  }}
                  className="z-10 hidden w-[10%] group-hover:block"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              {!is || prevProfile.length == 0 ? (
                <Image
                  src={image}
                  alt={alt}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  className="absolute h-64 w-64 rounded-full "
                />
              ) : (
                <Image
                  src={prevProfile}
                  alt={alt}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  className="absolute h-64 w-64 rounded-full "
                />
              )}
              <div className="group absolute  top-0 z-10  flex h-full w-full cursor-pointer items-center justify-center rounded-full opacity-60 transition duration-500 hover:bg-gray-200">
                <input
                  type="file"
                  onChange={() => {
                    editphotoP(e);
                  }}
                  className="w-[30%]z-10 hidden group-hover:block"
                />
              </div>
            </div>
          </div>
        )
      ) : (
        <Image src={image} alt={alt} className="rounded-[6px]" />
      )}
    </figure>
  );
}

export default AvatarP;
