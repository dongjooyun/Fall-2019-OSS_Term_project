// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`안녕하세요 효율적인 수면패턴을 도와드릴 꿀잠봇 입니다!`);
  }

  function fallback(agent) {
    agent.add(`잘못된 입력값 입니다`);
  }

  //기상시간 입력 및 추천 cycle 반환
  function mytime1(agent) {
    const hour = agent.parameters.hours;
    const min = agent.parameters.minutes;
    const gothour = hour.length > 0;
    const gotmin = min.length > 0;
    var myhour1,myhour2,myhour3,myhour4;
    var mymin1,mymin2,mymin3,mymin4;

    if(Number(min)-30>0){
      const rehour1 = Number(hour)-9;
      const remin1 = Number(min);

      const rehour2 = Number(hour)-7;
      const remin2 = Number(min)-30;

      const rehour3 = Number(hour)-6;
      const remin3 = Number(min);

      const rehour4 = Number(hour)-4;
      const remin4 = Number(min)-30;

      myhour1=rehour1; myhour2=rehour2; myhour3=rehour3; myhour4=rehour4;

      //시간이 -값이 될때 값 설정
      if(myhour1<0){myhour1=24+myhour1;}
      if(myhour2<0){myhour2=24+myhour2;}
      if(myhour3<0){myhour3=24+myhour3;}
      if(myhour4<0){myhour4=24+myhour4;}

      if(mymin1<0){mymin1=60+mymin1;}
      if(mymin2<0){mymin1=60+mymin2;}
      if(mymin3<0){mymin1=60+mymin3;}
      if(mymin4<0){mymin1=60+mymin4;}

    }else if(Number(min)-30<0){
      const rehour1 = Number(hour)-9;
      const remin1 = Number(min);

      const rehour2 = Number(hour)-8;
      const remin2 = Number(min)+30;

      const rehour3 = Number(hour)-6;
      const remin3 = Number(min);

      const rehour4 = Number(hour)-5;
      const remin4 = Number(min)+30;

      myhour1=rehour1; myhour2=rehour2; myhour3=rehour3; myhour4=rehour4;

      //시간이 -값이 될때 값 설정
      if(myhour1<0){myhour1=24+myhour1;}
      if(myhour2<0){myhour2=24+myhour2;}
      if(myhour3<0){myhour3=24+myhour3;}
      if(myhour4<0){myhour4=24+myhour4;}

      if(mymin1<0){mymin1=60+mymin1;}
      if(mymin2<0){mymin1=60+mymin2;}
      if(mymin3<0){mymin1=60+mymin3;}
      if(mymin4<0){mymin1=60+mymin4;}

    }

    if(gothour && gotmin) {
        agent.add(`좋습니다. 당신의 기상시간은 ${hour}시 ${min}분 입니다.`);
      	agent.add(`한 번의 수면 cycle은 1시간 30분 (90분)입니다.\n 당신의 기상시간을 참고한 결과 총 4개의 권장 취침 시간(cycle)이 있습니다.\n 1. ${myhour1}시  ${myhour1}분(6cycle) \n 2. ${myhour2}시  ${myhour2}분(5cycle) \n 3. ${myhour3}시  ${myhour3}분(4cycle) \n 4. ${myhour4}시  ${myhour4}(3cycle)분 \n 원하는 시간에 주무시길 추천드립니다.`);


    } else if (gothour && !gotmin) {
        agent.add('기상시간을 입력해 주세요( 예시 - 6:26 21:40 ) ');
    } else if (gothour && !gothour) {
        agent.add('기상시간을 입력해 주세요( 예시 - 6:26 21:40 ) ');
    } else {
        agent.add('기상시간을 입력해 주세요( 예시 - 6:26 21:40 ) ');
    }
  }

function mytime2(agent) {
   const hour = agent.parameters.hours;
   const min = agent.parameters.minutes;
   const gothour = hour.length > 0;
   const gotmin = min.length > 0;
   var myhour1,myhour2,myhour3,myhour4;
   var mymin1,mymin2,mymin3,mymin4;

   if(Number(min)+30<60){
     const rehour1 = Number(hour)+1;
     const remin1 = Number(min)+30;

     const rehour2 = Number(hour)+6;
     const remin2 = Number(min);

     const rehour3 = Number(hour)+7;
     const remin3 = Number(min)+30;

     const rehour4 = Number(hour)+9;
     const remin4 = Number(min);

     myhour1=rehour1; myhour2=rehour2; myhour3=rehour3; myhour4=rehour4;

      //시간이 -값이 될때 값 설정
      if(myhour1<0){myhour1=24+myhour1;}
      if(myhour2<0){myhour2=24+myhour2;}
      if(myhour3<0){myhour3=24+myhour3;}
      if(myhour4<0){myhour4=24+myhour4;}

      if(mymin1<0){mymin1=60+mymin1;}
      if(mymin2<0){mymin1=60+mymin2;}
      if(mymin3<0){mymin1=60+mymin3;}
      if(mymin4<0){mymin1=60+mymin4;}

   }else if(Number(min)+30>60){
     const rehour1 = Number(hour)+2;
     const remin1 = Number(min)-30;

     const rehour2 = Number(hour)+6;
     const remin2 = Number(min);

     const rehour3 = Number(hour)+8;
     const remin3 = Number(min)-30;

     const rehour4 = Number(hour)+9;
     const remin4 = Number(min);

     myhour1=rehour1; myhour2=rehour2; myhour3=rehour3; myhour4=rehour4;

      //시간이 -값이 될때 값 설정
      if(myhour1<0){myhour1=24+myhour1;}
      if(myhour2<0){myhour2=24+myhour2;}
      if(myhour3<0){myhour3=24+myhour3;}
      if(myhour4<0){myhour4=24+myhour4;}

      if(mymin1<0){mymin1=60+mymin1;}
      if(mymin2<0){mymin1=60+mymin2;}
      if(mymin3<0){mymin1=60+mymin3;}
      if(mymin4<0){mymin1=60+mymin4;}
   }

   if(gothour && gotmin) {
     	agent.add(`좋습니다. 당신의 취침시간은 ${hour}시 ${min}분 입니다.`);
      	agent.add(`한 번의 수면 cycle은 1시간 30분 (90분)입니다.\n 당신의 취침시간을 참고한 결과 총 4개의 권장 기상시간(cycle)이 있습니다.\n 1. ${myhour1}시  ${myhour1}분(6cycle) \n 2. ${myhour2}시  ${myhour2}분(5cycle) \n 3. ${myhour3}시  ${myhour3}분(4cycle) \n 4. ${myhour4}시  ${myhour4}(3cycle)분 \n 원하는 시간에 기상 하시길 추천드립니다.`);

   } else if (gothour && !gotmin) {
       agent.add('취침시간을 입력해 주세요( 예시 - 6:26 21:40 ) ');
   } else if (gothour && !gothour) {
       agent.add('취침시간을 입력해 주세요( 예시 - 6:26 21:40 ) ');
   } else {
       agent.add('취침시간을 입력해 주세요( 예시 - 6:26 21:40 ) ');
   }
 }
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('time',mytime1);
  intentMap.set('time2',mytime2);
  agent.handleRequest(intentMap);
});
