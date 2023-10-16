console.log("index.js: loaded!");
async function main() {
  try {
    const userInfo = await fetchUserInfo("js-primer-example");
    const view = createView(userInfo);
    displayView(view);
  } catch (error) {
    console.error(`エラーが発生しました (${error})`);
  }
}

function fetchUserInfo(userId) {
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then((response) => {
      console.log(response.status);
      // エラーレスポンスが返されたことを検知する
      if (!response.ok) {
        console.error("エラーレスポンス", response);
        // エラーレスポンスからRejectedなPromiseを作成して返す
        return Promise.reject(
          new Error(`${response.status}: ${response.statusText}`)
        );
      } else {
        // JSONオブジェクトで解決されるPromiseを返す
        return response.json();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function createView(userInfo) {
  return escapeHTML`
  <h4>${userInfo.name} (@${userInfo.login})</h4>
  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
  <dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositories</dt>
    <dd>${userInfo.public_repos}</dd>
  </dl>
  `;
}

function displayView(view) {
  const result = document.getElementById("result");
  result.innerHTML = view;
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
