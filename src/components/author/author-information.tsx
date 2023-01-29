import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import { InfoIcon } from '@/components/icons/info-icon';
import Image from '@/components/ui/image';

import edit from '@/assets/images/edit-svgrepo-com.svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '@/redux/Blockchain/blockchainAction';

interface AuthorInformationProps {
  data: any;
  className?: string;
}
export default function AuthorInformation({
  className = 'md:hidden',
  data,
}: AuthorInformationProps) {
  const [editIsActivated, setEditIsActivated] = useState(false);
  const [newDescipcion, setNewDescripcion] = useState('');
  const { accountAddress } = useSelector((state) => state.blockchain);
  const Usuario = useSelector((state) => state.Usuario);
  const dispatch = useDispatch<AppDispatch>();

  const activate = () => {
    if (!editIsActivated) {
      setEditIsActivated(true);
    } else {
      setEditIsActivated(false);
    }
  };
  const UploadDescipcion = async () => {
    const value = {
      descripcion: newDescipcion,
    };
    fetch(`${process.env.BACKEND_API}/updatedescripcion/${accountAddress}`, {
      method: 'PUT',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();

        setEditIsActivated(false);
        dispatch(update(accountAddress));
      })
      .then(() => {})
      .catch((error) => console.error('Error:', error));
  };
  return (
    <div className={`${className}`}>
      {/* Bio */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="row flex items-center space-x-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          {' '}
          {/*   mb-2   text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white  */}
          <span> Biografia</span>
          {!editIsActivated && (
            <div className="h-4 w-4 cursor-pointer" onClick={activate}>
              <Image className="h-2" src={edit} alt="Criptic" priority />
            </div>
          )}
        </div>
        {!editIsActivated && Usuario.descripcion}
        {editIsActivated && (
          <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
            <textarea
              onChange={(e) => {
                setNewDescripcion(e.target.value);
              }}
              className="w-[90%] text-sm"
              rows={6}
            ></textarea>
            <div className="flex w-[90%] justify-center ">
              <Button
                onClick={UploadDescipcion}
                className="h-14 w-24 rounded-r-sm text-sm"
              >
                Aceptar
              </Button>
              <Button
                onClick={activate}
                className="h-14 w-24 rounded-l-sm bg-gray-500 text-sm"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Social */}
      {/*      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Social
        </div>
        {data?.socials?.map((social: any) => (
          <AnchorLink
            href={social?.link}
            className="mb-2 flex items-center gap-x-2 text-sm tracking-tight text-gray-600 transition last:mb-0 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            key={social?.id}
          >
            {social?.icon}
            {social?.title}
          </AnchorLink>
        ))}
      </div>

      { Links }
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Links
        </div>
        {data?.links?.map((item: any) => (
          <AnchorLink
            href={item?.link}
            className="mb-2 flex items-center text-sm tracking-tight text-gray-600 transition last:mb-0 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            key={item?.id}
          >
            {item?.link}
          </AnchorLink>
        ))}
      </div>

      { Join date }
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Joined {data?.created_at}
        </div>
      </div>
      {Report button }
      <Button
        color="gray"
        className="mt-5 h-8 font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-9 md:px-4 lg:mt-6"
      >
        <span className="flex items-center gap-2">
          <InfoIcon className="h-3 w-3" /> report
        </span>
      </Button>*/}
    </div>
  );
}
