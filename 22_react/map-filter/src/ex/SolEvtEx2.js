import React, { useState } from "react";

export default function SolEvtEx2() {
  const [inputs, setInputs] = useState({
    //state 1개로 동시에 관리
    writer: "",
    title: "",
    search: "",
  });
  const { writer, title, search } = inputs;
  const [comments, setComments] = useState([]);
  const [searchType, setSearchType] = useState("writer");
  const [result, setResult] = useState([]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value, // [] - name이라는 변수 사용 지정
    });
  };

  const addComment = () => {
    const newComment = {
      writer: writer,
      title: title,
      // input.writer, input.title
    }; // 새로 추가될 정보
    setComments([...comments, newComment]);
    setInputs("");
  };

  const selectSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const searchComment = () => {
    const searchResult = comments.filter((cmt) => {
      // cmt: {writer: xxx, title: xxx}

      // 검색창에 빈 값 입력해도 빈 문자열''을 include 하기 때문에
      // 전체 comments 결과를 반환함

      if (!cmt[searchType].includes(search)) {
        // 검색 결과 없다면; null
        return null;
      }
      return cmt;
    });
    setResult(searchResult); //검색 결과 state 변경
    setInputs({
      ...inputs,
      search: "",
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="writer">작성자:</label>
        <input
          id="writer"
          type="text"
          name="writer"
          value={writer}
          onChange={onChange}
        />
        <label htmlFor="title">제목:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={onChange}
        />
        <button type="button" onClick={addComment}>
          작성
        </button>
      </form>

      <form>
        <select name="type" onChange={selectSearchType}>
          <option value="writer">작성자</option>
          <option value="title">제목</option>
        </select>

        <input
          type="text"
          name="search"
          placeholder="검색어"
          onChange={onChange}
        />
        <button type="button" onClick={searchComment}>
          검색
        </button>
      </form>

      <h3>전체 댓글 목록</h3>
      <table border={1} style={{ margin: "30px auto", width: "500px" }}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((cmt, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{cmt.title}</td>
              <td>{cmt.writer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>댓글 검색 결과</h3>
      {result.length > 0 ? (
        <table border={1} style={{ margin: "30px auto", width: "500px" }}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {result.map((cmt, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{cmt.title}</td>
                <td>{cmt.writer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
}
