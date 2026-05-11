import React from 'react'

type Props = {}

const WithdrawForm = (props: Props) => {
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
          placeholder='Enter the amount you wish to withdraw.'
        />
        <button className='btnCustomBucket'>Confirm withdraw</button>
      </div>
    </div>
  )
}

export default WithdrawForm