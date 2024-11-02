import { useState } from "react";
import { Navigate } from "react-router-dom";

function Transaction({updatePendingAmount,closeflag,customer_id}){

    const [description,setDesc]=useState('');
    const [amount,setAmount]=useState('');
    // const [redirec,setredirec]=useState(false);
    async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/transaction/${customer_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: parseInt(amount), // Convert to float
              description,
              
            }),
            credentials: 'include',
          });
      
          if (response.ok) {
            // Update the pending amount in the parent component
            updatePendingAmount(customer_id, parseInt(amount)); 
            // setredirec(true);
            closeflag(); // Close the modal on success
          }

    }
    
    return(
        <div className="new-customer-container">
          <form className="new-customer-form" onSubmit={handleSubmit}>
            <h2>Add New Transaction</h2>
            <div className="form-group">
              <label htmlFor="name">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                
              />
            </div>
           
            <div className="form-group">
              <label htmlFor="pendingAmount">Pending Amount</label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="submit-button">Add Transaction</button>
            <button className="submit-button" onClick={closeflag}>Cancel</button>
          </form>
        </div>
      );
}
export default Transaction;