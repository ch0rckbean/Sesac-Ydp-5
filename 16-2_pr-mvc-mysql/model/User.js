// TODO: DB(mysql) 연결
// TODO: 모델 코드
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "1234",
  database: "sesac",
});

//** 회원가입
exports.doSignup = (data, cb) => {
  console.log("data | doSignup | User.js", data);
  const { id, pw, nickname } = data; //Ctrlr에서 받아온 req.body
  conn.query(
    `INSERT INTO user(userid, name, pw) VALUES ("${id}","${pw}","${nickname}")`,
    (err, row) => {
      if (err) {
        throw err;
      }
      // console.log("data | doSignup | User.js", data);
      console.log("row | doSignup | User.js", row);
      // for (let i = 0; i < Object.keys(data).length; i++) {
      //   if (Object.values(data)[i].length > 0) {
      //     // console.log("ss", Object.values(data).length);
      //     cb(row); //ctrlr로 row를 보냄
      //     //for문 내에 있어서 계속 ERR_HTTP_HEADERS_SENT 에러가 났었음 ㅠㅠ
      //   }
      if (
        //한 필드라도 길이가 0이면 회원가입 실패
        Object.values(data)[0].length &
        Object.values(data)[1].length &
        Object.values(data)[2].length
      ) {
        cb(row);
      } else {
        cb("Fail");
      }
    }
  );
};

//** 로그인/
exports.doSignin = (data, cb) => {
  console.log(data);
  conn.query(
    `SELECT * FROM user WHERE userid="${data.id}" AND pw="${data.pw}"`,
    (err, row) => {
      if (err) {
        throw err;
      }
      if (row.length > 0) {
        console.log("row | doSignin | User.js", row);
        cb(row);
      } else {
        cb("Fail");
      }
    }
  );
};

//** 프로필 - 회원정보 보기
exports.viewPro = (data, cb) => {
  const sql = `SELECT * FROM user WHERE userid="${data.userid}" LIMIT 1`;
  console.log(data); // {userid : 'd'}
  conn.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    // console.log("rows", rows); //[ RowDataPacket { id: 5, userid: 'd', name: 'd', pw: 'd' } ]
    cb(rows);
  });
};

//** 프로필 - 회원정보 수정
exports.editPro = (data, cb) => {
  console.log("data | editPro | User.js ", data);
  conn.query(
    `UPDATE user SET name="${data.nickname}",pw="${data.pw}"  WHERE userid="${data.userid}" `,
    (err, row) => {
      if (err) {
        throw err;
      } else {
        // console.log("row", row);
        cb(row);
      }
    }
  );
};

//** 프로필 - 회원 탈퇴
exports.doDelete = (data, cb) => {
  console.log("data", data); // { '13': '' }
  // const {id}=data;
  const id = Object.keys(data);
  conn.query(`DELETE FROM user WHERE id= "${id}"`, (err, row) => {
    if (err) {
      throw err;
    } else {
      cb(row);
    }
  });
};
