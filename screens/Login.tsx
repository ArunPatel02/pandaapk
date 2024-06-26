import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Textinput from '../helpers/Input/Textinput'
import CustomButton from '../helpers/Buttons/CustomButton'
import AxiosInstance from '../Api/Index'
import { AppDataContext } from '../AppContext'
import { storeToken } from '../helpers/TokenStorage/Index'

const Login = ({ navigation }) => {
  const { setisLoading, setuserLogin, setuseData } = useContext(AppDataContext)

  const [loginData, setloginData] = useState<{ email: string, password: string }>({ email: "", password: "" })

  const [buttonDisable, setbuttonDisable] = useState<boolean>(true)

  useEffect(() => {
    if (loginData.email && loginData.password && loginData.password.length >= 8) {
      setbuttonDisable(false)
    }
  }, [loginData])


  const handleLogin = async () => {
    try {
      setisLoading(true)
      const res = await AxiosInstance.post("/login", { ...loginData })
      if (res.data.success) {
        console.log("data", res.data)
        setuserLogin(true)
        setisLoading(false)
        setuseData({ email: res.data.body.userData.email, name: res.data.body.userData.name })
        await storeToken(res.data.body.token)
        navigation.navigate("Home")
      } else {
        setisLoading(false)
        alert(res.data.message)
      }
    } catch {
      setisLoading(false)
      alert("something went wrong try again")
    }
  }

  return (
    <View className="px-6 flex-1">

      <View className="mt-4">
        <Text className="text-lg font-medium">Email</Text>
        <Textinput placeholder='Example@gmail.com' onChangeText={(text) => setloginData(pre => ({ ...pre, email: text }))} />
      </View>

      <View className="mt-2">
        <Text className="text-lg font-medium">Password  (min 8 character)</Text>
        <Textinput secureTextEntry onChangeText={(text) => setloginData(pre => ({ ...pre, password: text }))} />
      </View>

      <CustomButton ButtonText="Login" onPress={() => handleLogin()} disable={buttonDisable} />

      <View className="flex flex-row gap-1 mt-2 justify-center">
        <Text className="text-lg">Do not have account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text className="text-blue-800 text-lg">SignUp</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Login