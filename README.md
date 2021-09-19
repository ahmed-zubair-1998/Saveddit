![Saveddit](media/logo.png)

[Saveddit 4 Reddit](https://saveddit4reddit.herokuapp.com) - A website that allows you to filter / search through you **Saved Reddit** posts and comments.

## Demo



https://user-images.githubusercontent.com/41994834/133942578-9aad45ee-1ae6-4c72-91ab-461dced48f74.mp4



## Features

1. See all (within Reddit API limit ~900) your saved Reddit posts and comments
2. Search through your posts and only view posts that contains that word in title/body
3. View subreddit details of saved posts
4. Filter posts by subreddit
5. Unsave any saved Reddit post
6. All data processing done on Client side. No user data saved on our server

## Technologies Used

- Flask
- React
- Redux
- TailwindCSS

## Installation and Usage

1. Create a new app [on your Reddit account](https://www.reddit.com/prefs/apps/) and set the redirect url to `http://localhost:5000/oauth-redirect`
2. Copy this application's ID and secret into a new file called `config.txt`. Add `Client ID` in the first line and `Client Secret` in the second line
3. Create a Python virtual env in root directory and activate it
4. Install required pip packages by
`pip install -r requirements.txt`
5. Go to `saveddit` directory, install yarn packages using
`yarn install`
6. Run the command
`bash dev.sh`
This will start the Flask backend at localhost port 5000 and React frontend at localhost port 3000
7. Navigate to localhost:3000 in your browser
