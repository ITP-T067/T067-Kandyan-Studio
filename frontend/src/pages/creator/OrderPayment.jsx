import React from 'react'
import '../../Styles/creator/orderNav.css';

export default function OrderPayment() {
  return (
    <>
        <nav className="order-navbar">
            <a className="order-el left_order " href="/creator/projectOrders/"><div className="">Order List</div></a>
            <a className="order-el middle_order" href="/creator/physicalOrders"><div>Add physical orders</div></a>
            <a className="order-el right_order" href="/creator/orderPayments" style={{backgroundColor: '#525252'}}><div>Approve Order Payments</div></a>
        </nav>
    </>
  )
}
