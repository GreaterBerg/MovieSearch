import { useEffect, useRef } from "react";

const MoviePlayer = ({movieImdbId}) => {
    const hostRef = useRef(null);

    useEffect(() => {
        const container = document.createElement("div");
        container.id = "kinobd";
        container.dataset.imdb = movieImdbId;
        hostRef.current.appendChild(container);

        const script = document.createElement("script");
        script.src = "//kinobd.net/js/player_.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            script.remove();
            if (hostRef.current) {
                hostRef.current.innerHTML = "";
            }
        };
    }, [movieImdbId]);

    return (
        <div ref={hostRef} />
    );
};

export default MoviePlayer;