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

  var mytime;
  function test1(agent){
    agent.setContext();
    const mytime = agent.parameters.hours;
    const myresult = mytime+12;
    if(mytime>0){
      agent.add(`Good. your sleep time is ${myresult}`);
    }
  }

  function test2(agent) {
    const hour = agent.parameters.hours;
    const min = agent.parameters.minutes;
    const gothour = hour.length > 0;
    const gotmin = min.length > 0;
    const rehour = (hour)+3;
    const remin = min+10;

    if(gothour && gotmin) {
        agent.add(`좋습니다. 당신의 취침시간은 ${hour}시 ${min}분 입니다.`);
      	agent.add(`${rehour}시  ${remin}분에 주무십시오`);
    } else if (gothour && !gotmin) {
        agent.add('시간이 잘못 입력되었습니다.');
    } else if (gothour && !gothour) {
        agent.add('시간이 잘못 입력되었습니다.');
    } else {
        agent.add('취침시간을 00:00 또는 00시00분 으로 입력해 주세요');
    }
  }
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('test',test2);
  agent.handleRequest(intentMap);
});
