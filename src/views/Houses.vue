<template>
    <div class="houses container">
        <h1>Homes for Houses</h1>
        <div class="row justify-content-center">
            <form class="col-8 pb-5" @submit.prevent="addHouse">
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" name="description" class="form-control" id="description"
                        placeholder="Enter Description" v-model="newHouse.description">
                </div>
                <div class="form-group">
                    <label for="img">Image</label>
                    <input type="text" class="form-control" id="img" placeholder="Enter image url"
                        v-model="newHouse.imgUrl">
                </div>
                <div class="form-group">
                    <label for="bedrooms">Bedrooms</label>
                    <input type="number" class="form-control" id="bedrooms" placeholder="# of Bedrooms"
                        v-model="newHouse.bedrooms">
                </div>
                <div class="form-group">
                    <label for="bathrooms">Bathrooms</label>
                    <input type="number" class="form-control" id="bathrooms" placeholder="# of Bathrooms"
                        v-model="newHouse.bathrooms">
                </div>
                <div class="form-group">
                    <label for="levels">Levels</label>
                    <input type="number" class="form-control" id="levels" placeholder="Enter # of Levels"
                        v-model="newHouse.levels">
                </div>
                <div class="form-group">
                    <label for="year">Year</label>
                    <input type="number" class="form-control" id="year" v-model="newHouse.year">
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" min="1950" id="price" v-model="newHouse.price">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="row">
            <div class="house col-4 border rounded border-secondary" v-for="house in houses" @click="viewHouse(house)">
                <h5>{{house.description}}</h5>
                <img :src="house.imgUrl" alt="">
                <p>Bedrooms: {{house.bedrooms}}</p>
                <p>Bathrooms: {{house.bathrooms}}</p>
                <p>Levels: {{house.levels}}</p>
                <p>Year: {{house.year}}</p>
                <p>Price: ${{house.price}}</p>
            </div>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'houses',
        data() {
            return {
                newHouse: {}
            }
        },
        mounted() {
            this.$store.dispatch('getHouses')
        },
        computed: {
            houses() {
                return this.$store.state.houses
            }
        },
        methods: {
            viewHouse(house) {
                this.$router.push({ name: 'house', params: { houseId: house._id } })
            },
            addHouse() {
                this.$store.dispatch('addHouse', this.newHouse)
            }
        },
        components: {}
    }
</script>


<style scoped>
    img {
        height: 200px;
    }
</style>