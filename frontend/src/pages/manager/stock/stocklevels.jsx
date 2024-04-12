import {
    Typography,
    Button,
    Progress,
    Card,
    CardBody,
} from "@material-tailwind/react";

import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const TABLE_HEAD = ["Name", "Status", "Percentage", "Actions"]; 

const TABLE_ROWS = [
    {
        name: "Item 1",
        status: "Available",
        percentage:20,
    },
    {
        name: "Item 2",
        status: "Out of Stock",
        percentage:50,
    },
];

const StockLevels = () => {

    const GoBack = () => {
        window.location.href = "/manager/stockdept/";
    };

    const handleButton = (option) => {
        return () => {
            switch (option) {
                case 'Request':
                    window.location.href = '/manager/stockdept/stocklevels/request';
                    break;
                default:
                    break;
            }
        };
    };

    return (
        <>
        <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <Button
                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                <span className="text-sm">Stock Levels</span>
                            </Button>
                        </div>
                        <div>
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite rounded-full p-2 text-sm"
                            />
                        </div>
                        <div>
                            <Button className="bg-kblue text-kwhite p-3 px-5">
                                Generate Reports
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        <div className="px-10">
            <table className="w-full rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-kblack/40">
                        {TABLE_HEAD.map((head, index) => (
                            <th
                                key={head}
                                className={`border-kwhite text-kwhite p-4 font-bold ${index === TABLE_HEAD.length ? '' : 'border-b'} text-center`}
                            >
                                <Typography variant="small">{head}</Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ name, status, percentage }, index) => {
                        const isLast = index === TABLE_ROWS.length;

                        return (
                            <tr key={index} className={`${isLast ? '' : 'border-b'} bg-kwhite/20 text-kwhite text-center items-center p-4`}>
                                <td>
                                    <Typography variant="small" className="font-normal">{name}</Typography>
                                </td>
                                <td>
                                    <Typography variant="small" className="font-normal">{status}</Typography>
                                </td>
                                <td>
                                    <Progress value={percentage} size="lg" label={percentage} className="border bg-blue-900/5 p-1 mx-5" />
                                    
                                </td>
                                <td className="p-4 text-kblack">
                                    <div className="flex flex-grow justify-center mx-auto">
                                        <Button className="p-3 bg-kblue text-kwhite" onClick={handleButton('Request')} >
                                            Request
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-kblack p-4">
                <Button variant="text" size="sm" className="text-kblack bg-kwhite">Previous</Button>
                <div className="flex items-center gap-2">
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">1</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">2</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">3</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">...</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">8</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">9</Button>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">10</Button>
                </div>
                <Button variant="text" size="sm" className="text-kblack bg-kwhite">Next</Button>
            </div>
        </div>
        </>
    );
};

export default StockLevels;
