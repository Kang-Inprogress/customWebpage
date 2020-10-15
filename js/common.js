$(function(){
  /*로그인 버튼*/
  $(".login_wrap > a").on("click", function() {
    $("#login_f").animate({top: "20px"}, 500);
    return false; // 링크된 요소를 클릭했을 때 이동되지 않도록 막는다
  });

  // '로그인버튼'이나 'close'버튼을 클릭했을때 이벤트 발생
  $(".login_wrap .login_close_btn, input[alt='로그인버튼']").on("click", function() {
    $("#login_f").animate({top: "-500px"}, 500);
    return false;
  });

  $("#user_id, #user_pw").on("focus", function() {
    $(this).prev().css("left", "-9999px"); // focus된 label요소를 왼쪽으로 -9999를 옮겨서 감춤
    // $(this).prev().animate({opacity: 0}, 1000); 
  });

  $("#user_id, #user_pw").on("blur", function() {
    if ($(this).val() == "") {
      $(this).prev().css("left", "2px");
      // $(this).prev().animate({opacity: 1}, 1000); 애니메이션으로 감추는것도 나쁘지않은듯!
    }
  });

  /*zoom 버튼*/
  var base = 100; // 확대 비율 초기값
  var mybody = $("body");
  $("#zoom a").on("click", function() {
    var zNum = $("#zoom a").index(this); // click 이벤트를 등록한 a 태그중, 클릭한 a의 인덱스 반환
    if (zNum == 0) base += 10;
    else if (zNum == 1) base = 100;
    else if (zNum == 2) base -= 10;
    else console.log("Error");
    // base값 조정시 바로 적용
    mybody
    .css("overflow-x", "auto")
    .css("transform-origin", "0 0")
    .css("transform", "scale(" + (base / 100) + ")") // scale()안의 값(정수)만큼의 배가 된다. 2라면 2배
    .css("zoom", base + "%");
    
    return false; // <a>태그의 링크 전환 차단
  });

  /*프린트 버튼*/
  $(".print_btn").on("click", function() {
    window.print();
    return false;
  });
   
  /*검색 창 안내 가이드*/
  $("#keyword").on({
    "focus" : function() {
      $(this).css("background-position", "0 -500px");
    }, "blur" : function() {
      if($(this).val() == "") $(this).css("background-position", "0 0");
    }
  });
  // $("#keyword").on("focus", function() {
  //   $(this).css("background-position", "0 -500px");
  // }).on("blur", function() {
  //   if ($(this).val() == "") $(this).css("background-position", "0 0");
  // }); // 애니메이션으로 사라지게 해도됨

  /*GNB메뉴*/
  var beforeEl;
  $("#gnb > li > a").on("mouseover focuse", function() {
    if (beforeEl) { // beforeEl에 요소가 있다면
      beforeEl.children("img").attr("src", 
      beforeEl.children("img").attr("src").replace("over.gif", "out.gif"));
      // 변수에 할당된 요소의 자식 요소인 <img>태그의 src 속성값 중에 "over.gif"를 "out.gif"로 치환한다
    }
    $("#gnb ul:visible").slideUp("fast"); // <ul> 태그 중 펼쳐져 보이는 메뉴가 있으면 숨긴다
    // + 숨길것 다 숨겼으니 정상작동 시킨다.
    // mouseover 또는 focus 된 <a> 태그에 하위 <img> 태그의 src 속성값 중에 out.gif가 over.gif로 치환된다
    $("img", this).attr("src", $("img", this).attr("src").replace("out.gif", "over.gif"));

    // mouseover 또는 focus 이벤트가 발생한 <a> 태그 다음에 오는 서브 메뉴인 <ul>태그가 아래로 펼쳐지며 나타난다
    $(this).next().stop().slideDown("normal"); 

    beforeEl = $(this); // 마우스를 올린 상위 메뉴에 <a>태그를 정한다
  });

  $("#gnb").on("mouseleave blur", function() {
    $("#gnb ul:visible").slideUp("fast");
    if(beforeEl) beforeEl.children("img").attr("src", beforeEl.children("img").attr("src").replace("over.gif", "out.gif"));
  });

  /*전체메뉴*/
  $("#total_btn").on("click", function() {
    $("#total_menu").slideDown("normal");
    $("img", this).attr("src", $("img", this).attr("src").replace("out.gif", "over.gif"));
    return false;
  });

  /*전체 메뉴 닫기 버튼*/
  $("#total_close a").on("click", function() {
    $("#total_menu").slideUp("fast");
    $("#total_btn a img").attr("src", $("#total_btn a img").attr("src").replace("over.gif", "out.gif"));
    return false;
  });

  /*날짜 표기*/
  var t = new Date();
  var y = t.getFullYear();
  var m = t.getMonth();
  var d = t.getDate();
  
  $("#date_wrap .year").text(y);
  $("#date_wrap .month").text(m+1);
  $("#date_wrap .date").text(d);
   /*관련 사이트 이동*/
   

  /*퀵메뉴*/
  var defaultTop = parseInt($("#quick_menu").css("top")); //기본 문서 상단에서 퀵 메뉴가 생성된 top으로 부터의 위치를 구한다
  $(window).on("scroll", function() {
    var scv = $(window).scrollTop(); // 스크롤바 상단으로부터 이동한 거리를 scv에 할당함
    // scv: 움직인 px, defaultTop: 원래 벌려놓은 간격
    // 스크롤바가 이동될때마다 앞서 진행되고 있는 애니메이션을 stop()으로 끊어내고, 새로 할당한 애니메이션을 실행시킨다
    $("#quick_menu").stop().animate({top: scv + defaultTop + "px"}, 1000);
  });
});