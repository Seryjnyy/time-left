import { useEffect, useState } from "react";
import moment from "moment";

import {
    Box,
    Button,
    CircularProgress,
    Container,
    createTheme,
    LinearProgress,
    TextField,
    Typography,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Calendar from "./Calendar";
import CalendarTabs from "./CalendarTabs";

function Birthday() {
    // useEffect(() => {
    //     var today = moment();
    //     var birthDate = moment([2001, 11, 27]); // 2000 (year), 12 (month), 31 (day)

    //     var daysDiff = today.diff(birthDate, "days"); //4823
    //     var left = 80 * 365 - daysDiff;

    //     console.log(left);
    // }, []);

    const [tempBirthday, setTempBirthday] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [canSaveBirthday, setCanSaveBirthday] = useState(true);

    useEffect(() => {
        var localBirthday = localStorage.getItem("birthday");

        if (localBirthday == null) {
            return;
        }

        setCanSaveBirthday(false);
        setBirthday(moment(localBirthday));
        setTempBirthday(moment(localBirthday));
    }, []);

    const [birthdayError, setBirthdayError] = useState("");
    // const [progress, setProgress] = useState(21);

    const submitBirthday = () => {
        if (tempBirthday == null) {
            setBirthdayError("Please select a date first.");
            return;
        }

        if (tempBirthday.isAfter(moment())) {
            setBirthdayError("You were not born in the future");
            return;
        }

        if (
            tempBirthday.isBefore(
                moment([moment().year() - 80, moment().month(), moment().day()])
            )
        ) {
            setBirthdayError(
                "Sorry it's only designed for age under 80 right now :/"
            );
            return;
        }
        // if successful

        setBirthdayError("");

        localStorage.setItem("birthday", tempBirthday.format("YYYY-MM-DD"));
        setBirthday(tempBirthday);
        setCanSaveBirthday(false);
        // console.log(localStorage.getItem("birthday"));

        // console.log(birthday);
    };

    const removeBirthday = () => {
        localStorage.removeItem("birthday");
        setBirthday(null);
        setCanSaveBirthday(true);
    };

    const [timeBetweenBirthday, setTimeBetweenBirthday] = useState(0);

    useEffect(() => {
        // const interval = setInterval(() => calculateTimeToNextBirthday(), 1000)
        // return () => {
        //     clearInterval(interval)
        // }
    }, []);

    const calculateTimeToNextBirthday = () => {
        var today = moment();
        var x = moment([today.year(), birthday.month(), birthday.date()]); // 2023

        var lastBirthday;
        var nextBirthday;
        if (x.isAfter(today)) {
            lastBirthday = moment([
                today.year() - 1,
                birthday.month(),
                birthday.date(),
            ]);
            nextBirthday = moment([
                today.year(),
                birthday.month(),
                birthday.date(),
            ]);
        } else if (x.isBefore(today)) {
            lastBirthday = moment([
                today.year(),
                birthday.month(),
                birthday.date(),
            ]);
            nextBirthday = moment([
                today.year() + 1,
                birthday.month(),
                birthday.date(),
            ]);
        } else {
            // if on the same day
            // TODO : unsure how this would work, because I don't know how Moment does the comparison
        }

        // get distance from last to next birthday
        // then use todays date to see how far along we are

        console.log(lastBirthday?.diff(today, "days"));
        // console.log(nextBirthday?.diff(lastBirthday, 'days'))
        // console.log(nextBirthday?.diff(today, 'seconds'))
        // console.log(1 - (nextBirthday?.diff(today, 'seconds') / (366*86400)))
        setTimeBetweenBirthday(
            1 - nextBirthday?.diff(today, "seconds") / (366 * 86400)
        );
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h1">Your birthday</Typography>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        value={tempBirthday}
                        // maxDate={maxDate}
                        // minDate ?? maybe
                        format="DD/MM/YYYY"
                        disabled={!canSaveBirthday}
                        onChange={(newValue) => setTempBirthday(newValue)}
                    />
                </LocalizationProvider>

                {birthdayError ? (
                    <Typography color={"error.main"} fontSize={12}>
                        {birthdayError}
                    </Typography>
                ) : (
                    ""
                )}
                <Button onClick={submitBirthday} disabled={!canSaveBirthday}>
                    Select
                </Button>
                <Button onClick={removeBirthday} disabled={canSaveBirthday}>
                    Remove
                </Button>
                <Button
                    onClick={calculateTimeToNextBirthday}
                    disabled={canSaveBirthday}
                >
                    Time till next
                </Button>
                {birthday && (
                    <Typography>{21 + timeBetweenBirthday}</Typography>
                )}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        backgroundColor: "blue",
                    }}
                >
                    {/* {birthday && <Calendar birthday={birthday}/>} */}
                    {birthday && <CalendarTabs birthday={birthday} />}
                </Box>
            </Box>
            {/* <Box sx={{ width: "100%" }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                        />
                         <CircularProgress variant="determinate" value={progress}/>
                    </Box> */}
        </Box>
    );
}

export default Birthday;
