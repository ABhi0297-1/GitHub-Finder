import React, { useEffect, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";
//import RepoItem from "../Repos/RepoItem";
import Repos from "../Repos/Repos";
import GithubContext from "../../context/github/githubContext";
const User = ({ match }) => {
	const githubContext = useContext(GithubContext);
	const { user, getUser, loading, getUserRepos, repos } = githubContext;
	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
	}, []);

	const {
		name,
		avatar_url,
		location,
		company,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = user;

	if (loading) return <Spinner />;
	return (
		<Fragment>
			<Link to="/" className="btn btn-light">
				Back to Search
			</Link>
			Hireable:{" "}
			{hireable ? (
				<i className="fas fa-check text-success" />
			) : (
				<i className="fas fa-times-circle text-danger" />
			)}
			<div className="card grid-2">
				<div className="all-center">
					<img
						src={avatar_url}
						className="round-img"
						alt=""
						style={{ width: "150px" }}
					/>
					<h1>{name}</h1>
					<p>{location}</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className="btn btn-dark my-1">
						Visit GitHub Profile
					</a>
					<ul>
						<l1>
							{login && (
								<Fragment>
									<strong>Username: </strong>
									{login}{" "}
								</Fragment>
							)}
						</l1>
						<l1>
							{company && (
								<Fragment>
									<strong>Company: </strong>
									{company}{" "}
								</Fragment>
							)}
						</l1>
						<l1>
							{blog && (
								<Fragment>
									<strong>Website: </strong>
									{blog}
								</Fragment>
							)}
						</l1>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">Followers: {followers}</div>
				<div className="badge badge-success">Following: {following}</div>
				<div className="badge badge-light">Public_Repos: {public_repos}</div>
				<div className="badge badge-dark">Public_Gists: {public_gists}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
};

export default User;
