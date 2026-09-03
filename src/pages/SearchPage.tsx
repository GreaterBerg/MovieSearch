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
import { Link } from "react-router-dom"

const SearchPage = () => {

    const [ search, setSearch ] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const [ page, setPage ] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ["search", debouncedSearch, page],
        queryFn: () => fetchFn(`https://kinobd.net/api/player/search?q=${debouncedSearch}&page=${page}`),
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
                    autoComplete="off"
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
                    { isLoading ? (
                        <p className="text-center text-[var(--text-g)]">Загрузка...</p>
                    ) : error ? (
                        <p className="text-center text-[var(--text-g)]">Произошла ошибка при поиске</p>
                    ) : data?.data.length === 0 ? (
                        <p className="text-center text-[var(--text-g)]">Ничего не найдено</p>
                    ) : uniqueData.map((item: any) => {
                        return (
                            <Link to={`/player/${item.imdb_id}`} key={item.id} className="flex align-center justify-center w-120 h-30 gap-4 items-start border border-[var(--border)] rounded my-4 hover:bg-[var(--bg-subtle)] transition-colors ">
                                <div
                                    className={`w-20 h-25 m-2 rounded-md ${!item.small_poster ? 'bg-muted' : ''}`}
                                    style={item.small_poster ? { backgroundImage: `url(${item.small_poster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                                />
                                <div className="w-full h-full flex flex-col justify-center align-center">
                                    <p className="text-lg text-[var(--text)]">{item.name_original}</p>
                                    <p className="text-sm text-[var(--text-g)]">ru: {item.name_russian}</p>
                                    <p className="text-sm text-[var(--text-g)]">время: {item.time} ч.</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                { data && data?.last_page !== 1 && (
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="m-4 bg-[var(--bg-subtle)] text-[var(--text)] hover:bg-[var(--bg)] border border-[var(--border)] px-4 py-2 rounded-md transition-colors">
                        некст
                    </button>
                )}
            </section>
        </div>
    )
}

export default SearchPage