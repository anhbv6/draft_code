import { createStore } from "redux";
import { walletReducer } from "../exercises/04-WalletBuget/walletReducer";

export const store = createStore(walletReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;