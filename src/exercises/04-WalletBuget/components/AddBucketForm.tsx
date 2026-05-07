import React from 'react'

type Props = {}

const AddBucketForm = (props: Props) => {
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
          placeholder='Enter a bucket name'
        />
        <textarea className='inputCustomBucket' placeholder='Enter a description' style={{minHeight: '133px'}}/>
        <select className='inputCustomBucket'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button className='btnCustomBucket'>Save Bucket</button>
      </div>
    </div>
  )
}

export default AddBucketForm