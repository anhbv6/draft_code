import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import { type Bucket } from '../walletTypes'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { formatNumber } from '../constants'
import toast from 'react-hot-toast'

type Props = {
    dataChoose: Bucket;
}

const BucketActionForm = ({
    dataChoose,
}: Props) => {
    const dispatch = useDispatch();
    const viewScreen = useSelector((state: RootState) => state.wallet.screenCurrent);
    const availableMoney = useSelector((state: RootState) => state.wallet.availableMoney);
    const [name, setName] = useState(dataChoose.name);
    const [description, setDescription] = useState(dataChoose.description);
    const [icon, setIcon] = useState(dataChoose.icon);
    const [transferAmount, setTransferAmount] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    
    const handleEmojiSelect = (emoji: any) => {
        setIcon(emoji.native);
        setShowPicker(false);
    };

    const handleUpdateBucket = () => {
        const bucketName = name.trim();

        if (!bucketName) {
            toast.error("Please input bucket name.");
            return;
        }

        dispatch({
            type: "UPDATE_BUCKET",
            payload: {
            id: dataChoose.id,
            name: bucketName,
            icon,
            description,
            },
        });

        toast.success("Bucket updated successfully.");
    };

    const handleTransferBucket = () => {
        const amountNumber = Number(transferAmount);

        if (!transferAmount.trim() || Number.isNaN(amountNumber) || amountNumber <= 0) {
            toast.error("Please checking amount again.");
            return;
        }

        if (viewScreen === "formDepositBucket") {
            if (amountNumber > availableMoney) {
                toast.error("Amount cannot be greater than available money.");
                return;
            }

            dispatch({
                type: "TRANSFER_TO_BUCKET",
                payload: {
                    id: dataChoose.id,
                    amount: amountNumber,
                },
            });

            toast.success("Deposit successfully.");
            setTransferAmount("");
            return;
        }

        if (viewScreen === "formWithdrawBucket") {
            if (amountNumber > dataChoose.balance) {
                toast.error("Amount cannot be greater than bucket balance.");
                return;
            }

            dispatch({
                type: "TRANSFER_FROM_BUCKET",
                payload: {
                    id: dataChoose.id,
                    amount: amountNumber,
                },
            });

            toast.success("Withdraw successfully.");
            setTransferAmount("");
            return;
        }
    };

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
                height: '100%',
            }}>
                <input 
                    className='inputCustomBucket' 
                    style={{
                        height: '50px',
                    }}
                    placeholder='Enter a bucket name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea 
                    className='inputCustomBucket' 
                    placeholder='Enter a description' 
                    style={{minHeight: '133px'}} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ position: 'relative' }}>
                    {/* Box chọn emoji */}
                    <div
                        onClick={() => setShowPicker((prev) => !prev)}
                        style={{
                            height: '60px',
                            width: '60px',
                            border: '1px solid #172027',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '30px',
                            cursor: 'pointer',
                            background: '#172027',
                            userSelect: 'none',
                            placeSelf: 'end',
                        }}
                    >
                        {icon}
                    </div>
        
                    {/* Picker */}
                    {showPicker && (
                    <div
                        style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '375px',
                        zIndex: 1000,
                        }}
                    >
                        <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        />
                    </div>
                    )}
                </div>
                <div style={{
                    marginTop: 'auto',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <span style={{
                    textAlign: 'end',
                    color: '#a3a3a3',
                    fontStyle: 'italic',
                    fontSize: '16px',
                    }}>Current balance: ${formatNumber(dataChoose.balance)}</span>
                    <button 
                    className='btnCustomBucket'
                    style={{
                        width: '100%',
                    }}
                    onClick={handleUpdateBucket}  
                    >Save Bucket</button>
                </div>
            </div>}

            {(viewScreen === "formDepositBucket" ||
                viewScreen === "formWithdrawBucket") && (
                <div
                    style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    height: "100%",
                    justifyContent: "space-between",
                    }}
                >
                    <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                    >
                    <div
                        style={{
                        color: "#a3a3a3",
                        fontSize: "14px",
                        }}
                    >
                        {viewScreen === "formDepositBucket"
                        ? `Available Money: $${formatNumber(availableMoney)}`
                        : `Bucket Balance: $${formatNumber(dataChoose.balance)}`}
                    </div>

                    <input
                        className="inputCustomBucket"
                        style={{
                        height: "50px",
                        }}
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder={`Enter the amount you wish to ${
                        viewScreen === "formDepositBucket" ? "deposit" : "withdraw"
                        }.`}
                        type="number"
                    />
                    </div>

                    <button className="btnCustomBucket" onClick={handleTransferBucket}>
                    {viewScreen === "formDepositBucket"
                        ? "Confirm deposit"
                        : "Confirm withdraw"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default BucketActionForm