import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import DonationForm from './DonationForm'

const RecipientDetails = () => {
  const { id } = useParams()
  const [Recipient, setRecipient] = useState(null)
  const [Loading, setLoading] = useState(true)

  const fetchRecipient = () => {
    axios.get(`https://ek-zaria-backend-1.onrender.com/recipients/${id}`)
      .then(res => {
        console.log(res.data)
        setRecipient(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchRecipient()
  }, [id])

  if (Loading) return <div className="recipient-details"><h2>Loading...</h2></div>
  if (!Recipient) return <div className="recipient-details"><h2>Recipient not found</h2></div>

  const remaining = Recipient.targetAmount - Recipient.receivedAmount
  const percentage = (Recipient.receivedAmount / Recipient.targetAmount) * 100
  const isGoalMet = remaining <= 0

  return (
    <>
      <div className="recipient-details">
        <div className="details-header">
          <img src={`https://localhost:3000/${Recipient.photo}`} alt={Recipient.name} />
          <h1>{Recipient.name}</h1>
        </div>

        <div className="verification-section">
          <h3>Personal Information</h3>
          <p><strong>Address:</strong> {Recipient.address}</p>
          <p><strong>Contact:</strong> {Recipient.contactNumber}</p>
        </div>

        <div className="reason-section">
          <h3>Reason for Support</h3>
          <p>{Recipient.reason}</p>
        </div>

        <div className="donation-progress">
          <h3>Donation Progress</h3>
          <div className="progress-bar-large">
            <div className="progress-fill" style={{width: `${percentage}%`}}></div>
          </div>
          <div className="amounts-detail">
            <p>Target Amount: <strong>₹{Recipient.targetAmount}</strong></p>
            <p>Amount Received: <strong>₹{Recipient.receivedAmount}</strong></p>
            <p>Amount Remaining: <strong>₹{remaining}</strong></p>
            <p>Progress: <strong>{percentage.toFixed(2)}%</strong></p>
          </div>
        </div>

        {!isGoalMet && (
          <DonationForm 
            recipientId={id} 
            onDonationSuccess={fetchRecipient}
          />
        )}

        {isGoalMet && (
          <div className="goal-met">
            <h3>🎉 Goal Achieved!</h3>
            <p>This recipient has received the required amount. Thank you for your support!</p>
          </div>
        )}

        <div className="bank-details">
          <h3>Direct Transfer Details</h3>
          <p><strong>Account Number:</strong> {Recipient.bankAccount}</p>
          <p><strong>IFSC Code:</strong> {Recipient.ifsc}</p>
          <p><strong>Account Holder:</strong> {Recipient.name}</p>
          <p className="note">*You can also transfer directly to recipient's account</p>
        </div>
      </div>
    </>
  )
}

export default RecipientDetails
