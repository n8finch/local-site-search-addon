# Local and Connect to Flywheel Site Search for Local by Flywheel

Adds a live fuzzy search to Local and Connect to Flywheel sites.

![Search in action](https://github.com/n8finch/local-site-search-addon/blob/master/screenshot.gif)

## To Install (via repo):

1. Clone and extract this repo into `~/Library/Application Support/Local by Flywheel/addons`
2. Run `npm install` or `yarn install`
3. Restart Local
4. Enable the add-on in the Add-ons section (this will probably prompt you to restart Local).

### Feedback, Comments, Contributions

All feedback, comments, and contributions are welcome, please do so via the Issues tab [here](https://github.com/n8finch/local-site-search-addon/issues). I've made a couple of templates for Bugs and Feature requests. Please use the templates so I can be sure to get as much information as possible 🤓.

### Filters:

- FlywheelConnectSites_connectedSites
- FlywheelConnectSites_availableSites
- FlywheelConnectSites_incompatibleSites
- SitesSidebar_sites

### Content Hooks:

- FlywheelConnectSites_FlywheelHeader:Before
- FlywheelConnectSites_TabNav:Before
- FlywheelConnectSites_TabNav
- FlywheelConnectSites_FlywheelSitesList:Before
- FlywheelConnectSites_routes
- SitesSidebar_SitesSidebarSites:Before
- SitesSidebar_SitesSidebarSites

### Resources
[Local Example](https://build.localbyflywheel.com/project/building/example-add-ons)
[Build Local](https://build.localbyflywheel.com/project/)
[Local Components](https://github.com/getflywheel/local-components)
[React Docs](https://reactjs.org/docs/components-and-props.html)
[Passing Props](https://www.robinwieruch.de/react-pass-props-to-component/)

