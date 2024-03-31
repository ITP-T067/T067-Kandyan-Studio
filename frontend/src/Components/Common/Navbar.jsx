import React from 'react';
import '../../Styles/style.css';
import {
    Navbar,
    Typography,
    List,
    MenuItem,
} from '@material-tailwind/react';

const NavbarWithDepartments = () => {

    const departments = [
        { title: 'Event Department', link: '/manager/eventdept' },
        { title: 'Stock Department', link: '/manager/stockdept' },
        { title: 'Finance Department', link: '/' },
        { title: 'Employee Department', link: '' },
        { title: 'Supplier Department', link: '' },
        { title: 'Loyalty Department', link: '' },
    ];

    const renderDepartments = departments.map((department, index) => (
        <a href={department.link} key={index}>
            <MenuItem>
                <div className="flex items-center md:justify-between lg:justify-between rounded-lg">
                </div>
                <div>
                    <Typography
                        variant="h6"
                        className="flex items-center text-sm font-bold text-kwhite" 
                    >
                        {department.title}
                    </Typography>
                </div>
            </MenuItem>
        </a>
    ));

    return (
        <div className='p-3'>
            <Navbar className="mx-auto max-w-screen-xl px-4 py-2 bg-kblack">
            <div className="flex items-center justify-between text-kwhite">
                <div className="lg:block">
                    <List className="mt-3 mb-3 p-0 lg:mt-3 lg:mb-3  lg:p-1">
                        {renderDepartments}
                    </List>
                </div>
            </div>
            </Navbar>
        </div>
    );
};

export default NavbarWithDepartments;
