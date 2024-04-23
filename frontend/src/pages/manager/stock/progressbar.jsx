
const ProgressBar = ({ value1, value2 }) => {

    const calcPercentage = (value1, valve2) => {
        return Math.round((value1 / valve2) * 100);
    };

    //Stock Level Demonstration
    const colorChanger = (percentage) => {
        let color = "";

        if (percentage < 25) {
            color = 'bg-pred/70';
        } else if (percentage < 50) {
            color = 'bg-porange/70';
        } else if (percentage < 75) {
            color = 'bg-pyellow/70';
        } else if (percentage < 90) {
            color = 'bg-plgreen/70';
        } else {
            color = 'bg-pgreen/70';
        }

        return `${color}`;
    };

    const statusChanger = (percentage) => {
        if (percentage == 0) {
            return 'Out of Stock';
        }else if (percentage < 25) {
            return 'Critically Low, Order Immediately';
        } else if (percentage < 50) {
            return 'Low Stock, Order Soon';
        } else if (percentage < 75) {
            return 'Sufficent Stock, But Consider Ordering';
        } else if (percentage < 90) {
            return 'Stock Levels are Good';
        } else {
            return 'Stock Levels are Excellent';
        }
    };

    const rowColorChanger = (percentage) => {
        let color = "";

        if (percentage < 25) {
            color = 'bg-pred/30';
        } else if (percentage < 50) {
            color = 'bg-porange/30';
        } else if (percentage < 75) {
            color = 'bg-pyellow/30';
        } else if (percentage < 90) {
            color = 'bg-plgreen/30';
        } else {
            color = 'bg-pgreen/30';
        }

        return `${color}`;
    };



    const percentage = calcPercentage(value1, value2);

    return (
        <div className={`grid grid-cols-3 items-center ${rowColorChanger(percentage)} py-1 px-2 rounded-full drop-shadow-lg`}>
                                            <div className="col-span-2 w-full bg-kgray rounded-full border overflow-hidden">
                                                <div
                                                    className={`${colorChanger(percentage)} p-2 text-center text-xs font-medium leading-none text-kwhite`}
                                                    style={{ width: `${percentage}%` }}
                                                >
                                                    {percentage + "%"}
                                                </div>
                                            </div>
                                            <span className="col-span-1">
                                                {statusChanger(percentage)}
                                            </span>
                                            </div>
    );
};

export default ProgressBar;