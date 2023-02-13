import React from 'react';
import LikeAndComment from './LikeAndComment';
import ProfilePost from './ProfilePost';

export default function Post(props) {
    return (
        <div className='post'>
            <ProfilePost
                userName={props.userName}
                profilePicture={props.profilePicture}
                bio={props.bio} />
            <img src={props.picture}></img>
            <LikeAndComment likedBy={props.likedBy} comments={props.comments} />
        </div>
    );
}