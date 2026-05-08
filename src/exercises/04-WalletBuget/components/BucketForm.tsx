import React from 'react'
import Icon from '../../../components/Icon';

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
            <div className='btnMoreCustom bucketItems'>
                <div>Update {data.name}</div>
                <Icon name='pen' size={18} />
            </div>
            <div className='btnMoreCustom bucketItems'>
                <div>Desposit Bucket</div>
                <Icon name='arrowTop' size={24} color='green' />
            </div>
            <div className='btnMoreCustom bucketItems'>
                <div>Withdraw Bucket</div>
                <Icon name='arrowBottom' size={24} color='red'/>
            </div>
        </div>
    </div>
  )
}

export default BucketForm