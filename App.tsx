import { StatusBar } from "expo-status-bar";
import { AppState, Text, View } from "react-native";
import Navigation from "./Navigation";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "./AppContext";
import { useEffect, useRef, useState } from "react";
import { getTime, storeTime, storeToken } from "./helpers/TokenStorage/Index";


NativeWindStyleSheet.setOutput({
  default: "native",
});

const App = () => {

  const appState = useRef(AppState.currentState);

  const [userLogOut, setuserLogOut] = useState(false);

  const getTimeDifference = async () => {
    const time = await getTime()
    if (time) {
      console.log(time, "inactive time")
      var today = new Date();
      var prevtime = new Date(time);
      var diffMs = (today.valueOf() - prevtime.valueOf())
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      console.log(diffMins)
      if (diffMins > 5) {
        await storeToken("")
        setuserLogOut(true)
      }
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
      if (appState.current === "background") {
        storeTime().then(() => {
          console.log("time")
        })
      }
      if (appState.current === "active") {
        getTimeDifference()
      }
    });


    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppContext>
      <SafeAreaView className="h-full">
        <StatusBar style="auto" />
        <Navigation userLogOut={userLogOut} setuserLogOut={setuserLogOut} />
      </SafeAreaView>
    </AppContext>
  );
}

export default App