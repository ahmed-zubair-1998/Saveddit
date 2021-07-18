import os
from collections import Counter

import requests
from flask import Flask, redirect, request, make_response, jsonify


app = Flask(__name__)


REDDIT_ROOT_URL = 'https://www.reddit.com'
REDDIT_OAUTH_ROOT_URL = 'https://oauth.reddit.com'
REDDIT_AUTH_URL_TEMPLATE = REDDIT_ROOT_URL + \
    '/api/v1/authorize?client_id={}&response_type={}&state={}&redirect_uri={}&duration={}&scope={}'
APP_CLIENT_ID = os.environ['SAVEDDIT_CLIENT_ID']
APP_CLIENT_SECRET = os.environ['SAVEDDIT_CLIENT_SECRET']
APP_REDIRECT_URL = ('http://localhost:5000/oauth-redirect'
                    if os.environ.get('FLASK_ENV') == 'development' else
                    'https://saveddit4reddit.herokuapp.com/oauth-redirect')
APP_FRONTEND_URL = ('http://localhost:3000/'
                    if os.environ.get('FLASK_ENV') == 'development' else
                    'https://saveddit4reddit.herokuapp.com/')
APP_HTTP_REQUEST_HEADER = {'User-Agent': 'Saveddit - by Ahmed Zubair'}



def generate_reddit_auth_code_payload(code):
    return {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': APP_REDIRECT_URL
    }


@app.route('/')
def root():
    return redirect(APP_FRONTEND_URL)


@app.route('/oauth-redirect', methods=['GET'])
def handle_redirect():
    code = request.args.get('code')
    auth_res = requests.post(REDDIT_ROOT_URL + '/api/v1/access_token',
        auth=requests.auth.HTTPBasicAuth(APP_CLIENT_ID, APP_CLIENT_SECRET),
        data=generate_reddit_auth_code_payload(code),
        headers=APP_HTTP_REQUEST_HEADER
    ).json()
    token = auth_res.get('access_token')
    if token:
        res = make_response(redirect('/'))
        res.set_cookie('access_token', token, max_age=60*59)
        return res
    else:
        res = make_response(redirect('/'))
        return res


@app.route('/api/login')
def generate_reddit_oauth_url():
    return REDDIT_AUTH_URL_TEMPLATE.format(
        APP_CLIENT_ID,
        'code',
        'login',
        APP_REDIRECT_URL,
        'temporary',
        'identity,history'
    )


@app.route('/api/logout')
def logout():
    token = request.cookies.get('access_token')
    res = make_response(redirect('/'))
    if token:
        res.set_cookie('access_token', '', max_age=0)
    return res


@app.route('/api/saved', methods=['GET'])
def render_saved_data():
    token = request.cookies.get('access_token')
    if token is None:
        return redirect('/')
    try:
        username = get_username(token)
        posts = list(get_saved_posts(token, username))
    except requests.exceptions.HTTPError as e:
        res = make_response()
        res.status_code = e.response.status_code
        return res

    subreddit_counter = Counter()
    for post in posts:
        subreddit_counter[post['subreddit']] += 1
    return jsonify({
        'posts': posts,
        'subreddits': subreddit_counter,
    }), 200


@app.route('/api/username', methods=['GET'])
def render_username():
    token = request.cookies.get('access_token')
    if token is None:
        return 'No token. Login via Reddit', 202
    try:
        username = get_username(token)
    except requests.exceptions.HTTPError as e:
        res = make_response()
        res.status_code = e.response.status_code
        return res

    return username, 200


def get_username(access_token):
    url = f'{REDDIT_OAUTH_ROOT_URL}/api/v1/me'
    res = requests.get(
        url,
        headers={**APP_HTTP_REQUEST_HEADER, 'Authorization': f'Bearer {access_token}'}
    )
    if res.status_code != 200:
            res.raise_for_status()
    return res.json()['name']


def get_saved_posts(access_token, username):
    after = 0
    while True:
        url = f'{REDDIT_OAUTH_ROOT_URL}/user/{username}/saved?limit=100'
        if after:
            url += f'&after={after}'
        res = requests.get(
            url,
            headers={**APP_HTTP_REQUEST_HEADER, 'Authorization': f'Bearer {access_token}'}
        )
        if res.status_code != 200:
                res.raise_for_status()
        data = res.json()
        after = data['data']['after']

        for child in data['data']['children']:
            post = child['data']
            try:
                yield {
                    'score': post['score'],
                    'text': post['selftext'] if child['kind'] == 't3' else post['body_html'],
                    'subreddit': post['subreddit'],
                    'title': post['title'] if child['kind'] == 't3' else post['link_title'],
                    'url': post['url'] if child['kind'] == 't3' else post['permalink'],
                    'comments': post['num_comments'],
                    'created': post['created'],
                    'author': post['author'],
                }
            except:
                print('Error parsing saved data...', child)
        
        if not after:
            break
