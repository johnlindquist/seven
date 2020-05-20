/*

The formula for converting a temperature C in 
Celsius into a temperature F in Fahrenheit
C = (F - 32) * (5/9)
F = C * (9/5) + 32.

*/

let celsius = document.getElementById("c")
let fahrenheit = document.getElementById("f")


let createInputListener = element => listener => {
  element.addEventListener("input", listener)
}

let celsiusInput = createInputListener(celsius)
let fahrenheitInput = createInputListener(fahrenheit)


let apply = initialState => addListener => listener => {
  let state = initialState
  listener(state)

  addListener(([fn, value]) => {
    state = fn(value)

    listener(state)
  })
}

let mapTo = mappedValue => addListener => listener => {
  addListener(event => {
    listener([mappedValue, event.target.value])
  })
}

let both = (addListenerOne, addListenerTwo) => listener => {
  addListenerOne(listener)
  addListenerTwo(listener)
}

let updateCelsiusFromState = currentFahrenheit => ({
  celsiusValue: (currentFahrenheit - 32) * (5 / 9),
  fahrenheitValue: currentFahrenheit
})

let updateFahrenheitFromState = currentCelsius => ({
  celsiusValue: currentCelsius,
  fahrenheitValue: currentCelsius * (9 / 5) + 32
})

let fahrenheitFnPusher = mapTo(updateCelsiusFromState)(fahrenheitInput)
let celsiusFnPusher = mapTo(updateFahrenheitFromState)(celsiusInput)

let initialState = { fahrenheitValue: 32, celsiusValue: 0 }
let temperatureConversion = apply(initialState)
  (both(celsiusFnPusher, fahrenheitFnPusher))

temperatureConversion(state => {
  console.log(state)
  celsius.value = Math.floor(state.celsiusValue)
  fahrenheit.value = Math.floor(state.fahrenheitValue)
})