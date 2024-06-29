/*
|-----------------------------------------
| setting up UseMenu ZuStand for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, June, 2024
|-----------------------------------------
*/
import { create } from 'zustand'

type Store = {
    allMenu: { name: string; data: any }[]
    setAllMenu: (payload: any[]) => void
}

const useMenuUi = create<Store>()((set) => ({
    allMenu: [],
    setAllMenu: (payload) => set((state) => ({ ...state, allMenu: payload })),
}))

export default useMenuUi
