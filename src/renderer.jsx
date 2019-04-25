import Fuse from 'fuse.js';
import { InputSearch } from '@getflywheel/local-components';

export default function (context) {

	const hooks = context.hooks;
	const React = context.React;
	const localSearchSites = {};

	/**********************************************************
	 * Main Local Sidebar Search
	 */

	hooks.addFilter('SitesSidebar_sites', function (sites) {
		if (this.state.filteredSites) {
			return this.state.filteredSites;
		}

		return sites;
	});

	hooks.addContent('SitesSidebar_SitesSidebarSites:Before', function () {
		const onChange = (event) => {
			const siteSearch = event.target.value;
			let filteredSites = null;

			if (siteSearch) {
				const fuse = new Fuse(Object.values(this.props.sites), {
					keys: ['name'],
				});

				filteredSites = fuse.search(siteSearch);
			}

			this.setState({
				siteSearch,
				filteredSites,
			});
		};

		return <InputSearch
			key="search"
			onChange={onChange}
			placeholder="Search sites"
			value={this.state.siteSearch || ''}
		/>;
	});

	hooks.addContent('SitesSidebar_SitesSidebarSites', function () {
		if (!this.state.siteSearch || (this.state.siteSearch && this.state.filteredSites.length)) {
			return;
		}

		return <p key="no-results">No sites found.</p>;
	});


	/**********************************************************
	 * Connect to Flywheel Search
	 */

	hooks.addFilter('FlywheelConnectSites_availableSites', function (sites) {

		// Set this as "props" the first time so we can have a "prop" to work with...
		if (!localSearchSites.availableSites) {
			localSearchSites.availableSites = sites;
		}

		if (this.state.availableSites) {
			return this.state.availableSites;
		}

		return sites;
	});

	hooks.addFilter('FlywheelConnectSites_connectedSites', function (sites) {

		// Set this as "props" the first time so we can have a "prop" to work with...
		if (!localSearchSites.connectedSites) {
			localSearchSites.connectedSites = sites;
		}

		if (this.state.connectedSites) {
			return this.state.connectedSites;
		}

		return sites;
	});


	hooks.addContent('FlywheelConnectSites_TabNav', function () {
		const onChange = (event) => {
			const siteSearch = event.target.value;
			let availableSites = null;
			let connectedSites = null;

			if (siteSearch) {

				if (localSearchSites.availableSites) {
					const fuseAvailableSites = new Fuse(Object.values(localSearchSites.availableSites), {
						keys: ['name'],
					});
					availableSites = fuseAvailableSites.search(siteSearch);

					this.setState({
						siteSearch,
						availableSites,
					});
				}

				if (localSearchSites.connectedSites) {
					const fuseConnectedSites = new Fuse(Object.values(localSearchSites.connectedSites), {
						keys: ['name'],
					});
					connectedSites = fuseConnectedSites.search(siteSearch);

					this.setState({
						siteSearch,
						connectedSites,
					});
				}
			} else {
				// This means that there's nothing in the search box, so we should reset the sites to thier original state
				if (localSearchSites.availableSites) {
					availableSites = localSearchSites.availableSites;

					this.setState({
						siteSearch,
						availableSites,
					});
				}

				if (localSearchSites.connectedSites) {
					connectedSites = localSearchSites.connectedSites;
					this.setState({
						siteSearch,
						connectedSites,
					});
				}
			}

		};

		return (
			<div id="site-search-input-container"
				style={{
					position: 'absolute', right: '20px',
					'padding-top': '5px',
				}}>
				<InputSearch
					id="connected-site-search"
					key="search"
					onChange={onChange}
					placeholder="Search available sites"
					value={this.state.siteSearch}
				/>
			</div>
		);

	});


	hooks.addContent('FlywheelConnectSites_FlywheelSitesList:Before', function () {

		// console.log(this.state.siteSearch !== undefined);
		// console.log(this.state.siteSearch.length < 1);

		// Return nothing if there's nothing being searched for.
		if (this.state.siteSearch === undefined || this.state.siteSearch.length < 1) {
			return;
		}
		// Add the search team to the top of the sites list.
		if (this.state.siteSearch !== undefined && this.state.siteSearch.length > 0 && this.state.availableSites.length !== 0) {
			return <p key="site-results">Searching for &quot;{this.state.siteSearch}&quot;...</p>;
		}

		// If nothing is coming back, then output no results found.
		return <p key="no-results">No sites found.</p>;
	});

	/**********************************************************
	 * Development Helpers
	 */
	// const remote = context.electron.remote;
	// remote.getCurrentWindow().openDevTools();
	// window.reload = remote.getCurrentWebContents().reloadIgnoringCache;

}
