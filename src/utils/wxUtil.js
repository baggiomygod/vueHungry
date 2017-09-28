import wxconfig from '../../wxconfig';

export default {
	methods: {
        getAccessToken(code) {
			let appID = wxconfig.wechat.appID;
			let appSecret = wxconfig.wechat.appSecret;
			let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;
			return new Promise((resolve, reject) => {
				this.$http.get(url).then(response => {
						let _data = response[0].body;
						console.log('getAccessToken:', _data);
						if (_data.errcode === 40163) {
							console.log('code 已经被使用一次');
						}
						if (_data) {
							resolve(_data);
						} else {
							throw new Error('get oauth2 access_token failed!');
						}
					})
					.catch(err => {
						reject(err);
					});
			});
		}
    }
    // mounted() {
    //     this.getAccessToken(this.code);
    // }
};
