import React, { Component } from 'react';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';

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

        if (!event.target.value.length) {
            this.setState({ repos: [] });
            return;
        }

        this.getRepos(event.target.value);
    };

    render() {
        return (
            <div>
                <header className={classNames(
                    "animated fadeInDown",
                    this.state.repos.length && this.state.username.length ? 'show' : ''
                )}
                >
                    <div className="content">
                        <p><span role="img" aria-label="Search Icon">🔍</span> Fetch Repos</p>
                        <DebounceInput
                            minLength={2}
                            debounceTimeout={300}
                            type="search"
                            onChange={this.handleChange}
                            placeholder="Username"
                        />
                    </div>
                </header>

                <ReposList repos={ this.state.repos } />
            </div>
        )
    }
}