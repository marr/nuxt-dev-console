import { defineNuxtPlugin } from '#app'

function myFunction() {
  console.log('myFunction called!') 
}

export default defineNuxtPlugin((_nuxtApp) => {
  console.log('Plugin injected by my-module!')
  _nuxtApp.provide('myFunction', myFunction)
})
