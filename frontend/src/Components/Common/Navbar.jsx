import React from 'react';
import '../../Styles/style.css';

import Manager from '../../pages/manager/navbar';
import Creator from '../../pages/creator/navbar';
import Cashier from '../../pages/cashier/navbar';
import Supplier from '../../pages/supplier/navbar';


const Navbar = () => {
    const userRole = localStorage.getItem('userRole');

    const renderHeader = () => {
                if (userRole === 'Customer') {
                    return (
                        <> </>
                    );

                } else if (userRole === 'Manager') {
                    return (
                        <Manager />
                    );

                } else if (userRole === 'Cashier') {
                    return (
                        <Cashier/>
                    );
                }  else if (userRole === 'Creator') {
                    return (
                        <Creator/>
                    );
                }  else if (userRole === 'Supplier') {
                    return (
                        <Supplier/>
                    );
                }  else {
                    return (
                        <></>
                    );
                }
                

            };

            return (
                <>
                    {renderHeader()}
                </>
            );
        }

export default Navbar;