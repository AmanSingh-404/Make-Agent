import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function ProfilePage() {
    return (
        <div className='flex flex-col gap-4 p-10'>
            {/* <h2 className='text-2xl font-bold '>Profile</h2> */}
            <UserProfile/>
        </div>
    )
}

export default ProfilePage