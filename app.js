const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'L+RJ15lZgeSoWgeHf9BqgEhm8lYh11qALzPlDV85VGXHfmiKqj3CX1V9DvqakFeJqwWgfQRejsUIWqf/kJuTLQcRC5ws2pyJJbr0VFEXptoYicgiRDzuA51W91dTcFL6/olvLNS1zAf1xO2wxpTGvQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e8e139b4cf31d22ed234d62a9b336e74',
};

const app = express();
app.post('https://bots.dialogflow.com/line/d1584d25-0e52-48da-b6cc-20e021dc5e70/webhook', line.middleware(config), (req,res)=>{
  promise
    .all(req.body.events.map(handleEvent))
    .then((result)=>res.json(result));
});

const clinet = new line.Client(config);
function handleEvent(event){
  if(event.type !== 'message' || event.message.type != 'text'){
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken,{
    type:'text',
    text: event.message.text
  });
}

app.listen(3000, function () {
  console.log('Linebot listening on port 3000!');
});
