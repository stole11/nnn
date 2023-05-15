<template>
	<div id="app">
		<h1>Dobro došli</h1>
		<div class="login-page">
			<transition name="fade">
				<div v-if="!registerActive" class="wallpaper-login"></div>
			</transition>
			<div class="wallpaper-register"></div>

			<div class="container">
				<div class="row">
					<div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
						<div
							v-if="!registerActive"
							class="card login"
							v-bind:class="{ error: emptyFields }"
						>
							<h1>Log in</h1>
							<form class="form-group">
								<input
									v-model="emailLogin"
									type="email"
									class="form-control"
									placeholder="Email"
									required
								/>
								<input
									v-model="passwordLogin"
									type="password"
									class="form-control"
									placeholder="Password"
									required
								/>
								<button
									type="submit"
									class="btn btn-primary"
									@click.prevent="doLogin"
								>
									Login
								</button>
								<p>
									Don't have an account?
									<a
										href="#"
										@click="
											(registerActive = !registerActive), (emptyFields = false)
										"
										>Sign up here</a
									>
								</p>
							</form>
						</div>

						<div
							v-else
							class="card register"
							v-bind:class="{ error: emptyFields }"
						>
							<h1>Sign Up</h1>
							<form class="form-group">
								<input
									v-model="emailReg"
									type="email"
									class="form-control"
									placeholder="Email"
									required
								/>
								<input
									v-model="passwordReg"
									type="password"
									class="form-control"
									placeholder="Password"
									required
								/>
								<input
									v-model="confirmReg"
									type="password"
									class="form-control"
									placeholder="Confirm Password"
									required
								/>
								<input
									v-model="name"
									type="name"
									class="form-control"
									placeholder="Name"
									required
								/>
								<input
									v-model="surname"
									type="Surname"
									class="form-control"
									placeholder="Surname"
									required
								/>
								<button
									type="submit"
									class="btn btn-primary"
									@click.prevent="doRegister"
								>
									Sign Up
								</button>
								<p>
									Already have an account?
									<a href="#" @click="registerActive = !registerActive"
										>Sign in here</a
									>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from "@/firebase.js";

export default {
	name: "Login",
	data() {
		return {
			emailLogin: "",
			passwordLogin: "",
			emailReg: "",
			passwordReg: "",
			confirmReg: "",
			name: "",
			surname: "",
		};
	},
	mounted() {},
	methods: {
		async doLogin() {
			try {
				await signInWithEmailAndPassword(
					auth,
					this.emailLogin,
					this.passwordLogin
				);
				this.$router.push({ name: "Home" });
			} catch (error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error.message);
			}
		},
		async doRegister() {
			if (this.passwordReg !== this.confirmReg) {
				return alert("Password nije jednak.");
			}
			try {
				const userCredentials = await createUserWithEmailAndPassword(
					auth,
					this.emailReg,
					this.passwordReg
				);
				const currentUser = auth.currentUser;
				if (currentUser) {
					await updateProfile(currentUser, {
						displayName: this.name + " " + this.surname,
					});
				}
				alert("Registracija uspješna");
			} catch (error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error.message);
			}
		},
	},
};
</script>
<style scoped>
.login-page {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	min-height: 40vh;
}
</style>
