'use client'
import Link from "next/link";
import React, { useState } from "react";


interface TextProps{
  term1: string,
  term2: string,
  but: string,
}

export function Contact(props:TextProps) {
  
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('');
  const [accTerms, setAccTerms] = useState(false);


  async function handleEmail(e: React.FormEvent<HTMLFormElement>) {
    if(accTerms){

    }

    else{
      alert("Aceite os termos de serviço")
    }
  }


  return (
    <>
      <form 
        onSubmit={(e)=>{
          e.preventDefault()
          handleEmail(e)
        }}
        id="New email" 
        className="flex flex-1 flex-col gap-y-5">

        <input className="bg-white border-white placeholder:text-gray-200 text-gray-800 rounded-md w-full py-2 px-4 leading-tight" 
                  name="userName"
                  id="userName" 
                  onChange={(e)=>{setNome(e.target.value)}}
                  type={'text'} 
                  placeholder="Nome"
                  required
                  title="Nome"/>
        
        <input className="bg-white border-white placeholder:text-gray-200 text-gray-800 rounded-md w-full py-2 px-4 leading-tight"
                  name="userEmail"
                  id="userEmail"
                  onChange={(e)=>{setEmail(e.target.value)}} 
                  type={'email'} 
                  placeholder="Email"
                  required
                  title="Email"/>
        
        <textarea name="userMessage" id="userMessage" spellCheck={false} className="w-full flex-1 resize-none rounded-md bg-white py-2 px-4 leading-relaxed placeholder:text-gray-200 text-gray-800"
          placeholder="Insira sua mensagem...."
          onChange={(e)=>{setMessage(e.target.value)}}
          rows={6}
          required/>
        
        <label htmlFor="showPass" className="flex items-center gap-x-3 text-base text-gray-800 hover:text-gray-400">
          <input onChange={() =>setAccTerms(!accTerms)} type="checkbox" name="showPass" id="showPass" className="h-4 w-4 rounded-sm border-gray-400 text-green-1100"/>
          <span>{props.term1}</span>
          <Link href="/terms">
            <p className="text-green-1400 hover:text-gray-300 font-normal underline text-base w-30">
              {props.term2}
            </p>
          </Link>
        </label>
        
        <button 
          title="Enviar"
          type="submit" 
          className="bg-green-1300 text-green-1400 hover:bg-green-50 rounded-full px-6 py-1.5 w-[7rem]">
          {props.but}
        </button>
      </form>
    </>
  )}