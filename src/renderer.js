'use strict';

const path = require('path');

module.exports = function(context) {
	const hooks = context.hooks;
	const React = context.React;
	const remote = context.electron.remote;

	hooks.addFilter('siteInfoMoreMenu', function(menu, site) {
		menu.push({
			label: 'Plugins',
			enabled: !this.context.router.isActive(
				`/site-info/${site.id}/my-component`
			),
			click: () => {
				context.events.send(
					'goToRoute',
					`/site-info/${site.id}/my-component`
				);
			},
		});
		return menu;
	});

	// Require component
	const MyComponent = require('./MyComponent')(context);
	// Get router handle
	const Router = context.ReactRouter;
	// Add Route
	hooks.addContent('routesSiteInfo', () => {
		return (
			<Router.Route
				key="site-info-my-component"
				path="/site-info/:siteID/my-component"
				component={MyComponent}
			/>
		);
	});

	// Just a test on those hooks
	// hooks.addContent(
	// 	'SiteInfoDatabase_TableList_TableListRow[Connect]:Before',
	// 	() => {
	// 		return (
	// 			<div>
	// 				<p>Just checking</p>
	// 			</div>
	// 		);
	// 	}
	// );

	// Development Helpers
	remote.getCurrentWindow().openDevTools();
	window.reload = remote.getCurrentWebContents().reloadIgnoringCache;
};
