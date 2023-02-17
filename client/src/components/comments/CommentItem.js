import React from 'react';
import ProfilePost from '../Home/ProfilePost';

export default function CommentItem(props) {

    return (
        <div>
            <ProfilePost userName={props.userName} profilePicture={props.profilePicture} job={props.job} />
            <p className='comment-p'>{props.comment}</p>

        </div>
    );
}
