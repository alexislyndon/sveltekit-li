<script lang="ts">

	export let displayName: string | null;
	export let photoURL: string | null;
	export let uid: string;
	export let email: string | null;
	export let phoneNumber: string | null;
	export let providerId: string;
</script>

<h2>SIGNED IN!!</h2>
<h3>Hi {displayName}</h3>

<img src={photoURL} alt="user avatar" />
<p>Your userID is {uid}</p>
<p>email: {email}, phone: {phoneNumber}, providerId: {providerId}</p>
