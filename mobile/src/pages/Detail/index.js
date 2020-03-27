import React from 'react';
import { Feather } from '@expo/vector-icons'
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles from './styles'; 
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { Linking } from 'expo';

export default function Details(){

    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.nome}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL'}).format(incident.value)}.`;
    
    function handleBackToIncidents(){
        
        //navigation.navigate('Incidents'); Também funciona
        navigation.goBack();
    }

    function sendMail(){

        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`, //QUal o assunto da mensagem
            recipients: [incident.email], // Para quem será enviado o e-mail
            body: message //Conteúdo da mensagem
        });

    }

    function sendWhatsapp(){

        //Conceito de DeepLink para abrir aplicativos do celular como se fosse links na URL

        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
        
    }

    return (
        <View style={styles.container}>
              <View style={styles.header}>
            <Image source={logoImg}/>

                <TouchableOpacity onPress={handleBackToIncidents}>
                    <Feather name="arrow-left" size={28} color="#E02041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>

                    <Text style={styles.incidentProperty, {marginTop:0}}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.nome} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', { 
                            style:'currency', 
                            currency:'BRL' 
                            }).format(incident.value)}
                     </Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heró desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}