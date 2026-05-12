import { useEffect, useMemo, useRef, useState } from "react";

export default function CustomSelect({
    list = [],
    selected = 0,
    updateSelected,
    placeholder = "Provincia",
}) {
    const [open, setOpen] = useState(false);
    const [highlighted, setHighlighted] = useState(selected);

    const containerRef = useRef(null);
    const optionRefs = useRef({});

    const selectedItem = useMemo(() => {
        return list.find((item) => Number(item.id) === Number(selected));
    }, [list, selected]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (!containerRef.current?.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (open) {
            setHighlighted(selected || 0);
        }
    }, [open, selected]);

    useEffect(() => {
        if (open) {
            optionRefs.current[highlighted]?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [highlighted, open]);

    function handleSelect(id) {
        updateSelected(Number(id));
        setOpen(false);
    }

    console.log({
        selected,
        selectedType: typeof selected,
        listIds: list.map(item => item.id),
        selectedItem
    });
    function moveHighlight(direction) {
        const ids = [0, ...list.map((item) => item.id)];
        const currentIndex = ids.indexOf(highlighted);
        const safeIndex = currentIndex === -1 ? 0 : currentIndex;

        const nextIndex =
            direction === "down"
                ? safeIndex < ids.length - 1
                    ? safeIndex + 1
                    : 0
                : safeIndex > 0
                    ? safeIndex - 1
                    : ids.length - 1;

        setHighlighted(ids[nextIndex]);
    }

    function handleKeyDown(e) {
        if (!open && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen(true);
            return;
        }

        if (!open) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                moveHighlight("down");
                break;

            case "ArrowUp":
                e.preventDefault();
                moveHighlight("up");
                break;

            case "Enter":
                e.preventDefault();
                handleSelect(highlighted);
                break;

            case "Escape":
                setOpen(false);
                break;

            case "Tab":
                setOpen(false);
                break;

            default: {
                const key = e.key.toLowerCase();

                if (key.length === 1 && /[a-záéíóúñ]/i.test(key)) {
                    const found = list.find((item) =>
                        item.name.toLowerCase().startsWith(key)
                    );

                    if (found) {
                        setHighlighted(found.id);
                    }
                }
            }
        }
    }

    return (
        <div ref={containerRef} className="relative w-72">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="
                    flex w-full items-center justify-between
                    rounded-2xl border border-white/10
                    bg-white/5 px-4 py-3
                    text-left text-white
                    backdrop-blur-md transition
                    hover:bg-white/10
                    focus:outline-none focus:ring-2 focus:ring-cyan-400
                "
            >
                <span>{selectedItem ? selectedItem.name : placeholder}</span>
                <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                    ▼
                </span>
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="
                        absolute z-50 mt-2 w-full overflow-hidden rounded-2xl
                        border border-white/10 bg-[#111827]/95 p-1
                        shadow-2xl backdrop-blur-xl
                    "
                >
                    <li
                        ref={(el) => {
                            optionRefs.current[0] = el;
                        }}
                        role="option"
                        aria-selected={selected === 0}
                        onMouseEnter={() => setHighlighted(0)}
                        onClick={() => handleSelect(0)}
                        className={`
                            cursor-pointer rounded-xl px-4 py-3 transition-all duration-150
                            ${highlighted === 0
                                ? "bg-cyan-500/20 text-cyan-300"
                                : "text-white/80 hover:bg-white/5"
                            }
                        `}
                    >
                        {placeholder}
                    </li>

                    {list.map((item) => {
                        const active = Number(highlighted) === Number(item.id);
                        const selectedOption = Number(selected) === Number(item.id);

                        return (
                            <li
                                key={item.id}
                                ref={(el) => {
                                    optionRefs.current[item.id] = el;
                                }}
                                role="option"
                                aria-selected={selectedOption}
                                onMouseEnter={() => setHighlighted(item.id)}
                                onClick={() => handleSelect(item.id)}
                                className={`
                                    cursor-pointer rounded-xl px-4 py-3 transition-all duration-150
                                    ${active
                                        ? "bg-cyan-500/20 text-cyan-300"
                                        : "text-white/80 hover:bg-white/5"
                                    }
                                `}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}