/*
|-----------------------------------------
| setting up Delivery for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Manager, June, 2024
|-----------------------------------------
*/
import { Dispatch, SetStateAction } from 'react'

export type keyStringType = { [key: string]: string }
export type keyNumberType = { [key: string]: number }

export type deliverySingleType = {
    dayName: string
    value: {
        startTime: string
        endTime: string
        isClosed: boolean
    }
}
export type initRenderType = {
    title: string
    renderData: renderType[]
    renderMileageData?: renderMileType[]
    renderDiscountData?: renderMileType[]
}
export type renderType = { dayName: string; data: string }
export type renderMileType = { mile: string; data: number | string }
export type dispatchSetRender = Dispatch<SetStateAction<initRenderType>>

export const initDefaultRender: initRenderType = {
    title: '',
    renderData: [],
    renderMileageData: [],
    renderDiscountData: [],
}
