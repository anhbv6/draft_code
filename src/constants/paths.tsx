import TodoList from "../exercises/01-TodoList/TodoList";
import CaculatorNumber from "../exercises/02-CaculatorNumber/CaculatorNumber";
import type { ICONS } from "./icons";
import TodoListTanStack from "../exercises/05-TodoListTanStack/TodoListTanStack";
import WalletBuget from "../exercises/03-WalletBuget/WalletBuget";
import ShoppingCartTanStack from "../exercises/04-ShoppingCartTanStack/ShoppingCartTanStack";

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
        icon: 'wallet',
        name: 'walletBuget',
        component: <WalletBuget />,
    },
    {
        id: 4,
        icon: 'cart',
        name: 'cartShopping',
        component: <ShoppingCartTanStack />,
    },
    {
        id: 5,
        icon: 'listCheck',
        name: 'todoListNew',
        component: <TodoListTanStack />,
    },
]