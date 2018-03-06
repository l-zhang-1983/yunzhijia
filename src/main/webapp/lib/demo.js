document.addEventListener('DOMContentLoaded', function() {
	var openId = '',
		wbuserid = '',
		XuntongJSBridge = window.XuntongJSBridge,
		testImg = 'iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAHBAZETAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiYTMzN2JkZC1mNjc1LTRhNzAtYWRlOC0zZTc2OTNlMWU3ODQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjYzQkZCMDQ5QTJEMTFFNTlCQjdEN0VERDRBNDkxOTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjYzQkZCMDM5QTJEMTFFNTlCQjdEN0VERDRBNDkxOTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjN2Y5ZDE0OS1lMjJlLTRhNTItYTI0MS1jZWU2MWYyOGE5YTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YmEzMzdiZGQtZjY3NS00YTcwLWFkZTgtM2U3NjkzZTFlNzg0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';

	function getOS() {
		return (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'iOS' :
			navigator.userAgent.match(/Android/i) ? 'Android' : '');
	}

	/* 判断是否运行于云之家桌面端
	 * @return {object} cloudhub 返回是否桌面端、当前桌面端userAgent版本及是否支持js桥
	 * cloudhub = {isCloudHub: true | false, hasJsBridget: true | false, version: '0.0.1'}
	 */

	function getCloudHub() {
		var ua = window.navigator.userAgent;
		var reg = /cloudhub 10204\/([^;]+)/;
		var cloudhub = {
			isCloudHub: false,
			hasJsBridget: false,
			version: ''
		};

		var match = reg.exec(ua),
			version;

		if (match) {
			version = match[1];
			cloudhub.isCloudHub = true;
			cloudhub.version = version;

			if (version.replace(/\./g, '') > 1) {
				cloudhub.hasJsBridget = true;
			}
		}

		return cloudhub;
	}

	function callback(result) {
		var success;
		/* ****  注意 start **** */
		/* ****  由于在桌面端，实现js桥方式不同，这里的回调返回值result是一个string **** */
		/* ****  为确保result正常使用，建议在回调中添加如下代码 **** */
		if (typeof result == 'string') {
			result = JSON.parse(result);
		}
		success = String(result.success);
		if (success == "true") {
		}

		alert("结果：" + JSON.stringify(result));
	}

	if (getOS() === '' || navigator.userAgent.indexOf('Qing') === -1) {
		var bodyEle = document.getElementsByTagName('body')[0];
		if (document.addEventListener) {
			bodyEle.addEventListener('click', function(e) {
				if (e && e.target && e.target.tagName.toLowerCase() === 'button') {
					alert('请在云之家中打开链接体验。');
				}
			}, false);
		} else if (document.attachEvent) {
			bodyEle.attachEvent('onclick', function(e) {
				if (e && e.target && e.target.tagName.toLowerCase() === 'button') {
					alert('请在云之家中打开链接体验。');
				}
			}, false);
		}
		return;
	}

	XuntongJSBridge.call('getPersonInfo', {}, function(result) {
		if (result.success) {
			openId = result.data.openId;
			wbuserid = result.data.wbuserid;
		}
        alert('who i am: ' + JSON.stringify(result.data));
	});

	//获取当前的用户环境是否ios或Android或非手机
	document.querySelector('#getOS').onclick = function() {
		var ret = getOS();
		if (ret === '') {
			ret = 'other';
		}
		alert(ret);
	};
	//判断当前环境是否支持JSBridge
	document.querySelector('#supportBridge').onclick = function() {
		alert(navigator.userAgent.indexOf('Qing') >= 0);
	};
	//当前支持的js桥的版本
	document.querySelector('#getVersion').onclick = function() {
		var ua = navigator.userAgent,
			reg = /Qing\/([^;]+)/gi,
			version = '不支持js桥',
			match = reg.exec(ua);

		if (match && match.length >= 2) {

			version = match[1];
		}
		alert(version);
	};
	//判断是否运行于云之家桌面端
	document.querySelector('#getCloudhub').onclick = function() {
		var cloudHub = getCloudHub();
		alert("结果：" + JSON.stringify(cloudHub));
	};

	//隐藏右上角按钮
	// document.querySelector('#hideOptionMenu').onclick = function() {
	// 	XuntongJSBridge.call('hideOptionMenu');
	// };
	//显示右上角按钮
	// document.querySelector('#showOptionMenu').onclick = function() {
	// 	XuntongJSBridge.call('showOptionMenu');
	// };

	//隐藏页面标题
	document.querySelector('#hideWebViewTitle').onclick = function() {
		XuntongJSBridge.call('hideWebViewTitle');
	};
	//设置页面标题并显示
	document.querySelector('#setWebViewTitle').onclick = function() {
	    // alert(JSON.stringify(arguments));
		XuntongJSBridge.call('setWebViewTitle', {
			'title': '你设置的标题 ' + Math.round(Math.random() * 10)
    });
	};

	//获取当前用户身份信息（桌面端+）
	document.querySelector('#getPersonInfo').onclick = function() {
		XuntongJSBridge.call('getPersonInfo', {}, function(result) {
			callback(result);
		});
	};

	//获取用户网络状态
	document.querySelector('#getNetworkType').onclick = function() {
		XuntongJSBridge.call('getNetworkType', {}, function(result) {
			callback(result);
		});
	};

	//打开第三方应用
	document.querySelector('#gotoApp').onclick = function() {
		XuntongJSBridge.call('gotoApp', {
			"data": 'kdweibo://p?url=https://itunes.apple.com/cn/app/bu-luo/id946626039'
		}, function(result) {
			callback(result);
		});
	};

	//进入会话
	document.querySelector('#chat').onclick = function() {
		alert('XT-' + wbuserid + '-XT-10000')
		XuntongJSBridge.call('chat', {
			//openId或者groupId
			'openId': 'XT-' + wbuserid + '-XT-10000'
		}, function(result) {
			alert("结果：" + JSON.stringify(result));
		});
	};

	// 唤起人员详情页面
	document.querySelector('#personInfo').onclick = function() {
		XuntongJSBridge.call('personInfo', {
			'openId': openId
		}, function(result) {
			callback(result);
		});
	};

	//分享接口
	document.querySelector('#share-pub').onclick = function() {
		XuntongJSBridge.call("share", {
			"shareType": "4",
			"appId": "XT-9105d076-f022-4c57-8631-6c859624d602",
			"appName": "测试",
			"theme": "组名",
			"title": "分享的标题",
			"content": "分享的内容",
			"thumbData": testImg,
			"webpageUrl": "https://www.baidu.com",
			"cellContent": "聊天界面显示的内容",
			"sharedObject": "all"
		}, function(result) {
			callback(result);
		});
	};

	// 切换工作圈
	document.querySelector('#switchCompany').onclick = function() {
		XuntongJSBridge.call("switchCompany", {
			"eid": "1746898"
		}, function(result) {
			callback(result);
		});
	};

	// 关闭轻应用界面
	document.querySelector('#close').onclick = function() {
		XuntongJSBridge.call('close');
	};

	// 获取图片
	document.querySelector('#selectPic').onclick = function() {
		XuntongJSBridge.call('selectPic', {}, function(result) {
			alert("结果：" + JSON.stringify(result.success) + '。由于图片编码过长，具体返回，请查看文档。');
		});
	};

	// 扫一扫
	document.querySelector('#scanQRCode').onclick = function() {
		XuntongJSBridge.call("scanQRCode", {
			"needResult": 0
		}, function(result) {
			callback(result);
		});
	};
	//自定义右上角弹出菜单
	document.querySelector('#createPop').onclick = function() {
		XuntongJSBridge.call('createPop', {
			'popTitle': '测试的标题',
			'popTitleCallBackId': '弹出菜单的ID',
			'items': [{
				'text': '测试',
				'callBackId': '测试项的单项ID'
			}],
			'menuList': ['refresh', 'share', 'openWithBrowser']
		}, function(result) {
			alert("结果：" + JSON.stringify(result));
		});
	};
	//关闭右上角弹出菜单
	document.querySelector('#closePop').onclick = function() {
		XuntongJSBridge.call('closePop');
	};

	// 关闭当前webview
	document.querySelector('#closeWebView').onclick = function() {
		XuntongJSBridge.call('closeWebView');
	};

		// 云之家定位
	document.querySelector('#getLocation').onclick = function() {
		XuntongJSBridge.call('getLocation', {}, function(result) {
			alert("结果：" + JSON.stringify(result));
		});
	};
	// 云之家选取周边位置
	document.querySelector('#selectLocation').onclick = function() {
		XuntongJSBridge.call('selectLocation', {
				'isLocation': true
			},
			function(result) {
				alert("结果：" + JSON.stringify(result));
			}
		);
	};
	
	// 云之家选取周边位置
    document.querySelector('#selectPersons').onclick = function() {
        XuntongJSBridge.call('selectPersons', {
                'isMulti':false
            },
            function(result) {
                alert("结果：" + JSON.stringify(result));
            }
        );
    };
});