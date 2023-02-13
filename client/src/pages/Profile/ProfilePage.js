import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import miniLogo from '../../assets/img/miniLogo.svg';
import addNewPost from '../../assets/img/addNewPost.svg';
import pen from '../../assets/img/pen.svg';
import showMore from '../../assets/img/showMore.svg';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
    const [postCount, setPostCount] = useState();
    const [followerCount, setFollowerCount] = useState();
    const [followingCount, setFollowingCount] = useState();


    return (
        <section className='profile'>
            <div className='div-flex'>
                <img src={miniLogo}></img>
                <h2>Username</h2>
                <div>
                    <Link to="/upload">
                        <img src={addNewPost}></img>
                    </Link>
                    <img src={pen}></img>
                    <img src={showMore}></img>
                </div>
            </div>
            <article>
                <img alt='profil-picture'></img>
                <h3>firstname & lastname</h3>
                <p>Job</p>
                <a>description</a>
                <Link><p>www.Website.com</p></Link>
                <div className='div-flex'>
                    <div>Posts</div>
                    <div>Followers</div>
                    <div>Following</div>
                </div>
            </article>
            <Navbar page={"profile"} />
        </section>
    );
}
