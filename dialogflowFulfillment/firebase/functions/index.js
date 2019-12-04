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
    agent.add(`안녕하세요! 당신의 꿀잠을 책임져 드릴 꿀잠봇입니다:) \n
기상시간 또는 취침시간을 입력해 주세요! \n
기상시간을 입력하실 경우 취침시간을, 취침시간을 입력하실 경우 기상시간을 추천드립니다:) \n

아래의 예시대로 채팅을 입력해 주세요 \n
기상시간 입력 예시 :  기상 07:30 또는 기상 07시30분 \n
취침시간 입력 예시 :  취침 22:30 또는 기상 22시30분 \n`);
  }

  //기상시간 입력 및 추천 cycle 반환
  function mytime1(agent) {
    const hour = agent.parameters['number-integer'];
    const min = agent.parameters['number-integer1'];
    const gothour = String(hour).length > 0;
    const gotmin = String(min).length > 0;
    const sethour = 0<=hour && hour<=24;
    const setmin = 0<=min && min<=59;
    var myhour1,myhour2, myhour3,myhour4,mymin1,mymin2,mymin3,mymin4;

    if(min-30>=0){
      myhour1 = Number(hour)-9;
      mymin1 = Number(min);

      myhour2 = Number(hour)-7;
      mymin2 = Number(min)-30;

      myhour3 = Number(hour)-6;
      mymin3 = Number(min);

      myhour4 = Number(hour)-4;
      mymin4 = Number(min)-30;

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
      myhour1 = Number(hour)-9;
      mymin1 = Number(min);

      myhour2 = Number(hour)-8;
      mymin2 = Number(min)+30;

      myhour3 = Number(hour)-6;
      mymin3 = Number(min);

      myhour4 = Number(hour)-5;
      mymin4 = Number(min)+30;

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

    if(gothour && gotmin && sethour && setmin) {
        agent.add(`입력하신 기상시간은 ${hour}시 ${min}분 입니다.`);
      	agent.add(`한 번의 수면 cycle은 1시간 30분 (90분)입니다.\n 당신의 기상시간을 참고한 결과 총 4개의 권장 취침 시간(cycle)이 있습니다.\n 1. ${myhour1}시  ${mymin1}분(6cycle) \n 2. ${myhour2}시  ${mymin2}분(5cycle) \n 3. ${myhour3}시  ${mymin3}분(4cycle) \n 4. ${myhour4}시  ${mymin4}분(3cycle) \n 원하는 시간에 주무시길 추천드립니다.`);
   		agent.add(`꿀잠 주무시길 바랄게요:)`);
    } else {
        agent.add(`아래의 예시대로 채팅을 입력해 주세요 \n
기상시간 입력 예시 :  기상 07:30 또는 기상 07시30분 \n
취침시간 입력 예시 :  취침 22:30 또는 기상 22시30분 \n`);
    }
  }

function mytime2(agent) {
   const hour = agent.parameters['number-integer'];
    const min = agent.parameters['number-integer1'];
    const gothour = String(hour).length > 0;
    const gotmin = String(min).length > 0;
    const sethour = 0<=hour && hour<=24;
    const setmin = 0<=min && min<=59;
    var myhour1,myhour2, myhour3,myhour4,mymin1,mymin2,mymin3,mymin4;

    if(min+30<=60){
      myhour1 = Number(hour)+1;
      mymin1 = Number(min)+30;

      myhour2 = Number(hour)+6;
      mymin2 = Number(min);

      myhour3 = Number(hour)+7;
      mymin3 = Number(min)+30;

      myhour4 = Number(hour)+9;
      mymin4 = Number(min);

      //시간이 -값이 될때 값 설정
      if(myhour1>=24){myhour1=myhour1-24;}
      if(myhour2>=24){myhour2=myhour2-24;}
      if(myhour3>=24){myhour3=myhour3-24;}
      if(myhour4>=24){myhour4=myhour4-24;}

      if(mymin1>=60){mymin1=mymin1-60;}
      if(mymin2>=60){mymin1=mymin2-60;}
      if(mymin3>=60){mymin1=mymin3-60;}
      if(mymin4>=60){mymin1=mymin4-60;}

    }else if(min+30>60){
      myhour1 = Number(hour)+2;
      mymin1 = Number(min)-30;

      myhour2 = Number(hour)+6;
      mymin2 = Number(min);

      myhour3 = Number(hour)+8;
      mymin3 = Number(min)-30;

      myhour4 = Number(hour)+9;
      mymin4 = Number(min);

      //시간이 -값이 될때 값 설정
     //시간이 -값이 될때 값 설정
      if(myhour1>=24){myhour1=myhour1-24;}
      if(myhour2>=24){myhour2=myhour2-24;}
      if(myhour3>=24){myhour3=myhour3-24;}
      if(myhour4>=24){myhour4=myhour4-24;}

      if(mymin1>=60){mymin1=mymin1-60;}
      if(mymin2>=60){mymin1=mymin2-60;}
      if(mymin3>=60){mymin1=mymin3-60;}
      if(mymin4>=60){mymin1=mymin4-60;}
    }

    if(gothour && gotmin && sethour && setmin) {
        agent.add(`입력하신 취침시간은 ${hour}시 ${min}분 입니다.`);
      	agent.add(`한 번의 수면 cycle은 1시간 30분 (90분)입니다.\n 당신의 취침시간을 참고한 결과 총 4개의 권장 기상시간(cycle)이 있습니다.\n 1. ${myhour1}시  ${mymin1}분(1cycle) \n 2. ${myhour2}시  ${mymin2}분(4cycle) \n 3. ${myhour3}시  ${mymin3}분(5cycle) \n 4. ${myhour4}시  ${mymin4}분(6cycle) \n 원하는 시간에 일어나시길 추천드립니다.`);
      	agent.add(`꿀잠 주무시길 바랄게요:)`);
    } else {
        agent.add(`아래의 예시대로 채팅을 입력해 주세요 \n
기상시간 입력 예시 :  기상 07:30 또는 기상 07시30분 \n
취침시간 입력 예시 :  취침 22:30 또는 기상 22시30분 \n`);
    }
  }


  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', fallback);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('time1',mytime1);//기상시간 기준
  intentMap.set('time2',mytime2);//취침시간 기준
  agent.handleRequest(intentMap);
});
