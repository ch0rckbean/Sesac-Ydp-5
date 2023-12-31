// TODO: 컨트롤러 코드
const User = require("../model/User");

// main
exports.main = (req, res) => {
  res.render("index");
};

// ** 페이지 이동
// 회원가입
exports.signup = (req, res) => {
  console.log("회원가입 페이지 이동");
  res.render("signup");
};
// 로그인
exports.signin = (req, res) => {
  console.log("로그인 페이지 이동");
  res.render("signin");
};
// // 프로필
// exports.profile = (req, res) => {
//   console.log("프로필 페이지 이동");
//   res.render("profile");
// };

//** axios 연결/
// 회원가입
exports.doSignup = (req, res) => {
  console.log("회원가입 버튼 클릭");
  console.log("req.body | doSignup ", req.body);
  // console.log(Object.values(req.body)[0]);

  User.doSignup(req.body, (data) => {
    console.log("data | doSignup | CUser.js ", data);
    if (data === "Fail") {
      //model에서 받아온 row
      return res.send({ state: "Fail" });
    } else {
      return res.send({ state: "Success", res: data });
    }
  });
};

// 로그인
exports.doSignin = (req, res) => {
  console.log("로그인 버튼 클릭");
  console.log("req.body | doSignin | Cuser.js", req.body);
  // console.log(Object.values(req.body).length);

  User.doSignin(req.body, (data) => {
    console.log("req.body | doSignin | Cuser.js", req.body);
    console.log("data | doSignin | Cuser.js", data);
    if (data == "Fail") {
      return res.send({ state: "Fail" });
    } else {
      // return res.send({ id: req.body.id, pw: req.body.pw, state: "Success" });
      return res.send({ id: data.id, pw: data.pw, state: "Success" });
    }
  });
};

// 프로필 - 회원정보 보기
exports.viewPro = (req, res) => {
  console.log("회원정보 보기");

  console.log("***************************************");
  console.log("req.body | viewPro | Cuser.js", req.body); //{ userid: 'd' }
  User.viewPro(req.body, (result) => {
    console.log("result | viewPro | Cuser.js", result); //[ RowDataPacket { id: 5, userid: 'd', name: 'd', pw: 'd' } ]
    res.render("profile", { data: result[0] }); //인덱싱 중요!!!!
  });
};

// 프로필 - 회원정보 수정
exports.editPro = (req, res) => {
  console.log("req.body | editPro | Cuser.js", req.body);

  User.editPro(req.body, (data) => {
    console.log("data | editPro | Cuser.js", data);
    res.send(true);
  });
};

// 프로필 - 회원 탈퇴
exports.doDelete = (req, res) => {
  console.log("req.body | doDelete | Cuser.js", req.body);
  //front에서 받아온 hidden form의 값  { 'n': '' }
  User.doDelete(req.body, (data) => {
    res.send({ id: data });
  });
};
