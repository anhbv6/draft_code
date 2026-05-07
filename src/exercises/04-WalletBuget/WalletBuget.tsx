import React from 'react'
import "./WalletBuget.css";
import Icon from '../../components/Icon';
import BucketList from './components/BucketList';
import AddBucketForm from './components/AddBucketForm';

const WalletBuget = () => {
  return (
    <div className='backGroundWallet'>
      <div className='containerWallet'>
        <div className='layoutUIWallet'>
          <div className='headerWallet'>
            <div style={{
              width: 'fit-content',
              padding: '10px',
            }}>
              {false && <Icon name='arrowLeft' size={24} style={{cursor: 'pointer'}}/>}
            </div>
            <div style={{
              justifySelf: 'center',
              fontSize: '20px',
              fontWeight: 600,
            }}>Dashboard</div>
            <div style={{
              justifySelf: 'end',
              cursor: 'pointer',
              padding: '10px',
            }}>
              <Icon name='menu' size={24} color='#4FD35C'/>
            </div>
          </div>
          <div style={{
            height: 'calc(100% - 86px)',
          }}>
            <BucketList />
            {/* <AddBucketForm /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletBuget