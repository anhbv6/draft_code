import React from 'react'
import Icon from '../../../components/Icon'

type Props = {}

const BucketList = (props: Props) => {
  return (
    <div style={{
      marginTop: '16px',
      height: '100%',
    }}>
      <div className='infoWallet'>
        <div className='budgetWalletInfo'>
          <div style={{
            fontSize: '17px',
            fontWeight: 600,
          }}>Total</div>
          <span style={{
            fontSize: '34px',
            fontWeight: 600,
          }}>
            $10,000
          </span>
        </div>
        <div className='budgetWalletInfo' style={{alignItems: 'end'}}>
          <div style={{
            fontSize: '17px',
            fontWeight: 600,
          }}>Available</div>
          <span style={{
            fontSize: '34px',
            fontWeight: 600,
          }}>
            $10,000
          </span>
        </div>
      </div>
      <div className='contentListBucket'>
        <div style={{
          marginTop: '26px',
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: 600,
          }}>Buckets</div>
          <div className='listBucket'>
            <div className='itemsBucket'>
              <div>icon</div>
              <div>
                <div className='nameBucket'>name</div>
                <div className='moneyBucket'>money$</div>
              </div>
            </div>
            <div className='itemsBucket'>
              <div>icon</div>
              <div>
                <div className='nameBucket'>name</div>
                <div className='moneyBucket'>money$</div>
              </div>
            </div>
            <div className='itemsBucket'>
              <div>icon</div>
              <div>
                <div className='nameBucket'>name</div>
                <div className='moneyBucket'>money$</div>
              </div>
            </div>
          </div>
        </div>
        <div className='cartAddBucket'>
          <Icon name='addList' size={24} color='#5D666D'/>
          <div style={{
            fontSize: '17px',
            fontWeight: 600,
          }}>Add a bucket</div>
        </div>
      </div>
    </div>
  )
}

export default BucketList