import React, {useEffect, useState} from 'react';
import { Card, CardBody } from "@material-tailwind/react";
import { HiOutlineClipboardList } from "react-icons/hi";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";

const StockMenu = () => {

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        getFetchData();
        console.log(dataList);
    }, []);

    const getFetchData = async () => {
        try {
            const response = await axios.get("/item/");
            console.log(response);
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const calcTotalValue = (data) => {
        let total = 0;
        data.forEach((item) => {
            total += item.sellingPrice * item.quantity;
        });
        return total;
    }

    const handleMenu = (option) => {
        return () => {
            switch (option) {
                case 'ItemList':
                    window.location.href = '/manager/stockdept/items';
                    break;
                case 'StockLevels':
                    window.location.href = '/manager/stockdept/stocklevels';
                    break;
                case 'SupplyRequest':
                    window.location.href = '/manager/stockdept/supplyrequest';
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
                    <CardBody className="flex items-center justify-between mb-5">
                        <div className='flex-grow bg-kwhite p-7 rounded-lg mr-5 items-center justify-between'>
                            <span className="flex text-2xl font-bold">Stock Management</span>
                            <span className="flex text-2xl font-bold">Calc</span>
                        </div>
                        <div className='flex-grow bg-kwhite p-7 rounded-lg'>
                            <span className="text-2xl font-bold">Stock Management</span>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="flex min-h-64 justify-center gap-5 mx-auto px-10">
                <button className="w-1/3 text-kwhite bg-kblack border-4 border-kyellow rounded-3xl transition-transform flex flex-col justify-center items-center text-center hover:scale-105" onClick={handleMenu('ItemList')}>
                    <div>
                        <HiOutlineClipboardList className="w-96" />
                        <span className="text-lg">Item List</span>
                    </div>
                </button>
                <button className="w-1/3 text-kwhite bg-kblack border-4 border-kyellow rounded-3xl transition-transform flex flex-col justify-center items-center text-center hover:scale-105" onClick={handleMenu('StockLevels')}>
                    <div>
                        <HiOutlineClipboardList className="w-96" />
                        <span className="text-lg">Stock Levels</span>
                    </div>
                </button>
                <button className="w-1/3 text-kwhite bg-kblack border-4 border-kyellow rounded-3xl transition-transform flex flex-col justify-center items-center text-center hover:scale-105" onClick={handleMenu('SupplyRequest')}>
                    <div>
                        <HiOutlineClipboardList className="w-96" />
                        <span className="text-lg">Supply Requests</span>
                    </div>
                </button>
            </div>
        </>
    );
}

export default StockMenu;
