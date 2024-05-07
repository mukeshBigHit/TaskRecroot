import React from "react";
import { Platform, View, useColorScheme } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "@screens/detail/DetailScreen";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import NotificationScreen from "@screens/notification/NotificationScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import SearchScreen from "@screens/search/SearchScreen";

/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "@theme/themes";
import { Drawer } from "react-native-drawer-layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/reducer";
import { toggleDrawer } from "store/slices/drawer";
import { colors } from "utils/colors";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const isDrawerOpen = useSelector((state: RootState) => state.drawer.value);
  const dispatch = useDispatch();

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number
  ) => {
    let iconName = "home";
    switch (route.name) {
      case SCREENS.HOME:
        iconName = focused ? "home" : "home-outline";
        break;
      case SCREENS.SEARCH:
        iconName = focused ? "search" : "search-outline";
        break;
      case SCREENS.NOTIFICATION:
        iconName = focused ? "notifications" : "notifications-outline";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    return (
      <Icon
        name={iconName}
        type={IconType.Ionicons}
        size={size}
        color={color}
      />
    );
  };

  const renderTabNavigation = () => {
    return (
      <Drawer
        drawerType="front"
        open={isDrawerOpen}
        onOpen={() => dispatch(toggleDrawer(true))}
        onClose={() => dispatch(toggleDrawer(false))}
        renderDrawerContent={() => {
          <View
            style={{
              height: 400,
              width: "100%",
              backgroundColor: "red",
            }}
          />;
        }}
        swipeEnabled={true}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) =>
              renderTabIcon(route, focused, color, size),
            tabBarActiveTintColor: colors.white,
            tabBarInactiveTintColor: colors.white,
            tabBarStyle: {
              backgroundColor: colors.primary,
              height: Platform.OS === "ios" ? 72 : 70,
              paddingTop: 2,
              paddingBottom: Platform.OS === "ios" ? 32 : 8,
              borderTopLeftRadius : 18,
              borderTopRightRadius:18
            },
          })}
        >
          <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
          <Tab.Screen name={SCREENS.CHAT} component={SearchScreen} />
          <Tab.Screen
            name={SCREENS.SECURITY}
            component={NotificationScreen}
          />
          <Tab.Screen name={SCREENS.INTERVIEWS} component={ProfileScreen} />
        </Tab.Navigator>
      </Drawer>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.HOME} component={renderTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
