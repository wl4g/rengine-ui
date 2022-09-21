// function matchKeywords(lineText) {
//   lineText = lineText.replace(/\((.+?)\)/g, "()"); //去除括号内的内容
//   let keywords = lineText
//     .match(
//       /(=?|\s*)?((new\s)?[a-zA-Z_\$][a-zA-Z0-9_\$ \(.+\)\'\"]*)+(\s*|\r\n*|\n*)\.$/g
//     )[0]
//     .split(".")
//     .filter(item => item);
//   return keywords;
// }

// function processSuggerations() {
//   return [];
// }

const Java = {
  matchKeywords(lineText) {
    lineText = lineText.replace(/\((.+?)\)/g, "()"); //去除括号内的内容
    let keywords = lineText
      .match(
        /(=?|\s*)?((new\s)?[a-zA-Z_\$][a-zA-Z0-9_\$ \(.+\)\'\"]*)+(\s*|\r\n*|\n*)\.$/g
      )[0]
      .split(".")
      .filter(item => item);
    return keywords;
  }
};
export default Java;
