export type Bucket = {
    id: string,
    name: string,
    balance: number,
    icon: string,
}

export type WalletState = {
    buckets: Bucket[];
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
    type: "DEPOSIT_BUCKET";
    payload: {
        id: string;
        amount: number;
    }
} | {
    type: "WITHDRAW_BUCKET";
    payload: {
        id: string;
        amount: number;
    }
} | {
    type: "DEPOSIT_BUDGET";
    payload: {
        amount: number;
    }
} | {
    type: "WITHDRAW_BUDGET";
    payload: {
        amount: number;
    }
}