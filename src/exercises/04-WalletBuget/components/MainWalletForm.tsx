import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmModal from '../../../components/ConfirmModal';
import type { RootState } from '../../../store/store';
import { formatNumber } from '../constants';
import toast from 'react-hot-toast';

type Props = {}

const MainWalletForm = (props: Props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const totalMoney = useSelector((state: RootState) => state.totalMoney);
  const availableMoney = useSelector((state: RootState) => state.availableMoney);
  const screenView = useSelector((state: RootState) => state.screenCurrent);

  const handleSubmit = () => {
    const amountResult = Number(amount);
    if (!amountResult || 
      amountResult < 0 || 
      isNaN(amountResult)
    ) return;

    if (
      screenView === "formWithdraw" &&
      amountResult > availableMoney
    ) {
      toast.error("Insufficient balance.", {
        duration: 4000,

      })
      return;
    }
    
    dispatch({
      type:
        screenView === "formDeposit"
          ? "DEPOSIT_MAIN_WALLET"
          : "WITHDRAW_MAIN_WALLET",
      payload: {
        amount: amountResult,
      },
    });
    toast.success("Success")
    setAmount("");
    dispatch({
      type: "CHANGE_SCREEN",
      payload: {
        screen: "dashBoard",
      }
    })
  }

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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Enter the amount you wish to ${
            screenView === "formDeposit" ? "deposit" : "withdraw"
          }.`}
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <span style={{
            textAlign: 'end',
            color: '#a3a3a3',
            fontStyle: 'italic',
            fontSize: '16px',
          }}>{screenView === "formDeposit" ? `You have: $${formatNumber(totalMoney)}` : `Available Money: $${formatNumber(availableMoney)}`}</span>
          <button className='btnCustomBucket' onClick={() => setOpenConfirm(true)}>{screenView === "formDeposit" ? 'Confirm deposit' : 'Confirm withdraw'}</button>
        </div>
      </div>
      <ConfirmModal
        open={openConfirm}
        title="Confirmation"
        message="Are you sure to do this?"
        onCancel={() => setOpenConfirm(false)}
        style={{width: "70%", background: "#000000"}}
        cancelButtonStyle={{
          background: "#999",
          color: "#fff",
        }}
        confirmButtonStyle={{
          background: "#4FD35C",
          borderRadius: "8px",
        }}
        onConfirm={() => {
          handleSubmit();
          setOpenConfirm(false);
        }}
      />
    </div>
  )
}

export default MainWalletForm