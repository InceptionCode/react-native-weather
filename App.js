import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { API_KEY } from './env'
import Weather from './components/Weather'

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({ error: 'Error getting weather conditions!' })
      }
    )
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        console.log(lat, lon)
        this.setState({
          temperature: Math.round(json.main.temp),
          weatherCondition: {
            condition: json.weather[0].main,
            desc: json.weather[0].description
          },
          isLoading: false
        })
      })
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather!</Text>
        ) : (
          <Weather weather={weatherCondition} temperature={temperature} />
        )}
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
