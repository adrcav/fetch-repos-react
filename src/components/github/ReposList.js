import React from 'react';
import classNames from 'classnames';

const ReposList = props => {
    return (
        <div className="repos-list">
            {props.repos.map(repo => (
                <a href={ repo.html_url } target="_blank">
                    <div 
                        className={classNames(
                            "repo",
                            "animated",
                            "fadeInUp",
                            repo.stargazers_count > 0 ? "popular" : ""
                        )} 
                        key={ repo.id }
                    >
                        <p className="stars">{ repo.stargazers_count }</p>
                        <h3>{ repo.name }</h3>
                        <p>{ repo.description }</p>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ReposList;

