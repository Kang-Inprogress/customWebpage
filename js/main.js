$(function(){
  /*터치 슬라이드 비쥬얼 영역*/
   window.mySwipe = $("#mySwipe").Swipe({
     auto: 3000, // 3초간격 배너 이동
     continuous: true, // 반복해서 롤링
     callback: function(index, element) { // index: 이동된 배너의 index값, element: 이동된 배너 요소
      $(".touch_bullet .active")
      .attr("src", $(".touch_bullet .active").attr("src").replace("on.png", "off.png"))
      .removeClass("active");

      // 인덱스에 해당하는 불릿 버튼을 활성화된 버튼으로 만들고, active 클래스를 생성한다
      $(".touch_bullet img").eq(index).attr("src",  // 노출된 배너의 index값에 불릿 버튼의 이미지를 선택
      $(".touch_bullet img").eq(index).attr("src").replace("off.png", "on.png")) // 선택된 불릿 이미지로 바꾸어준다
      .addClass("active"); // 클래스 추가
     }
   }).data("Swipe");
    
    
  /*비쥬얼 이전, 다음 버튼*/
  $(".touch_left_btn a").on("click", function() {
    mySwipe.prev(); // 이전배너로 이동
    return false; // 이미지(<a>태그 안의) 링크 차단
  });
  $(".touch_right_btn a").on("click", function() {
    mySwipe.next();
    return false;
  });
        
  /*롤링 버튼 배너*/
  $("#roll_banner_wrap dd").not(":first").hide(); // 첫째배너 버튼은 활성화가 되어 있으므로, 첫째배너를 제외하고는 모두 숨긴다
  var onBtn = $("#roll_banner_wrap dt a:first"); // 첫째배너 버튼 변수저장
  
  $("#roll_banner_wrap dt a").on("click", function() { // 1~4번 배너 버튼 클릭시
    $("#roll_banner_wrap dd:visible").hide(); // 현재 노출되어 있는 배너를 숨기고
    $("img", onBtn).attr("src", $("img", onBtn).attr("src").replace("over.gif", "out.gif"));
    
    var num = $("#roll_banner_wrap dt a").index(this);
    $("#roll_banner_wrap dd").eq(num).show(); // 클릭한 배너 버튼의 index에 해당하는 배너를 띄운다(show <-> hide)
    $("img", this).attr("src", $("img", this).attr("src").replace("out.gif", "over.gif"));
    
    onBtn = $(this);
    return false; // 버튼은 <a>로 감싸져 있으니 링크 차단
  });
    
  $(".playBtn").on("click", function() {
    clearTimeout(auto1);
    auto1 = setTimeout(autoPlay, 1000);

    $("img", this).attr("src", $("img", this).attr("src").replace("off.gif", "on.gif"));

    $(".stopBtn img").attr("src", $(".stopBtn img").attr("src").replace("on.gif", "off.gif"));
    return false;
  });

  $(".stopBtn").on("click", function() {
    clearTimeout(auto1);

    $("img", this).attr("src", $("img", this).attr("src").replace("off.gif", "on.gif"));
    $(".playBtn img").attr("src", $(".playBtn img").attr("src").replace("on.gif", "off.gif"));

    return false;
  })
  
  var btnNum = 0;
  function autoPlay() {
    btnNum++;
    if (btnNum >= 4) btnNum = 0;
    $("#roll_banner_wrap dt a").eq(btnNum).trigger("click");
    auto1 = setTimeout(autoPlay, 4000);
  }
  var auto1 = setTimeout(autoPlay, 3000); // auto1의 초기 설정 3초후 autoPlay()를 호출한다
  
  /*탭메뉴*/
  var onTab = $("#tabmenu dt a:first"); // 초기화로 첫번째 탭 메뉴를 넣었다

  $("#tabmenu dt a").on("mouseover focus click", function() {
    $("#tabmenu dd:visible").hide();
    $("img", onTab).attr("src", $("img", onTab).attr("src").replace("over.gif", "out.gif"));

    $(this).parent().next().show(); // 이벤트의 부모요소(dt) 다음 요소(dd)를 보여준다
    $("img", this).attr("src", $("img", this).attr("src").replace("out.gif", "over.gif")); // 버튼 활성화 이미지를 띄움
    
    onTab = $(this); // 함수의 마지막에 onTab변수를 갱신해주고 종료
    return false;
  });

  /* 베스트북 슬라이더 */
    var mySlider = $("#best_bg ul").bxSlider({
      mode: "horizontal",
      speed: 500,
      pager: false,
      moveSlides: 1,
      slideWidth: 125,
      minSlides: 5,
      maxSlides: 5,
      slideMargin: 30,
      auto: true,
      autoHover: true,
      controls: false
    });

    $(".prev_btn").on("click", function() {
      mySlider.goToprevSlide();
      return false;
    });

    $(".next_btn").on("click", function() {
      mySlider.goToNextSlide();
      return false;
    });

   /*팝업 연동*/
  if ($.cookie("pop") != "no") $("#pop_wrap").show();
  $("#pop_wrap").css("cursor", "move").draggable();

  $("#pop_wrap area:eq(0)").on("click", function(){
    $("#pop_wrap").fadeOut("fast");
    return false;
  });

  $("#pop_wrap area:eq(1)").on("click", function() {
    $.cookie("pop", "no", {expires: 1});
    $("#pop_wrap").fadeOut("fast");
    return false;
  })
});