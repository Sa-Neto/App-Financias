import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import {AuthContext} from '../../contexts/auth'
import { useContext } from "react";
export default function CustomDrawer(props){

    const {user,signOut} = useContext(AuthContext);
    
    return(
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems:'center' ,justifyContent:'center', marginTop: 25}} >
                <Image 
                    source={require('../../assets/Logo.png')}
                    style={{width:90, height:90 }}
                    resizeMode='contain'
                />
                <Text style={{ fontSize:18, marginTop:14}}>
                    Bem-vindo
                </Text>
                <Text 
                numberOfLines={1}
                style={{fontSize:17, fontWeight: "bold", marginBottom:14}} >
                    Matheus Fraga
                </Text>
            </View>

            <DrawerItemList {...props} />

            <DrawerItem 
                {...props}
                label='Sair do app'
                onPress={() => signOut()}
            />
        </DrawerContentScrollView>
    )
}