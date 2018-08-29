
export default{
	getAccessTokenByCode(code) {
		console.log(this.$http);
		this.$http.get('http://wxfan.ngrok.cc/wx_oauth2/' + code).then(res => {
			console.log(res);
		});
	}
};
