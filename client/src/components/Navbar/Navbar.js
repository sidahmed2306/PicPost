import Home from '../../assets/img/Home.svg';
import Search from '../../assets/img/Search.svg';
import Upload from '../../assets/img/Upload.svg';
import Profile from '../../assets/img/Profile.svg';
import HomeC from '../../assets/img/HomeC.svg';
import SearchC from '../../assets/img/SearchC.svg';
import UploadC from '../../assets/img/UploadC.svg';
import ProfileC from '../../assets/img/ProfileC.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
	return (
		<nav className="navbar">
			{props.page === "home" && (
				<div className="navbar-icons">
					<Link to="/home">
						<img src={HomeC} alt="home-icon" className="navbar-home" />
					</Link>
                    <div className='search1'>
					<Link to="/search">
						<img src={Search} alt="search-icon" className="navbar-search" />
					</Link>
                    </div>
                    <div className='upload1'>
					<Link to={"/upload"}>
						<img src={Upload} alt="upload-icon" className="navbar-heart" />
					</Link>
                    </div>
                    <div className='profile1'>
					<Link to={"/profile"}>
						<img src={Profile} alt="profile-icon" className="navbar-profile" />
					</Link>
                    </div>
				</div>
			)}
			{props.page === "search" && (
				<div className="navbar-icons">
                    <div className='home1'>
					<Link to="/home">
						<img src={Home} alt="home-icon" className="navbar-home" />
					</Link>
                    </div>
					<Link to="/search">
						<img
							src={SearchC}
							alt="search-icon"
							className="navbar-search"
						/>
					</Link>
                    <div className='upload1'>
					<Link to={"/upload"}>
						<img src={Upload} alt="upload-icon" className="navbar-upload" />
					</Link>
                    </div>
                    <div className='profile1'>
					<Link to={"/profile"}>
						<img src={Profile} alt="profile-icon" className="navbar-profile" />
					</Link>
                    </div>
				</div>
			)}
			{props.page === "upload" && (
				<div className="navbar-icons">
                    <div className='home1'>
					<Link to="/home">
						<img src={Home} alt="home-icon" className="navbar-home" />
					</Link>
                    </div>
                    <div className='search1'>
					<Link to="/search">
						<img src={Search} alt="search-icon" className="navbar-search" />
					</Link>
                    </div>
                    <div className='upload'>
					<Link to={"/upload"}>
						<img src={UploadC} alt="upload-icon" className="navbar-upload" />
					</Link>
                    </div>
                    <div className='profile1'>
					<Link to={"/profile"}>
						<img src={Profile} alt="profile-icon" className="navbar-profile" />
					</Link>
                    </div>
				</div>
			)}
			{props.page === "profile" && (
				<div className="navbar-icons">
                    <div className='home1'>
					<Link to="/home">
						<img src={Home} alt="home-icon" className="navbar-home" />
					</Link>
                    </div>
                    <div className='search1'>
					<Link to="/search">
						<img src={Search} alt="search-icon" className="navbar-search" />
					</Link>
                    </div>
                    <div className='upload1'>
					<Link to={"/upload"}>
						<img src={Upload} alt="upload-icon" className="navbar-upload" />
					</Link>
                    </div>
					<Link to={"/profile"}>
						<img src={ProfileC} alt="profile-icon" className="navbar-profile" />
					</Link>
				</div>
			)}
		</nav>
	);
}
