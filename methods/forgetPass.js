
// const mailjet = require('node-mailjet').apiConnect(
//   "fc3b13a2be5eddc7374b8bb99c25a620",
//   "24f3afc5b72dae2992bcbb263f631c0c"
// )

const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    "fc3b13a2be5eddc7374b8bb99c25a620",
    "24f3afc5b72dae2992bcbb263f631c0c",
);

module.exports = function(email,token,callback)
{
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'rudra.magharia01@ssipmt.com',
          Name: 'CQForgetPass',
        },
        To: [
          {
            Email: email,
            Name: email,
          },
        ],
        Subject: 'One Step Verification',
        TextPart: 'Please verify your account:-',
        HTMLPart: `<h1>Verify:</h1>
            <p>To update your password <a href="http://localhost:3000/verifyToken/${token}"><b>Click Here</b></a></p>
        `
      },
    ],
  })


  request
    .then(result => {
      console.log(result.body)
      callback(null, result.body)
    })
    .catch(err => {
      console.log(err);
      callback(err, null)

    })
}
