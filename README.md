# falconry.vip 
falconry.vip auth bits on cloudflare. WIP
## Config
Need to have the following secrets declared (  use ``wrangler secret put``)
- TWITTER_API_KEY
- TWITTER_API_SECRET
- TWITTER_CALLBACK_URL
## todo
- Finish redirect/token verification steps for oauth
- Throw together basic landing pages
- Need to define binding to KV store for holding user data which should just consist of temporary oauth tokens/secrets, twitter username, and a boolean on whether or not they're a trusted user. RBAC is overkill at this point.