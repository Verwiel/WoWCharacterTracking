export const getSearchParams = () => {
  return window.location.search
    .substring(1)
    .split("&")
    .reduce(function(initial: { [key: string]: any; }, item) {
      console.log(item)
      if (item) {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1])
      }
      return initial
    }, {})
}

export const removeSearchParamsFromUrl = () => {
  window.history.pushState("", document.title, window.location.pathname)
}
