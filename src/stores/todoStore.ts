import { initFirebase } from '../lib/client/firebase';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { authUser } from './AuthStore';

const { db, auth, app } = initFirebase();

let useruid: string | null;
authUser.subscribe((value) => {
	if (value) {
		useruid = value.uid;
	}
});

export interface TodoItem {
	text?: string;
	completed?: boolean;
	tags?: string[];
}

export const localtodolist: Writable<TodoItem[]> = localStorageStore('todos', [
	{
		text: 'your list item shows up here',
		completed: false,
		tags: ['todo']
	}
]);

export const todoListfirestore: Writable<TodoItem[]> = writable();

// const querySnapshot = await getDocs(q);
// console.log(querySnapshot)

// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

export const loadTodos = async () => {
	try {
		const listItemsRef = collection(db, 'listItems');
		const q = query(listItemsRef, where('uid', '==', useruid));
		const querySnapshot = await getDocs(q);
		// console.log('querysnapshot: ', querySnapshot);
		const newlistItems = querySnapshot.docs.map((doc) => {
			const listItem = doc.data() as TodoItem;
			console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
			return listItem;
		});
		todoListfirestore.set(newlistItems);
	} catch (error) {
		console.error(error);
	}
};

export const addlistItem = async (text: string, uid: string) => {
	console.log(text, uid);
	// console.log(text + ' addTodofunc');
	// const { data, error } = await supabase
	// 	.from('lists')
	// 	.insert([{ text, completed: false, user_id }]);
	// if (error) {
	// 	return console.error(error);
	// }

	// todos.update((cur) => [...cur, data[0]]);
};
