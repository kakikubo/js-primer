console.log("index.js: loaded!");
// const userId = "js-primer-example";

function fetchUserInfo(userId) {
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then((response) => {
      console.log(response.status);
      // エラーレスポンスが返されたことを検知する
      if (!response.ok) {
        console.error("エラーレスポンス", response);
      } else {
        return response.json().then((userInfo) => {
          console.log(userInfo);
          // HTMLの組み立て
          const view = escapeHTML`
          <h4>${userInfo.name} (@${userInfo.login})</h4>
          <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
          <dl>
            <dt>Location</dt>
            <dd>${userInfo.location}</dd>
            <dt>Repositories</dt>
            <dd>${userInfo.public_repos}</dd>
          </dl>
          `;
          // HTMLの挿入
          const result = document.getElementById("result");
          result.innerHTML = view;
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// See. https://github.com/kakikubo/js-primer/blob/develop/chapter15/string.js#L542-L557
function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      console.log(`special value = ${value} str=${str}`);
      return result + escapeSpecialChars(value) + str;
    } else {
      console.log(`value = ${value} str=${str}`);
      return result + String(value) + str;
    }
  });
}
