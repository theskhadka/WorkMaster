import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import db from '../config';
import firebase from 'firebase';
import { ListItem } from "react-native-elements";
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      assignmentList: [],
    };
    this.requestRef = null;
  }

  getAssignmentList = () => {
    this.requestRef = firebase.firestore()
      .collection('create_assignment')
      .onSnapshot((snapshot) => {
        var assignmentList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          assignmentList: assignmentList,
        });
      });
  };

  componentDidMount() {
    this.getAssignmentList();
  }

  componentWillUnmount() {
    this.requestRef;
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.assignmentName}
        subtitle={item.dueDate}
        titleStyle={{ color: "black", fontWeight: "bold" }}
     
             bottomDivider
      />
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#32867d'}
            centerComponent={{
              text: 'Assignment View',
              style: { color: '#ffffff', fontSize: 24 },
            }}
          />
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.assignmentList}
            renderItem={this.renderItem}
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => this.props.navigation.navigate('CreateScreen')}>
            <Text style={styles.createButtonText}>Create New Assignment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  createButton: {
    width: '75%',
    height: RFValue(50),
    marginTop: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RFValue(40),
    borderRadius: RFValue(3),
    backgroundColor: '#32867d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    // marginTop:RFValue(10),
  },
  createButtonText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#fff',
  },
});
