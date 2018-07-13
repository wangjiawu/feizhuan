
$(function () {
  if ($(".selectWay ul li").eq(0).hasClass("active")) {
    $(".tab_inp").hide()
  } else {
    $(".tab_inp").show()

  }
  $('.btn_item').click(function () {
    $('.btn_item').removeClass('active');
    $('.list_item').removeClass('on');
    $(this).addClass('active');
    $('.list_item').eq($(this).index()).addClass('on');
  });

  $('.selectWay ul li').click(function () {
    $('.selectWay ul li').removeClass('active');
    $(this).addClass('active');
    if ($(".selectWay ul li").eq(0).hasClass("active")) {
      $(".tab_inp").hide()
    } else {
      $(".tab_inp").show()

    }
  })
});

function GetRequest() {
  var url = decodeURI(location.search); //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);

    strs = str.split("&");

    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
var a = GetRequest();


var result = {}
var length = a.result.slice(23).length / 14

result['date'] = a.result.slice(0, a.result.indexOf("]") + 1);
result['stats'] = a.result.slice(16, 23);
result['code'] = [];
result['code'].length = length;
for (var i = 0; i < length; i++) {
  result['code'][i] = a.result.slice(23 + (i * 14), 37 + (i * 14))
}

a.result = result
// console.log(a)

var html = template("resultTpl", a)
$("#container_ul").html(html)

$(".monery").html(a.money);
$(".moneryh").html(a.moneryh);
$(".order_code").html(a.order)

$(".submit").click(function () {
  var order = $(".order_code").html();
  var out = $(".result").data("id");
  var state = $(".selectWay li.active span").data("sates")
  if (state == 9) {
    var name = $(".name").val();
    var num = $(".account").val();
    if (name && num) {
      applyCash(order, out, state, name, num)
    } else {
      alert("请输入正确的支付宝账号及姓名")
    }

  } else {
    applyCash(order, out, state)
  }

})
// tradeNo  彩票平台订单号
// outTradeNo  合作商订单号
// state  订单状态 8：中小奖，领取到账号金额，9：中小奖，领取到支付宝
function applyCash(tradeNo, outTradeNo, state, alipayAccount, alipayName) {
  $.ajax({
    url: API + "/lottery/getMyLotteryResult.wckj",
    method: "post",
    data: {
      "tradeNo": tradeNo,
      "outTradeNo": outTradeNo,
      "state": state,
      "t": "1528940321003",
      "uuid": "99000708107109",
      "v": "V1.2.0",
      "h": "85c57f0862c7a316a09b1f60b50bcf05",
      "c": "A0000",
      "alipayAccount": alipayAccount,
      "alipayName": alipayName
    },
    dataType: "json",
    success(res) {
      // console.log(res)
      if (res.resultCode == 10000) {
        alert("提交成功")
      }
    },
    error(info) {
      console.log(info)
    }

  })
}