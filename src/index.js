/*
The task is to build a frame containing a label or read-only textfield
T and a button B. Initially, the value in T is “0” and each click of
 B increases the value in T by one.
*/



let createListenerByID = (id, eventType) => listener => {
  let element = document.getElementById(id)
  element.addEventListener(eventType, listener)
}

let incClickListener = createListenerByID("inc", "click")
let decClickListener = createListenerByID("dec", "click")

let both = (addListenerOne, addListenerTwo) => listener => {
  addListenerOne(listener)
  addListenerTwo(listener)
}


let updateState = initialState => addListener => listener => {
  let state = initialState

  listener(state)

  addListener(value => {
    state = value(state)
    listener(state)
  })
}



let mapTo = mappedValue => addListener => listener => {
  addListener(value => {
    listener(mappedValue)
  })
}

let inc = x => x + 1
let dec = x => x - 1
let incAndDecButtons = both(mapTo(inc)(incClickListener), mapTo(dec)(decClickListener))

let counter = updateState(10)(incAndDecButtons)



let number = document.getElementById("number")
counter(value => {
  number.value = value
})