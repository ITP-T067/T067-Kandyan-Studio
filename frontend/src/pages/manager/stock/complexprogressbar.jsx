import React from "react";

const ComplexProgressBar = ({ itemQuantity, maxCapacity, reqQuantity }) => {
    const calcPercentage = (quantity, capacity) => {
        return Math.round((quantity / capacity) * 100);
    };

    const calcExpectedPercentage = (reqQuantity, maxCapacity) => {
        return Math.round((reqQuantity / maxCapacity) * 100);
    };

    const colorChanger = (percentage) => {
        let color = "";

        if (percentage < 25) {
            color = "bg-pred/70";
        } else if (percentage < 50) {
            color = "bg-porange/70";
        } else if (percentage < 75) {
            color = "bg-pyellow/70";
        } else if (percentage < 90) {
            color = "bg-plgreen/70";
        } else {
            color = "bg-pgreen/70";
        }

        return `${color}`;
    };

    const expectedColorChanger = (percentage) => {
        let color = "";
        if (percentage < 25) {
            color = "bg-pred/50";
        } else if (percentage < 50) {
            color = "bg-porange/50";
        } else if (percentage < 75) {
            color = "bg-pyellow/50";
        } else if (percentage < 90) {
            color = "bg-plgreen/50";
        } else {
            color = "bg-pgreen/50";
        }

        return `${color}`;
    };

    const percentage = calcPercentage(itemQuantity, maxCapacity);
    const expectedPercentage = calcExpectedPercentage(reqQuantity, maxCapacity);

    return (
        <div className={`flex items-center ${expectedColorChanger(percentage+expectedPercentage)} rounded-full p-1 drop-shadow-lg`}>
            <div className="w-full flex bg-kgray overflow-hidden rounded-full border text-xs text-center justify-items-start">
                <div
                    className={"flex justify-center overflow-hidden " + colorChanger(percentage) + " p-2 items-center text-kwhite "}
                    style={{ width: `${percentage}%` }}
                >
                    <span className="inline-flex mx-auto">{percentage + "%"}</span>
                </div>
                <div
                    className={"flex bg-plgreen/30 text-kwhite items-center font-medium"}
                    style={{ width: `${expectedPercentage}%` }}
                >
                    <span className="mx-auto">+{expectedPercentage + "%"}</span>
                </div>
            </div>
            <span className="mx-2">{expectedPercentage + percentage + "%"}</span>
        </div>
    );
};

export default ComplexProgressBar;
