export type Bucket = {
    id: string,
    name: string,
    balance: number,
    description: string,
    icon: string,
}

export type ViewAction =
  | "dashBoard"
  | "formAddBucket"
  | "formDeposit"
  | "formWithdraw"
  | "formUpdateBucket"
  | "formDepositBucket"
  | "formWithdrawBucket"

export const SCREEN_NAME: Record<ViewAction, string> = {
  dashBoard: "Dashboard",
  formAddBucket: "Add Bucket",
  formDeposit: "Deposit Money",
  formWithdraw: "Withdraw Money",
  formUpdateBucket: "Edit Bucket",
  formDepositBucket: "Deposit Bucket",
  formWithdrawBucket: "Withdraw Bucket",
};

export type WalletState = {
    totalMoney: number;
    availableMoney: number;
    buckets: Bucket[];
    screenCurrent: ViewAction;
}

export type WalletActions = | {
    type: "ADD_BUCKET";
    payload: Bucket;
} | {
    type: "UPDATE_BUCKET";
    payload: Bucket;
} | {
    type: "DELETE_BUCKET";
    payload: {
        id: string;
    }
} | {
    type: "TRANSFER_TO_BUCKET";
    payload: {
        id: string;
        amount: number;
    }
} | {
    type: "TRANSFER_FROM_BUCKET";
    payload: {
        id: string;
        amount: number;
    }
} | {
    type: "DEPOSIT_MAIN_WALLET";
    payload: {
        amount: number;
    }
} | {
    type: "WITHDRAW_MAIN_WALLET";
    payload: {
        amount: number;
    }
} | {
    type: "CHANGE_SCREEN",
    payload: {
        screen: ViewAction,
    }
}
