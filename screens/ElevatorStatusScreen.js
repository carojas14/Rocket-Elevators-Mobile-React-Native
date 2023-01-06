import React from "react";
import axios from "axios";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeBaseProvider } from "native-base";

const ElevatorStatusScreen = ({ navigation, route }) => {
    const id = route.params.id;
    var status = route.params.status;

     //Changing status of elevator
    async function changeStatus() {
        return await axios.put("https://8760-142-116-212-207.ngrok.io/api/Elevators/"+id+"/status/Active")
            .then(res => {
            console.log("Response", res);
        })
            .catch(function(error){
                console.log("ERROR",error);
        });
    }


    //Verify the status of an elevator
    async function verifyStatus(){
        return await axios.get(`https://8760-142-116-212-207.ngrok.io/api/Elevators/${id}`)
            .then(function (res) {
                const response = res.data;
                return response;
        })
            .catch(function (error) {
                alert(`${error}. Please, try again!`);
        });
    }


    if (status == "Active"){
        return (
            <NativeBaseProvider>
                <SafeAreaView style={styles.mainContainer}>
                    <Image
                        style={styles.logo}
                        source={require("../assets/R2.png")}
                    />
                    <View style={styles.card}>
                        <Text style={ styles.text }>Elevator : {id}</Text>
                        <Text style={ styles.textActive }>Status : {status}</Text>
                    </View>
                </SafeAreaView>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate ('HomeScreen')}>
                        <Text style={styles.textButton} >
                            Back to list
                        </Text>
                </TouchableOpacity>
            </NativeBaseProvider>
        )
    }else {
        return (
            <NativeBaseProvider>
                <SafeAreaView style={styles.mainContainer}>
                    <Image style={styles.logo} source={require("../assets/R2.png")} />
                    <View style={styles.card}>
                        <Text style={ styles.text }>Elevator : {id}</Text>
                        <Text style={ styles.textInactive }>Status : {status}</Text>
                    </View>
                </SafeAreaView>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={ async () => {
                        await changeStatus();
                        const Elevator = await verifyStatus();
                        navigation.navigate('ElevatorStatusScreen', {id: Elevator.id, status: Elevator.elevator_status,})
                    }}>
                        <Text style={styles.textButton} >
                            Change status to Active
                        </Text>
                </TouchableOpacity>
            </NativeBaseProvider>
        )
    }
}


    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: '#f1f1f1',
            flex: 1,
            padding: 20,
            width: '100%',
            maxWidth: 340,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        textButton: {
            fontSize: 14,
            color: "#ffff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase",
        },
        card: {
            padding: 12,
            backgroundColor: "#B4B4B4",
            marginTop: 10,
            borderRadius: 8,
            width: 250,
            alignItems: 'center',
        },
        textActive: {
            color: '#25EB4A',
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold'
        },
        textInactive: {
            color: 'rgb(175, 11, 25)',
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
        },
        logo: {
            width: 200,
            height: 75,
            resizeMode: "contain",
            marginBottom: 75,
        },
        buttonContainer: {
            elevation: 8,
            backgroundColor: "#00629C",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12,
            margin:80,
            width: 280,
            height: 40,
        },
    });

export default ElevatorStatusScreen;