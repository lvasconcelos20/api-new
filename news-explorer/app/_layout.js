import { Tabs } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../lib/react-query/queryClient"
import Materialicons from "@expo/vector-icons/MaterialIcons"
import Entypo from '@expo/vector-icons/Entypo';


export default function RootLayout() {
    return (
        <QueryClientProvider client = {queryClient}>
               <Tabs>
                <Tabs.Screen name="index" options={{title: "Welcome", headerShown: false, tabBarIcon: ({color}) => (<Entypo name="emoji-happy" size={28}  color={color} marginTop={3}/>),  tabBarLabelStyle: { fontSize: 12 }, }} />
                <Tabs.Screen name="news/home/index" options={{title: "Search News", headerShown: false, tabBarIcon: ({ color }) => (<Materialicons name="search" size={40} color={color} />), tabBarLabelStyle: { fontSize: 12 },}}/>
                <Tabs.Screen name="news/home/[newsByCategory]" options={{title: "Home", headerShown: false, tabBarIcon: ({ color }) => (<Materialicons name="home" size={40} color={color} />), tabBarLabelStyle: { fontSize: 12 },}}/>
            </Tabs>

        </QueryClientProvider>
        
         
      
    );
}
