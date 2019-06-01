# Local and Connect to Flywheel Site Search for Local by Flywheel

Adds a live fuzzy search to Local and Connect to Flywheel sites.

## Notes and Troubleshooting

- Currently this plugin only works on version 3.2.0 and above of Local, for Teams and for individuals with no team account.
- I've only tested this on a Mac so far. Please let me know if you're having issues on Windows or Linux in the Issues tab!
- If the Connected Sites search doesn't work at first, try toggling the add-on Off and back On, or restarting you Local instance.


![Search in action](https://github.com/n8finch/local-site-search-addon/blob/master/screenshot.gif)

## To Install (via repo):

1. Clone and extract this repo into `~/Library/Application Support/Local by Flywheel/addons` (or the equivalent on a Windows or PC).
2. Run `npm install` or `yarn install`, then `npm run build` to compile.
3. Restart Local
4. Enable the add-on in the Add-ons section (this will probably prompt you to restart Local).

## Development Helpers

At the end of the `src/renderer.jsx` file, there is a commented out section of code that looks like this:

~~~js
/**********************************************************
* Development Helpers
*/
const remote = context.electron.remote;
remote.getCurrentWindow().openDevTools();
window.reload = remote.getCurrentWebContents().reloadIgnoringCache;
~~~

This code is helpful for testing new code. It opens the JS Console in the Local app, and allows you to reload the app by running the `reload()` function in the console. Uncomment it to use it! This code was borrow from [this Delicious Brains article](https://deliciousbrains.com/creating-custom-addon-local-flywheel/).

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
- [Local Example](https://build.localbyflywheel.com/project/building/example-add-ons)
- [Build Local](https://build.localbyflywheel.com/project/)
- [Local Components](https://github.com/getflywheel/local-components)
- [React Docs](https://reactjs.org/docs/components-and-props.html)
- [Passing Props](https://www.robinwieruch.de/react-pass-props-to-component/)

