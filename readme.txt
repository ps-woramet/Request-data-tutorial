ข้อมูลที่ส่งมา (Request Data) ในแอปพลิเคชันเว็บส่วนใหญ่มาจากไคลเอนต์ (Client) ที่ทำการส่งคำขอ (Request) ไปยังเว็บเซิร์ฟเวอร์ (Server) โดยใช้โปรโตคอล HTTP หรือ HTTPS ซึ่งเป็นโปรโตคอลในการสื่อสารระหว่างเว็บเซิร์ฟเวอร์และไคลเอนต์.

ข้อมูลที่ส่งมาในคำขอ (Request) มักเกี่ยวข้องกับตัวแปรและข้อมูลที่จำเป็นในการประมวลผลคำขอนั้น ๆ ตัวอย่างข้อมูลที่ส่งมาในคำขอได้แก่:

    1.พารามิเตอร์ URL (URL Parameters): เมื่อส่งคำขอเป็น URL เช่น http://example.com/users/123 ส่วนท้ายของ URL เป็นตัวแทนของข้อมูลเชิงตัวเลข หรือสตริง (string) ที่ใช้ในการส่งรหัสผู้ใช้หรือค่าอื่น ๆ ที่เกี่ยวข้องกับคำขอนั้น ๆ.
    
        ถ้าคุณต้องการส่งข้อมูลในส่วนของ URL เพื่อระบุประเภทของคำขอ หรือส่งข้อมูลเชิงตัวเลขหรือสตริงเพื่อใช้ในการดึงข้อมูล เราใช้ URL Parameters เช่น:
        http://example.com/users/123

    2.พารามิเตอร์ใน Query String (Query Parameters): ส่วนของ URL ที่ตามหลังเครื่องหมาย ? ถูกใช้สำหรับส่งข้อมูลเพิ่มเติมในรูปแบบคีย์-ค่า ที่จะใช้ในการกรองข้อมูลหรือขอข้อมูลเฉพาะ.

        ถ้าคุณต้องการส่งพารามิเตอร์ที่อยู่ใน URL เพื่อส่งข้อมูลเชิงตัวเลขหรือสตริง การใช้ Query Parameters เป็นทางเลือกที่ดี เช่น:
        http://example.com/resource?id=123&name=John

    3.ข้อมูลแบบ Form (Form Data): ข้อมูลส่วนมากถูกส่งมาในรูปแบบของฟอร์ม HTML เมื่อผู้ใช้กรอกข้อมูลในฟอร์มและกดส่ง ข้อมูลจะถูกแนบใน body ของคำขอ HTTP และส่งไปยังเซิร์ฟเวอร์.
        
        การส่งฟอร์ม (Form) ในเว็บแอปพลิเคชันใช้วิธีการส่งข้อมูลแบบ POST หรือ GET ไปยังเซิร์ฟเวอร์
        ถ้า GET จะเป็นแบบ Query Parameters
        ถ้า POST จะเป็นแบบ Request Body ในเซิร์ฟเวอร์, คุณจะต้องรับข้อมูลจาก req.body หลังจากใช้ middleware ที่เหมาะสม เช่น express.urlencoded() หรือ express.json() (ใน Express.js) เพื่อแปลงข้อมูลใน Request Body เป็น JavaScript Object.

        Middleware express.urlencoded() 
            ใช้ในการแปลงข้อมูลใน Request Body ที่มาจากฟอร์มแบบ URL-encoded (application/x-www-form-urlencoded) เช่น ข้อมูลจากการส่งฟอร์มผ่าน POST แบบ HTML form.
            ข้อมูลในรูปแบบ URL-encoded จะถูกแปลงเป็น key-value pairs และอยู่ในรูปแบบของสตริง เช่น key1=value1&key2=value2.
            Middleware นี้จะแปลงข้อมูลเหล่านี้เป็น JavaScript Object และเพิ่มเข้าไปใน req.body เพื่อให้เราสามารถเข้าถึงค่าได้ในแอปพลิเคชันของเรา.

        Middleware express.json()
            ใช้ในการแปลงข้อมูลใน Request Body ที่มาในรูปแบบ JSON (application/json) เช่น ข้อมูลที่ถูกส่งผ่าน AJAX หรือ API.
            ข้อมูลในรูปแบบ JSON จะถูกแปลงเป็น JavaScript Object และเพิ่มเข้าไปใน req.body เพื่อให้เราสามารถเข้าถึงค่าได้ในแอปพลิเคชันของเรา.

    4.ข้อมูลแบบ JSON (JSON Data): ในการส่งคำขอแบบ AJAX หรือผ่าน API เราสามารถส่งข้อมูลในรูปแบบ JSON ไปยังเซิร์ฟเวอร์ ซึ่งสามารถประมวลผลได้ด้วย Middleware เช่น express.json().

        ถ้าคุณต้องการส่งข้อมูลที่มีขนาดใหญ่ และไม่สามารถใส่ใน URL ได้หรือต้องการส่งข้อมูลเป็นรูปแบบที่ซับซ้อน เช่น JSON ในการส่งคำขอ AJAX หรือ API คุณสามารถใช้ Request Body เพื่อส่งข้อมูล เช่น:
        POST /api/users
        Content-Type: application/json

        {
            "id": 123,
            "name": "Alice"
        }

    5.Headers: ข้อมูลเพิ่มเติมเกี่ยวกับคำขอเช่น User-Agent, Content-Type, Authorization และอื่น ๆ จะถูกส่งมาใน Headers ของคำขอ.

    6.Cookies: ข้อมูล Cookies จะถูกส่งมาใน Headers เพื่อระบุข้อมูลสถานะของผู้ใช้.

เมื่อเว็บเซิร์ฟเวอร์ได้รับข้อมูลที่ส่งมาจากไคลเอนต์ จะสามารถใช้ Middleware และตัวจัดการเพื่อประมวลผลข้อมูลนี้เพื่อสร้างการตอบสนองที่เหมาะสม.

1. install
    npm init
    npm i express

2. npm install package

    npm i express nodemon

3. package.json for npm start

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
    },

4. create file

    pages > form.html, jsosndata.html, jsondataheader.html, querystring.html, urlparameters.html
    server.js

