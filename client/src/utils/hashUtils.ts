// Pull token from returned URL after Blizzard login
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

// Clear URL after storing token
export const removeSearchParamsFromUrl = () => {
  window.history.pushState("", document.title, window.location.pathname)
}
