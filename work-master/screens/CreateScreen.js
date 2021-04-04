import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import db from '../config';
import firebase from 'firebase';

import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class CreateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      assignmentName: '',
      dueDate: '',
      subject: '',
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  addAssigment = (assignmentName) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("create_assignment").add({
      user_id: userId,
      assignment_Name: this.state.assignmentName,
      due_Date: this.state.dueDate,
      subject: this.state.subject,
    });
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#32867d'}
            centerComponent={{
              text: 'Work Master',
              style: { color: '#ffffff', fontSize: 24 },
            }}
          />
          <TextInput
            style={styles.formInput}
            placeholder={'Assignment Name'}
            maxLength={24}
            onChangeText={(text) => {
              this.setState({
                assignmentName: text,
              });
            }}
          />
          <TextInput
            style={styles.formInput}
            placeholder={'Due Date'}
            maxLength={12}
            onChangeText={(text) => {
              this.setState({
                dueDate: text,
              });
            }}
          />
          <TextInput
            style={styles.formInput}
            placeholder={'Subject'}
            maxLength={12}
            onChangeText={(text) => {
              this.setState({
                subject: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.createAssignment}
            onPress={() => 
            this.addAssigment(
                    this.state.assignmentName,
                  )}>
            <Text style={styles.createAssignmentText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createAssignment}
            onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Text style={styles.createAssignmentText}>Cancel</Text>
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
  formInput: {
    width: '90%',
    marginTop: 20,
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  createAssignment: {
    width: '80%',
    marginTop: 15,
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(25),
    backgroundColor: '#32867d',
    shadowColor: '#000',
    marginBottom: RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginLeft: 35,
  },
  createAssignmentText: {
    color: '#ffffff',
    fontWeight: '200',
    fontSize: RFValue(20),
  },
});
