import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, FlatList,} from "react-native";
import * as React from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { NativeBaseProvider } from "native-base";

// Get the elevator list
let currentList = [];
const getElevators = async (setElevators) => {
  try {
    const res = await axios.get("https://8760-142-116-212-207.ngrok.io/api/Elevators/inactive");
    currentList = res.data;

    setElevators(res.data);
  } catch (err) {
    console.warn("[getElevators] Error:", err);
  }
};

export default function HomeScreen({ navigation }) {
  const [elevators, setElevators] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getElevators(setElevators);
    }
  }, [isFocused]);

  useEffect(() => {
    console.log("elevator list:", elevators);
  }, [elevators]);

  const setStatus = (id, elevator_status) => {
		// Calls the Elevator Status page with the id and status.
		navigation.navigate("ElevatorStatusScreen", {id: id, status: elevator_status,});
	};


  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.mainContainer}>
        <Image style={styles.logo} source={require("../assets/R2.png")} />
        <Text style={styles.title}>Elevators out of operation</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
					keyExtractor={elevators => elevators.id.toString()}
					data={elevators}
          renderItem={({ item }) => {
						return (
							//When an elevator is clicked on the list, pass the id and status.
							<TouchableOpacity style={styles.list} onPress={() => setStatus(item.id, item.elevator_status)}>
								<Text style={styles.textButton} >
									Elevator Id: {item.id}
								</Text>
								<Text style={styles.textButton} >
                  Status: {item.elevator_status}
								</Text>
							</TouchableOpacity>
						);
					}}
        />

      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
    paddingVertical: 25,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: "rgb(175, 11, 25)",
    padding: 25,
    marginVertical: 5,
    marginHorizontal: 16,
    width: 200,
  },
  title: {
    fontSize: 20,
    color: '#0a64a0',
    marginBottom: 25,
    fontWeight: "bold",
  },
  text: {
    justifyContent: "center",
  },
  logo: {
    width: 170,
    height: 75,
    resizeMode: "contain",
    marginBottom: 55,
  },
  list: {
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: "#e1dee073",
		marginTop: 10,
		borderRadius: 5,
		width: 250,
    borderWidth: 0.7,
    borderColor: "#0a64a0",
	},
  textButton: {
		marginVertical: 5,
		fontSize: 15,
		color: "#af0b19",
		textAlign: "center",
	},
});
