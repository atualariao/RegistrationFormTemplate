import React from 'react';
import { useRouter } from 'next/router';

const userId = () => {
    const router = useRouter()
    const userId = router.query.userId
    return (
        <div>
            <h1>User Details</h1>
            <h2>This is user number {userId}</h2>
        </div>
    );
};

export default userId;