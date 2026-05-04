import { useState } from "react";
import { paths } from "../MapPathArray"

const VIEW_BOX_PROVINCE = {
    0: "scale(1) translate(0px, -30px)",
    1: "scale(2.6) translate(-80px, -15px)",
    2: "scale(2.2) translate(140px, 220px)",
    3: "scale(3.4) translate(-170px, 35px)",
    4: "scale(3.2) translate(-90px, 200px)",
    5: "scale(1.8) translate(300px, 225px)",
    6: "scale(1.25) translate(-85px, -145px)",
    7: "scale(1.7) translate(-285px, 90px)"
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
            viewBox="0 0 1000 1000"
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