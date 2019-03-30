import Fuse from 'fuse.js';
import { InputSearch } from '@getflywheel/local-components';

export default function (context) {

	const hooks = context.hooks;
	const React = context.React;
	const remote = context.electron.remote;


	/**********************************************************
	 * THE OG STUFF
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

		return <input
			key="search"
			placeholder="Search for a site"
			value={this.state.siteSearch || ''}
			onChange={onChange}
		/>;
	});

	hooks.addContent('SitesSidebar_SitesSidebarSites', function () {
		if (!this.state.siteSearch || (this.state.siteSearch && this.state.filteredSites.length)) {
			return;
		}

		return <p key="no-results">No sites found.</p>;
	});


	/**********************************************************
	 * THE New STUFF
	 */

	hooks.addFilter('FlywheelConnectSites_availableSites', function (sites) {

		// Set this as props the first time so we can have a prop to work with...
		if (!this.props.availableSites) {
			this.props.availableSites = sites;
		}

		if (this.state.availableSites) {
			return this.state.availableSites;
		}

		return sites;
	});

	hooks.addFilter('FlywheelConnectSites_connectedSites', function (sites) {

		// Set this as props the first time so we can have a prop to work with...
		if (!this.props.connectedSites) {
			this.props.connectedSites = sites;
		}

		if (this.state.connectedSites) {
			return this.state.connectedSites;
		}

		return sites;
	});


	hooks.addContent('FlywheelConnectSites_TabNav:Before', function () {
		const onChange = (event) => {
			const siteSearch = event.target.value;
			let availableSites = null;
			let connectedSites = null;


			if (siteSearch) {

				if (this.props.availableSites) {
					const fuseAvailableSites = new Fuse(Object.values(this.props.availableSites), {
						keys: ['name'],
					});
					availableSites = fuseAvailableSites.search(siteSearch);

					this.setState({
						siteSearch,
						availableSites,
					});
				}


				if (this.props.connectedSites) {
					const fuseConnectedSites = new Fuse(Object.values(this.props.connectedSites), {
						keys: ['name'],
					});
					connectedSites = fuseConnectedSites.search(siteSearch);

					this.setState({
						siteSearch,
						connectedSites,
					});
				}

			}

		};

		// return <input
		// 	key="search"
		// 	placeholder="Search for a site"
		// 	value={this.state.siteSearch || ''}
		// 	onChange={onChange}
		// />;

		return <InputSearch
			id="connected-site-search"
			key="search"
			onChange={onChange}
			placeholder="Search available sites"
			value={this.state.siteSearch}
		/>;
	});


	hooks.addContent('FlywheelConnectSites_FlywheelSitesList:Before', function () {
		if (!this.state.siteSearch || (this.state.siteSearch && this.state.availableSites.length)) {
			return;
		}

		return <p key="no-results">No sites found.</p>;
	});

	// Development Helpers
	remote.getCurrentWindow().openDevTools();
	window.reload = remote.getCurrentWebContents().reloadIgnoringCache;

}
