<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { authUser } from '../stores/AuthStore';

	import { onDestroy, onMount } from 'svelte';
	import { onAuthStateChanged, signOut, signInAnonymously } from 'firebase/auth';
	import { initFirebase } from '$lib/client/firebase';
	var { auth } = initFirebase();

	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { localtodolist, todoListfirestore, loadTodos, addlistItem } from '../stores/todoStore';

	const logout = () => {
		console.log('log out');
		signOut(auth).then(() => {
			console.log('current user: ', auth.currentUser?.uid);
			authUser.set(null);
		});
	};

	const uid = () => {
		alert(auth.currentUser?.uid);
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log("there's a user!");
			const { displayName, email, phoneNumber, photoURL, providerId, uid } = user;
			authUser.set({ displayName, email, phoneNumber, photoURL, providerId, uid });
			loadTodos();
		}
	});
</script>

<div class="container px-4 mx-auto my-6 max-w-lg">
	<!-- {#if $user} -->
	<!-- <Navbar /> -->
	<!-- <slot /> -->
	<!-- above slow only shows the content if logged in -->
	<!-- {:else} -->
	<!-- <Auth /> -->
	<!-- <p>{data.a}</p> -->
	<div class="flex justify-between">
		<nav class="container">
			<a class="p-1" href="/">Home</a>
			<a class="p-2" href="/login">Login</a>
			<a class="p-1" href="/signup">SignUp</a>
			<button
				class="shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
				on:click={logout}
			>
				Log Out
			</button>
			<button on:click={uid}>uid</button>
		</nav>

		<LightSwitch />
	</div>

	<!-- {/if} -->
	<slot />
</div>
