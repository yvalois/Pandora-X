import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import { useState } from 'react';
import { getRange, mint, getType } from '@/NFTROL';

// static data


const CreateUser: NextPageWithLayout = () => {

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    const NewUser = {
        Nombre: "",
        Correo: "",
        Address: "",
        Categoria: "Agente X",
        Rango: "peerx",
        Fecha: hoy.toLocaleDateString(),
        Rol: "usuario"
    }
    const [value, setValue] = useState(NewUser)

    const ChangeInfo = (Dato: string, valor: string) => {

        if (Dato == "Nombre") {
            setValue(prevState => ({ ...prevState, Nombre: valor }))
        } else if (Dato == "Correo") {
            setValue(prevState => ({ ...prevState, Correo: valor }))
        } else if (Dato == "Address") {
            setValue(prevState => ({ ...prevState, Address: valor }))
        } else if (Dato == "Categoria") {
            setValue(prevState => ({ ...prevState, Categoria: valor }))
        } else {
            setValue(prevState => ({ ...prevState, Rango: valor }))
        }


    }

    async  function CrearUsuario(){
        try{
        let address = value.Address
        let categoria = value.Categoria
        let rango = value.Rango

            

        const txResult = await mint(address, categoria, rango)
        const a = await getType(address)
        const b = await getRange(address)
        console.log(a)
        console.log(b)
        console.log(txResult.status)

        if(txResult.status === 1){

        fetch(`https://pandoraxapi1.herokuapp.com/api/CrearUsuario`, {
            method: "POST",
            body: JSON.stringify(value),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
                alert("listo")
                console.log(value)
            })
            .catch((error) => console.error("Error:", error));
        }else {
            alert("Transaccion fracaso")
        }
    }catch (error) {
            console.log(error);

        }

    };






    return (
        <>
            <NextSeo
                title="Create new user"
                description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
            />
            <div className="mx-auto w-full max-w-[1160px] text-sm md:pt-14 4xl:pt-24 justify-center self-center ">
                <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3 w-full ">


                    <div className="w-full max-w-xs ml-60 ">
                        <form className="bg-white dark:bg-dark  shadow-md rounded px-8 pt-6 pb-8 mb-4  ">
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" >
                                    Name
                                </label>
                                <input onChange={(e) => ChangeInfo("Nombre", e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"     >
                                    Correo
                                </label>
                                <input onChange={(e) => ChangeInfo("Correo", e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" id="Correo" placeholder="Correo" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"     >
                                    Address Wallet
                                </label>
                                <input onChange={(e) => ChangeInfo("Address", e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" id="wallet"  placeholder="Address Wallet"  />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" >
                                    Categoria NFT
                                </label>
                                <select onChange={(e) => ChangeInfo("Categoria", e.target.value)} name="select" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="wallet">
                                    <option value="Agente X">Agente X </option>
                                    <option value="BlockMaker">BlockMaker</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" >
                                    Rango NFT
                                </label>
                                <select onChange={(e) => ChangeInfo("Rango", e.target.value)}
                                    name="select" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="wallet">
                                    <option value="Peerx">Peerx</option>
                                    <option value="BlockElite">BlockElite</option>
                                    <option value="BlockMaster">BlockMaster</option>
                                    <option value="BlockCreator">BlockCreator</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-center">
                                <button onClick={() => CrearUsuario()} className="bg-dark  text-white dark:text-dark dark:bg-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Crear Usuario
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

CreateUser.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateUser;
