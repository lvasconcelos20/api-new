import { Tabs } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../lib/react-query/queryClient"
import Materialicons from "@expo/vector-icons/MaterialIcons"


export default function RootLayout() {
    return (
        <QueryClientProvider client = {queryClient}>
               <Tabs>
                <Tabs.Screen name="index" options={{title: "Home", headerShown: false, tabBarIcon: ({color}) => (<Materialicons name="home" size={40} color={color} />),  tabBarLabelStyle: { fontSize: 12 }, }} />
                <Tabs.Screen name="news/categories/index" options={{title: "Search News", headerShown: false, tabBarIcon: ({ color }) => (<Materialicons name="search" size={40} color={color} />), tabBarLabelStyle: { fontSize: 12 },}}/>
                <Tabs.Screen name="news/categories/[newsByCategory]" options={{title: "Search News", headerShown: false, tabBarIcon: ({ color }) => (<Materialicons name="category" size={40} color={color} />), tabBarLabelStyle: { fontSize: 12 },}}/>
            </Tabs>

        </QueryClientProvider>
        
         
      
    );
}
