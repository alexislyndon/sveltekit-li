<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	interface TodoItem {
		text?: string;
		completed?: boolean;
		tags?: string[];
	}

	export let todo: TodoItem;
</script>

<li class="bg-white flex items-center shadow-sm border border-gray-200 rounded-lg my-2 py-2 px-4">
	<input
		name="completed"
		type="checkbox"
		checked={todo.completed}
		class="mr-2 form-checkbox h-5 w-5"
	/>
	<span
		class={`item-txt flex-1 text-gray-800 ${todo.completed ? 'line-through' : ''}`}
		contenteditable={`${todo.completed ? 'false' : 'false'}`}
		>{todo.text}
	</span>
	{#if todo.tags}
		{#each todo.tags as tag}
			<span class="chip variant-filled-surface">{tag}</span>
		{/each}
	{/if}
</li>
