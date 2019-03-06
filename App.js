import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Weather from './components/Weather'

export default class App extends React.Component {
  state = {
    isLoading: false
  }
  render() {
    const { isLoading } = this.state
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching The Weather!</Text> : <Weather />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
