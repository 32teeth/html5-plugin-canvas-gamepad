var ads = (function(){
	var platform;
	var ids = {
		banner:"",
		interstitial:""
	}

	function interstitial()
	{
		if(typeof AdMob != "undefined")
		{
			AdMob.prepareInterstitial(
				{
					adId:ads.ids.interstitial,
					overlap: true,
					isTesting: false,
					autoShow: true
				},
				function(){},
				function(){}
			);		
		}
	}

	function banner()
	{
		if(typeof AdMob != "undefined")
		{
			AdMob.createBanner(
				{
					adId:ads.ids.banner,
					overlap: true,
					isTesting: false,
					autoShow: true
				},
				function(){},
				function(){}                
			);		
		}
	}	

	function destroy()
	{
		if(typeof AdMob != "undefined"){AdMob.removeBanner();}	
	}

	return {
		interstitial:function(){interstitial();},
		banner:function(){banner();},
		destroy:function(){destroy();}
	}
})();