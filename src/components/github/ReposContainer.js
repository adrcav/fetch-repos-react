import React, { Component } from 'react';
import classNames from 'classnames';

import { fetchRepos } from '../../services/repos';
import ReposList from './ReposList';

export default class ReposContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            username: '',
            loading: false
        }
    }

    getRepos = async (user) => {
        this.state.repos = [];

        this.setState({ loading: true });
        
        try {
            const response = await fetchRepos(user);
            this.setState({ repos: response.data });
        } catch (err) {
            console.log(err);
        }

        this.setState({ loading: false });
    };

    handleChange = (event) => {
        this.setState({ username: event.target.value });

        if (!event.target.value.length)
            this.setState({ repos: [] });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.getRepos(this.state.username);
    };

    changeLoading = (event) => {
        this.setState({ loading: true });
    };

    render() {
        return (
            <div>
                <header className={classNames(
                    this.state.repos.length && this.state.username.length ? 'show' : ''
                )}
                >
                    <div className="content">
                        <p><span role="img" aria-label="Search Icon">🔍</span> Fetch Repos</p>
                        <form
                            onSubmit={this.handleSubmit}
                        >
                            <input 
                                onChange={this.handleChange} 
                                onClick={this.changeLoading}
                                type="search"
                                placeholder="Username"
                            />
                        </form>
                    </div>
                </header>

                <ReposList repos={ this.state.repos } />
            </div>
        )
    }
}