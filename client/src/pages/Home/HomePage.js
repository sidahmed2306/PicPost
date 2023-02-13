import React, { useEffect, useState } from 'react';
import Post from '../../components/Home/Post';

export default function HomePage() {
    const [recentPosts, setRecentPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9003/api/v1/posts")
            .then((res) => res.json())
            .then((allPosts) => setRecentPosts(allPosts));
    }, []);

    useEffect(() => {
        fetch("http://localhost:9003/api/v1/users")
            .then((res) => res.json())
            .then((allUser) => setUsers(allUser));
    }, []);

    return (
        <section>
            hi
            {
                recentPosts.map((post, index) => {
                    return <Post key={index} picture={post.picture} users={users} />;
                })
            }
        </section>
    );
}
