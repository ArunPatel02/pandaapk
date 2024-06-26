import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { AppDataContext } from './AppContext';
import Home from './screens/home';
import { getTime, getToken } from './helpers/TokenStorage/Index';
import AxiosInstance from './Api/Index';
import Products from './screens/Products';

const Stack = createNativeStackNavigator();

const Navigation = ({ userLogOut, setuserLogOut }) => {
  const { isLoading, setisLoading, setuserLogin, setuseData, userLogin, setproductList } = useContext(AppDataContext)

  useEffect(() => {
    if (userLogOut) {
      setuserLogin(false)
      setuserLogOut(false)
    }
  }, [userLogOut])


  const getProductList = async () => {
    setisLoading(true)
    try {
      const res = await AxiosInstance.get("/auth/products")
      setisLoading(false)
      // console.log(res.data.body.productsData)
      if (res.data.success) {
        setproductList(res.data.body.productsData)
      }
    } catch (error) {
      setisLoading(false)
      alert("something went wrong")
    }

  }

  const getUser = async () => {
    const token = await getToken()
    if (token) {
      try {
        setisLoading(true)
        const res = await AxiosInstance.get("/auth/getUser")
        if (res.data.success) {
          // console.log("data", res.data)
          setuserLogin(true)
          setisLoading(false)
          setuseData({ email: res.data.body.userData.email, name: res.data.body.userData.name })
          getProductList()
        } else {
          setisLoading(false)
          alert(res.data.message)
        }
      } catch {
        setisLoading(false)
        alert("something went wrong try again")
      }
    }
  }

  useEffect(() => {
    // setisLoading(true)
    getUser()
  }, [])



  return (
    <>
      {isLoading && <View className="h-screen w-screen bg-gray-500/50 justify-center items-center absolute z-20">
        <Text className="text-lg">Loading....</Text>
      </View>}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: "slide_from_left" }}>
          {!userLogin ?
            <><Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
              <Stack.Screen name="Signup" options={{ headerShown: false }} component={Signup} /></> :
            <Stack.Screen name="Products" options={{ headerShown: false }} component={Products} />}

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
