<script lang="ts">
	let todoText = '';
	let tagList: string[] = [];
	import { focusTrap } from '@skeletonlabs/skeleton';
	import Todo from '../components/Todo.svelte';
	import { localtodolist, todoListfirestore } from '../stores/todoStore';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { authUser } from '../stores/AuthStore';
	import Profile from '../components/Profile.svelte';
	import type { UserInfo } from '@firebase/auth-types';


	const handleSubmit = () => {
		// addTodo(todo, $user.id);
		localtodolist.update((current) => [
			...current,
			{
				text: todoText,
				completed: false,
				tags: tagList
			}
		]);
		todoText = '';
		tagList = [];
	};
</script>

<main>
	<section>
		{#if $authUser}
			<Profile {...$authUser} />
		{/if}
	</section>
	<form class="my-6 p-4" on:submit|preventDefault={handleSubmit} use:focusTrap={true}>
		<div class="flex flex-col text-sm mb-2">
			<label class="fold-bold mb-2" for="todo">Todo</label>
			<input
				bind:value={todoText}
				class="text-black apprearance-none text shadow-sm border border-gray-200 p-2"
				type="text"
				name="todo"
				id=""
				placeholder="what now"
			/>
			<InputChip bind:value={tagList} name="chips" placeholder="Enter tags" />
		</div>
		<button
			class="w-full shadow-sm rounded btn variant-filled-primary text-white py-2 px-4"
			type="submit">Submit</button
		>
		<hidden hidden class="bg-green-400 hover:bg-green-500" />
	</form>

	{#if $todoListfirestore}
		{#each $todoListfirestore as todo}
			<Todo {todo} />
		{/each}
	{/if}
</main>
