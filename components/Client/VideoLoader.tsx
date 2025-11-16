'use client'
import { useState } from 'react';
import infograf from '../public/assets/infografico.svg'
import Image from "next/image";

export function VideoLoader(){  

  const [videoCarregado, setVideoCarregado] = useState(false);
  function handleVideoLoaded() {
    setVideoCarregado(true);
  }

  return(
    <>
      <video 
        src={'/assets/IndexVideo.mp4'}
        autoPlay 
        muted 
        loop
        onLoadedData={handleVideoLoaded}
      />
      {videoCarregado && (
        <Image 
          src={infograf} 
          alt="Recicletool: O usuário deposita seus produtos recicláveis, ganha benefícios em troca de suas embalagens entregues para a reciclagem e nós encaminhamos os resíduos para os destinos corretos" 
          className="z-30 w-full absolute top-0"
        />
      )}

    </>
  )
}

