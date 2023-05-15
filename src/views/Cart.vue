<template>
	<div class="ccontainer" v-if="!orderSubmitted">
		<button
			@click.prevent="this.$router.go(-1)"
			style="margin-right: auto; margin-left: 10rem"
			class="btn btn-danger"
		>
			<i class="fa-solid fa-arrow-left-long"></i>
		</button>
		<div class="pcard" v-for="product in cart" :key="product.id">
			<div class="poravnanje">
				<img :src="product.slika" />
				<h3>{{ product.ime }}</h3>
				<button class="btn">
					<i class="fa-solid fa-plus" @click.prevent="addToCart(product)"></i>
				</button>
				<h4>{{ product.kolicina }}</h4>
				<button style="margin-left: 1rem" class="btn">
					<i
						class="fa-solid fa-minus"
						@click.prevent="removeFromCart(product)"
					></i>
				</button>
				<h4 style="margin-right: 1rem">
					Ukupno: {{ product.kolicina * product.cijena }}kn
				</h4>
			</div>
		</div>
		<div class="poravnanjeTwo">
			<h3>Ukupno: {{ finalPrice }}kn</h3>
			<button
				class="btn btn-success"
				@click.prevent="orderSubmitted = !orderSubmitted"
			>
				Continue shopping
			</button>
		</div>
	</div>
	<div class="ccontainer" v-else>
		<div class="form-group">
			<label for="city">City</label>
			<input
				type="text"
				class="form-control"
				id="city"
				aria-describedby=""
				v-model="address.city"
				placeholder="Enter city"
			/>
		</div>
		<div class="form-group">
			<label for="city">Street</label>
			<input
				type="text"
				class="form-control"
				id="street"
				aria-describedby=""
				v-model="address.street"
				placeholder="Enter street"
			/>
		</div>
		<div class="form-group">
			<label for="houseNum">House number</label>
			<input
				type="text"
				class="form-control"
				v-model="address.houseNumber"
				id="houseNum"
				aria-describedby=""
				placeholder="Enter house number"
			/>
		</div>
		<div class="form-group">
			<label for="zip">ZIP Code</label>
			<input
				type="text"
				class="form-control"
				v-model="address.zip"
				id="zip"
				aria-describedby=""
				placeholder="Enter ZIP Code"
			/>
		</div>
		<button class="btn btn-success" @click="finish">Finish shopping</button>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { addDoc, collection, db } from "@/firebase";

export default {
	/* ime, kolicina, cijena, dodati/maknuti kolicinu, ukupno, kupovina  */
	name: "Kosarica",
	data() {
		return {
			address: {
				city: "",
				addressLine: "",
				houseNumber: "",
				zip: "",
				street: "",
			},
			orderSubmitted: false,
		};
	},
	computed: {
		...mapGetters({ cart: "getCart", finalPrice: "getCartPrice" }),
	},
	methods: {
		...mapMutations({
			addToCart: "addToCart",
			removeFromCart: "takeFromCart",
			clearCart: "clearCart",
		}),
		async finish() {
			try {
				if (
					this.address.city.length < 2 ||
					this.address.street.length < 2
				) {
					return alert("Address too short.");
				}
				await addDoc(collection(db, "narudzbe"), {
					narudzba: "Normalna narudzba",
					kosarica: this.cart,
					adresa: this.address,
				});
				this.clearCart();
				this.$router.push({ name: "Thanks" });
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style scoped>
.ccontainer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}
.pcard {
	background: white;
	width: 60%;
}

.pcard img {
	max-height: 150px;
	min-width: 150px;
	min-height: 150px;
	max-width: 150px;
	object-fit: cover;
}

.poravnanje {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.poravnanjeTwo {
	display: flex;
	margin-left: auto;
	justify-content: space-around;
	gap: 1rem;
	margin-right: 20rem;
	margin-top: 1rem;
	align-items: center;
}
</style>
