import React from 'react'

type Props = {
    data: any;
}

const BucketForm = ({
    data,
}: Props) => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        <div style={{
            padding: '16px',
            textAlign: 'center',
            fontSize: '21px',
            fontWeight: 600,
        }}>{data.name}</div>
        <div style={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            <div className='btnMoreCustom'>Update (name)</div>
            <div className='btnMoreCustom'>Desposit Bucket</div>
            <div className='btnMoreCustom'>Withdraw Bucket</div>
        </div>
    </div>
  )
}

export default BucketForm