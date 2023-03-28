import { writable } from 'svelte/store';
// import { User as FirebaseUser } from "firebase/auth";
import type { UserInfo } from '@firebase/auth-types';

// type User = {
//  uid: string;
//  email: string;
// };

export const authUser = writable<UserInfo | null>();
