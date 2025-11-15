'use client'

import { useState, useEffect } from "react";

export function Produtos3(){

  const [currentValue, setCurrentValue] = useState(52543.65); // Current donation amount
  const goal = 100000; // Goal amount

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum nec massa quis porta. Suspendisse rutrum, eros rutrum faucibus ornare, risus felis bibendum nulla, a vestibulum felis erat ut neque. "

  const calculateProgress = () => (currentValue / goal) * 100;

  return(
    <div className="w-full flex flex-row justify-center">
      <div className="flex flex-col w-[50vw] items-center gap-y-8">
        <p className="font-bold text-7xl text-[#fdac12]">Donation</p>
        <div className="relative h-[22vh] w-full bg-slate-500 rounded-[2rem] overflow-hidden text-start flex flex-col justify-end"></div>

        <div className="w-full">
          <div className=" bg-gray-100 h-4 mt-4">
            <div
              className="bg-[#697d40] h-4"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className="flex flex-row text-[#697d40] text-3xl font-bold gap-x-8 mt-5">
            <p>R${currentValue}</p>
            <p className="opacity-60">R${goal}</p>
          </div>
        </div>

        <p className="text-xl text-justify px5">{lorem}</p>

        <div className="w-full flex flex-row justify-start">
          <button className="text-[#fdac12] bg-[#697d40] rounded-full text-2xl py-4 px-8 hover:opacity-80">DONATE NOW</button>
        </div>

        
      </div>
    </div>
  )
}

