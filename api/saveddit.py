import os
from collections import Counter

import requests
from flask import Flask, redirect, request, make_response, jsonify
from flask_compress import Compress
from flask_cors import CORS


REDDIT_ROOT_URL = 'https://www.reddit.com'
REDDIT_OAUTH_ROOT_URL = 'https://oauth.reddit.com'
REDDIT_AUTH_URL_TEMPLATE = REDDIT_ROOT_URL + \
    '/api/v1/authorize?client_id={}&response_type={}&state={}&redirect_uri={}&duration={}&scope={}'
APP_CLIENT_ID = os.environ['SAVEDDIT_CLIENT_ID']
APP_CLIENT_SECRET = os.environ['SAVEDDIT_CLIENT_SECRET']
APP_FRONTEND_URL = os.environ['APP_FRONTEND_URL']
APP_BACKEND_URL = os.environ['APP_BACKEND_URL']
CORS_URL = os.environ['CORS_URL']
APP_HTTP_REQUEST_HEADER = {'User-Agent': 'Saveddit - by Ahmed Zubair'}


app = Flask(__name__, static_url_path='', static_folder='../saveddit/build')
CORS(app, origins=[CORS_URL], supports_credentials=True)
Compress(app)


def generate_reddit_auth_code_payload(code):
    return {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': APP_FRONTEND_URL
    }


@app.route('/')
def root():
    response = redirect(APP_FRONTEND_URL)
    response.headers['Accept-Encoding'] = 'gzip'
    return response


@app.route('/api/authorize', methods=['GET'])
def handle_redirect():
    code = request.args.get('code')
    auth_res = requests.post(REDDIT_ROOT_URL + '/api/v1/access_token',
        auth=requests.auth.HTTPBasicAuth(APP_CLIENT_ID, APP_CLIENT_SECRET),
        data=generate_reddit_auth_code_payload(code),
        headers=APP_HTTP_REQUEST_HEADER
    ).json()
    token = auth_res.get('access_token')
    if token:
        res = make_response()
        res.set_cookie('access_token', token, max_age=60*59)
        return res
    else:
        res = make_response()
        return res


@app.route('/api/login')
def generate_reddit_oauth_url():
    return REDDIT_AUTH_URL_TEMPLATE.format(
        APP_CLIENT_ID,
        'code',
        'login',
        APP_FRONTEND_URL,
        'temporary',
        'identity,history,save'
    )


@app.route('/api/logout')
def logout():
    token = request.cookies.get('access_token')
    res = make_response()
    if token:
        res.set_cookie('access_token', '', max_age=0, samesite='Lax', secure=True)
    return res


@app.route('/api/saved', methods=['GET'])
def render_saved_data():
    token = request.cookies.get('access_token')
    if token is None:
        return redirect('/api/logout')
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


@app.route('/api/unsave/<post_id>', methods=['POST'])
def handle_unsave(post_id):
    token = request.cookies.get('access_token')
    if token is None:
        return redirect('/api/logout')
    try:
        response = unsave_post(token, post_id)
    except requests.exceptions.HTTPError as e:
        res = make_response()
        res.status_code = e.response.status_code
        return res

    return response, 200


def get_username(access_token):
    url = f'{REDDIT_OAUTH_ROOT_URL}/api/v1/me'
    res = requests.get(
        url,
        headers={**APP_HTTP_REQUEST_HEADER, 'Authorization': f'Bearer {access_token}'}
    )
    if res.status_code != 200:
            res.raise_for_status()
    return res.json()['name']


def get_image_url(data):
    try:
        if 'preview' in data:
            image = data['preview' ]['images'][0]['source']['url']
            if 'nsfw' in data['preview' ]['images'][0]['variants']:
                image = data['preview' ]['images'][0]['variants']['nsfw']['source']['url']
            elif 'obfuscated' in data['preview' ]['images'][0]['variants']:
                image = data['preview' ]['images'][0]['variants']['obfuscated']['source']['url']
            return image
        elif 'media_metadata' in data:
            for obj in data['media_metadata']:
                if data['media_metadata'][obj]['status'] == 'valid' and data['media_metadata'][obj]['e'] == 'Image':
                    return data['media_metadata'][obj]['s']['u']
        return ''
    except Exception as exc:
        return ''


def get_saved_posts(access_token, username):
    after = 0
    while True:
        url = f'{REDDIT_OAUTH_ROOT_URL}/user/{username}/saved?limit=100&raw_json=1'
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
                    'title': post['title'] if child['kind'] == 't3' else post['link_title'],
                    'text': post['selftext'] if child['kind'] == 't3' else post['body'],
                    'subreddit': post['subreddit'],
                    'score': post['score'],
                    'comments': post['num_comments'],
                    'author': post['author'],
                    'created': post['created'],
                    'id': post['name'],
                    'image': get_image_url(post),
                    'url': f'https://www.reddit.com{post["permalink"]}',
                }
            except:
                print('Error parsing saved data...', child)
        
        if not after:
            break


def unsave_post(access_token, post_id):
    url = f'{REDDIT_OAUTH_ROOT_URL}/api/unsave?id={post_id}'
    res = requests.post(
        url,
        headers={**APP_HTTP_REQUEST_HEADER, 'Authorization': f'Bearer {access_token}'}
    )
    if res.status_code != 200:
            res.raise_for_status()
    return res.json()
