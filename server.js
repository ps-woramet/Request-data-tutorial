const express = require('express')
const app = express()
const port = 3001

// ส่งค่าผ่าน URL parameter ด้วย method GET และ รับค่าด้วย Url parameter------------------------------------------------------

// <!DOCTYPE html>
// <html>
// <head>
//   <title>Send URL Parameter</title>
// </head>
// <body>
//   <a href="http://localhost:3001/urlparameters-submit/123">Send URL Parameter</a>
// </body>
// </html>

app.get('/urlparameters', (req,res) => {
    res.sendFile(__dirname + '/pages/urlparameters.html');
})

app.get('/urlparameters-submit/:userId', (req, res) => {
     // [http://localhost:3001/urlparameters-submit/1234]
    
    const userId = req.params.userId; // รับค่า URL Parameter
    console.log(userId)
    const userObject = { id: userId, name: "John Doe" }; // สร้าง Object
    res.json(userObject); // ส่งค่าเป็น JSON Object กลับไป
})

// ------------------------------------------------------

// ส่งค่าผ่าน URL ด้วย method GET และ รับค่าด้วย Query string------------------------------------------------------

// <!DOCTYPE html>
// <html>
// <head>
//   <title>Send Data via URL and Receive data with Query Parameters</title>
// </head>
// <body>
//   <form action="/querystring-submit" method="GET">
//     <label for="userId">Enter User ID:</label>
//     <input type="text" id="userId" name="id">
//     <button type="submit">Submit</button>
//   </form>
// </body>
// </html>

app.get('/querystring', (req, res) => {
    res.sendFile(__dirname + '/pages/querystring.html');
})

app.get('/querystring-submit', (req, res) => {
    // [http://localhost:3001/querystring-submit?id=dsfasf]
    const userId = req.query.id; // รับค่า ID จาก Query Parameters
    const userObject = { id: userId, name: "John Doe" }; // สร้าง Object
    res.json(userObject); // ส่งข้อมูลกลับเป็น json
})

app.get('/querystring-submit2', (req, res) => {
    // [http://localhost:3001/url-submit?id=dsfasf]
    const userId = req.params.id; // รับค่า ID จาก URL Parameters
    const userObject = { id: userId, name: "woramet" }; // สร้าง Object
    res.json(userObject); // ส่งค่าเป็น JSON Object กลับไป
})

// ------------------------------------------------------

// ส่ง Form Data ผ่าน Request Body ด้วย method POST และ รับค่าด้วย body-parser------------------------------------------------------

// <!DOCTYPE html>
// <html>
// <head>
//   <title>Send Data via Form</title>
// </head>
// <body>
//   <form action="/form-submit-no-bodyparser" method="POST">
//     <label for="userId">Enter User ID:</label>
//     <input type="text" id="userId" name="id">
//     <button type="submit">Submit</button>
//   </form>
// </body>
// </html>

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// extended: true: เมื่อตั้งค่าเป็น true (ค่าเริ่มต้น) จะเป็นการเปิดใช้งานการแปลงข้อมูลที่มีความซับซ้อน ซึ่งส่วนใหญ่ใช้กับข้อมูลจาก Form Data ที่เข้ามามีโครงสร้างที่ซับซ้อนเช่นการส่งอาร์เรย์หรือออบเจกต์ซ้อนกัน โดยข้อมูลจะถูกแปลงเป็น JavaScript Object ซึ่งอาจมีโครงสร้างที่ซับซ้อน.
// extended: false: เมื่อตั้งค่าเป็น false จะไม่ทำการแปลงข้อมูลที่ซับซ้อน และข้อมูลจะถูกแปลงเป็น JavaScript Object ที่มีค่าเรียงลำดับอักขระอย่างง่าย ไม่สามารถรับข้อมูลที่ซับซ้อนมากเช่นอาร์เรย์หรือออบเจกต์ซ้อนกันได้.

const bodyParser = require('body-parser')

// Middleware สำหรับรับและแปลง Form Data
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/pages/form.html');
})

app.post('/form-submit', (req, res) => {
  const userId = req.body.id; // รับค่า ID จาก Form Data
  const userObject = { id: userId, name: "John Doe" }; // สร้าง Object
  res.json(userObject); // ส่งค่าเป็น JSON Object กลับไป
});

// ------------------------------------------------------

// ส่ง Json data ด้วย fetch api ผ่าน Request Body method POST และ รับค่าด้วย express.json()------------------------------------------------------

// JSON.stringify() เป็นฟังก์ชันในภาษา JavaScript ที่ใช้สำหรับแปลงข้อมูลในรูปแบบของ JavaScript Object เป็นสตริง JSON (JavaScript Object Notation) เพื่อให้สามารถส่งข้อมูลไปยังเซิร์ฟเวอร์หรือเว็บเซอร์วิสอื่น ๆ ที่รับ JSON ได้ หรือสำหรับการเก็บข้อมูลในรูปแบบ JSON ในฝั่งของเว็บแอปพลิเคชัน.
// รูปแบบที่ได้จาก JSON.stringify() จะเป็นสตริง (string) ที่เขียนตามรูปแบบของ JSON และสามารถถูกแปลงกลับเป็น JavaScript Object ด้วย JSON.parse().

// <!DOCTYPE html>
// <html>
// <head>
//   <title>Send JSON Data</title>
// </head>
// <body>
//   <button id="sendButton">Send JSON Data</button>
//   <p id = 'myP'></p>
//   <script>
//     document.getElementById("sendButton").addEventListener("click", async () => {
//       const dataToSend = { id: 123, name: "Alice" };
//       const response = await fetch('/jsondata-submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(dataToSend)
//       });
//       const result = await response.json();
//       const myP = document.getElementById("myP");
//       var textId = document.createTextNode(result.data.id);
//       var br = document.createElement("br");
//       myP.appendChild(textId)
//       myP.appendChild(br)
//       var textName = document.createTextNode(result.data.name);
//       myP.appendChild(textName)
//     });
//   </script>
// </body>
// </html>

// Middleware สำหรับรับและแปลง JSON Data
app.use(express.json())

app.get('/jsondata', (req, res) => {
    res.sendFile(__dirname + '/pages/jsondata.html');
})

// app.post('/jsondata-submit', (req, res) => {
//     console.log('here json')
//   const jsonData = req.body; // รับข้อมูล JSON Data
//   const processedData = { message: 'Data received successfully', data: jsonData };
//   res.json(processedData); // ส่ง JSON Object กลับไป
// });

app.post('/jsondata-submit', (req, res) => {
    const jsonData = req.body;
    console.log(jsonData) // ถ้าไม่ใช้ express.json() ค่า jsonData จะเท่ากับ {}
    const myId = jsonData.id
    jsonData.id = 'my id is' + myId
    const myName = jsonData.name
    jsonData.name = 'my name is' + myName
    const processedData = { message: 'Data received successfully', data: jsonData };
    res.json(processedData);
});

// ------------------------------------------------------

// ส่ง Json data ด้วย fetch api ผ่าน Request Body method POST ทำการแก้ไข header และ รับค่าด้วย express.json()------------------------------------------------------

// <!DOCTYPE html>
// <html>
// <head>
//   <title>Send Data with Headers</title>
// </head>
// <body>
//   <button id="sendButton">Send Data</button>

//   <script>
//     document.getElementById("sendButton").addEventListener("click", async () => {
//       const dataToSend = { id: 123, name: "Alice" };
//       const headers = new Headers();
//       headers.append('Custom-Header', 'Custom Value');

//       const response = await fetch('/jsondataheader-submit', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(dataToSend)
//       });

//       const result = await response.json();
//       console.log(result);
//     });
//   </script>
// </body>
// </html>

// ใช้ middleware bodyParser เพื่อให้ Express รับข้อมูล JSON จาก Request Body
app.use(express.json());

app.get('/jsondataheader', (req, res) => {
    res.sendFile(__dirname + '/pages/jsondataheader.html');
})

app.post('/jsondataheader-submit', (req, res) => {
  const jsonData = req.body; // รับข้อมูล JSON Data
  const customHeaderValue = req.header('Custom-Header'); // รับค่าจาก Header
  const processedData = {
    message: 'Data received successfully',
    data: jsonData,
    customHeader: customHeaderValue
  };

  res.json(processedData); // ส่ง JSON Object กลับไป
});

app.listen(port, ()=>{console.log(port)})