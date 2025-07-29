import React from "react";
import GeneralTopDataSection from "./components/GeneralTopDataSection";
import FeedContainer from "./components/feed/FeedContainer";

export default function DashboardPage(){
    return(
        <div className="h-screen w-full flex flex-col ">
            <GeneralTopDataSection/>
            <FeedContainer/>
        </div>
    )
}