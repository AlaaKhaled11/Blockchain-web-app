import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const userState = atom({});

export const loggedInState = atomWithStorage('loggedIn', '');
