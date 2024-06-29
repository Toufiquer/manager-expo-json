import * as FileSystem from 'expo-file-system'

type storeDataType = { name: string; data: any }
const filePath = FileSystem.documentDirectory + 'myData.json'


export const createData = async (data: any = []) => {
  FileSystem.writeAsStringAsync(filePath, JSON.stringify(data), {
    encoding: FileSystem.EncodingType.UTF8,
  });
};

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

export const setValue = async (name: string, value: any) => {
    let storeData = await readData()
    const isExist = storeData.find((data: storeDataType) => data.name === name)
    const parseValue = JSON.parse(value) // when set method is called it give string value
    if (isExist) {
        storeData = storeData.map((curr: storeDataType) => {
            const i = { ...curr }
            if (i.name === name) {
                i.data = parseValue
            }
            return i
        })
    } else {
        storeData = [...storeData, { name, data: parseValue }]
    }
    await createData(storeData)
    return 'successfully created'
}
export const getValue = async (name: string) => {
    let storeData = await readData()
    const isExist = storeData.find((data: storeDataType) => data.name === name)
    return JSON.stringify(isExist)
}
export const clearAllValue = async () => {
    await createData([])
    return 'successfully deleted all'
}
export const deleteValue = async (name: string) => {
    let storeData = await readData()
    storeData = storeData.filter((curr: storeDataType) => curr.name !== name)
    await createData(storeData)
    return 'successfully deleted'
}
export const getAllKeysValue = async () => {
    let storeData = await readData()
    const result = storeData.map((curr: storeDataType) => curr.name)
    return result
}
export const storage = {
    set: async (name: string, value: any) => {
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        const parseValue = JSON.parse(value) // when set method is called it give string value
        if (isExist) {
            storeData = storeData.map((curr: storeDataType) => {
                const i = { ...curr }
                if (i.name === name) {
                    i.data = parseValue
                }
                return i
            })
        } else {
            storeData = [...storeData, { name, data: parseValue }]
        }
        await createData(storeData)
        return 'successfully created'
    },
    getString: async (name: string) => {
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        return JSON.stringify(isExist)
    },
    getNumber: async (name: string) => {
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        return JSON.stringify(isExist)
    },
    clearAll: async () => {
        await createData([])
        return 'successfully deleted all'
    },
    delete: async (name: string) => {
        let storeData = await readData()
        storeData = storeData.filter(
            (curr: storeDataType) => curr.name !== name
        )
        await createData(storeData)
        return 'successfully deleted'
    },
    getAllKeys: async () => {
        let storeData = await readData()
        const result = storeData.map((curr: storeDataType) => curr.name)
        return result
    },
}

/**
 * !! How to use storage  
 * ### you just call the method as mmkv and this storage will change and get the data as well as mmvk. 
 * ### Remember you can only call this method
 * 1. storage.set(name:string, value:stringify)
 * 2. storage.getString(name:string)
 * 3. storage.getNumber(name:string)
 * 4. storage.clearAll()
 * 5. storage.delete(name:string)
 * 6. storage.getAllKeys()
 * 
 * !! Description of the functionality and methods 
 * 
 * @ 1.createData()  =>  This will write the data to the file system using expo-file-system
 * @ 2.readData()  =>  This will read the data to the file system using expo-file-system
 * 
 * @ 3.storage.set(name:string, value:stringify) => it parse the value because createData() have JSON.stringify method. and it save the value
 * @ 4.storage.getString(name:string) => it stringify the value because readData() have JSON.parse method. and it read the value
 * @ 5.storage.getNumber(name:string) => it stringify the value because readData() have JSON.parse method. and it read the value
 * @ 6.storage.clearAll() => it will delete the all value
 * @ 7.storage.delete(name:string) => it will delete the value which is provided
 * @ 8.storage.getAllKeys() => it will return all keys
 * 
 * 
 * 
 * 
 * */ 