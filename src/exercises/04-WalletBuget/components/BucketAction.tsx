import React from 'react'
import Icon from '../../../components/Icon';
import { useDispatch } from 'react-redux';

type Props = {
    data: any;
    setOpenPopup: (state: boolean) => void;
}

const BucketAction = ({
    data,
    setOpenPopup,
}: Props) => {
    const dispatch = useDispatch();
    const handleChooseAction = (screen: string) => {
        setOpenPopup(false);
        dispatch({
            type: "CHANGE_SCREEN",
            payload: {
                screen
            }
        })
    }

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
            <div className='btnMoreCustom bucketItems' onClick={() => handleChooseAction("formUpdateBucket")}>
                <div>Update {data.name}</div>
                <Icon name='pen' size={18} />
            </div>
            <div className='btnMoreCustom bucketItems' onClick={() => handleChooseAction("formDepositBucket")}>
                <div>Desposit Bucket</div>
                <Icon name='arrowTop' size={24} color='green' />
            </div>
            <div className='btnMoreCustom bucketItems' onClick={() => handleChooseAction("formWithdrawBucket")}>
                <div>Withdraw Bucket</div>
                <Icon name='arrowBottom' size={24} color='red'/>
            </div>
        </div>
    </div>
  )
}

export default BucketAction