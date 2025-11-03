// AddRecipient.jsx (Following your AddCategory.jsx pattern)
import React, { useState } from 'react'
import axios from 'axios'
import loader from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom'

const AddRecipient = () => {
  const [Name, setName] = useState('')
  const [Address, setAddress] = useState('')
  const [Reason, setReason] = useState('')
  const [ContactNumber, setContactNumber] = useState('')
  const [BankAccount, setBankAccount] = useState('')
  const [IFSC, setIFSC] = useState('')
  const [TargetAmount, setTargetAmount] = useState('')
  const [File, setFile] = useState(null)
  const [imgUrl, setimgUrl] = useState()
  const [Loader, setLoader] = useState(false)
  
  let navigate = useNavigate()

  const formSubmit = (event) => {
    event.preventDefault()
    setLoader(true)
    
    const formData = new FormData()
    formData.append('name', Name)
    formData.append('address', Address)
    formData.append('reason', Reason)
    formData.append('contactNumber', ContactNumber)
    formData.append('bankAccount', BankAccount)
    formData.append('ifsc', IFSC)
    formData.append('targetAmount', TargetAmount)
    formData.append('receivedAmount', 0)
    formData.append('photo', File)
    
    axios.post('https://ek-zaria-backend-1.onrender.com/recipients', formData)
      .then(res => {
        console.log(res)
        setLoader(false)
        navigate('/recipients')
      })
      .catch(err => {
        console.log(err)
        setLoader(false)
      })
  }

  const fileHandeler = (e) => {
    setFile(e.target.files[0])
    setimgUrl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <>
      {Loader && 
        <div className="loader-container">
          <img src={loader} alt="Loading..." />
        </div>
      }
      
      <div className="form-container">
        <h2>Add New Recipient</h2>
        <form onSubmit={formSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <textarea 
            placeholder="Complete Address" 
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          
          <textarea 
            placeholder="Reason for Donation Requirement" 
            value={Reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          
          <input 
            type="tel" 
            placeholder="Contact Number" 
            value={ContactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          
          <input 
            type="text" 
            placeholder="Bank Account Number" 
            value={BankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            required
          />
          
          <input 
            type="text" 
            placeholder="IFSC Code" 
            value={IFSC}
            onChange={(e) => setIFSC(e.target.value)}
            required
          />
          
          <input 
            type="number" 
            placeholder="Target Amount (₹)" 
            value={TargetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
          
          <input 
            type="file" 
            onChange={fileHandeler}
            accept="image/*"
            required
          />
          
          {imgUrl && <img src={imgUrl} alt="Preview" className="preview-img" />}
          
          <button type="submit">Add Recipient</button>
        </form>
      </div>
    </>
  )
}

export default AddRecipient
