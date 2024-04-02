import React from 'react';

const StockMenu = () => {
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
        <div className="card-container flex justify-center gap-2">
                <div className="card1 w-45 h-156 relative">
                    <div className="Rectangle w-full h-full absolute bg-gray-700 rounded-3xl"></div>
                    <p className="absolute text-white text-2xl font-semibold">Total Orders</p>
                </div>
                <div className="card1 w-45 h-156 relative">
                    <div className="Rectangle w-full h-full absolute bg-gray-700 rounded-3xl"></div>
                    <p className="absolute text-white text-2xl font-semibold">Stock Levels</p>
                </div>
            </div>
            <div className="order-btn-container flex justify-center gap-2 mt-20">
                <button className="order_btn w-1/5 h-360 bg-black border-6 border-yellow-500 rounded-lg transition-transform flex justify-center items-center hover:scale-105" onClick={handleMenu('ItemList')}>
                    <h3 className="text-white">Item List</h3>
                </button>
                <button className="order_btn w-1/5 h-360 bg-black border-6 border-yellow-500 rounded-lg transition-transform flex justify-center items-center hover:scale-105" onClick={handleMenu('StockLevels')}>
                    <h3 className="text-white">Stock Levels</h3>
                </button>
                <button className="order_btn w-1/5 h-360 bg-black border-6 border-yellow-500 rounded-lg transition-transform flex justify-center items-center hover:scale-105" onClick={handleMenu('SupplyRequest')}>
                    <h3 className="text-white">Supply Requests</h3>
                </button>
            </div>
        </>
    );
}

export default StockMenu;
