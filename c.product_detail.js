        // 輪播牆
        let nowPage = 0;
        // 不能用const設定需要跑迴圈的變數，因為const的值是固定的，let才可以跑迴圈        
        $('.carousel-control-next').click(function(e){
            console.log('click');
            e.preventDefault();
            // 阻止a連結跳轉頁面的預設行為
            if(nowPage < 4){
                nowPage = nowPage + 1;
            }else{
                nowPage = 0;
            }
            moveX(nowPage);
        })
        $('.carousel-control-prev').click(function(e){
            console.log('click');
            e.preventDefault();
            if(nowPage > 0){
                nowPage = nowPage - 1;
            }else{
                nowPage = 0;
            }
            moveX(nowPage);
        })

        function moveX(nowPage){
            // $('.img-demo img').eq(nowPage).css('opacity','1').siblings().not('.icon_heart').css('opacity','0')
            // 當demo的那一張(eq)圖片透明度1時，他的平輩透明度是0，但也是平輩的愛心透明度不改變（因為icon_heart也是那五張圖的平輩，但是它不能被調整透明度，所以將他寫在siblings之間）

            $('.img-demo img').css('opacity','0').eq(nowPage).css('opacity','1')
        }

        $('.icon_heart').click(function(){
            console.log('.icon_heart clicked');
        })

        $('.icon_favorite').click(function(){
            console.log('icon_heart clicked');
        })

        $('.img-wrap').click(function(){
            console.log('img clicked.', $(this).index());
            nowPage = $(this).index();
            moveX(nowPage);
            
            // console.log('img clicked.', $(this).attr('src'));
            // 滑鼠左鍵點擊事件 .click()
            // 回呼函式 callback function
            // 事件裡面的主角是誰? 誰被點擊了? 可以用 this 來代替
        })

        // 規格表:
        // [功能1] 點擊小圖，大圖要換成小圖的圖片
        // 1.時機點: 點擊小圖的時候 (事件)
        // 2.誰要換圖片? 大圖
        // 3.換成甚麼圖片? 誰被點，就換誰的圖片(抽象)
        // 4.我怎麼知道誰被點? 被點擊的那一刻，瀏覽器會告訴你答案($(this))
        // 5.我可不可以拿到那個被點擊的小圖? 誰被點就拿誰($(this))

        // DO-1.用事件來代表要執行的時間點:
        // $('.img-wrap > img').click(function(){
            // 先實驗換圖片的功能是否能實現。
            // 主詞(大圖):我想改變圖片的那個人是誰?能在這裡得到他嗎?
            // $('.img-demo img').attr('src', './imgs/product5.jpg');

            // DO-1-1.拿到被點擊的小圖
            // console.log('img clicked.', $(this).attr('src'));
            // const imgClickedSrc = $(this).attr('src');
            // DO-1-2.修改 DEMO 的大圖
            // $('.img-demo img').attr('src', imgClickedSrc);
        // })

        // ----------------小換大結束-------------------

        $(window).scroll(function () {
            if ($(window).scrollTop() >= ($('.detail_box').offset().top)) {
                // 視窗超過detail_box就出現undernav
                $('.undernav').css({
                    transform: 'translateY(0px)',
                    opacity: 1,
                    transition: '.5s',
                });
        
            }
            else {
                $('.undernav').css({
                    // 這兩個在原本的css就要下，不然第一次打開還是會出現
                    transform: 'translateY(40px)',
                    opacity: 0,
                });
            };
        
        });

        // ----------------訂購數量和總額-------------------
        // 1.按+的時候input的value++
        // 2.按-的時候input的value-1
        // 3.當value的值是1時，-的按鈕是灰色，且不能再向下減
        // 4.當value的值不是1時，-的按鈕是咖啡色
        // 5.按下購買按鈕後，會記住按過的值跳轉到結帳頁面`→記在參數/記在session傳給後端(要再寫一支PHP)/記在localstorage(結帳頁面要來localstorage)
        
        const minusBtn = $('button.minus');
        const plusBtn = $('button.plus');
        const productDiv = $('.product_q');

        plusBtn.on('click', function(){
            // 可以用function也可以用箭頭函式，用箭頭函不能用this
            let num = +productDiv.html();
            // +productDiv.html()→將.people裡面的文字轉換為數值，原生的用法是將.html()改成.innerText()
            productDiv.html(num+1);
            minusBtn.removeClass('disabled');
        });

        minusBtn.on('click', function(){
            let num = +productDiv.html();
            if(num>1){
                productDiv.html(num-1);
            }
            num = +productDiv.html();
            //為了知道值到底是多少，所以要呼叫num = +productDiv.html();
            if(num===1){
                minusBtn.addClass('disabled');
            }
        });

        // ----------------下方列結束-------------------

        // 愛心變色列表頁做好了

$('.icon_heart').click(function(){
    $('.heart_line').toggleClass('color')
});

// ??按收藏後真的進入收藏頁面&沒登入會跳出提示窗


// 側邊欄到該區域要變色
const sectionsOffsetTop = [];
// 1.先設空值取陣列

// $('.details > div').eq(0).offset().top
// 2.選.details中第一個DIV距離視窗頂端的高度。不選id是因為要跑迴圈，id都是固定的事就不能跑只能寫死，如果不寫.details > div，只寫.details div會連孫層也一起找到

// sectionsOffsetTop.push($('.details > div').eq(0).offset().top)
// 3. .push是將離視窗頂端高度的值放進原本設定的空陣列中

// sectionsOffsetTop.push($('.details > div').eq(1).offset().top)
// sectionsOffsetTop.push($('.details > div').eq(2).offset().top)
// sectionsOffsetTop.push($('.details > div').eq(3).offset().top)

for(let i = 0; i < 4; i ++){
    sectionsOffsetTop.push($('.details > div').eq(i).offset().top)
}
// 4.重複的部分就可以寫成迴圈（好神奇），將.details中第i個DIV距離視窗頂端高度的值放入陣列中

// console.log('sectionsOffsetTop array:',sectionsOffsetTop);
// 5. 印出來看陣列有沒有跑出那四個陣列的值

// console.log('sectionsOffsetTop array:',sectionsOffsetTop[0]);
// 6. 取得陣列中的第一個值只要在後面加[0]，索引值從0開始算第一個


// $('.links a').eq(3).css('color','red')
// 7.測試看看將最後一個連結改成紅色看看有沒有成功

$(window).scroll(function () {
        const nowScroll = $(window).scrollTop();
        // console.log(' now scroll', nowScroll);
        // 8.現在捲動的值是該區域離視窗頂部的值
        // if(nowScroll >= sectionsOffsetTop[0]){
        //     $('.links a').eq(0).css('color','red').siblings().css('color','black')
        // }
        // 9.如果現在捲動的值大於等於選.details中第一個DIV距離視窗頂端的高度，.links的第一個連結就變紅色，他的平輩都變黑色


        // if(nowScroll >= sectionsOffsetTop[1]){
        //     $('.links a').eq(1).css('color','red').siblings().css('color','black')
        // }
        // 10.如果現在捲動的值大於等於選.details中第二個DIV距離視窗頂端的高度，.links的第一個連結就變紅色，他的平輩都變黑色
        // 重複的地方就可以做迴圈
        for(let i = 0; i < 4; i++){
            if(nowScroll >= sectionsOffsetTop[i]){
                $('.links a').eq(i).css('color','var(--color-orange)').siblings().css('color','var(--color-text87)')
        // 11.當視窗捲動範圍大於等於選.details中第i個DIV距離視窗頂端的高度，.links的第一個連結就變橘色，他的平輩都變棕色
            }
        }
    }
)