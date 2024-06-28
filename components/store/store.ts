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

        console.log('Retrieved data:', jsonData)

        console.log('read file invoke')
        return jsonData // You can use this data as needed
    } catch (error) {
        console.error('Error reading file:', error)
        return error
    }
}
export const storage = {
    set: async (name: string, value: any) => {
        console.log('invoke method set start')
        let storeData = await readData()
        console.log('found Data 1 ', storeData)
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        console.log('found Data 2 isExist', isExist)
        if (isExist) {
            console.log('found Data 3 isExist', isExist)
            console.log('found Data 4 ', storeData)
            storeData = storeData.map((curr: storeDataType) => {
                const i = { ...curr }
                if (i.name === name) {
                    i.data = value
                }
                return i
            })
        } else {
            console.log('found Data 5 isExist', isExist)
            console.log('found Data 6 ', storeData)
            storeData = [...storeData, { name, data: value }]
        }
        console.log('invoke method set End-1')
        await createData(storeData)
        console.log('invoke method set End-2')
        return 'successfully created'
    },
    getString: async (name: string) => {
        console.log('invoke method getString Start')
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        console.log('invoke method getString End')
        return isExist
    },
    getNumber: async (name: string) => {
        console.log('invoke method getNumber')
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        return isExist
    },
    clearAll: async () => {
        console.log('invoke method clearAll')
        await createData([])
        return 'successfully deleted all'
    },
    delete: async (name: string) => {
        console.log('invoke method delete')
        let storeData = await readData()
        storeData = storeData.filter(
            (curr: storeDataType) => curr.name !== name
        )
        await createData(storeData)
        return 'successfully deleted'
    },
    getAllKeys: async () => {
        console.log('invoke method getAllKeys')
        let storeData = await readData()
        const result = storeData.map((curr: storeDataType) => curr.name)
        return result
    },
}
