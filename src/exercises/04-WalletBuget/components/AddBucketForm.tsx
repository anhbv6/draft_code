import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'

type Props = {}

const AddBucketForm = (props: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("👤");
  const handleAddBucket = () => {
    if (!name.trim()) return;
    dispatch({
      type: "ADD_BUCKET",
      payload: {
        id: crypto.randomUUID(),
        name,
        balance: 0,
        icon,
      }
    })
    setName("");
    setDescription("");
    setIcon("👤");
    toast.success("Success")
    dispatch({
      type: "CHANGE_SCREEN",
      payload: {
        screen: "dashBoard",
      }
    })
  }

  return (
    <div style={{
      height: '100%',
      marginTop: '16px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <input 
          className='inputCustomBucket' 
          style={{
            height: '50px',
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter a bucket name'
        />
        <textarea 
          className='inputCustomBucket' 
          placeholder='Enter a description' 
          style={{minHeight: '133px'}} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />
        <select 
          className='inputCustomBucket'
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        >
          <option value="👤">👤 Personal</option>
          <option value="📈">📈 Invest</option>
          <option value="💼">💼 Business</option>
        </select>
        <button 
          className='btnCustomBucket'
          onClick={handleAddBucket}  
        >Save Bucket</button>
      </div>
    </div>
  )
}

export default AddBucketForm