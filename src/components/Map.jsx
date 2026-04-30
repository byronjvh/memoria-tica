import { useState } from "react";
import { paths } from "../MapPathArray"
import provincias from "../data/provincias.json"

const VIEW_BOX_PROVINCE = {
    0: "scale(1) translate(-22.47 -30)",
    1: "scale(2.6) translate(-380, -320)",
    2: "scale(2.2) translate(-120, -50)",
    3: "scale(3.6) translate(-520, -315)",
    4: "scale(3.2) translate(-420, -140)",
    5: "scale(1.8) translate(90, 8)",
    6: "scale(1.25) translate(-180, -245)",
    7: "scale(1.7) translate(-480, -110)"
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
            <g id="CostaRica" transform={VIEW_BOX_PROVINCE[selectedProvince]}>
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