
import React, {Component} from 'react';
import {Platform, 
          StyleSheet, 
          Text, 
          View,
          Button,
          TouchableOpacity
       } from 'react-native';


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.oprations = ['D','*', "/", "-", "+"]
  }
  
  
  calculateResult(){
    const text = this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }

  validate(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '/':
      case '-':
      case '*':
        return false
    }

    return true
  }

  buttonPressed(text){
    if (text == '=') {
      return this.validate() && this.calculateResult()   
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }

  

  oprationState(opration){
    switch(opration){
      case 'D':
        const text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        }) 
        break
      case '+':
      case '-':
      case '/':
      case '*':
        const latChar = this.state.resultText.split('').pop()
        
        if(this.oprations.indexOf(latChar) > 0) return
        
        if(this.state.text == "") return
        this.setState({
          resultText: this.state.resultText + opration
        })           
    }
  }

  render() {
    var rows = []
    let nums = [[1,2,3], [4,5,6], [7,8,9], [".", 0 ,'=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(
              <TouchableOpacity onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
                <Text style={styles.btntext}>{nums[i][j]}</Text>
              </TouchableOpacity>
            )
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }

    
    let ops = []
    for (let i = 0; i < 5; i++) {
      ops.push(<TouchableOpacity style={styles.btn} onPress={() => this.oprationState(this.oprations[i])}>
        <Text style={[styles.btntext, styles.white]}>{this.oprations[i]}</Text>
      </TouchableOpacity>)
    }


    return (
      <View style={styles.container}>
        
        <View style={styles.result}>
          <Text style={styles.textResult}>{this.state.resultText}</Text>
        </View>
        
        <View style={styles.calculator}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>  
        </View>
        
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          
          <View style={styles.oprations}>
            {ops}
          </View>      
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

        
  textResult: {
    fontSize: 30,
    color: 'white',
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  btntext: {
    fontSize: 25
  },

  white: {
    color: 'white'
  },

  calculationText : {
    fontSize: 24,
    color: 'white'
  },

  result: {
    flex : 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  calculator: {
    flexGrow: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  buttons: {
    flex: 7,
    flexDirection: 'row'
  },

  numbers: {
    flex: 3,
    backgroundColor: 'yellow'
  },

  oprations: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  }

});
