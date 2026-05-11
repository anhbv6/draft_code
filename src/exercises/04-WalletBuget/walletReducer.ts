import type { WalletActions, WalletState } from "./walletTypes";

// const initialState: WalletState = {
//     totalMoney: 0,
//     availableMoney: 0,
//     buckets: [],
// }

const initialState: WalletState = {
  totalMoney: 10000,
  availableMoney: 4000,
  buckets: [
    {
      id: "1",
      name: "Personal",
      balance: 2000,
      icon: "👤",
    },
    {
      id: "2",
      name: "Invest",
      balance: 3000,
      icon: "📈",
    },
    {
      id: "3",
      name: "Business",
      balance: 1000,
      icon: "💼",
    },
  ],
  screenCurrent: "dashBoard",
};

export const walletReducer = (
  state = initialState,
  action: WalletActions,
): WalletState => {
  switch (action.type) {
    case "ADD_BUCKET": 
      return {
        ...state,
        totalMoney: 0,
        availableMoney: 0,
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