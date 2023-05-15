<template>
  <div class="home">
    <div class="cardContainerCustom">
      <!-- Kartica kategorija -->
      <div v-for="kategorija in kategorije" :key="kategorija.id" class="cardCustom" @click.prevent="handleClick(kategorija.id)">
        <img :src="kategorija.slika" />
        <div class="textContainer">
          <h1>{{kategorija.ime}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { collection, query, getDocs, db } from "@/firebase";
export default {
  name: 'Home',
  data(){
    return{
      kategorije: []
    }
  },
  methods: {
    handleClick(id) {
      this.$router.push({name: 'Proizvodi', params: { id: id }})
    },
    async getCategories() {
      try {
        const q = query(collection(db, "kategorije"));
        
        const querySnapshot = await getDocs(q);
        let arr = []
        querySnapshot.forEach((doc) => {
          arr.push({...doc.data(), id: doc.id})
        });
        console.table('kategorije', arr);
        this.kategorije = arr;
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.getCategories()
  },
  computed: {
    ...mapGetters({user: 'getUser'}),
  }
};
</script>


<style scoped>
.custom {
  display: flex;
}

.cardContainerCustom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}

.cardCustom {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1.3rem;
  background-color: #FFFFFF;
  cursor: pointer;
}

.cardCustom img {
  height: 250px;
  width: 250px;
  object-fit: cover;
}

.textContainer {
  margin-left: 1rem;
  background-color: #FFFFFF;
}

</style>
 
