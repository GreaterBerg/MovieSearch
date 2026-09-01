import { useParams } from "react-router-dom"
import MoviePlayer from "../components/MoviePlayer";

const PlayerPage = () => {

    const { movieId } = useParams();

    return (
        <div>
            <section className="m-4">
                <MoviePlayer movieImdbId={movieId} />
            </section>
            <a
                href="/"
                className=" bg-[var(--bg-subtle)] text-[var(--text)] hover:bg-[var(--bg)] border border-[var(--border)] px-4 py-2 rounded-md transition-colors">
                назад
            </a>
        </div>
    )
}

export default PlayerPage