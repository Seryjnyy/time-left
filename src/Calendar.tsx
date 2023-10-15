import moment from "moment";
import React, { useEffect, useRef } from "react";
import Canvas from "./Canvas";

interface CalendarProps {
    birthday: moment.Moment;
    type: string;
}

export default function Calendar({ birthday, type }: CalendarProps) {
    const getDrawFunction = (context) => {
        switch (type) {
            case "days":
                return draw(context, 365, 80, moment().diff(birthday, "days"));
            case "weeks":
                return draw(context, 52, 80, moment().diff(birthday, "weeks"));
            case "months":
                return draw(context, 12, 80, moment().diff(birthday, "months"));
            case "years":
                return draw(context, 1, 80, moment().diff(birthday, "years"));
            default:
                throw new Error("Wrong type provided to calendar.");
        }
    };

    // TODO : draw the calendar differently, the size, depending on the type, larger for years, months, so they can be seen better
    const draw = (context, columnAmount, rowAmount, amountCompleted) => {
        context.fillStyle = "#000000";
        let boxWidth = context.canvas.width / columnAmount;
        let boxHeight = context.canvas.height / rowAmount;

        let opp = 0;
        for (let x = 0; x < columnAmount; x++) {
            for (let y = 0; y < rowAmount; y++) {
                let current = y * columnAmount + x;

                if (current < amountCompleted) {
                    context.fillStyle = "#309030";
                } else {
                    // console.log("happens")
                    context.fillStyle = "#000000";
                }

                opp++;
                context.fillRect(1 * x, 1 * y, 1, 1);
            }
            opp++;
        }
    };

    return <Canvas draw={getDrawFunction} />;
}
