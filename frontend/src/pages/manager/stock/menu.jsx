import React, {useEffect, useState} from 'react';
import { Card, CardBody } from "@material-tailwind/react";
import { HiOutlineClipboardList,HiOutlineChartBar,HiOutlineDocumentReport } from "react-icons/hi";
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

    const calcTotalItems = (data) => {
        let total = 0;
        data.forEach((item) => {
            total++;
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
            <div className="mx-5">
                <Card>
                    <CardBody className="grid grid-cols-2 items-center justify-between mb-5">
                        <div className='flex bg-kwhite/20 p-7 border rounded-lg mr-5 items-center justify-between text-kwhite'>
                            <span className="flex text-2xl font-bold">Total Value of Items</span>
                            <span className="flex text-4xl font-bold">{Number(calcTotalValue(dataList)).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                        </div>
                        <div className='flex bg-kwhite/20 p-7 border rounded-lg items-center justify-between text-kwhite'>
                            <span className="text-2xl font-bold">Total No.of Items</span>
                            <span className="flex text-4xl font-bold">{calcTotalItems(dataList)}</span>
                        </div>
                    </CardBody>
                </Card>
            </div>
            
            <div className="grid grid-cols-3 justify-center gap-5 mx-auto px-10">
                <button className="text-kwhite bg-kblack border-4 border-kyellow rounded-3xl transition-transform flex flex-col justify-center items-center text-center hover:scale-105" onClick={handleMenu('ItemList')}>
                    <div>
                        <HiOutlineClipboardList className="w-32 h-32 mb-5" />
                        <span className="text-xl">Item List</span>
                    </div>
                </button>
                <button className="text-kwhite bg-kblack border-4 border-kyellow rounded-3xl transition-transform flex flex-col justify-center items-center text-center hover:scale-105" onClick={handleMenu('StockLevels')}>
                    <div>
                        <HiOutlineChartBar className="w-32 h-32 mb-5" />
                        <span className="text-xl">Stock Levels</span>
                    </div>
                </button>
                <button className="py-10 text-kwhite bg-kblack border-4 border-kyellow rounded-3xl transition-transform flex flex-col justify-center items-center text-center hover:scale-105" onClick={handleMenu('SupplyRequest')}>
                    <div>
                        <HiOutlineDocumentReport className="w-32 h-32 mb-5" />
                        <span className="text-xl">Supply Requests</span>
                    </div>
                </button>
            </div>
        </>
    );
}

export default StockMenu;
