
import React, { useEffect, useState } from 'react';
import CustomerCard from './customer';

function CustomerList() {
  const [customer_list,setcust]=useState([]);

  useEffect(()=>{
    try {
      
      fetch('http://localhost:4000/all',{credentials:'include'}).then(res =>{
        res.json().then(customer =>{
          setcust(customer);
        })
      })
    } catch (error) {
      console.log(error);
    }
  },[]);

  function updatePendingAmount(customerId, amount) {
    // console.log(amount);
    setcust((prevList) => 
      prevList.map((customer) => 
        customer._id === customerId 
          ? { ...customer, pendingAmount: customer.pendingAmount + amount } 
          : customer
      )
    );
  }
  
  return (
    <div className="customer-list">
      {customer_list.length>0 && customer_list.map(customer => (
        <CustomerCard key={customer._id} customer={customer} updatePendingAmount={updatePendingAmount} />
      ))}
    </div>
  );
}

export default CustomerList;

// export default List;
