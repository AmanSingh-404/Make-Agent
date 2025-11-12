"use client";
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { User } from 'lucide-react';
import { UserDetailContext } from '@/context/UserDeatailsContext';

function Provider({
    children,
}: {
    children: React.ReactNode;
}) {

    const { user } = useUser();
    const createUser = useMutation(api.user.CreateNewUser);
    const [UserDetails, setUserDetails] = useState<any>();

    useEffect(() => {
        user && CreateAndGetUser();
    }, [user]);

    const CreateAndGetUser = async () => {
        if (user) {
            const result = await createUser({
                name: user?.fullName ?? '',
                email: user?.primaryEmailAddress?.emailAddress ?? ''
            });
            setUserDetails(result);
        }

    };

    return (
        <UserDetailContext.Provider value={{ UserDetails, setUserDetails }}>
            <div>{children} </div>
        </UserDetailContext.Provider>
    );
}

export default Provider;
