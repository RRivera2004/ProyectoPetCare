import { I18n } from "i18n-js";
import React from "react";
import { createContext, useContext, useState } from "react";
import { translations } from "../utils/translation/translation";


type Language = "es" | "en";

type LanguageContextType = {
    language: Language;
    changeLanguage: (lng: Language)=> void;
    clearLanguage: ()=>{};
  
};

//1. definicion de diccionario de traducciones en /utils 

//2. crear la instancia de i18n con el diccionario cargado
const i18n = new I18n(translations);

//3. definir propiedades: idioma por defecto, habilitar fallback
i18n.defaultLocale = "en";
i18n.locale = "es";
i18n.enableFallback = true;

const LanguageContext = createContext<LanguageContextType | null> (null);

export const LanguageProvider = ({children}: {children: React.ReactNode}) =>{
    const [language, setLanguage] = useState<Language>('es');
    
    const changeLanguage=  (lng: Language) => {
       setLanguage(lng);
       //asignacion de idioma activo
       i18n.locale = lng;
    }
    const clearLanguage = () => {
        return '';
    }

    return(
        <LanguageContext.Provider value={{language, changeLanguage, clearLanguage, }}>
            {children}
        </LanguageContext.Provider>
    )
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error ("useLanguage debe utilizarse dentro del LanguageProvider")
    return context;
    }