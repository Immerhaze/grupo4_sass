'use client'
import React, { useState, useRef, useEffect } from "react" // Import useRef and useEffect
import { Input } from "@/components/ui/input"
import { schoolOverallStatistics } from "../../../public/dummydata"
// Ensure this import path and name are correct based on your file structure
import KpiDonutChart from "./DonutKpi" // Changed from "./KpiDonutChart" back to "./DonutKpi" as per your code

export default function GeneralTopDataSection(){

    const scrollContainerRef = useRef(null); // Ref for the scrollable container
    // State to control arrow visibility
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    // Assume right arrow is initially needed if there are more cards than fit
    const [showRightArrow, setShowRightArrow] = useState(true);

    const getFillDonutColor = (grade) => {
        if (grade >= 6.0) return "stroke-green-500";
        if (grade >= 4.0) return "stroke-yellow-500";
        return "stroke-red-500";
    };

    // Function to handle scroll and update arrow visibility
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            // Show left arrow if scrolled past the beginning
            setShowLeftArrow(scrollLeft > 0);
            // Show right arrow if not at the very end (with a small tolerance for floating point)
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    // Functions to scroll by card width
    const scrollByCard = (direction) => {
        if (scrollContainerRef.current) {
            // Get the first card's width including its horizontal margins
            // The card has 'mx-4', which means margin-left: 1rem and margin-right: 1rem.
            // 1rem is typically 16px. So total horizontal margin is 16px + 16px = 32px.
            const firstCard = scrollContainerRef.current.querySelector('.kpi-card-item'); // Use a specific class for the card
            if (firstCard) {
                const cardTotalWidth = firstCard.offsetWidth + 32; // offsetWidth includes padding and border
                scrollContainerRef.current.scrollBy({
                    left: direction === 'left' ? -cardTotalWidth : cardTotalWidth,
                    behavior: 'smooth'
                });
            } else {
                // Fallback if no card is found, scroll by clientWidth (viewport width)
                scrollContainerRef.current.scrollBy({
                    left: direction === 'left' ? -scrollContainerRef.current.clientWidth : scrollContainerRef.current.clientWidth,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Mouse wheel handler for horizontal scroll
    const handleWheel = (event) => {
        if (scrollContainerRef.current) {
            event.preventDefault(); // Prevent default vertical scroll of the page
            scrollContainerRef.current.scrollBy({
                left: event.deltaY, // Scroll horizontally based on vertical wheel movement
                behavior: 'smooth'
            });
        }
    };

    // Effect to attach scroll and wheel listeners on mount
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            // 'passive: false' is crucial to allow preventDefault for the wheel event
            scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

            // Initial check for arrow visibility and scrollability when component mounts
            handleScroll();

            // Clean up event listeners on unmount
            return () => {
                scrollContainer.removeEventListener('scroll', handleScroll);
                scrollContainer.removeEventListener('wheel', handleWheel);
            };
        }
    }, []); // Empty dependency array means this effect runs once after the initial render

    return(
        // 'w-11/11' is not standard Tailwind. Assuming 'w-full' for typical behavior.
        // If 'w-11/11' is a custom class, keep it.
        <div className="w-full h-2/10 bg-[#F9FAFB] px-4 pt-4 flex flex-col items-start justify-between ">

            {/* Header and Search Input */}
            <div className="h-1/4 w-full flex flex-row justify-between items-center">
                <span className="h-full flex flex-row items-center">
                    <h1 className="text-xl font-semibold tracking-wide">Estadisticas/</h1>
                    <h2 className="text-lg font-medium tracking-wide text-blue-500 ml-2">2025 - Semestre I</h2>
                </span>

                <div className="flex items-center space-x-2">
                    <span className="icon-[bx--search]"></span>
                    <Input
                        type="text"
                        placeholder="Buscar..."
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
                </div>
            </div>

            {/* Scrollable KPI Cards Section and Arrows */}
            {/* IMPORTANT: The outer div must be 'relative' for absolute positioning of arrows */}
            {/* The actual scrolling content will be a child of this 'relative' div */}
            <div className="relative h-3/4 w-full p-2 border-b-2"> {/* Moved padding from scrollable div to here */}

                {/* Left Arrow - Conditionally rendered */}
                {showLeftArrow && (
                    <div
                        className="absolute top-0 left-0 h-full flex justify-center items-center rounded-tl-lg rounded-bl-lg cursor-pointer p-2 z-40 transition-all duration-300
                                   bg-gradient-to-l from-blue-950/80 to-blue-950 hover:bg-blue-950"
                        onClick={() => scrollByCard('left')}
                    >
                        <span className="icon-[line-md--arrow-align-left] text-2xl text-white"></span>
                    </div>
                )}

                {/* Scrollable Container for KPI Cards */}
                <div
                    ref={scrollContainerRef} // Attach the ref here
                    className="h-full w-full flex flex-row flex-nowrap overflow-x-scroll overflow-y-hidden subtle-horizontal-scrollbar select-none "
                    // Removed 'p-2' from here as it's now on the parent 'relative' div
                >
                    {schoolOverallStatistics.map((item, index) => {
                        return (
                            <div
                                key={index}
                                // Add a unique class to easily select it for width calculation
                                className=" kpi-card-item bg-white min-w-[140px] h-full flex mx-4  p-2 flex-col items-center rounded-sm  border-[0.5px] group hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
                            >
                                <span className={`text-xs font-medium group-hover:text-blue-500 transition-colors duration-300 ease-in`}>{item.subject}</span>
                                <div className="w-full h-full flex flex-row items-center justify-around ">
                                    <span className={`${item.icon} text-2xl group-hover:text-blue-500 transition-colors duration-300 ease-in`}></span>
                                    <KpiDonutChart
                                        value={item.avgGrade}
                                        maxValue={10}
                                        fillColor={getFillDonutColor(item.avgGrade)}
                                        emptyColor="stroke-red-500"
                                        size={70} // Dynamic size for hover effect (from previous step)
                                        strokeWidth={10}
                                        label={item.avgGrade.toFixed(1)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Right Arrow - Conditionally rendered */}
                {showRightArrow && (
                    <div
                        className="absolute top-0 right-0 h-full flex justify-center items-center rounded-tr-lg rounded-br-lg cursor-pointer p-2 z-40 transition-all duration-300
                                   bg-gradient-to-r from-blue-950/80 to-blue-950 hover:bg-blue-950"
                        onClick={() => scrollByCard('right')}
                    >
                        <span className="icon-[line-md--arrow-align-right] text-2xl text-white"></span>
                    </div>
                )}
            </div>
        </div>
    )
}