import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

addEventListener('fetch', event => {
    try {
        const responseVal = handleRequest(event)
        event.respondWith(responseVal);
    } catch (e) {
        event.respondWith("Error happened " + e.message);
    }
});


async function handleRequest(event) {
    let url = new URL(event.request.url)
    switch (url.pathname) {
        case '/twitter/login':
            return await login()
            break;
        case '/twitter/auth':
            return await auth(event.request)
            break;
        default:
            return new Response('🤷🏻‍♂️')
            break;
    }
}


async function login() {
    const oaobj = OAuth({
        consumer: { key: TWITTER_API_KEY, secret: TWITTER_API_SECRET },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) { return crypto.createHmac('sha1', key).update(base_string).digest('base64') },
    })

    const request_data = {
        url: 'https://api.twitter.com/oauth/request_token',
        method: 'POST',
        data: { oauth_callback: TWITTER_CALLBACK_URL, oauth_consumer_key: TWITTER_API_KEY },
    }
    request_data.headers = oaobj.toHeader(oaobj.authorize(request_data))
    const respData = await fetch(request_data.url, request_data)
    const respText = await respData.text()
    return new Response("Resp" + respText)
}


async function auth(request) {
    return new Response("To-Do")
}