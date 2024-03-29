import { Platform, ActivityIndicator } from "react-native"
import { 
    AreaInput, 
    Background, 
    Input, 
    Logo, 
    Container,
    SubmitText,
    Link,
    LinkText,
    SubmitButton
} from "./styles"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

export default function SignIn(){

    const navigation = useNavigation()
    const {signIn,loadingAuth} = useContext(AuthContext)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    function handleLogin(){
      signIn(email,password)
    }
    return (
      <Background>
        <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
          <Logo source={require("../../assets/Logo.png")} />

          <AreaInput>
            <Input
              placeholder="Seu Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </AreaInput>

          <AreaInput>
            <Input
              placeholder="Sua Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </AreaInput>

          <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
            { loadingAuth ? (
              <ActivityIndicator size={20} color="#FFF" />
            ) : (
              <SubmitText>Acessar</SubmitText>
            )}
          </SubmitButton>

          <Link onPress={() => navigation.navigate("SignUp")}>
            <LinkText>Criar uma conta!</LinkText>
          </Link>
        </Container>
      </Background>
    );
};