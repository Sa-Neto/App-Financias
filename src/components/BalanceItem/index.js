import { useMemo } from "react";
import { Container,Balance,Label } from "./styles";

export default function BalanceItem({data}){
    const labelName = useMemo(() => {
        if(data.tag === "saldo"){
            return{
                label:'Saldo atual',
                color:'3b3dbf'
            }
        }else if(data.tag === 'receita'){
            return{
                label:'Entradas de hoje',
                color:'00b94a'
            }
        }else{
            return{
                label:'Saidas de Hoje',
                color:'EF463A'
            }
        }
    },[data])
    return(
        <Container bg={labelName.color}>
            <Label>{labelName.label}</Label>
            <Balance>R$ {data.saldo}</Balance>
        </Container>
    )
}