import type { WalletActions, WalletState } from "./walletTypes";

const initialState: WalletState = {
  totalMoney: 0,
  availableMoney: 0,
  buckets: [],
  screenCurrent: "dashBoard",
}

// const initialState: WalletState = {
//   totalMoney: 10000,
//   availableMoney: 4000,
//   buckets: [
//     {
//       id: "1",
//       name: "Personal",
//       balance: 2000,
//       icon: "👤",
//     },
//     {
//       id: "2",
//       name: "Invest",
//       balance: 3000,
//       icon: "📈",
//     },
//     {
//       id: "3",
//       name: "Business",
//       balance: 1000,
//       icon: "💼",
//     },
//   ],
//   screenCurrent: "dashBoard",
// };

export const walletReducer = (
  state = initialState,
  action: WalletActions,
): WalletState => {
  switch (action.type) {
    case "DEPOSIT_MAIN_WALLET":
      return {
        ...state,
        totalMoney: state.totalMoney + action.payload.amount,
        availableMoney: state.availableMoney + action.payload.amount,
      }

    case "WITHDRAW_MAIN_WALLET": {
      const amount = action.payload.amount;
      if (amount <= 0 || amount > state.availableMoney) {
        return state;
      }

      return {
        ...state,
        totalMoney: state.totalMoney - amount,
        availableMoney: state.availableMoney - amount,
      }
    }

    case "ADD_BUCKET": 
      return {
        ...state,
        buckets: [...state.buckets, action.payload]
      }
    
    case "CHANGE_SCREEN":
      return {
        ...state,
        screenCurrent: action.payload.screen,
      }

    default:
      return state;
  }
}