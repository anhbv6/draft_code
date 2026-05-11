import React from 'react'

type Props = {}

const DepositForm = (props: Props) => {
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
        justifyContent: 'space-between',
      }}>
        <input 
          className='inputCustomBucket' 
          style={{
            height: '50px',
          }}
          placeholder='Enter the amount you wish to deposit.'
        />
        <button className='btnCustomBucket'>Confirm deposit</button>
      </div>
    </div>
  )
}

export default DepositForm