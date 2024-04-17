import React, { useState, useEffect } from 'react';
import '../../Styles/style.css';
import {
    Navbar,
    Typography,
    List,
} from '@material-tailwind/react';

const CashierNavbar = () => {

    const departments = [
        { title: 'Order', link: '' },
        { title: 'Stock Avalability', link: '' },
    ];

    const [activeButton, setActiveButton] = useState(localStorage.getItem('activeButton') || null);

    const handleButtonClick = (index) => {
        setActiveButton(index);
        localStorage.setItem('activeButton', index);
    };

    
    useEffect(() => {
        const storedActiveButton = localStorage.getItem('activeButton');
        if (storedActiveButton !== null) {
            setActiveButton(parseInt(storedActiveButton));
        }
    }, []);

    const renderDepartments = departments.map((department, index) => (
        <a href={department.link} key={index} className="flex-grow m-1">
            <button
                key={index}
                className={`bg-kblack text-kwhite w-full hover:bg-kgray transition duration-300 p-3 rounded-full ${
                    activeButton === index ? 'bg-kgray' : ''
                }`}
                onClick={() => handleButtonClick(index)} // Call handleButtonClick function on click
            >
                <Typography
                    variant="h6"
                    className="text-sm font-bold"
                >
                    {department.title}
                </Typography>
            </button>
        </a>
    ));

    return (
        <div className='p-3'>
            <Navbar className="mx-auto rounded-full bg-kblack p-1">
                <div className="items-center justify-between text-kwhite">
                    <List className="flex flex-row justify-between">
                        {renderDepartments}
                    </List>
                </div>
            </Navbar>
        </div>
    );
};

export default CashierNavbar;
