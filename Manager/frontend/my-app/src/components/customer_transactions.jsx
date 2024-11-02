
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Customer_Transaction() {
  const { customerId } = useParams();  // Extract the customerId from the URL
  const [transactions, setTransactions] = useState([]);
  const [redirec,setredirec]=useState(false);
  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch(`http://localhost:4000/customer_transactions/${customerId}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setTransactions(data);
    }
    
    fetchTransactions();
  }, [customerId]);

  function set(){
    setredirec(true);
  }

  if(redirec){
    return <Navigate to={'/'} />;
  }


  return (
    <div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <h2 style={{marginLeft:'10px'}}>Previous Transactions</h2>
        <button className='customer-button' onClick={set}>Back</button>
        </div>
      <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                       
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody> {transactions.map((transaction) => (

                    <tr>
                        {/* <td>{item._id}</td> */}
                       
                        <td>{transaction.amount}</td>
                        <td>{new Date(transaction.date).toLocaleString()}</td>
                       
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      
    </div>
  );
}


export default Customer_Transaction;