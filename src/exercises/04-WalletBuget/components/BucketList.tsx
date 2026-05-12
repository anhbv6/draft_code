import React from 'react'
import Icon from '../../../components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import { formatNumber } from '../constants'
import { Tooltip } from 'antd'

type Props = {
  actionPopup: (toggle: boolean) => void;
  setOpenDrawer: (toggle: boolean) => void;
  setDataChoose: (data: any) => void;
}

const BucketList = ({
  actionPopup,
  setOpenDrawer,
  setDataChoose,
}: Props) => {
  const dispatch = useDispatch();

  const totalMoney = useSelector((state: RootState) => state.totalMoney);
  const availableMoney = useSelector((state: RootState) => state.availableMoney);
  const buckets = useSelector((state: RootState) => state.buckets);

  return (
    <div style={{
      marginTop: '16px',
      height: '100%',
    }}>
      <div className='infoWallet'>
        <div className='budgetWalletInfo'>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              fontSize: '17px',
              fontWeight: 600,
            }}>
              Total
            </div>
            <Icon name='arrowCrossover' size={16} color='#5D666D' style={{cursor: 'pointer'}} onClick={() => setOpenDrawer(true)}/>
          </div>
          <Tooltip placement="bottom" title={`$${formatNumber(totalMoney)}`}>
            <span style={{
              fontSize: '34px',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              width: 'fit-content',
            }}>
              ${formatNumber(totalMoney)}
            </span>
          </Tooltip>
        </div>
        <div className='budgetWalletInfo' style={{alignItems: 'end'}}>
          <div style={{
            fontSize: '17px',
            fontWeight: 600,
          }}>Available</div>
          <Tooltip placement="bottom" title={`$${formatNumber(availableMoney)}`}>
            <span style={{
              fontSize: '34px',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%'
            }}>
              ${formatNumber(availableMoney)}
            </span>
          </Tooltip>
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
          {buckets.length > 0 &&<div className='listBucket'>
            {buckets.map((item) => {
              return (
                <div className='itemsBucket' key={item.id} onClick={() => {
                  actionPopup(true);
                  setDataChoose(item);
                }}>
                  <div>{item.icon}</div>
                  <div>
                    <div className='nameBucket'>{item.name}</div>
                    <div className='moneyBucket'>${formatNumber(item.balance, true)}</div>
                  </div>
                </div>
              )
            })}
          </div>}
        </div>
        <div className='cartAddBucket' onClick={() => dispatch({
          type: "CHANGE_SCREEN",
          payload: {
            screen: "formAddBucket",
          }
        })}>
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