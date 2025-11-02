// RecipientsList.jsx (Following your Category.jsx pattern)
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const RecipientsList = () => {
  const [Recipients, setRecipients] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://ek-zaria-backend-1.onrender.com/recipients')
      .then(res => {
        console.log(res.data)
        setRecipients(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className="recipients-container">
        <h2>Active Recipients</h2>
        <div className="recipients-grid">
          {Recipients.map((recipient) => {
            const remaining = recipient.targetAmount - recipient.receivedAmount
            const percentage = (recipient.receivedAmount / recipient.targetAmount) * 100
            
            // Only show if goal not reached
            if (remaining <= 0) return null
            
            return (
              <div key={recipient._id} className="recipient-card">
                <img src={recipient.photo} alt={recipient.name} />
                <h3>{recipient.name}</h3>
                <p className="reason">{recipient.reason.substring(0, 100)}...</p>
                
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${percentage}%`}}></div>
                </div>
                
                <div className="amounts">
                  <p>Target: ₹{recipient.targetAmount}</p>
                  <p>Received: ₹{recipient.receivedAmount}</p>
                  <p>Remaining: ₹{remaining}</p>
                </div>
                
                <Link to={`/recipient/${recipient._id}`}>
                  <button>View Full Details</button>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default RecipientsList
