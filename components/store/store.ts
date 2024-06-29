/*
|-----------------------------------------
| setting up Store for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, June, 2024
|-----------------------------------------
*/

import * as FileSystem from 'expo-file-system'

type storeDataType = { name: string; data: any }
const filePath = FileSystem.documentDirectory + 'myData.json'

export const createData = async (data: any = []) => {
    FileSystem.writeAsStringAsync(filePath, JSON.stringify(data), {
        encoding: FileSystem.EncodingType.UTF8,
    })
}

export const readData = async () => {
    try {
        const filePath = FileSystem.documentDirectory + 'myData.json'
        const fileData = await FileSystem.readAsStringAsync(filePath)
        const jsonData = JSON.parse(fileData)

        return jsonData // You can use this data as needed
    } catch (error) {
        console.error('Error reading file:', error)
        return error
    }
}

// function that read and write storage
export const setValue = async (name: string, value: any) => {
    try {
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        if (isExist) {
            storeData = storeData.map((curr: storeDataType) => {
                const i = { ...curr }
                if (i.name === name) {
                    i.data = value
                }
                return i
            })
        } else {
            storeData = [...storeData, { name, data: value }]
        }
        await createData(storeData)
        return 'successfully created'
    } catch (err) {
        console.log('error form storage : ', err)
        return 'Ops! try again'
    }
}
export const getValue = async (name: string) => {
    try {
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        return isExist
    } catch (err) {
        console.log('error form storage : ', err)
        return 'Ops! try again'
    }
}
export const clearAllValue = async () => {
    try {
        await createData([])
        return 'successfully deleted all'
    } catch (err) {
        console.log('error form storage : ', err)
        return 'Ops! try again'
    }
}
export const deleteValue = async (name: string) => {
    try {
        let storeData = await readData()
        storeData = storeData.filter(
            (curr: storeDataType) => curr.name !== name
        )
        await createData(storeData)
        return 'successfully deleted'
    } catch (err) {
        console.log('error form storage : ', err)
        return 'Ops! try again'
    }
}
export const getAllKeysValue = async () => {
    try {
        let storeData = await readData()
        const result = storeData.map((curr: storeDataType) => curr.name)
        return result
    } catch (err) {
        console.log('error form storage : ', err)
        return 'Ops! try again'
    }
}

/**
 * !! How to use storage and return type declare here 
 * ### you just call the function and it will read and write the storage.
 * ### Remember you can only call this method
 * 1. setValue(name:string, value:stringify) => return string
 * 2. getValue(name:string)=> return storeDataType | string
 * 3. clearAllValue()=> return string
 * 4. deleteValue(name:string)=> return string
 * 5. getAllKeysValue()=> return string[] | string
 *
 * !! Description of the functionality and methods
 *
 * @ 1.createData()  =>  This will write the data to the file system using expo-file-system
 * @ 2.readData()  =>  This will read the data to the file system using expo-file-system
 *
 * @ 3. setValue(name:string, value:stringify) => createData() have JSON.stringify method. so you don't need to stringify the data.
 * @ 4. getValue(name:string) => createData() have JSON.parse method. so you don't need to parse the data.
 * @ 5. clearAllValue() => it will delete the all value
 * @ 6. deleteValue(name:string) => it will delete the value which is provided
 * @ 7. getAllKeysValue() => it will return all keys
 *
 *
 *
 *
 * */
