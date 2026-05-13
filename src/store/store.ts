import { combineReducers, createStore } from "redux";
import { walletReducer } from "../exercises/04-WalletBuget/walletReducer";

const rootReducer = combineReducers({
  wallet: walletReducer,
});

const loadState = () => {
  try {
    const savedState = sessionStorage.getItem("rootState");

    if (!savedState) {
      return undefined;
    }

    return JSON.parse(savedState);
  } catch {
    return undefined;
  }
};

export const store = createStore(rootReducer, loadState());

store.subscribe(() => {
    const state = store.getState();
    sessionStorage.setItem("rootState", JSON.stringify(state));
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;