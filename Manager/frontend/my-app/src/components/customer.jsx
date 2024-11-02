import React, { useState } from 'react';
import '../Customer.css'; // We'll define styles here
import { Link } from 'react-router-dom';
import Transaction from './transaction';

function CustomerCard({ customer ,updatePendingAmount}) {
    const { name, phone, photo, pendingAmount,_id } = customer;
    const [flag,setflag]=useState(false);
    function openflag(){
        setflag(true);
    }
    function closeflag(){
        setflag(false);
    }

    return (<div className="customer-card" >
            
            <img src={`http://localhost:4000${photo}`} alt={`${name}'s avatar`} className="customer-photo" />
            <div className="customer-info">
                <h3 className="customer-name" ><Link to={`/customer_transactions/${_id}`}>{name}</Link></h3>
                <p className="customer-phone">📞 {phone}</p>
            </div>
            <div className='customer-action'>
                <p className="customer-pending">Pending Amount: ₹{pendingAmount}</p>
                <button className="customer-button" onClick={openflag}>Add Transaction</button>
            </div>
            
            {flag && <Transaction customer_id={_id} closeflag={closeflag} updatePendingAmount={updatePendingAmount}/>}

        </div>
    );
}

export default CustomerCard;
