const csrfToken = document.querySelector("meta[name=csrf-token]").content;


async function customFetch(url, options = {}) {
  options.headers = {
    'Accept': "application/json",
    // 'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken,
    ...options.headers
  };

  let response = await fetch(url, options);
  if (response.ok) return response.json();
  else throw response;
}

export function followUser(id) {
  // const followBody = JSON.stringify{
  //     'follower_id': currentUSer,
  //     'following_id': id
  //   }

  return customFetch(`/users/${id}/follow`, {
    method: 'POST'
  })
}

export function unfollowUser(id) {
  return customFetch(`/users/${id}/follow`, {
    method: 'DELETE'
  })
}