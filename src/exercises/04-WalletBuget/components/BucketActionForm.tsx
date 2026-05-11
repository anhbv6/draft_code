import React from 'react'
import Icon from '../../../components/Icon'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import { SCREEN_NAME } from '../walletTypes'

type Props = {}

const BucketActionForm = (props: Props) => {
    const viewScreen = useSelector((state: RootState) => state.screenCurrent)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            {viewScreen === "formUpdateBucket" && <div style={{
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
            </div>}

            {(viewScreen === "formDepositBucket" || viewScreen ===  "formWithdrawBucket") && <div style={{
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
                placeholder={`Enter the amount you wish to ${viewScreen === "formDepositBucket" ? "deposit" : "withdraw"}.`}
                />
                <button className='btnCustomBucket'>{viewScreen === "formDepositBucket" ? "Confirm deposit" : "Confirm withdraw"}</button>
            </div>}
        </div>
    )
}

export default BucketActionForm