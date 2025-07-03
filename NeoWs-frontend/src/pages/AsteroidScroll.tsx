import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef, type JSX } from "react";

const AsteroidScroll: React.FC<{ asteroidCards: JSX.Element[] }> = ({ asteroidCards }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 500; // pixels
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
            {/* Left arrow */}
            <IconButton
                onClick={() => scroll("left")}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "white",
                }}
            >
                <ArrowBackIos />
            </IconButton>

            {/* Scrollable area */}
            <Box
                ref={scrollRef}
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    gap: 7.8,
                    px: 6,
                    "& > *": {
                        flex: "0 0 auto", // <- Prevent shrinking, force fixed width per card
                        width: "410px",    // <- Fixed width that matches your card design
                    },
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {asteroidCards}
            </Box>

            {/* Right arrow */}
            <IconButton
                onClick={() => scroll("right")}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "white",
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
};
export default AsteroidScroll;