

/**
 * 
 * ヘッダーページインジケーター
 * 
 */
jQuery('.global-navi__link').each(function(){
    if(this.href == location.href){
        jQuery(this).find('.global-navi__pager').addClass('current');
    }
});

/**
 * 
 * グローバルメニューの開閉
 * 
 */
 const humberger = jQuery('.humberger');
 const menuToggle = jQuery('.global-navi');
 const body = jQuery('body');
 humberger.on('click', function(){
     humberger.toggleClass('menu-active');
     if(humberger.hasClass('menu-active')){
         body.addClass('fixed');
         menuToggle.addClass('menu-open');
     } else {
         body.removeClass('fixed');
         menuToggle.removeClass('menu-open');
     }
 });

/**
 * 
 * メインビジュアルのSwiper設定
 * 
 */
const swiper = jQuery('.swiper-container');
let blogSwiper;
let bannerSwiper0;//バナー上段
let bannerSwiper1;//バナー下段
//Swiperがあるページでのみ実行（エラー回避）
if(swiper){

    ///////Main-visualのSwiper/////////////////////////
    let mySwiper = new Swiper('.main-visual__swiper',{
        autoplay:{
            delay:5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
            reverseDirection: false
        },
        slidesPerView: 'auto',
        speed:1000,
        loop:true,
        // shortSwipes: false,
        // longSwipes: false,
        navigation: {
            nextEl: '.main-next',
            prevEl: '.main-prev'
        },
        pagination:{
            el:'.main-visual__pagination',
            type:'bullets',
            clickable: true
        }
    });
    
    ///////Blog-sectionのSwiper//////////////////////
    jQuery(window).on('load resize', function(){
        //windowの横幅の取得
        let w = jQuery(window).width();
        //横幅が768px以下の時
        if(w <= 768){
            if(blogSwiper) {
                return;
            } else {
                blogSwiper = new Swiper('.blog__swiper',{
                    loop:true,
                    initialSlide: 0,
                    spaceBetween: 32,
                    slidesPerView: 'auto',
                    pagination:{
                        el:'.blog__pagination',
                        type:'bullets',
                        clickable: true
                    }
                });
            }
        } else {
            if(blogSwiper){
                //swiperを消滅させる
                blogSwiper.destroy();
                blogSwiper = undefined;
            }
        }
    });
    
    ///////Banner-sectionのSwiper//////////////////////
     jQuery(window).on('load resize', function(){
         //windowの横幅の取得
         let w = jQuery(window).width();
         //横幅が1199px以下の時
         if(w <= 1199){
             //上段swiperがONになっているとき
             if(bannerSwiper0) {
                //  そのまま返す
                 return;
                 //swiperがOFFになっているとき
             } else {
                 //swiperを設定する
                bannerSwiper0 = new Swiper('.js-banner__swiper0',{
                    loop: true,                    //ループ処理
                    initialSlide: 0,               //最初の要素を先頭にする
                    spaceBetween: 23,              //スライド間の感覚
                    slidesPerView: 'auto',         //1画面内に表示するスライドの数
                    pagination:{                   //ページネーション
                        el:'.banner__pagination0',
                        type:'bullets',            //バレット型
                        clickable: true            //クリックでのスライド遷移を許可する
                    }
                 });
             }
             //上段Swiperと同様の記述
             if(bannerSwiper1) {
                return;
            } else {
               bannerSwiper1 = new Swiper('.js-banner__swiper1',{
                   loop: true,
                   initialSlide: 0,
                   spaceBetween: 23,
                   slidesPerView: 'auto',
                   pagination:{
                       el:'.banner__pagination1',
                       type:'bullets',
                       clickable: true
                   }
                });
            }
         } else {
             //横幅1200px以上で上段SwiperがONになっているとき
             if(bannerSwiper0){
                 //swiperを消滅させる
                 bannerSwiper0.destroy();
                 bannerSwiper0 = undefined;
             }
             //横幅1200px以上で下段SwiperがONになっているとき
             if(bannerSwiper1){
                //swiperを消滅させる
                bannerSwiper1.destroy();
                bannerSwiper1 = undefined;
            }
         }
     });
}


/**
 * 
 * サイドバーランキング表示のラベル
 * 
 * 
 */
const sideMedia = document.querySelectorAll('.sidebar-media-item');
//IE用にNodeListを配列に変換
const sideMediaArray = Array.prototype.slice.call(sideMedia, 0);
sideMediaArray.forEach(function(item, index){
    item.setAttribute('data-item', index + 1);
});

/**
 * 
 * フッターサイトマップの動作
 * 
 * 
 */

//サイトマップの横幅調整
let siteListElm = jQuery('.site-map__list');
jQuery(window).on('load resize', function (){
    //windowの横幅の取得
    let w = jQuery(window).width();
    if(w <= 768){
        if(siteListElm.hasClass('container')){
            return;
        } else {
            siteListElm.addClass('container');
        }
    } else if(w >= 769){
        if(siteListElm.hasClass('container')){
            siteListElm.removeClass('container');
        } else {
            return;
        }
    }
});
//サイトマップの開閉
let accordion = jQuery('.js-accordion');
let siteMap = jQuery('.js-sitemap');
accordion.click(function(){
    if(accordion.hasClass('open')){
        accordion.removeClass('open');
        siteMap.slideUp();
    } else {
        accordion.addClass('open');
        siteMap.slideDown();
    }
});
 
 /**
  * 
  * 先頭へ戻るボタン
  * 
  * 
  */
 jQuery(window).on('scroll', function () {
     if (jQuery(this).scrollTop() > 100) {
         jQuery('.floating').show();
     }
     else {
         jQuery('.floating').hide();
     }
 });
 
 jQuery('.floating').click(function () {
     jQuery('body,html').animate({
         scrollTop: 0
     }, 500);
     return false;
 });
 

/**
 * 
 * 
 * Facebook埋め込み部分のレスポンシブ
 * 
 */
 jQuery(function() {
    // ページプラグインの埋め込みコードを返す
    function pagePluginCode(w) {

        // 幅に応じて高さを変更する場合は、変数 h に高さの値を代入
        if(w > 0 && w <= 268) {
            var h = 286;
        } else if(w > 269 ) {
            var h = 336;
        }

        // 書き換えたStep3のコードを「return」に記述
        return '<div class="fb-page" data-href="https://www.facebook.com/kokosuge/" data-tabs="timeline" data-width="'+ w + '" data-height="' + h + '" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/kokosuge/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/kokosuge/">こ、こすげぇー〈小菅村の総合情報サイト〉</a></blockquote></div>';
    }
 
    // ページプラグインを追加する要素
    var facebookWrap = jQuery('.facebook__body');
    var fbBeforeWidth = ''; // 前回変更したときの幅
    var fbWidth = facebookWrap.width(); // 今回変更する幅
    var fbTimer = false;
    jQuery(window).on('load resize', function() {
        if (fbTimer !== false) {
            clearTimeout(fbTimer);
        }
        fbTimer = setTimeout(function() {
            fbWidth = Math.floor(facebookWrap.width()); // 変更後の幅を取得し、小数点以下切り捨て
            // 前回の幅から変更があった場合のみ処理
            if(fbWidth != fbBeforeWidth) {
                facebookWrap.html(pagePluginCode(fbWidth)); // ページプラグインのコード変更
                window.FB.XFBML.parse(); // ページプラグインの再読み込み
                fbBeforeWidth = fbWidth; // 今回変更分を保存
            }
        }, 200);
    });
});