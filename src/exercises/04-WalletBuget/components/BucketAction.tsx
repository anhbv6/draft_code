import React, { useState } from 'react'
import Icon from '../../../components/Icon';
import { useDispatch } from 'react-redux';
import PopupMini from '../../../components/PopupMini';

type Props = {
    data: any;
    setOpenPopup: (state: boolean) => void;
}

const BucketAction = ({
    data,
    setOpenPopup,
}: Props) => {
    const dispatch = useDispatch();
    const [toggleDelete, setToggleDelete] = useState(false);
    const handleChooseAction = (screen: string) => {
        setOpenPopup(false);
        dispatch({
            type: "CHANGE_SCREEN",
            payload: {
                screen
            }
        })
    }

    const handleDeleteBucket = () => {

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
                <Icon name='arrowBottom' size={24} color='orange'/>
            </div>
            <div className='btnMoreCustom bucketItems' style={{marginRight: "3px"}} onClick={() => setToggleDelete(true)}>
                <div>Remove Bucket</div>
                <Icon name='bin' size={18} color='red'/>
            </div>
        </div>
        <PopupMini  
            open = {toggleDelete}
            onClose = {() => setToggleDelete(false)}
            contentStyleCustom={{
              background: '#172027',
              borderRadius: '8px',
              minHeight: '100px',
              width: '300px',
              padding: 0,
            }}
            children ={<div>
                <div style={{
                    padding: '16px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 600,
                }}>Delete Bucket</div>
                <div style={{
                    padding: '8px 16px',
                }}>Do you want to delete {data.name}?</div>
                <div style={{
                    padding: '8px',
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'end',
                }}>
                    <span className='btnCustomBucket' style={{height: '30px', padding: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => setToggleDelete(false)}>Cancel</span>
                    <span className='btnCustomBucket' style={{height: '30px', padding: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={handleDeleteBucket}>Ok</span>
                </div>
            </div>}
        />
    </div>
  )
}

export default BucketAction