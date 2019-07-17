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
// let output = './picture/bad.png';
// let output = <img src = imgList[selectnum]>;

/* スタートボタンクリック時動作 */
document.getElementById("start-button").onclick = function(){
  start = 1;    //スタートフラグON
  //スタートボタンテキスト変更
  document.getElementById("start-text").innerHTML = "仕事なう";
}

/* リセットボタンクリック時動作 */
document.getElementById("reset-button").onclick = function(){
  start = 0, second = 0, minute = 0, hour = 0;  //スタートフラグ、時間変数初期化
  //スタートボタンテキスト変更
  document.getElementById("start-text").innerHTML = "クリックで業務開始";
  //時間テキスト変更
  document.getElementById("time").innerHTML       = "-";
}

/* 通知許可ボタンクリック時動作 */
document.getElementById("init-button").onclick = function(){
  Push.create("通知が許可されました")
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
  document.getElementById("pic").src = imgList[selectnum];
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
