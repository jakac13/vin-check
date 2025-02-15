import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TabNavigation from './app/navigations/TabNavigation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import RootNavigation from './app/navigations';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

//SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          fontFamily: 'Poppins-Bold',
        }}
        text2Style={{
          fontSize: 11,
          fontFamily: 'Poppins-Regular',
        }}
        text2NumberOfLines={2}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
          fontFamily: 'Poppins-Bold',
        }}
        text2Style={{
          fontSize: 11,
          fontFamily: 'Poppins-Regular',
        }}
        text2NumberOfLines={2}
      />
    ),
  };

  return (
    <View style={styles.container}>
        <RootNavigation/>
      <StatusBar style="light" />
      <Toast config={toastConfig}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
