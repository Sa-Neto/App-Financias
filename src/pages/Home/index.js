import { useEffect, useState } from "react";
import {
    Background,
    ListBalance,
    Area,
    Title,
    List
} from "./styles";
import Header from "../../components/Header";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { format } from "date-fns";
import api from "../../services/api";
import { useIsFocused } from '@react-navigation/native'
import BalanceItem from "../../components/BalanceItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import HistoryList from "../../components/HistoryList";
import { Modal } from "react-native";
import CalendarModal from "../../components/CalendarModal";

export default function Home() {
    const [listBalance, setListBalance] = useState([]);
    const [movements, setMovements] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();

    const [dateMovements, setDateMovements] = useState(new Date())

    useEffect(() => {
        let isActive = true;

        async function getMovements() {

            let date = new Date(dateMovements)
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            
            let dateFormated = format(onlyDate, 'dd/MM/yyyy')
            console.log(dateFormated)
            const receives = await api.get('/receives', {
                params: {
                    date: dateFormated
                }
            })

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setMovements(receives.data)
                setListBalance(balance.data)
                
            }
        }
        getMovements();

        return () => isActive = false;

    }, [isFocused, dateMovements])

    async function handleDelete(id){
        try{
            await api.delete('/receives/delete',{
                params:{
                    item_id: id
                }
            })
        }catch(err){
            console.log(err)
        }
    }
    function filterDateMovements(dateSelected){
        //console.log(dateSelected)
        setDateMovements(dateSelected)
    }

    return (
        <Background>
            <Header title="Minhas Movimentações" />

            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={({ item }) => (<BalanceItem data={item} />)}
            />
            <Area>
                <TouchableOpacity onPress={()=> setModalVisible(true) }>
                    <Icon name='event' color='#121212' size={30} />
                </TouchableOpacity>
                <Title>Ultimas Movimentações</Title>

            </Area>

            <List
                data={movements}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoryList data={item} deleteItem={handleDelete}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <Modal visible={modalVisible} animation="fade" transparent={true}>
                 <CalendarModal 
                    setVisible={ () => setModalVisible(false) }
                    handleFilter={filterDateMovements}
                />
            </Modal>
        </Background>
    )
}