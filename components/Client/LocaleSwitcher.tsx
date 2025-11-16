'use client'

import React from 'react'
import { useChangeLocale, useCurrentLocale } from '@/locales/client'

const LocaleSwitcher = () => {
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()
  return (
        <select className={`hover:bg-green-50 focus:bg-green-1300 bg-green-1100 py-1 px-2 justify-center items-center text-sm focus:ring-0 focus:outline-none appearance-none rounded-full leading-tight`}  
                id="userRule"  
                placeholder={currentLocale}
                value={currentLocale}
                onChange={(e)=>changeLocale(e.target.value as "en" | "pt" | "et")}
                required
                title="Locale">
                  <option className='rounded-full' value="en">En</option>
                  <option value="pt">Pt</option>
                  <option value="et">Et</option>
        </select>
  )
}

export default LocaleSwitcher
