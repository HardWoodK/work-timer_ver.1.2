/* スタートフラグ、時間変数初期化 */
let start = 0, second = 0, minute = 0, hour = 0;
let imgNumber = 0; let imgNumberZ = 0;

/* fitness画像 */
const imgList = new Array(
  './picture/fitness/fitness.PNG',  './picture/fitness/fitness1.PNG',
  './picture/fitness/fitness2.PNG', './picture/fitness/fitness3.PNG',
  './picture/fitness/fitness4.PNG', './picture/fitness/fitness5.PNG',
  './picture/fitness/fitness6.PNG'
);

/* 遷移画像 */
const imgList2 = new Array(
  './picture/chart/00分.jpg',
  './picture/chart/00分.jpg', './picture/chart/10分.gif',
  './picture/chart/15分.gif', './picture/chart/20分.gif',
  './picture/chart/25分.gif', './picture/chart/30分.gif',
  './picture/chart/35分.gif', './picture/chart/40分.gif',
  './picture/chart/45分.gif', './picture/chart/50分.gif',
  './picture/chart/55分.gif', './picture/chart/60分.gif'
);

/* 遷移画像 */
const imgList3 = new Array(
  './picture/face/face_good.png',
  './picture/face/face_normal.png',
  './picture/face/face_bad.png',
  './picture/face/face_sobad.png'
);

/* 通知許可ボタンクリック時動作 */
document.getElementById("init-button").onclick = function(){
  Push.create("通知が許可されました");
  document.getElementById("init-button").style.display  ="none";
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

/* リスタートボタンクリック時動作 */
document.getElementById("restart-button").onclick = function(){
  start = 1;
  document.getElementById("time").innerHTML
    = hour + "時間 " + minute + "分 " + second + "秒";
  document.getElementById("init-message").style.display   ="none";
  document.getElementById("start-button").style.display   ="none";
  document.getElementById("restart-button").style.display ="none";
  document.getElementById("break").style.display          ="none";
  document.getElementById("break-pic").style.display      ="none";
  document.getElementById("time-block").style.display     ="block";
  document.getElementById("pic").style.display            ="block";
  document.getElementById("reset-button").style.display   ="block";
}

/* 通知 */
function note(){
  // let selectnum = Math.floor(Math.random() * imgList.length);
  Push.create("休憩しましょう！", {
    body: hour + "時間経過しました\n集中力が切れてきてませんか？\n目を休ませて軽く運動をしましょう",
    icon: imgList[selectnum],   //アイコン画像のパス
    timeout: 6000, //1時間後
    onClick: function () {
        // window.focus();
        this.close();
    }
  });
}

/* 時間計算 & 表示 */
function time(){
  if(start === 1){
    second++;
    if(second === 60){
      minute++;
      second = 0;
    }
    if(minute === 60){
      hour++;
      minute = 0;
    }

    // 遷移画像表示タイミング
    imgNumberZ = imgNumber;
    imgNumber = parseInt(minute / 5);
    // imgNumber = parseInt(second / 5);
    if(imgNumber != imgNumberZ){
      if(hour == 0){
        document.getElementById("pic").src = imgList2[imgNumber];
      }
    }

    //通知表示タイミング
    if(second == 0 && minute == 30 && hour == 0){
    // if(second == 30){
      Push.create("30分経過しました！", {
        body: "1〜2分の休憩を取りましょう",
        icon: imgList3[0],   //アイコン画像のパス
        timeout: 6000, //1時間後
        onClick: function () {
            this.close();
        }
      });
    }
    if(second == 0 && minute == 45 && hour == 0){
    // if(second == 45){
      Push.create("45分経過しました！", {
        body: "そろそろ集中力が切れてきてませんか？",
        icon: imgList3[1],   //アイコン画像のパス
        timeout: 6000, //1時間後
        onClick: function () {
            this.close();
        }
      });
    }
    if(second == 0 && minute == 0 && hour == 1){
    // if(second == 0 && minute == 1){
      Push.create("1時間経過しました！", {
        body: "10〜15分の休憩を取りましょう",
        icon: imgList3[2],   //アイコン画像のパス
        timeout: 6000, //1時間後
        onClick: function () {
            this.close();
        }
      });
    }else if(second == 0 && minute % 15 == 0 && hour == 1){
      Push.create("1時間以上連続VDT作業をしています", {
        body: "少し休憩を取ったほうが効率的に働けます",
        icon: imgList3[3],   //アイコン画像のパス
        timeout: 6000, //1時間後
        onClick: function () {
            this.close();
        }
      });
    }

    //時間表示
    document.getElementById("time").innerHTML
    = hour + "時間 " + minute + "分 " + second + "秒";
  }
}

/* 1000msec毎にtime関数を実行 */
setInterval("time()", 1000);
