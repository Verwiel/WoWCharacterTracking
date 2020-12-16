// grab code from returned URL after Blizzard login
// This is not an access token. The only thing you can do with the authorization code is to make a request to get an access token.

export const getSearchParams = () => {
  return window.location.search
    .substring(1)
    .split("&")
    .reduce(function(initial: { [key: string]: any; }, item) {
      if (item) {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1])
      }
      return initial
    }, {})
}

// Clear URL
export const removeSearchParamsFromUrl = () => {
  window.history.pushState("", document.title, window.location.pathname)
}
