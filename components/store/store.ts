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
export const storage = {
    set: async (name: string, value: any) => {
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
    },
    getString: async (name: string) => {
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        return isExist
    },
    getNumber: async (name: string) => {
        let storeData = await readData()
        const isExist = storeData.find(
            (data: storeDataType) => data.name === name
        )
        return isExist
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
