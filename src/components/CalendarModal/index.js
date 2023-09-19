import { useState } from "react";
import { ButtonFilter, ButtonFilterText, Container,ModalContent } from "./styles";
import { View ,TouchableWithoutFeedback} from "react-native";

import { Calendar,LocalConfig, LocaleConfig } from "react-native-calendars";
import { ptBR } from "./localeCalendar";

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarModal({setVisible, handleFilter}){
    const [dateNow, setDateNow] = useState(new Date())
    const [markedDates, setMarkedDates] = useState({})

    function handleOnDayPress(date){
       //console.log(date.dateString)
        setDateNow(new Date(date.dateString));

        let markedDay = {}

        markedDay[date.dateString] = {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor:'#fff'
        }
        setMarkedDates(markedDay)
    }
    function handleFilterDate(){
        handleFilter(dateNow)
        setVisible()
    }
    return(
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{flex:1}}></View>
            </TouchableWithoutFeedback>

            <ModalContent>

                <Calendar 
                    onDayPress={handleOnDayPress}
                    markedDates={markedDates}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor:'#ff0000',
                        selectedDayBackgroundColor:'#00adf5',
                        selectedDayTextColor:'#fff'
                    }}
                />
            
                <ButtonFilter onPress={handleFilterDate}>
                    <ButtonFilterText>filtra</ButtonFilterText>
                </ButtonFilter>
            </ModalContent>
        </Container>
    )   
}