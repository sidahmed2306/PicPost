import React from 'react';
import likeHeart from '../../assets/img/likeHeart.svg';
import commentIcon from '../../assets/img/commentIcon.svg';

export default function LikeAndComment(props) {
    return (
        <div className='likes-comments'>
            <div className='likes'>
                <img src={likeHeart}></img>
                <h5 className='likes-p' >{props.likes.length}</h5>
            </div>
            <div className='comments'>
                <img src={commentIcon}></img>
                <h5 className='comments-p'>{props.comments.length}</h5>
            </div>
        </div>
    );
}
