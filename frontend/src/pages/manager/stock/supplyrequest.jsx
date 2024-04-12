import { Card, Typography, Button, CardBody } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { HiOutlineArrowCircleLeft, HiOutlinePlusCircle } from "react-icons/hi";

const TABLE_HEAD = ["Date", "Item", "Quantity", "Expected Delivery Date", "Actions"];

const TABLE_ROWS = [
    {
        date: "2021-09-01",
        item: "Item 1",
        quantity: "10",
        exdate: "2021-09-10",
    },
    {
        date: "2021-09-02",
        item: "Item 2",
        quantity: "20",
        exdate: "2021-09-12",
    },
];

const SupplyRequest = () => {
    const GoBack = () => {
        window.location.href = "/manager/stockdept/";
    };

    const handleButton = (option) => {
        return () => {
            switch (option) {
                case "Request":
                    window.location.href = "/manager/stockdept/stocklevels/customreq";
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
                                <span className="text-sm">Supply Requests</span>
                            </Button>
                        </div>
                        <div className="mx-auto">
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite rounded-full p-2 text-sm"
                            />
                        </div>
                        <div>
                            <Button
                                className="flex items-center space-x-2 bg-kblue text-kwhite p-3 px-5"
                                onClick={handleButton("Request")}
                            >
                                <HiOutlinePlusCircle className="w-5 h-5" />
                                <span className="text-sm">Add Custom Request</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="p-3">
                <table className="w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-kblack">
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={index}
                                    className={`border-kwhite text-kwhite p-4 font-bold ${
                                        index === TABLE_HEAD.length ? "" : "border-b"
                                    } text-center`}
                                >
                                    <Typography variant="small">{head}</Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(({ date, item, quantity, exdate }, index) => {
                            const isLast = index === TABLE_ROWS.length;

                            return (
                                <tr
                                    key={index}
                                    className={`${isLast ? "" : "border-b"} bg-kgray text-kwhite text-center p-4`}
                                >
                                    <td>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {date}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {quantity}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {exdate}
                                        </Typography>
                                    </td>
                                    <td className="p-4 text-kblack flex-grow">
                                        <div className="flex justify-center gap-3 mx-auto">
                                            <Button className="p-3 bg-kblue">
                                                <PencilIcon className="h-4 w-4 text-kwhite" />
                                            </Button>
                                            <Button className="p-3 bg-kred">
                                                <TrashIcon className="h-4 w-4 text-kwhite" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-kblack p-4">
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                            1
                        </Button>
                        <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                            2
                        </Button>
                        <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                            3
                        </Button>
                        <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                            ...
                        </Button>
                        <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                            8
                        </Button>
                        <Button variant="text" size="sm" className="text-kblack bg-kwhite"></Button>
                        <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                            10
                        </Button>
                    </div>
                    <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SupplyRequest;
