import { useState } from "react";
import { paths } from "../MapPathArray"

const VIEW_BOX_PROVINCE = {
    0: "scale(1) translate(-20px, -30px)",
    1: "scale(2.6) translate(-90px, -20px)",
    2: "scale(2.2) translate(110px, 210px)",
    3: "scale(3.4) translate(-175px, 30px)",
    4: "scale(3.2) translate(-85px, 190px)",
    5: "scale(1.8) translate(300px, 220px)",
    6: "scale(1.25) translate(-75px, -130px)",
    7: "scale(1.7) translate(-275px, 80px)"
}

export default function Map({ updateSelected, selectedProvince = 0, className }) {
    const isMobile = window.matchMedia("(pointer: coarse)").matches
    const [hoveredId, setHoveredId] = useState(null);
    const orderedPaths = isMobile
        ? paths
        : [
            ...paths.filter(p => p.id !== hoveredId),
            ...paths.filter(p => p.id === hoveredId),
        ];

    const handleClick = (e) => {
        e.stopPropagation()
        const provinceId = Number(e.target.dataset.province)
        if (!provinceId) return updateSelected(0)
        // si no había provincia seleccionada, la seleccionamos
        if (!selectedProvince) return updateSelected(provinceId)
        // si ya había provincia seleccionada y no coincide, la cerramos (volver a 0)
        if (selectedProvince !== provinceId) updateSelected(0)
    }

    return (
        <svg
            id="Map"
            className={`Map relative ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 960 960"
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
                            onMouseEnter={() => {
                                if (!isMobile) setHoveredId(path.id)
                            }}
                            onMouseLeave={() => {
                                if (!isMobile) setHoveredId(null)
                            }}
                            data-province={path.id}
                        />
                    ))
                }
            </g>

        </svg >
    )
}