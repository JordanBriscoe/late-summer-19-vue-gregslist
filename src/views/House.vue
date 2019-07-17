<template>
  <div class="house">
    <h5>{{house.description}}</h5>
    <img :src="house.imgUrl" alt="">
    <p>Bedrooms: {{house.bedrooms}}</p>
    <p>Bathrooms: {{house.bathrooms}}</p>
    <p>Levels: {{house.levels}}</p>
    <p>Year: {{house.year}}</p>
    <p>Price: ${{house.price}}</p>
    <button class="btn btn-outline-danger" @click='deleteHouse'>Delete</button>
  </div>
</template>

<script>


  export default {
    name: 'house',
    data() {
      return {}
    },
    mounted() {
      let dataToSend = {
        houseId: this.$route.params.houseId
      }
      this.$store.dispatch('getHouseById', dataToSend)
    },
    methods: {
      deleteHouse() {
        this.$store.dispatch('deleteHouse', this.house._id)
      }
    },
    computed: {
      house() {
        return this.$store.state.activeHouse
      }
    },
    components: {}
  }
</script>