import { Tabs } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../lib/react-query/queryClient"
import Materialicons from "@expo/vector-icons/MaterialIcons"
import AntDesign from '@expo/vector-icons/AntDesign';


export default function RootLayout() {
    return (
        <QueryClientProvider client = {queryClient}>
               <Tabs>
                <Tabs.Screen name="news/home/index" options={{title: "Home", headerShown: false, tabBarIcon: ({color}) => (<Materialicons name="home" size={40} color={color} />),  tabBarLabelStyle: { fontSize: 12 }, }} />
                <Tabs.Screen name="news/everything/index" options={{title: "Search", headerShown: false, tabBarIcon: ({ color }) => (<Materialicons name="search" size={40} color={color} />), tabBarLabelStyle: { fontSize: 12 },}}/>
                <Tabs.Screen name="news/categories/index" options={{title: "Categories", headerShown: false, tabBarIcon: ({ color }) => (<Materialicons name="flag" size={40} color={color} />), tabBarLabelStyle: { fontSize: 12 },}}/>   
                 <Tabs.Screen name="news/categories/[newsByCategory]" options={{ href: null, headerShown: false,}}/>
                <Tabs.Screen name="news/details/[id]" options={{ href: null, headerShown: false,}}/>
             

            </Tabs>

        </QueryClientProvider>
        
         
      
    );
}
