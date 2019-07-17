import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

let api = axios.create({
  baseURL: '//bcw-sandbox.herokuapp.com/api'
})

export default new Vuex.Store({
  state: {
    cars: [],
    activeCar: {}
  },
  state: {
    houses: [],
    activeHouse: {}
  },
  mutations: {
    setCars(state, data) {
      state.cars = data
    },
    setActiveCar(state, data) {
      state.activeCar = data
    },
    setHouses(state, data) {
      state.houses = data
    },
    setActiveHouse(state, data) {
      state.activeHouse = data
    }
  },
  actions: {
    async getCars({ dispatch, commit }) {
      try {
        let res = await api.get('cars')
        commit("setCars", res.data.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getHouses({ dispatch, commit }) {
      try {
        let res = await api.get('houses')
        commit("setHouses", res.data.data)
      } catch (error) {
        console.error(error)
      }
    },
    // if we need to receive more than one value we use a payload parameter and expect it to be an object
    async getCarById({ dispatch, commit }, payload) {
      try {
        let res = await api.get('cars/' + payload.carId)
        commit('setActiveCar', res.data.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getHouseById({ dispatch, commit }, payload) {
      try {
        let res = await api.get('houses/' + payload.houseId)
        commit('setActiveHouse', res.data.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteCar({ dispatch, commit }, payload) {
      try {
        //payload was our carId from the car.vue component method deleteCar
        let res = await api.delete('cars/' + payload)
        //we could go get all the cars again but we are just gonna push back to the cars view which already on mounted makes a request to get all the cars. if we were able to delete on the cars view we would call get all cars again
        // dispatch('getCars')
        router.push({ name: 'cars' })
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteHouse({ dispatch, comit }, payload) {
      try {
        let res = await api.delete('houses/' + payload)
        router.push({ name: 'houses' })
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    },
    async addCar({ dispatch, commit }, payload) {
      try {
        let res = await api.post('cars/', payload)
        dispatch('getCars')
      } catch (error) {
        console.error(error)
      }
    },
    async addHouse({ dispatch, commit }, payload) {
      try {
        let res = await api.post('houses/', payload)
        dispatch('getHouses')
      } catch (error) {
        console.error(error)
      }
    }
  }
})
