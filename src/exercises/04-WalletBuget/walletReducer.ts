import type { WalletActions, WalletState } from "./walletTypes";

const initialState: WalletState = {
  totalMoney: 0,
  availableMoney: 0,
  buckets: [],
  screenCurrent: "dashBoard",
}

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

    case "ADD_BUCKET": {
      const bucketAmount = action.payload.balance;

      if (bucketAmount < 0) {
        return state;
      }

      if (bucketAmount > state.availableMoney) {
        return state;
      }

      return {
        ...state,
        availableMoney: state.availableMoney - bucketAmount,
        buckets: [...state.buckets, action.payload],
      }
    }
      
    case "UPDATE_BUCKET": 
      return {
      ...state,
      buckets: state.buckets.map((bucket) =>
        bucket.id === action.payload.id
          ? {
              ...bucket,
              name: action.payload.name,
              icon: action.payload.icon,
              description: action.payload.description,
            }
          : bucket
      ),
      screenCurrent: "dashBoard",
    };

    case "DELETE_BUCKET": {
      const deletedBucket = state.buckets.find(
        (bucket) => bucket.id === action.payload.id
      );

      if (!deletedBucket) {
        return state;
      }

      return {
        ...state,
        availableMoney: state.availableMoney + deletedBucket.balance,
        buckets: state.buckets.filter(
          (bucket) => bucket.id !== action.payload.id
        ),
        screenCurrent: "dashBoard",
      }
    }

    case "TRANSFER_TO_BUCKET": {
      const amount = action.payload.amount;

      if (amount <= 0 || Number.isNaN(amount)) {
        return state;
      }

      if (amount > state.availableMoney) {
        return state;
      }

      return {
        ...state,
        availableMoney: state.availableMoney - amount,
        buckets: state.buckets.map((bucket) =>
          bucket.id === action.payload.id
            ? {
                ...bucket,
                balance: bucket.balance + amount,
              }
            : bucket
        ),
        screenCurrent: "dashBoard",
      };
    }

    case "TRANSFER_FROM_BUCKET": {
      const amount = action.payload.amount;

      if (amount <= 0 || Number.isNaN(amount)) {
        return state;
      }

      const targetBucket = state.buckets.find(
        (bucket) => bucket.id === action.payload.id
      );

      if (!targetBucket) {
        return state;
      }

      if (amount > targetBucket.balance) {
        return state;
      }

      return {
        ...state,
        availableMoney: state.availableMoney + amount,
        buckets: state.buckets.map((bucket) =>
          bucket.id === action.payload.id
            ? {
                ...bucket,
                balance: bucket.balance - amount,
              }
            : bucket
        ),
        screenCurrent: "dashBoard",
      };
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