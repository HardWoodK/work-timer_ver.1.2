/* スタートフラグ、時間変数初期化 */
let start = 0, second = 0, minute = 0, hour = 0;

/* 画像リスト取り込み */
const imgList = new Array(
  './picture/fitness1.PNG',
  './picture/fitness2.PNG',
  './picture/fitness3.PNG',
  './picture/fitness4.PNG',
  './picture/fitness5.PNG',
  './picture/fitness6.PNG'
);

const imgList2 = new Array(
  './picture/0分.gif',
  './picture/15分.gif',
  './picture/30分.gif',
  './picture/45分.gif',
  './picture/60分.gif',
  './picture/75分.gif'
);

/* 通知許可ボタンクリック時動作 */
document.getElementById("init-button").onclick = function(){
  Push.create("通知が許可されました");
  document.getElementById("init-button").style.display  ="none";
  document.getElementById("elapse-message").style.display ="block";
  document.getElementById("elapse-box").style.display ="block";
  document.getElementById("elapse-button").style.display ="block";
}

/* 経過時間入力ボタンクリック時動作 */
document.getElementById("elapse-button").onclick = function(){
  var obj = document.getElementById(elapse-box);
  document.getElementById("elapse-message").style.display ="none";
  document.getElementById("elapse-box").style.display ="none";
  document.getElementById("elapse-button").style.display ="none";
  document.getElementById("init-message").style.display ="block";
  document.getElementById("start-button").style.display ="block";
}

/* スタートボタンクリック時動作 */
document.getElementById("start-button").onclick = function(){
  start = 1;
  document.getElementById("init-message").style.display ="none";
  document.getElementById("start-button").style.display ="none";
  document.getElementById("time-block").style.display   ="block";
  document.getElementById("pic").style.display          ="block";
  document.getElementById("reset-button").style.display ="block";
}

/* リスタートボタンクリック時動作 */
document.getElementById("restart-button").onclick = function(){
  start = 1;
  document.getElementById("init-message").style.display   ="none";
  document.getElementById("start-button").style.display   ="none";
  document.getElementById("restart-button").style.display ="none";
  document.getElementById("break").style.display          ="none";
  document.getElementById("break-pic").style.display      ="none";
  document.getElementById("time-block").style.display     ="block";
  document.getElementById("pic").style.display            ="block";
  document.getElementById("reset-button").style.display   ="block";
}

/* リセットボタンクリック時動作 */
document.getElementById("reset-button").onclick = function(){
  start = 0, second = 0, minute = 0, hour = 0;  //スタートフラグ、時間変数初期化
  //スタートボタンテキスト変更
  document.getElementById("break").style.display          ="block";
  document.getElementById("break-pic").style.display      ="block";
  document.getElementById("restart-button").style.display ="block";
  document.getElementById("time-block").style.display     ="none";
  document.getElementById("pic").style.display            ="none";
  document.getElementById("reset-button").style.display   ="none";
}

/* 通知 */
function note(){
  let selectnum = Math.floor(Math.random() * imgList.length);
  Push.create("休憩しましょう！", {
    body: hour + "時間経過しました\n集中力が切れてきてませんか？\n目を休ませて軽く運動をしましょう",
    icon: imgList[selectnum],   //アイコン画像のパス
    // requireInteraction: false,  //勝手に消えない
    timeout: 60*60*1000, //1時間後
    onClick: function () {
        window.focus();
        // location.href = 'https://www.youtube.com/watch?v=sOpJC4mmSHU';
        this.close();
    }
  });
  document.getElementById("pic").src = imgList2[0];
}

/* 初期時間セット */
function elapseSet(){
}

/* 時間計算 & 表示 */
function time(){
  if(start === 1){
    second++;
    if(second % 10 === 0) note();
    if(second === 60){
      minute++;
      second = 0;
    }
    if(minute === 60){
      hour++;
      minute = 0;
      note();
    }
    document.getElementById("time").innerHTML
      = hour + "時間 " + minute + "分 " + second + "秒";
  }
}

/* 1000msec毎にtime関数を実行 */
setInterval("time()", 1000);
