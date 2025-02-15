import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { get, ref, set } from "firebase/database";
import { db } from '../config/firebase';

export default function useAuth() {

    const createUser = async (db, userId, email) => {
        const userRef = ref(db, `users/${userId}`);
        console.log('Anything wrong?')
        try{
            const snapshot = await get(userRef)
            if (!snapshot.exists()) {
                try {
                    console.log('Adding user to database!')
                    await set(userRef, {
                        email: email
                    });
                } catch (error) {
                    console.error("Error adding new user: ", error);
                }
            } else {
                console.log("User already exists in database.");
            }
        } catch (error) {
            console.error("Error checking user existence: ", error);
        }
    }

    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            console.log('User: ' + user)
            if (user) {
                setUser(user)
                console.log('This is my user: ' + JSON.stringify(user))
                createUser(db, user.uid, user.email);
            } else {
                setUser(null);
            }
        })
        return unsub;
    }, [])

    return {
        user
    }
}