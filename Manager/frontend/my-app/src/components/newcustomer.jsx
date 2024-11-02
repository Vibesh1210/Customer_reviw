import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
// import '../NewCustomer.css'; // Import the CSS file for styling

function NewCustomer() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pendingAmount, setPendingAmount] = useState('');
  const [photo, setPhoto] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Prepare the form data for submission
    const formData = new FormData();
    formData.set('photo', photo);
    formData.set('name', name);
    formData.set('phone', phone);
    formData.set('pendingAmount', pendingAmount);

    // Send data to the server
    const response = await fetch('http://localhost:4000/add', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true); // Redirect on successful submission
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="new-customer-container">
      <form className="new-customer-form" onSubmit={handleSubmit}>
        <h2>Add New Customer</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter customer phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pendingAmount">Pending Amount</label>
          <input
            type="number"
            id="pendingAmount"
            placeholder="Enter pending amount"
            value={pendingAmount}
            onChange={(e) => setPendingAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Customer</button>
      </form>
    </div>
  );
}

export default NewCustomer;
