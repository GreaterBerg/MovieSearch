import { SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import useDebounce from "../hooks/useDebounce"
import fetchFn from "../fetchFn"
import { Skeleton } from "../components/ui/skeleton"

const SearchPage = () => {

    const [ search, setSearch ] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ["search", debouncedSearch],
        queryFn: () => fetchFn(`https://kinobd.net/api/player/search?q=${debouncedSearch}`),
        enabled: debouncedSearch.trim().length >= 3
    })

    const uniqueData = Array.from(
        new Map(data?.data.map((item: any) => [item.id, item])).values()
    );

    return (
        <div>
            <InputGroup className="my-10 w-110 mx-[auto] text-[var(--text)]">
                <InputGroupInput
                    autoFocus
                    id="inline-start-input"
                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon align="inline-start">
                    <SearchIcon className="text-muted-foreground" />
                </InputGroupAddon>
            </InputGroup>
            <section>
                <p className="text-start p-4 text-sm text-[var(--text-g)]">Результаты поиска:</p>
                <div className="flex gap-4 flex-wrap">
                    { isLoading ? Array.from({length: 20}).map((_, i) => {
                        return <Skeleton key={i} className="h-50 w-25"/>
                    }) : error ? (
                        <p className="text-center text-[var(--text-g)]">Произошла ошибка при поиске</p>
                    ) : data?.data.length === 0 ? (
                        <p className="text-center text-[var(--text-g)]">Ничего не найдено</p>
                    ) : uniqueData.map((item: any) => {
                        return (
                            <div key={item.id} className="flex w-120 gap-4 items-start p-4 border border-[var(--border)] rounded my-4 hover:bg-[var(--bg-subtle)] transition-colors ">
                                <div
                                    className={`w-16 h-25 rounded-md ${!item.small_poster ? 'bg-muted' : ''}`}
                                    style={item.small_poster ? { backgroundImage: `url(${item.small_poster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                                />
                                <div className="w-full h-full flex flex-col justify-center align-center">
                                    <p className="text-lg text-[var(--text)]">{item.name_original}</p>
                                    <p className="text-sm text-[var(--text-g)]">ru: {item.name_russian}</p>
                                    <p className="text-sm text-[var(--text-g)]">время: {item.time} ч.</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default SearchPage