export const getImgLink = (realPath: string, autoCompleteHost = true) => {
  let url = realPath;
  if (realPath.includes('http://') || realPath.includes('https://')) {
    url = realPath;
  } else {
    if (autoCompleteHost) {
      url = `${window.location.protocol}//${window.location.host}${realPath}`;
    }
  }
  url = url.replace(/\)/g, '%29');
  url = url.replace(/\(/g, '%28');
  return url;
};
