import { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { formatNumber } from '../constants';
import type { RootState } from '../../../store/store';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const AddBucketForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("😀");
  const [amount, setAmount] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (emoji: any) => {
    setIcon(emoji.native);
    setShowPicker(false);
  };

  const availableMoney = useSelector((state: RootState) => state.wallet.availableMoney);

  const handleAddBucket = () => {
    const bucketName = name.trim();
    const bucketAmount = Number(amount);

    if (!bucketName || !amount.trim()) {
      toast.error("Please input your bucket.")
      return;
    };

    if (Number.isNaN(bucketAmount) || bucketAmount < 0) {
      toast.error("Bucket amount is invalid.");
      return;
    }

    if (bucketAmount > availableMoney) {
      toast.error("Bucket amount cannot be greater than available money.");
      return;
    }

    dispatch({
      type: "ADD_BUCKET",
      payload: {
        id: crypto.randomUUID(),
        name: bucketName,
        description,
        balance: bucketAmount,
        icon,
      }
    })
    setName("");
    setDescription("");
    setAmount("")
    setIcon("👤");
    toast.success(`Create Bucket ${bucketName} Success.`)
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
        height: '100%',
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
        <input 
          className='inputCustomBucket' 
          style={{
            height: '50px',
          }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Enter a bucket amount'
        />
        <textarea 
          className='inputCustomBucket' 
          placeholder='Enter a description' 
          style={{minHeight: '133px'}} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />

        <div style={{ position: 'relative' }}>
          {/* Box chọn emoji */}
          <div
            onClick={() => setShowPicker((prev) => !prev)}
            style={{
              height: '60px',
              width: '60px',
              border: '1px solid #172027',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              cursor: 'pointer',
              background: '#172027',
              userSelect: 'none',
              placeSelf: 'end',
            }}
          >
            {icon}
          </div>

          {/* Picker */}
          {showPicker && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '375px',
                zIndex: 1000,
              }}
            >
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
              />
            </div>
          )}
        </div>
        <div style={{
          marginTop: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <span style={{
            textAlign: 'end',
            color: '#a3a3a3',
            fontStyle: 'italic',
            fontSize: '16px',
          }}>Available Money: ${formatNumber(availableMoney)}</span>
          <button 
            className='btnCustomBucket'
            style={{
              width: '100%',
            }}
            onClick={handleAddBucket}  
          >Save Bucket</button>
        </div>
      </div>
    </div>
  )
}

export default AddBucketForm