var linebot = require('linebot');

var bot = linebot({
  channelId: '1653555207',
  channelSecret: 'e8e139b4cf31d22ed234d62a9b336e74',
  channelAccessToken: 'L+RJ15lZgeSoWgeHf9BqgEhm8lYh11qALzPlDV85VGXHfmiKqj3CX1V9DvqakFeJqwWgfQRejsUIWqf/kJuTLQcRC5ws2pyJJbr0VFEXptoYicgiRDzuA51W91dTcFL6/olvLNS1zAf1xO2wxpTGvQdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    // success
  }).catch(function (error) {
    // error
  });
});

bot.listen('/linewebhook', 3000);
