$(document).ready(function(){
	/*******************野狗云储存数据******************/
	var config = {
	  syncURL: "https://bilibilibilibili.wilddogio.com/"
	};
	wilddog.initializeApp(config);
	var ref = wilddog.sync().ref("/danmutext");

	var danmu=new Danmu(ref);
	/*************清除服务器数据***************/
	danmu.close();

	/*******************监听服务器数据******************/
	ref.on('child_added', function (snap) {
		var val = snap.val().content;
		//console.log(val);
		danmu.send(val);
	});


})
