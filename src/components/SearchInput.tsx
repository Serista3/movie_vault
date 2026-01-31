import { IconContext } from "react-icons"
import { IoIosSearch } from "react-icons/io"
import Input from "./common/Input"

import { useSearchParams } from "react-router"

interface SearchInputProps {
    onSubmitSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

const DEFAULT_FORM_CLASS = 'w-full border-b border-primary-light bg-secondary-light absolute top-full left-0 z-8';

export default function SearchInput({ onSubmitSearch }: SearchInputProps) {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get('query') || '';

    return (
        <form onSubmit={onSubmitSearch} className={DEFAULT_FORM_CLASS}>
            <Input 
                id="main-search-bar"
                name="main-search-bar"
                type="text"
                placeholder="Search for movies, tvshows, people" 
                defaultValue={queryParam}
                className="rounded-none px-0 pl-11 border-0 mx-auto" 
            >
                <IconContext.Provider 
                    value={{ className: 'text-xl text-primary-light absolute left-3 top-1/2 -translate-y-1/2' }}
                >
                    <IoIosSearch />
                </IconContext.Provider>
            </Input>
        </form>
    )
}