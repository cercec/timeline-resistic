export const extract = (str, max) => {
  let maxLength = max;
  let trimmedString = str.substr(0, maxLength);
  if(str.length > trimmedString.length){
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    return trimmedString + '...'
  }
}
