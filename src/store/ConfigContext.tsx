import { 
  createContext, 
  useState, 
  useEffect, 
  useContext, 
  useCallback 
} from "react";
import type { 
  MediaLanguage, 
  MediaCountry, 
  CertificationSummary 
} from "@/@types";
import { 
  getLanguages, 
  getCountries, 
  getCertificationMovieList, 
  getCertificationTvList 
} from "@/services";

interface ConfigContextType {
  languages: MediaLanguage[];
  countries: MediaCountry[];
  certificationMovie: CertificationSummary;
  certificationTv: CertificationSummary;
}

export const ConfigContext = createContext<ConfigContextType>({
  languages: [],
  countries: [],
  certificationMovie: { certifications: {} },
  certificationTv: { certifications: {} },
});

export default function ConfigProvider({ children }: {children: React.ReactNode}) {
  const [langs, setLangs] = useState<MediaLanguage[]>([]);
  const [countriesList, setCountriesList] = useState<MediaCountry[]>([]);
  const [certificationMovie, setCertificationMovie] = useState<CertificationSummary>({ certifications: {} });
  const [certificationTv, setCertificationTv] = useState<CertificationSummary>({ certifications: {} });

  const fetchConfig = useCallback(async function() {
    const [languages, countries, certificationMovie, certificationTv] = await Promise.all([
      getLanguages(),
      getCountries(),
      getCertificationMovieList(),
      getCertificationTvList(),
    ]);

    setLangs(Array.isArray(languages) ? languages : []);
    setCountriesList(Array.isArray(countries) ? countries : []);
    setCertificationMovie('certifications' in certificationMovie 
      ? certificationMovie : { certifications: {} });
    setCertificationTv('certifications' in certificationTv 
      ? certificationTv : { certifications: {} });
  }, [])

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig])

  const ctxValue: ConfigContextType = {
    languages: langs,
    countries: countriesList,
    certificationMovie,
    certificationTv,
  }

  return (
    <ConfigContext.Provider value={ctxValue}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext);