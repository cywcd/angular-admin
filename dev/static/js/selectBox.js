//下拉单选
;$(function(){
	$(".selectBox").on("click",function(e){
		
		var _this = $(this);
		var ul = _this.find("ul");
		if(ul.is(":hidden")){
            $(".selectBox").removeClass("selectBoxBorder").find("i").removeClass("selectBoxB").addClass("selectBoxI");
            $(".selectBox ul").hide();
			_this.addClass("selectBoxBorder");
			_this.find("i").addClass("selectBoxB").removeClass("selectBoxI");
			ul.show();
		}else{
			_this.removeClass("selectBoxBorder");
			_this.find("i").removeClass("selectBoxB").addClass("selectBoxI");
			ul.hide();
		}
	});
	$(".selectBox").on("click","ul",function(e){
		e.stopPropagation();
	});
	$(".selectBox input").on("ifClicked",function(e){
		var _this = $(this);
		$(".selectBox li").removeClass("blue1");
		_this.parents("li").toggleClass("blue1");

		var text = _this.parents("li").find("label span").html();
		$(this).parents(".selectBox").find(".tit").html(text);
		$(this).parents(".selectBox").click();
		$(this).parents(".selectBox ").css("color","black");
	});
	$(".selectBox li").on("click",function(e){
		var _this = $(this);
		_this.find("input").trigger("ifClicked").iCheck('toggle');
	});

    $(document).on("click",function (e) {
        var target = $(e.target);
        if(target.closest(".selectBox").length == 0){
             $(".selectBox ul").hide();
             $(".selectBox").removeClass("selectBoxBorder").find("i").removeClass("selectBoxB").addClass("selectBoxI");
        }
    });
    $(".selectBox").each(function () {
        $(this).find("li").each(function(){
            if($(this).find("input").prop("checked")==true){
                $(this).trigger("click").trigger("click");
            }
        });
    });
});
