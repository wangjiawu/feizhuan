


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
  });
  $("#sspBar").click(function () {
    $("#sspList").html("");

    getMyLottery("ssq")
  });
  $("#letouBar").click(function () {
    $("#letou").html("");
    getMyLottery("T001")
  });
});

getMyLottery("ssq");//默认双色球
function getMyLottery(lotteryId) {
  $.ajax({
    url: API + "/lottery/getMyLottery.wckj",
    method: 'POST',
    data: {
      outUserId: 10104788,
      lotteryId: lotteryId,
    },
    success(res) {
      console.log(res)

      if (res.resultCode == 10000 && lotteryId == "ssq") {//双色球

        var html = template("ssqTpl", res);
        $("#sspList").append(html)
        res.resultData.forEach(function (item, i) {
          switch (item.result) {
            case 0:
              $(".state" + i + "").html("支付中");
              $(".state" + i + "").addClass("red")
              break;
            case 1:
              $(".state" + i + "").html("已支付")
              $(".state" + i + "").addClass("green")
              break;
            case 2:
              $(".state" + i + "").html("出票中")
              $(".state" + i + "").addClass("green")
              break;
            case 3:
              $(".state" + i + "").html("出票成功")
              $(".state" + i + "").addClass("green")
              break;
            case 4:
              $(".state" + i + "").html("出票失败")
              $(".state" + i + "").addClass("gray")
              break;
            case 5:
              $(".state" + i + "").html("过期关闭")
              $(".state" + i + "").addClass("gray")
              break;
            case 6:
              $(".state" + i + "").html("中小奖，待领取")
              $(".state" + i + "").addClass("red")
              break;
            case 7:
              $(".state" + i + "").html("中大奖")
              $(".state" + i + "").addClass("red")
              break;
            case 8:
              $(".state" + i + "").html("中小奖，领取到账号金额")
              $(".state" + i + "").addClass("green")
              break;
            case 9:
              $(".state" + i + "").html("中小奖，领取到支付宝")
              $(".state" + i + "").addClass("green")
              break;
            case 10:
              $(".state" + i + "").html("领取成功")
              $(".state" + i + "").addClass("green")
              break;
            case 11:
              $(".state" + i + "").html("领取失败")
              $(".state" + i + "").addClass("gray")
              break;
          }

        });
        $(".dd_list").click(function () {

          var proams = $(this).context.innerText;
          var result = $(this).data("id");
          var money = $(this).data("money");
          var moneryh = $(this).data("moneryh");
          var order = $(this).data("order");
          var outTradeNo = $(this).data("out")

          if (result == 6) {
            window.location.href = "caipiaoDetail.html?outTradeNo=" + outTradeNo + "&order=" + order + "&moneryh=" + moneryh + "&money=" + money + "&result=" + proams;
          } else {
            window.location.href = "caipiaoDetail1.html?order=" + order + "&moneryh=" + moneryh + "&money=" + money + "&result=" + proams;
          }
        })

      } else if (res.resultCode == 10000 && lotteryId == "T001") {//大乐透
        var html1 = template("letouTpl", res);
        $("#letou").append(html1);
        res.resultData.forEach(function (item, i) {
          switch (item.result) {
            case 0:
              $(".state" + i + "").html("支付中");
              $(".state" + i + "").addClass("red")
              break;
            case 1:
              $(".state" + i + "").html("已支付")
              $(".state" + i + "").addClass("green")
              break;
            case 2:
              $(".state" + i + "").html("出票中")
              $(".state" + i + "").addClass("green")
              break;
            case 3:
              $(".state" + i + "").html("出票成功")
              $(".state" + i + "").addClass("green")
              break;
            case 4:
              $(".state" + i + "").html("出票失败")
              $(".state" + i + "").addClass("gray")
              break;
            case 5:
              $(".state" + i + "").html("过期关闭")
              $(".state" + i + "").addClass("gray")
              break;
            case 6:
              $(".state" + i + "").html("中小奖，待领取")
              $(".state" + i + "").addClass("red")
              break;
            case 7:
              $(".state" + i + "").html("中大奖")
              $(".state" + i + "").addClass("red")
              break;
            case 8:
              $(".state" + i + "").html("中小奖，领取到账号金额")
              $(".state" + i + "").addClass("green")
              break;
            case 9:
              $(".state" + i + "").html("中小奖，领取到支付宝")
              $(".state" + i + "").addClass("green")
              break;
            case 10:
              $(".state" + i + "").html("领取成功")
              $(".state" + i + "").addClass("green")
              break;
            case 11:
              $(".state" + i + "").html("领取失败")
              $(".state" + i + "").addClass("gray")
              break;
          }

        });
        $(".dd_list").click(function () {

          var proams = $(this).context.innerText;
          var result = $(this).data("id");
          var money = $(this).data("money");
          var moneryh = $(this).data("moneryh");
          var order = $(this).data("order");
          var outTradeNo = $(this).data("out")

          if (result == 6) {
            window.location.href = "caipiaoDetail.html?outTradeNo=" + outTradeNo + "&order=" + order + "&moneryh=" + moneryh + "&money=" + money + "&result=" + proams;
          } else {
            window.location.href = "caipiaoDetail1.html?order=" + order + "&moneryh=" + moneryh + "&money=" + money + "&result=" + proams;
          }
        })
      }

    },
    error(info) {
      console.log(info)
    }
  })
}

