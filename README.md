# Design
Mattilsynets designsystem og designmanual

## Releasing a new version
1. Manually update the version number in `package.json`
2. Run `npm install`
3. Commit the update with the message `chore: update version to x.y.z` to the `next` branch, and push it
4. Create a pull request from `next` into `main`
5. After the pull request is merged, the new version will be published automatically by a GitHub action