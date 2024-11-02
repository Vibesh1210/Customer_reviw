
import './App.css';

import List from './components/list';
import Login from './components/login';
import Register from './components/register';
import Structure from './components/structure';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './components/usercontext';
import NewCustomer from './components/newcustomer';
import Transaction from './components/transaction';
import Customer_Transaction from './components/customer_transactions';
const mockCustomers = [
  {
    _id: '1',
    name: 'Ayushman Baghel',
    phone: '9876543210',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    pendingAmount: 5000,
  },
  {
    _id: '2',
    name: 'John Doe',
    phone: '1234567890',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    pendingAmount: 1500,
  },
  // Add more customers as needed
];
function App() {
  return (
    <UserContextProvider>

    <Routes>
      <Route path='/' element={<Structure />}>

        <Route index element={<List />} />
        <Route path='/add' element={<NewCustomer />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/customer_transactions/:customerId" element={<Customer_Transaction />} />
      </Route>


    </Routes>
    </UserContextProvider>

  );
}

export default App;
