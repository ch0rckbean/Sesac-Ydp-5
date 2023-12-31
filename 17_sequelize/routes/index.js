const express = require("express");
const controller = require("../controller/Cvisitor");
const router = express.Router();

// 기본주소: localhost:PORT
router.get("/", controller.main);

//frontend js에서 날린 axios들 처리
// READ: 방명록 전체 보기
router.get("/visitors", controller.getVisitors);

// CREATE: 방명록 하나 추가
router.post("/visitor", controller.postVisitor);

// DELETE: 방명록 하나 삭제
router.delete("/visitor", controller.deleteVisitor);

// UPDATE: 방명록 내용 수정
// router.patch("/visitor", controller.updateVisitor);

///////////////// UPDATE 다른 코드
// router.get("/visitor", controller.getVisitor);  //쿼리 스트링 썼을 때
// router.get("/visitor/:id", controller.getVisitor);
// router.patch("/visitor", controller.upVisitor);

module.exports = router;
