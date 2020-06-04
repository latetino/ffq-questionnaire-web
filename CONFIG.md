## Azure Deployment using ng-deploy

#### Prereqs
 - Make sure to run `ng build --production` to create a `./dist` folder to use as the deployable artifact for a static website.

#### Config changes for package.json
 - Update `package.json` `@angular/cli from ~7.3.0 to ~9.0.3` (which is angular 9 LTS)

#### In terminal
 - Run `npm install` to add the new angular cli
 - Run 