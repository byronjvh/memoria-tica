import { useState } from "react";
import { paths } from "../MapPathArray"
import provincias from "../data/provincias.json"

const VIEW_BOX_PROVINCE = {
    0: "scale(1) translate(-22.47px, -30px)",
    1: "scale(2.6) translate(-380px, -320px)",
    2: "scale(2.2) translate(-120px, -50px)",
    3: "scale(3.6) translate(-520px, -315px)",
    4: "scale(3.2) translate(-420px, -140px)",
    5: "scale(1.8) translate(90px, 8px)",
    6: "scale(1.25) translate(-180px, -245px)",
    7: "scale(1.7) translate(-480px, -110px)"
}

export default function Map({ updateSelected, selectedProvince = 0, className }) {
    const [hoveredId, setHoveredId] = useState(null);
    const orderedPaths = [
        ...paths.filter(p => p.id !== hoveredId),
        ...paths.filter(p => p.id === hoveredId),
    ];

    const handleClick = (e) => {
        e.stopPropagation()
        const provinceId = Number(e.target.dataset.province)
        if (!provinceId) return updateSelected(0)
        console.log(selectedProvince, provinceId)
        // si no había provincia seleccionada, la seleccionamos
        if (!selectedProvince) return updateSelected(provinceId)
        // si ya había provincia seleccionada y no coincide, la cerramos (volver a 0)
        if (selectedProvince !== provinceId) updateSelected(0)
    }

    return (
        <svg
            id="Map"
            className={`Map ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 980 980"
            onClick={handleClick}
        >
            <g id="CostaRica" style={{
                transform: VIEW_BOX_PROVINCE[selectedProvince]
            }}>
                {
                    orderedPaths.map(path => (
                        <path
                            key={path.id}
                            className={`${path.class} ${selectedProvince
                                ? selectedProvince === path.id
                                    ? "selected"
                                    : "fade"
                                : ""}`}
                            d={path.d}
                            onMouseOver={() => setHoveredId(path.id)}
                            onMouseEnter={() => setHoveredId(path.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            data-province={path.id}
                        />
                    ))
                }
            </g>
        </svg >
    )
}