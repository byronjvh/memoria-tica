import { useState } from "react";
import { paths } from "../MapPathArray"

export default function Map() {
    const [hoveredId, setHoveredId] = useState(null);
    const orderedPaths = [
        ...paths.filter(p => p.name !== hoveredId),
        ...paths.filter(p => p.name === hoveredId),
    ];

    return (
        <svg
            id="Map"
            className="Map"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 980 980"
        >
            <g id="CostaRica" transform="translate(-22.47 -30)">
                {
                    orderedPaths.map(path => (
                        <path
                            key={path.name}
                            className={path.name}
                            d={path.d}
                            onMouseOver={() => setHoveredId(path.name)}
                            onMouseEnter={() => setHoveredId(path.name)}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    ))
                }
            </g>
        </svg>
    )
}