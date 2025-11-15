'use client'
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface TextProps {
  saibaMais: string;
  maquinaInfoBundle: {
    title: string;
    description: string;
    dimensao: string;
    list: string[];
    capacidade: string;
  };
  software: string;
  maquinaImgScr: string;
}

export function MaquinasInfo(props: TextProps) {
  const [showModal, setShowModal] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  function resetModal() {
    setShowModal(true);
    setCurrentSelected(0);
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <button
        className="text-green-1400 hover:text-gray-300 items-center font-medium text-lg bg-green-1300 rounded-full py-1 px-2 xl:bg-transparent xl:py-0 xl:px-0 w-auto xl:text-sm text-left xl:w-24"
        onClick={() => resetModal()}
      >
        {props.saibaMais}
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div
              ref={modalRef}
              className="flex flex-row text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[80%] h-[90%] md:h-[80%] md:px-8 items-center justify-center"
            >
              <div className="flex flex-col gap-y-5 md:flex-row items-center justify-center w-full">
                <div className="w-full px-5 md:px-0 md:w-[50%] md:pr-8 gap-y-6 flex flex-col">
                  
                  <div className="flex flex-row w-full justify-center md:justify-start items-center gap-x-8 mb-2">
                    
                    <button
                      className="md:hidden w-7 h-7 flex justify-center items-center bg-green-1300 hover:bg-green-100 rounded-lg font-bold text-black hover:text-gray-500 leading-none"
                      onClick={() => setShowModal(false)}
                    >
                      {"<-"}
                    </button>
                    
                    <p className="text-black font-normal text-xl md:text-4xl text-left md:px-14">
                      Recicletool <br className="hidden md:flex"/> {props.maquinaInfoBundle.title}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-col gap-y-3 justify-center items-center md:items-start">
                      <div className="flex flex-row justify-between w-full md:px-14 text-sm md:text-base">

                        <button
                          className={`text-green-1400 font-medium hover:text-gray-300 hover:border-b hover:border-b-green-100 ${
                            currentSelected == 0 && "border-b border-b-green-1300"
                          }`}
                          onClick={() => {
                            setCurrentSelected(0);
                          }}
                        >
                          Especificações
                        </button>

                        <button
                          className={`text-green-1400 font-medium hover:text-gray-300 hover:border-b hover:border-b-green-100 ${
                            currentSelected == 1 && "border-b border-b-green-1300"
                          }`}
                          onClick={() => {
                            setCurrentSelected(1);
                          }}
                        >
                          Software
                        </button>

                        <button
                          className={`text-green-1400 font-medium hover:text-gray-300 hover:border-b hover:border-b-green-100 ${
                            currentSelected == 2 && "border-b border-b-green-1300"
                          }`}
                          onClick={() => {
                            setCurrentSelected(2);
                          }}
                        >
                          Capacidade
                        </button>
                      </div>

                      <div className="flex flex-col md:block gap-y-2 py-3 px-2 w-full md:px-14 bg-white md:bg-gray-1000 rounded-lg h-[30vh] md:h-[40vh] overflow-y-scroll md:justify-center md:pt-5">
                        {currentSelected == 0 && (
                          <>
                            <p className="text-left text-black">
                              {props.maquinaInfoBundle.dimensao}
                            </p>
                            <div className="gap-y-1 flex flex-col">
                              {props.maquinaInfoBundle.list.map((item, index) => (
                                <p
                                  key={index}
                                  className="text-left relative flex gap-x-2 pl-2 text-black"
                                >
                                  {"•"}
                                  <p>{item}</p>
                                </p>
                              ))}
                            </div>
                          </>
                        )}

                        {currentSelected == 1 && (
                          <p className="text-black text-justify">
                            {props.software}
                          </p>
                        )}

                        {currentSelected == 2 && (
                          <p className="text-justify text-black">
                            {props.maquinaInfoBundle.capacidade}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    className="hidden md:block mx-14 w-auto bg-green-1300 hover:bg-green-100 rounded-lg font-bold text-black hover:text-gray-500 px-5 py-2 leading-none"
                    onClick={() => setShowModal(false)}
                  >
                    {"<-"}
                  </button>
                </div>

                <div className="w-full md:w-[50%]">
                  <div className="relative h-[18rem] md:h-[35rem]">
                    <Image
                      src={props.maquinaImgScr}
                      alt={"Recicletol " + props.maquinaInfoBundle.title}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-2xl"
                        />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
