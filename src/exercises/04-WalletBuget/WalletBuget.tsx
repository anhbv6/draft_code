import { useEffect, useRef, useState } from 'react'
import "./WalletBuget.css";
import Icon from '../../components/Icon';
import BucketList from './components/BucketList';
import AddBucketForm from './components/AddBucketForm';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { SCREEN_NAME } from './walletTypes';
import PopupMini from '../../components/PopupMini';
import BucketAction from './components/BucketAction';
import BucketActionForm from './components/BucketActionForm';
import MainWalletForm from './components/MainWalletForm';

const WalletBuget = () => {
  const dispatch = useDispatch();
  const checkDrawer = useRef<HTMLDivElement>(null);
  const viewScreen = useSelector((state: RootState) => state.wallet.screenCurrent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [dataChoose, setDataChoose] = useState<any>();

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  }

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        checkDrawer.current &&
        !checkDrawer.current.contains(e.target as Node)
      ) {
        setOpenDrawer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <div className='backGroundWallet'>
      <div className='containerWallet'>
        <div className='layoutUIWallet' style={{
          overflow: viewScreen === "formAddBucket" || viewScreen === "formUpdateBucket" ? 'unset' : ''
        }}>
          <div className='headerWallet'>
            <div style={{
              width: 'fit-content',
              padding: '10px',
            }}>
              {["formAddBucket",
                "formDeposit", 
                "formWithdraw", 
                "formUpdateBucket", 
                "formDepositBucket", 
                "formWithdrawBucket"
              ].includes(viewScreen) && 
                <Icon name='arrowLeft' size={24} style={{cursor: 'pointer'}} onClick={() => dispatch({
                  type: "CHANGE_SCREEN",
                  payload: {
                    screen: "dashBoard",
                  }
                })}/>
              }
            </div>
            <div style={{
                justifySelf: 'center',
                fontSize: '20px',
                fontWeight: 600,
              }}>
              {SCREEN_NAME[viewScreen]}
            </div>
            <div style={{
              justifySelf: 'end',
              cursor: 'pointer',
              padding: '10px',
            }}>
              {viewScreen === "dashBoard" && <Icon name='menu' size={24} color='#4FD35C' onClick={() => setOpenDrawer(true)}/>}
            </div>
          </div>
          <div style={{
            height: 'calc(100% - 86px)',
          }}>
            {viewScreen === "dashBoard" && <BucketList actionPopup={setOpenPopup} setDataChoose={setDataChoose} setOpenDrawer={setOpenDrawer}/>}
            {viewScreen === "formAddBucket" && <AddBucketForm />}
            {(viewScreen === "formDeposit" || viewScreen === "formWithdraw") && <MainWalletForm />}
            {[
              "formUpdateBucket",
              "formDepositBucket",
              "formWithdrawBucket",
            ].includes(viewScreen) &&
              dataChoose && <BucketActionForm dataChoose={dataChoose}/>}
          </div>

          {openDrawer && (
            <div className="overlay" onClick={onCloseDrawer} />
          )}

          <div className={`drawer ${openDrawer ? "open" : ""}`} ref={checkDrawer} style={{display: viewScreen === "formAddBucket" || viewScreen === "formUpdateBucket" ? 'none' : ''}}>
            <div style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 600,
              position: 'relative',
            }}>
              Action
              <Icon name='closeV2' size={24} style={{cursor: 'pointer', position: 'absolute', top: '10px', right: '10px'}} onClick={onCloseDrawer} />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '16px',
            }}>
              <div className='btnMoreCustom' onClick={() => {
                onCloseDrawer();
                dispatch({
                  type: "CHANGE_SCREEN",
                  payload: {
                    screen: "formDeposit",
                  }
                })
              }}>
                <div>Deposit Money</div>
                <Icon name='arrowTop' size={24} color='green' onClick={onCloseDrawer} />
              </div>
              <div className='btnMoreCustom' onClick={() => {
                onCloseDrawer();
                dispatch({
                  type: "CHANGE_SCREEN",
                  payload: {
                    screen: "formWithdraw",
                  }
                })
              }}>
                <div>Withdraw Money</div>
                <Icon name='arrowBottom' size={24} color='red' onClick={onCloseDrawer} />
              </div>
            </div>
          </div>

          <PopupMini
            open={openPopup}
            onClose={() => setOpenPopup(false)}
            contentStyleCustom={{
              background: '#000000',
              borderRadius: '8px',
              minHeight: '200px',
              padding: 0,
            }}
          >
            <BucketAction data={dataChoose} setOpenPopup={setOpenPopup}/>
          </PopupMini>
        </div>
      </div>
    </div>
  )
}

export default WalletBuget