import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stack";
import Profile from "../screens/profile";
import Logout from "../screens/logout";
import firebase from "firebase";
import CustomSidebarMenu from "../screens/CustomSidebarMenu";
const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
 //ATIVIDADE DO ALUNO
    constructor(props){
      super(props);
      this.state = {
        light_theme: true
      };
    }
  


    componentDidMount() {
      firebase
    .database()
    .ref("/users/" + firebase.auth().currentUser.uid)
    .on("value", (snapshot) => {
    // Verifica se o snapshot e snapshot.val() não são nulos ou indefinidos
    if (snapshot && snapshot.val()) {
      // Obtém o tema atual do usuário do snapshot
      const theme = snapshot.val().current_theme;
      // Atualiza o estado do componente com base no tema obtido
      this.setState({ light_theme: theme === "light" });
    } else {
      // Trate o caso em que os dados não estão disponíveis
      console.error("Dados não disponíveis no caminho do banco de dados.");
    }
    });
  }

  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: "#e91e63",
          drawerInactiveTintColor: this.state.light_theme ? "black" : "white",
          drawerItemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="Tela Inicial"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Perfil"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  };
}
