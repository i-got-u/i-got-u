import React, { Component } from 'react'

import { View, StyleSheet,AsyncStorage,Alert } from 'react-native'
import { Container, Content, Header, Title, Text, InputGroup, Input, Button, Icon } from 'native-base'
import bcrypt from 'react-native-bcrypt'

export default class Login extends Component {
    submitButton(){
        this._checkData(this.state.mobile,this.state.password)
    }



    _checkData = async (key) => {
    try {
  const value = await AsyncStorage.getItem('@igotu:'+key);
  if (value !== null){
    const hash = JSON.parse(value).password
    if (bcrypt.compareSync(this.state.password, hash)) {
        console.log("success")
}else{
    console.log("fail")
}
  }
} catch (error) {
    Alert.alert("Login Failed")
    console.log(error)
}
  }
  render () {
    return (
      <Container style={style.container}>
        <Header>
          <Title>
            Login
          </Title>
        </Header>
        <Content style={style.content}>
          <InputGroup style={style.elements}>
            <Icon name='ios-call' style={style.icons} />
            <Input placeholder='Mobile Number'  keyboardType='numeric' onChangeText={text => this.setState({mobile: text})} />
          </InputGroup>
          <InputGroup style={style.elements}>
            <Icon name='ios-lock' />
            <Input placeholder='Password' secureTextEntry onChangeText={text => this.setState({password: text})} />
          </InputGroup>
          <Button block primary style={style.buttons} onPress={this.submitButton.bind(this)}>
            Login
          </Button>
        </Content>
      </Container>
    )
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  content: {
    padding: 15
  },
  elements: {
    marginTop: 20
  },
  buttons: {
    marginTop: 35
  }
})
