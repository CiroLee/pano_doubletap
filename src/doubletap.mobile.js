
var krpanoplugin= function(){

	var local = this;
	var krpano = null;
	var plugin = null;

	var pretap = {
		startx:null,
		starty:null,
		starttime:null,
		fulltime:null
	};

	local.registerplugin = function(krpanointerface, pluginpath, pluginobject){

		krpano = krpanointerface;
		plugin = pluginobject;

		plugin.registerattribute("ondbltap","",function(krpano){
				b = krpano;
			},function(){return b},krpano.control.layer.addEventListener('touchstart',doubletap,false));

		//滑动、单击，清除数据
		krpano.control.layer.addEventListener('touchmove',cleartap,false);

		krpano.control.layer.addEventListener('touchend',function(){
			let endtime = new Date().getTime();
			if(pretap.starttime != null && Math.abs(endtime - pretap.fulltime) > 300 ){
				cleartap();
				//console.log('单击清除');
			}
		},false);
        
        //清除数据函数
		function cleartap(){
			pretap.starttime = null;
			pretap.startx = null;
			pretap.starty = null;
			pretap.fulltime = null;

			//console.log('clear');
		}

		//回调函数
		function callback(){
			setTimeout(cleartap,50);
			krpano.call(b);
			console.log("doubletap");
			
		}
        
        //移动端双击
		function doubletap(e){
			if(e.touches.length > 1){
				alert("multi-touch")
			}
			else{
				if(pretap.starttime == null){
					pretap.startx = parseInt(e.touches[0].pageX);
					pretap.starty = parseInt(e.touches[0].pageY);
					pretap.starttime = new Date().getMilliseconds();
					pretap.fulltime = new Date().getTime();

					//console.log(pretap)
				}
				else{
					let nowtap = {
						nowx:parseInt(e.touches[0].pageX),
						nowy:parseInt(e.touches[0].pageY),
						nowtime:new Date().getMilliseconds()
					}

					if(Math.abs(nowtap.nowx - pretap.startx) < 10 && 
					Math.abs(nowtap.nowy - pretap.starty) < 10 && 
					Math.abs(nowtap.nowtime - pretap.starttime) <300 ){

						callback()
						
					}
				}
			}
		}
	}
}