import React, { useState } from 'react'
import axios from 'axios'

const DonationForm = ({ recipientId, onDonationSuccess }) => {
  const [DonorName, setDonorName] = useState('')
  const [DonorEmail, setDonorEmail] = useState('')
  const [Amount, setAmount] = useState('')
  const [Processing, setProcessing] = useState(false)
  const [Success, setSuccess] = useState(false)

  const handleDonate = (e) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment gateway delay
    setTimeout(() => {
      const donationData = {
        amount: Amount,
        donorName: DonorName,
        donorEmail: DonorEmail
      }

      axios.put(`http://ek-zaria-backend-1.onrender.com/recipients/${recipientId}/donate`, donationData)
        .then(res => {
          console.log(res)
          setProcessing(false)
          setSuccess(true)
          
          // Reset form
          setDonorName('')
          setDonorEmail('')
          setAmount('')
          
          // Call parent function to refresh data
          if (onDonationSuccess) {
            onDonationSuccess()
          }
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            setSuccess(false)
          }, 3000)
        })
        .catch(err => {
          console.log(err)
          setProcessing(false)
          alert('Donation failed. Please try again.')
        })
    }, 2000) // 2 second delay to simulate payment processing
  }

  return (
    <div className="donation-form-container">
      <h3>Make a Donation</h3>
      
      {Success && (
        <div className="success-message">
          ✅ Donation Successful! Thank you for your contribution.
        </div>
      )}
      
      <form onSubmit={handleDonate}>
        <input
          type="text"
          placeholder="Your Name"
          value={DonorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
          disabled={Processing}
        />
        
        <input
          type="email"
          placeholder="Your Email"
          value={DonorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          required
          disabled={Processing}
        />
        
        <input
          type="number"
          placeholder="Donation Amount (₹)"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
          disabled={Processing}
        />
        
        <button type="submit" disabled={Processing}>
          {Processing ? 'Processing Payment...' : 'Donate Now'}
        </button>
      </form>
      
      <p className="note">
        * This is a dummy payment gateway for demonstration purposes
      </p>
    </div>
  )
}

export default DonationForm
