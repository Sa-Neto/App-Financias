import { ActivityIndicator, Platform} from "react-native"
import { AreaInput, Background, Container, Input, SubmitButton, SubmitText } from "../SignIn/styles"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"

export default function SignUp(){

    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {signUp,loadingAuth} = useContext(AuthContext);

    function handleSignUp(){
        if(nome === '' || email === "" || password === "") return; 
        signUp(email,password,nome);
    }
    return(
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled    
            >
                <AreaInput>
                    <Input
                        placeholder="Nome"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Seu Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Sua senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton onPress={handleSignUp}>
                    {
                        loadingAuth ? ( 
                            <ActivityIndicator size={20} color="#fff" />
                        ):(
                            <SubmitText>Cadastrar</SubmitText>
                        )
                    }
                </SubmitButton>

            </Container>
        </Background>
    )
};