import { Box, Hidden } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import Calendar from "./Calendar";
import moment from "moment";

interface CalendarProps {
    birthday: moment.Moment;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, index, value }: TabPanelProps) {
    return (
        <div hidden={index != value}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                {children}
            </Box>
        </div>
    );
}

export default function CalendarTabs({ birthday }: CalendarProps) {
    const [currentTab, setCurrentTab] = useState(1);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                // aria-label="secondary tabs example"
            >
                <Tab value={1} label="Years" />
                <Tab value={2} label="Months" />
                <Tab value={3} label="Weeks" />
                <Tab value={4} label="Days" />
            </Tabs>
            <TabPanel index={1} value={currentTab}>
                <Calendar birthday={birthday} type="years" />
            </TabPanel>
            <TabPanel index={2} value={currentTab}>
                <Calendar birthday={birthday} type="months" />
            </TabPanel>
            <TabPanel index={3} value={currentTab}>
                <Calendar birthday={birthday} type="weeks" />
            </TabPanel>
            <TabPanel index={4} value={currentTab}>
                <Calendar birthday={birthday} type="days" />
            </TabPanel>
        </Box>
    );
}
