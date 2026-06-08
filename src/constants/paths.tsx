import TodoList from "../exercises/01-TodoList/TodoList";
import WalletBuget from "../exercises/04-WalletBuget/WalletBuget";
import CaculatorNumber from "../exercises/02-CaculatorNumber/CaculatorNumber";
import ShoppingCart from "../exercises/03-ShoppingCart/ShoppingCart";
import type { ICONS } from "./icons";
import TodoListTanStack from "../exercises/05-TodoListTanStack/TodoListTanStack";

export type ExerciresItem = {
    id: number,
    icon: keyof typeof ICONS,
    name: string,
    component: React.ReactNode
}

export const exerciresList: ExerciresItem[] = [
    {
        id: 1,
        icon: 'notes',
        name: 'todoEx',
        component: <TodoList />,
    },
    {
        id: 2,
        icon: 'calculator',
        name: 'calculatorNumber',
        component: <CaculatorNumber />,
    },
    {
        id: 3,
        icon: 'cart',
        name: 'cartShopping',
        component: <ShoppingCart />,
    },
    {
        id: 4,
        icon: 'wallet',
        name: 'walletBuget',
        component: <WalletBuget />,
    },
    {
        id: 5,
        icon: 'listCheck',
        name: 'todoListNew',
        component: <TodoListTanStack />,
    },
]