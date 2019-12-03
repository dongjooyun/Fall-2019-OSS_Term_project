var express = require('express');
var app = express();
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'L+RJ15lZgeSoWgeHf9BqgEhm8lYh11qALzPlDV85VGXHfmiKqj3CX1V9DvqakFeJqwWgfQRejsUIWqf/kJuTLQcRC5ws2pyJJbr0VFEXptoYicgiRDzuA51W91dTcFL6/olvLNS1zAf1xO2wxpTGvQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e8e139b4cf31d22ed234d62a9b336e74',
};


// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(200).end();
    });
});

// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    return new Promise(function (resolve, reject) {
        //내가 짠 것
        function getup(shour, smin, ampm) {//몇시에 자려고 할 때 언제 일어나면 좋을지
            if (shour != '(hour)' && smin != '(minute)') {
                ; //탈출
                var setTime = new Date();

            if (shour == 12) {
                shour = 0;
            }

            if (ampm == "AM") {
                setTime.setHours(shour);
            }
            else if (ampm == "PM") {
                setTime.setHours(shour + 12);
            }

            setTime.setMinutes(smin);

            var res1 = new Date(setTime.getTime() - 270 * 60000);
            var res2 = new Date(res1.getTime() - 90 * 60000);
            var res3 = new Date(res2.getTime() - 90 * 60000);
            var res4 = new Date(res3.getTime() - 90 * 60000);

            function retDate(dateObj) {
                var formatted = '';
                var pm = false;
                if (dateObj.getHours() > 12) {
                    formatted = dateObj.getHours() - 12;
                    pm = true;
                } 
                else if (dateObj.getHours() < 12 && dateObj.getHours() != 0) {
                    formatted = dateObj.getHours();
                } 
                else if (dateObj.getHours() == 0) {
                    formatted = "12";
                } 
                else if (dateObj.getHours() == 12) {
                    formatted = "12";
                    pm = true;
                }

                if (dateObj.getMinutes() < 10) {
                    formatted = formatted + ":0" + dateObj.getMinutes();
                } 
                else {
                    formatted = formatted + ":" + dateObj.getMinutes();
                }

                if (pm == true) {
                    formatted = formatted + " PM";
                } 
                else {
                    formatted = formatted + " AM";
                }
                return formatted;
            }

            console.log(String(retDate(res1)));
            console.log(String(retDate(res2)));
            console.log(String(retDate(res3)));
            console.log(String(retDate(res4)));

            $('#results').fadeIn();
            $('#feedback').fadeIn();
            $('#ad').fadeIn();
        } // end hour/minute check if
        else {
            alert("Please select an hour and a minute before trying to calculate!");
        } // end not-filled check
    };// end calculate
})};


function sleep(ghour, gmin, ampm) { //몇시에 일어나려고 할 때 언제 자면 좋을지
    //$('#start').hide();
    var zDate = new Date();

    var res1 = new Date(zDate.getTime() + 104*60000);
    var res2 = new Date(res1.getTime() + 90*60000);
    var res3 = new Date(res2.getTime() + 90*60000);
    var res4 = new Date(res3.getTime() + 90*60000);
    var res5 = new Date(res4.getTime() + 90*60000);
    var res6 = new Date(res5.getTime() + 90*60000);

    function retDate(dateObj) {
        var formatted = '';
        var pm = false;
        if(dateObj.getHours() > 12) {
            formatted = dateObj.getHours() - 12;
            pm = true;
        } else if(dateObj.getHours() < 12 && dateObj.getHours() != 0) {
            formatted = dateObj.getHours();
        } else if(dateObj.getHours() == 0) {
            formatted = "12";
        } else if(dateObj.getHours() == 12) {
            formatted = "12";
            pm = true;
        }
        if(dateObj.getMinutes() < 10) {
            formatted = formatted + ":0" + dateObj.getMinutes();
        } else {
            formatted = formatted + ":" + dateObj.getMinutes();
        }
        if(pm == true) {
            formatted = formatted + " PM";
        } else {
            formatted = formatted + " AM";
        }
        return formatted;
    }

    console.log(String(retDate(res1)));
    console.log(String(retDate(res2)));
    console.log(String(retDate(res3)));
    console.log(String(retDate(res4)));
    console.log(String(retDate(res5)));
    console.log(String(retDate(res6)));
			
    $('#resultsNow').fadeIn();
    $('#feedback').fadeIn();
    $('#ad').fadeIn();
});
});
/*
    //언어 감지 option
    var detect_options = {
      url : languagedetect_api_url,
      form : {'query': event.message.text},
      headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
    };

    //papago 언어 감지
    request.post(detect_options,function(error,response,body){
      console.log(response.statusCode);
      if(!error && response.statusCode == 200){
        var detect_body = JSON.parse(response.body);
        var source = '';
        var target = '';
        var result = { type: 'text', text:''};

        //언어 감지가 제대로 됐는지 확인
        console.log(detect_body.langCode);


        //번역은 한국어->영어 / 영어->한국어만 지원
        if(detect_body.langCode == 'ko'||detect_body.langCode == 'en'){
          source = detect_body.langCode == 'ko' ? 'ko':'en';
          target = source == 'ko' ? 'en':'ko';
          //papago 번역 option
          var options = {
              url:  translate_api_url,
              // 한국어(source : ko), 영어(target: en), 카톡에서 받는 메시지(text)
              form: {'source':source, 'target':target, 'text':event.message.text},
              headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
          };

          // Naver Post API
          request.post(options, function(error, response, body){
              // Translate API Sucess
              if(!error && response.statusCode == 200){
                  // JSON
                  var objBody = JSON.parse(response.body);
                  // Message 잘 찍히는지 확인

                  result.text = objBody.message.result.translatedText;
                  console.log(result.text);
                  //번역된 문장 보내기
                  client.replyMessage(event.replyToken,result).then(resolve).catch(reject);
              }
          });
        }
        // 메시지의 언어가 영어 또는 한국어가 아닐 경우
        else{
          result.text = '언어를 감지할 수 없습니다. \n 번역 언어는 한글 또는 영어만 가능합니다.';
          client.replyMessage(event.replyToken,result).then(resolve).catch(reject);
        }

      }

    });
*/
  

app.listen(3000, function () {
  console.log('Linebot listening on port 3000!');
});
