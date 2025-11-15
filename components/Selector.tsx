'use client'
import { useCurrentLocale } from '@/locales/client';
import { ReactNode, useEffect, useState } from 'react';

import en from "@/locales/en"; 
import pt from "@/locales/pt"; 
import et from "@/locales/et"; 

interface TextProps {
  page: string,
  children?: ReactNode;
}

interface LocaleStrings {
  [key: string]: string;
}

interface Locales {
  [key: string]: LocaleStrings;
}

export function Selector(props: TextProps) {
  const currentLocale = useCurrentLocale()
  const [show, setShow] = useState(false)

  const locales: Locales = {
    en: en.nav2,
    pt: pt.nav2,
    et: et.nav2
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const partIndex = parts.indexOf(currentLocale) + 1;
    const lastPart = parts[partIndex];

    if (lastPart === props.page) {
      setShow(true)
    } 
    else {
      for (const locale in locales) {
        if (locale !== currentLocale) {
          const localeKeys = Object.keys(locales[locale]);
          const matchingKeyIndex = localeKeys.findIndex(key => locales[locale][key] === lastPart);
          if (matchingKeyIndex !== -1) {
            const matchingKey = Object.keys(locales[currentLocale])[matchingKeyIndex];
            const matchingValue = locales[currentLocale][matchingKey];
            window.location.href = currentUrl.replace(`/${lastPart}`, `/${matchingValue}`);
            return;
          }
        }
        else{
          const localeKeys = Object.keys(locales[locale]);
          const matchingKeyIndex = localeKeys.findIndex(key => locales[locale][key] === lastPart);
          if (matchingKeyIndex == -1) {
            window.location.href = currentUrl.replace(`/${lastPart}`, `/`);
            return;
          }
        }
      }
    }
  }, []);

  return (
    <>
      {show && props.children}
    </>
  )
}

