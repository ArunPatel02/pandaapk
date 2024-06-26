import React, { useState } from 'react'
import { Text, View } from 'react-native'

export const AppDataContext = React.createContext(null)

const AppContext = ({ children }) => {
    const [userLogin, setuserLogin] = useState<boolean>(false)

    const [useData, setuseData] = useState({ name: "", email: "" })

    const [isLoading, setisLoading] = useState(false);

    const [productList, setproductList] = useState([])

    return (
        <AppDataContext.Provider value={{ userLogin, setuserLogin, useData, setuseData, isLoading, setisLoading, productList, setproductList }}>

            {children}
        </AppDataContext.Provider>
    )
}

export default AppContext