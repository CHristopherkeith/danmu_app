function fixWidth(name,padding){
	var padding=padding||0;
	$(name).css("width",$(name).width()+2*padding);
}

function getIndex(length){
	return Math.floor(Math.random()*length);
}

var Danmu=function(ref){
	this.textColor=["#000000","#ED1C24","#FF7F27","#00A2E8","#3F48CC","#A349A4","#B97A57","#B5E61D","#7092BE","#C3C3C3"];
	this.fontSize=["16px","18px","20px","22px","24px","26px","28px","30px","32px","34px"];
	this.ref=ref;
	this.init();
}

Danmu.prototype={

	init:function(){
		var self=this;
		fixWidth(".container",20);
		fixWidth(".user-input");
		fixWidth(".send input");
		fixWidth(".close input");
		$(".user-input").keydown(function(event){
			if(event.which==13||event.keycode==13){
				self.submit();
			}
		});
		$(".send input").click(function(){
			self.submit();
		});
		$(".close input").click(function(){
			self.close();
		});
	},

	/*******************数据提交到服务器*****************/
	submit:function(){
		var content = $(".user-input:first").val();
		if (!content) {
			return false
		} else {
			this.ref.push({content:content});
		}
	},

	send:function(val){

		var distance=window.screen.availWidth;
		var index=getIndex(15);
		var radomColor=this.textColor[getIndex(10)];
		var radomFontSize=this.fontSize[getIndex(10)];

		$(".danmu-line:eq("+index+")").append("<p class='danmu-text' style='color:"+radomColor+";font-size:"+radomFontSize+"'>"+val+"</p>");
		var sendingDanmu=$(".danmu-line:eq("+index+")"+" .danmu-text:last");
		/****************兼容IE left值auto*****************/
		if(sendingDanmu.css("left")=="auto"){
			sendingDanmu[0].style.left=sendingDanmu[0].offsetLeft.toString()+"px";
		}
		/****************兼容IE left值auto*****************/
		sendingDanmu.animate({left:-distance},20000,function(){
			sendingDanmu.remove();
		});
	},

	close:function(){
		$(".danmu-text").remove();
		/*****************清除服务器数据******************/
		this.ref.remove();
	},

}