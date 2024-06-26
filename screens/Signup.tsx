import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Textinput from '../helpers/Input/Textinput'
import CustomButton from '../helpers/Buttons/CustomButton'
import { AppDataContext } from '../AppContext'
import { storeToken } from '../helpers/TokenStorage/Index'
import AxiosInstance from '../Api/Index'

const Signup = ({ navigation }) => {

  const { setisLoading, setuserLogin, setuseData } = useContext(AppDataContext)

  const [userSignUpData, setuserSignUpData] = useState<{ email: string, password: string, name: string }>({ email: "", password: "", name: "" })

  const [buttonDisable, setbuttonDisable] = useState<boolean>(true)

  useEffect(() => {
    if (userSignUpData.email && userSignUpData.password && userSignUpData.password.length >= 8 && userSignUpData.name) {
      setbuttonDisable(false)
    }
  }, [userSignUpData])


  const handleSignUp = async () => {
    try {
      setisLoading(true)
      const res = await AxiosInstance.post("/signup", { ...userSignUpData })
      console.log("data", res.data)
      if (res.data.success) {
        setuserLogin(true)
        setisLoading(false)
        setuseData({ email: res.data.body.userData.email, name: res.data.body.userData.name })
        await storeToken(res.data.body.token)
        navigation.navigate("Home")
      }
    } catch {
      setisLoading(false)
      alert("something went wrong try again")
    }
  }

  return (
    <View className="px-6 flex-1">

      <View className="mt-4">
        <Text className="text-lg font-medium">Name</Text>
        <Textinput placeholder='Jon Snow' onChangeText={(text) => setuserSignUpData(pre => ({ ...pre, name: text }))} />
      </View>

      <View className="mt-4">
        <Text className="text-lg font-medium">Email</Text>
        <Textinput placeholder='Example@gmail.com' onChangeText={(text) => setuserSignUpData(pre => ({ ...pre, email: text }))} />
      </View>

      <View className="mt-2">
        <Text className="text-lg font-medium">Password  (min 8 character)</Text>
        <Textinput secureTextEntry onChangeText={(text) => setuserSignUpData(pre => ({ ...pre, password: text }))} />
      </View>

      <CustomButton ButtonText="Register" onPress={() => handleSignUp()} disable={buttonDisable} />

      <View className="flex flex-row gap-1 mt-2 justify-center">
        <Text className="text-lg">Already have account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-blue-800 text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default Signup