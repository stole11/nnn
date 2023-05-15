<template>
  <div>
   <div style="margin-left: 3rem;margin-right: 90%; display: flex; align-items: center; justify-items: center; text-align:center; gap: 2rem">

      <button style="padding: 5px" class="btn btn-danger" @click="handleNav"><i class="fa-solid fa-arrow-left-long"></i></button>
      <h2 style="margin-bottom: 1rem;" >{{kategorija}}</h2>
   </div>
   <div class="cardContainerCustom">
      <div class="cardCustom" v-for="proizvod in proizvodi" :key="proizvod.id">
         <div>
            <img :src="proizvod.slika" />
         </div>
         <div>{{proizvod.ime}}</div>
         <div>{{proizvod.cijena}} kn</div>
         <button style="width: 100%;" class="btn btn-success" @click.prevent="addToCart(proizvod)">Dodaj u košaricu</button>
      </div>
   </div>
  </div>
</template>

<script>
import { collection, query, getDocs, db, doc, getDoc } from "@/firebase";
import { mapMutations, mapGetters } from 'vuex'
export default {
   name: 'Proizvodi',
   data() {
      return {
         proizvodi: [],
         kategorija: "",
      }
   },
   methods: {
    ...mapMutations({addToCart: 'addToCart'}),
    async fetchCategoryName() {
      try {
         const docRef = doc(collection(db, "kategorije"), this.$route.params.id)
         const kategorija = await getDoc(docRef);
         this.kategorija = kategorija.data().ime
      } catch (error) {
         console.log(error)
      }
   },
      handleNav() {
         this.$router.push('/home');
      },
      async getProducts() {
      try {
        const q = query(collection(doc(collection(db, 'kategorije'), this.$route.params.id), 'proizvodi'));
        
        const querySnapshot = await getDocs(q);
        let arr = []
        querySnapshot.forEach((doc) => {
          arr.push({...doc.data(), id: doc.id})
        });
        console.table('proizvodi', arr);
        this.proizvodi = arr;
      } catch (error) {
        console.log(error)
      }
    }
   },
   mounted() {
      this.fetchCategoryName();
      this.getProducts();
   },
   computed: {
      ...mapGetters({cart: 'getCart'})
   }
}
</script>

<style scoped>
.cardContainerCustom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.cardCustom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  cursor: pointer;
  border-radius:  1rem 1rem 0 0;
}

.cardCustom img {
   object-fit: cover;
   max-height: 250px;
   max-width: 250px;
   min-height: 250px;
   min-width: 250px;
  border-radius: 1rem 1rem 0 0;
}

</style>