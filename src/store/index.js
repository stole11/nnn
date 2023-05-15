import Vuex from 'vuex'


export default new Vuex.Store({
   state: {
      currentUser: null,
      cart: [],
      cartSize: 0
   },
   mutations: {
      updateUser(state, payload) {
         state.currentUser = payload
      },
      clearCart(state,payload) {
         const emptyArray = []
         state.cart = emptyArray
         state.cartSize = 0
      },
      takeFromCart(state, payload) {
         const cartProduct = state.cart.find(e => e.id === payload.id);
         const greaterThanOne = cartProduct.kolicina > 1;
         if(!greaterThanOne) {
            state.cart = state.cart.filter(e => e.id !== payload.id)
         } else {
            state.cart.forEach(proizvod => {
               if(proizvod.id === payload.id) {
                  proizvod.kolicina -= 1;
               }
            })
         }
         state.cartSize--;
      },
      addToCart(state, payload) {
         const isInCart = state.cart.find(e => e.id === payload.id)
         if(isInCart) {
            state.cart.forEach(proizvod => {
               if(proizvod.id === payload.id) {
                  proizvod.kolicina += 1;
               }
            })
         } else {
            state.cart.push({...payload, kolicina: 1})
         }
         state.cartSize++;
      }
   },
   getters: {
      getUser(state) {
         return state.currentUser
      },
      getCart(state) {
         return state.cart;
      },
      getCartSize(state) {
         return state.cartSize
      },
      getCartPrice(state) {
      let price = 0;
      state.cart.forEach(product => {
         price += product.cijena * product.kolicina;
      }) 
      return price;
      }
   }
})