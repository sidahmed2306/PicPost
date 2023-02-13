import { ReactComponent as Home } from '../../assets/img/Home.svg';
import { ReactComponent as Search } from '../../assets/img/Search.svg';
import { ReactComponent as Upload } from '../../assets/img/Upload.svg';
import { ReactComponent as Profile } from '../../assets/img/Profile.svg';
import { ReactComponent as HomeC } from '../../assets/img/HomeC.svg';
import { ReactComponent as SearchC } from '../../assets/img/SearchC.svg';
import { ReactComponent as UploadC } from '../../assets/img/UploadC.svg';
import { ReactComponent as ProfileC } from '../../assets/img/ProfileC.svg';
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
					<Link to="/search">
						<img src={Search} alt="search-icon" className="navbar-search" />
					</Link>
					<Link to={"/upload"}>
						<img src={Upload} alt="upload-icon" className="navbar-heart" />
					</Link>
					<Link to={"/profile"}>
						<img src={Profile} alt="profile-icon" className="navbar-profile" />
					</Link>
				</div>
			)}
			{props.page === "search" && (
				<div className="navbar-icons">
					<Link to="/home">
						<img src={Home} alt="home-icon" className="navbar-home" />
					</Link>
					<Link to="/search">
						<img
							src={SearchC}
							alt="search-icon"
							className="navbar-search"
						/>
					</Link>
					<Link to={"/upload"}>
						<img src={Upload} alt="upload-icon" className="navbar-upload" />
					</Link>
					<Link to={"/profile"}>
						<img src={Profile} alt="profile-icon" className="navbar-profile" />
					</Link>
				</div>
			)}
			{props.page === "upload" && (
				<div className="navbar-icons">
					<Link to="/home">
						<img src={Home} alt="home-icon" className="navbar-home" />
					</Link>
					<Link to="/search">
						<img src={Search} alt="search-icon" className="navbar-search" />
					</Link>
					<Link to={"/upload"}>
						<img src={UploadC} alt="upload-icon" className="navbar-upload" />
					</Link>
					<Link to={"/profile"}>
						<img src={Profile} alt="profile-icon" className="navbar-profile" />
					</Link>
				</div>
			)}
			{props.page === "profile" && (
				<div className="navbar-icons">
					<Link to="/home">
						<img src={Home} alt="home-icon" className="navbar-home" />
					</Link>
					<Link to="/search">
						<img src={Search} alt="search-icon" className="navbar-search" />
					</Link>
					<Link to={"/upload"}>
						<img src={Upload} alt="upload-icon" className="navbar-upload" />
					</Link>
					<Link to={"/profile"}>
						<img src={ProfileC} alt="profile-icon" className="navbar-profile" />
					</Link>
				</div>
			)}
		</nav>
    );
}
