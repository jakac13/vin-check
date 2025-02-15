import React, { useEffect } from 'react'
import TabNavigation from './TabNavigation'
import UserAuth from './UserAuth';
import useAuth from '../../hooks/useAuth'

export default function RootNavigation() {
    const { user } = useAuth();

    return user ? <TabNavigation/> : <UserAuth/>;
}