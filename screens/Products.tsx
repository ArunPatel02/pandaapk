import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppDataContext } from '../AppContext'
import CustomButton from '../helpers/Buttons/CustomButton'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native"
import Textinput from '../helpers/Input/Textinput';
import AxiosInstance from '../Api/Index';
import { storeToken } from '../helpers/TokenStorage/Index';

const Products = () => {
    const { setisLoading, productList, setproductList, setuserLogin } = useContext(AppDataContext)
    const [addproductList, setaddproductList] = useState([])
    const [addproductlistModelOpen, setaddproductlistModelOpen] = useState(false)
    const [addProductModelOpen, setaddProductModelOpen] = useState(false)

    const [updateModel, setupdateModel] = useState(false)

    const [updateData, setupdateData] = useState({ productId: "", name: "", discription: "", quantity: "" })

    const [productListData, setproductListData] = useState({ name: "", discription: "", quantity: "" });

    const addProductToProductList = () => {
        setaddproductList(pre => ([...pre, productListData]))
        setaddProductModelOpen(false)
        setproductListData({ name: "", discription: "", quantity: "" })
        setaddproductlistModelOpen(true)
    }

    const handleUpdateProducts = async () => {
        setisLoading(true)
        try {
            const res = await AxiosInstance.put("/auth/product", updateData)
            console.log(res.data.body.productsData)
            setisLoading(false)
            if (res.data.success) {
                setproductList(pre => pre.map((item) => item._id === updateData.productId ? { ...item, ...updateData } : { ...item }))
                setupdateModel(false)
                setupdateData({ productId: "", name: "", discription: "", quantity: "" })
            }
        } catch (error) {
            setisLoading(false)
            alert("something went Wrong")
        }
    }

    const handleUpdateModel = (item) => {
        setupdateModel(true)
        setupdateData({ name: item.name, productId: item._id, quantity: String(item.quantity), discription: item.discription })
    }

    const handleSaveProducts = async () => {
        setisLoading(true)
        try {
            const res = await AxiosInstance.post("/auth/createProducts", { productsData: addproductList })
            console.log(res.data.body.productsData)
            setisLoading(false)
            setaddproductlistModelOpen(false)
            if (res.data.success) {
                setproductList(pre => [...pre, ...res.data.body.productsData])
                setaddproductList([])
            }
        } catch (error) {
            setisLoading(false)
            alert("something went Wrong")
        }
    }

    const deleteProduct = async (id) => {
        setisLoading(true)
        try {
            const res = await AxiosInstance.delete(`/auth/product/${id}`)
            console.log(res.data.body.productsData)
            setisLoading(false)
            if (res.data.success) {
                setproductList(pre => pre.filter((item) => String(item._id) !== String(id)))
            }
        } catch (error) {
            setisLoading(false)
            alert("something went Wrong")
        }
    }

    const logoutuser = async () => {
        await storeToken("")
        setuserLogin(false)
    }

    return (
        <View>
            <View className="px-6 flex flex-row items-center gap-4">
                <View className="flex-grow">
                    <CustomButton ButtonText={"add Products"} onPress={() => setaddproductlistModelOpen(true)} /></View>
                <TouchableOpacity className="-mb-3" onPress={() => logoutuser()}><AntDesign name="logout" size={30} color="black" /></TouchableOpacity>
            </View>
            <ScrollView className="mb-20">
                {productList.length ? productList.map((item) => (<View className="border-2 border-gray-300 m-2 bg-slate-300 p-3 flex">
                    <Text className="text-lg font-bold">{item.name}</Text>
                    <Text className="text-md font-bold mt-2">{item.quantity}</Text>
                    <Text className="text-md font-normal mt-2 mb-4">{item.discription}</Text>
                    <View className="flex flex-row justify-end gap-8">
                        <TouchableOpacity onPress={() => handleUpdateModel(item)}>
                            <AntDesign name="edit" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteProduct(item._id)}><AntDesign name="delete" size={30} color="black" /></TouchableOpacity>
                    </View>
                </View>)) : null}
            </ScrollView>

            {addProductModelOpen && <View className="bg-white absolute top-12 bottom-12 right-6 left-6 p-4 h-screen max-h-[400px] rounded-md z-40">
                <View>
                    <Text className="text-lg mt-2">Product Name</Text>
                    <Textinput value={productListData.name} onChangeText={(text) => setproductListData(pre => ({ ...pre, name: text }))} />
                    <Text className="text-lg mt-2">Product Quantity</Text>
                    <Textinput value={productListData.quantity} onChangeText={(text) => setproductListData(pre => ({ ...pre, quantity: text }))} />
                    <Text className="text-lg mt-2">Product Discription</Text>
                    <Textinput value={productListData.discription} onChangeText={(text) => setproductListData(pre => ({ ...pre, discription: text }))} />
                </View>
                <CustomButton ButtonText={"add Item"} disable={productListData.name && productListData.quantity && productListData.discription ? false : true} onPress={() => addProductToProductList()} />
            </View>}

            {addproductlistModelOpen && <View className="bg-white absolute top-12 bottom-12 right-6 left-6 p-4 h-screen max-h-[600px] rounded-md">
                <ScrollView>
                    {addproductList.length ? addproductList.map((item) => (<View className="border-2 border-gray-300 m-2 bg-slate-300 p-3 flex">
                        <Text className="text-lg font-bold">{item.name}</Text>
                        <Text className="text-md font-bold mt-2">{item.quantity}</Text>
                        <Text className="text-md font-normal mt-2 mb-4">{item.discription}</Text>
                    </View>)) : null}
                </ScrollView>
                <CustomButton ButtonText={"add item"} onPress={() => {
                    setaddProductModelOpen(true)
                    setaddproductlistModelOpen(false)
                }
                } />
                <CustomButton ButtonText={"save"} disable={!addproductList.length ? true : false} onPress={() => handleSaveProducts()} />
            </View>}

            {updateModel && <View className="bg-white absolute top-12 bottom-12 right-6 left-6 p-4 h-screen max-h-[400px] rounded-md z-40">
                <View>
                    <Text className="text-lg mt-2">Product Name</Text>
                    <Textinput value={updateData.name} onChangeText={(text) => setupdateData(pre => ({ ...pre, name: text }))} />
                    <Text className="text-lg mt-2">Product Quantity</Text>
                    <Textinput value={updateData.quantity} onChangeText={(text) => setupdateData(pre => ({ ...pre, quantity: text }))} />
                    <Text className="text-lg mt-2">Product Discription</Text>
                    <Textinput value={updateData.discription} onChangeText={(text) => setupdateData(pre => ({ ...pre, discription: text }))} />
                </View>
                <CustomButton ButtonText={"update"} disable={updateData.name && updateData.quantity && updateData.discription ? false : true} onPress={() => handleUpdateProducts()} />
            </View>}

        </View>
    )
}

export default Products