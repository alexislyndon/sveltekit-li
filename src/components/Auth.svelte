<script lang="ts">
	// import { supabase } from '../supabase.js';
	import Googlebutton from './Googlebutton.svelte';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
	import { initFirebase } from '../lib/client/firebase';
	const { auth } = initFirebase();

	let loading = false;
	let email: string, password: string;
	// const { auth } = initFirebase();
	const handleLogin = async () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	// const handleLogin = async () => {
	// 	try {
	// 		loading = true;
	// 		console.log(email);
	// 		const { error } = await supabase.auth.signIn(
	// 			{ email: email, password: password },
	// 			{ redirectTo: window.location.origin }
	// 		);
	// 		if (error) throw error;
	// 	} catch (error) {
	// 		console.error(error);
	// 		alert(error.error_description || error.message);
	// 	} finally {
	// 		loading = false;
	// 	}
	// };
</script>

<h1 class="text-2xl font-bold text-center text-gray-800 md:text=3xl">Login</h1>
<p class="text-center mt-2">Sign in using your email and password below.</p>

<form on:submit|preventDefault={handleLogin}>
	<div class="flex flex-col text-sm mb-2">
		<label class="font-bold mb-2 text-gray-800" for="email">Email</label>
		<input
			class="appearance-none shadow-sm border border-gray-200 mb-4 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
			type="email"
			name="email"
			placeholder="your email"
			bind:value={email}
		/>
		<label class="font-bold mb-2 text-gray-800" for="password">Password</label>
		<input
			class="appearance-none shadow-sm border border-gray-200 mb-4 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
			type="password"
			name="password"
			id="password"
			placeholder="password here"
		/>
		<button
			type="submit"
			class="w-full shadow-sm rounded bg-emerald-400 hover:bg-emerald-300 text-white py-2 px-4 focus:outline-none"
		>
			Login
		</button>
		<a class="flex justify-end my-2 hover:underline" href="/signup">No account?</a>

		<div class="flex w-full">
			<Googlebutton />
		</div>
	</div>
</form>
