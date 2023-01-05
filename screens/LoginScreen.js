import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import { useState, useEffect } from "react";
import axios from "axios";
import Toast from 'react-native-simple-toast';



export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');

    const handleSubmit = async () => {

        try {
            const response = await axios.get(`https://87e8-142-116-212-207.ngrok.io/api/Users/${email}`);
            console.log(response.data);
            const employee = response.data;
            console.log("Employee validated:", employee);
            if (employee == true) {
                navigation.navigate("HomeScreen");
            } else {
                alert("Email address is not found");
            }
        } catch (err) {
            console.warn("[handleSubmit] Error:", err);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../assets/R2.png")} />
                <Text style={styles.subTitle}>Sign In to your account</Text>
                <TextInput
                    placeholder="email"
                    keyboardType='email-address'
                    style={styles.textInput}
                    value = {email.value}
                    onChangeText={(value) => setEmail(value)}
                />

                <TouchableOpacity style={styles.containerButton}>
                    <Button
                        color="#00629C"
                        title="Login"
                        onPress={() => handleSubmit()}
                    />
                </TouchableOpacity>

                <Text style={styles.subTitle}>Employees app</Text>
            </View>

        </View>

    );
}



const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    container: {
        alignItems: 'center',
    },
    logo: {
        width: 170,
        height: 75,
        resizeMode: "contain",
        marginBottom: 55,
    },
    subTitle: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 20,
    },
    textInput: {
        padding: 10,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginTop: 20,
        marginVertical: 8,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    containerButton: {
        flexBasis: 100,
        marginVertical: 10,
        justifyContent: 'space-evenly'
    },

});