
function init(){
    var oLongitude=document.querySelector('#longitude');//经度
    var oLatitude=document.querySelector('#latitude');//纬度
    //2. 生成地图
    var map = new BMap.Map("mapwrap");
    map.enableScrollWheelZoom();
    //3. 设置当前中心点以及缩放
    var point=new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point,12);
    //marker.setAnimation(BMAP_ANIMATION_BOUNCE);     //运动形式

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var marker = new BMap.Marker(r.point);
            //设置标注点信息
            map.addOverlay(marker);
            map.panTo(r.point);
            //alert('您的位置：'+r.point.lng+','+r.point.lat);
            point = new BMap.Point(r.point.lng,r.point.lat);
            map.centerAndZoom(point,12);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);     //运动形式
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true});
    //单击获取点击的经纬度
    map.addEventListener('click',function(e){
        //alert(e.point.lng+','+e.point.lat);
        oLongitude.value=e.point.lng;
        oLatitude.value=e.point.lat;
        map.clearOverlays();
        var new_point=new BMap.Point(e.point.lng,e.point.lat);
        var marker = new BMap.Marker(new_point);
        map.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    },false)
    //搜索下拉
    //百度地图API功能
    function G(id)
    {
        return document.getElementById(id);
    }
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "suggestId"
            ,"location" : map
        });

    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        setPlace();
    });

    function setPlace(){
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            var marker=new BMap.Marker(pp);
            map.addOverlay(marker);    //添加标注
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }
}
