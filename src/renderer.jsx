import Fuse from 'fuse.js';

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

		if (this.state.availableSites) {
			return this.state.availableSites;
		}

		return sites;
	});


	hooks.addContent('FlywheelConnectSites_TabNav', function () {
		const onChange = (event) => {
			const siteSearch = event.target.value;
			let availableSites = null;

			if (siteSearch) {
				const fuse = new Fuse(Object.values(this.state.availableSites), {
					keys: ['name'],
				});

				availableSites = fuse.search(siteSearch);
			}

			console.log(siteSearch);


			this.setState({
				siteSearch,
				availableSites,
			});
		};

		return <input
			key="search"
			placeholder="Search for a site"
			value={this.state.siteSearch || ''}
			onChange={onChange}
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
