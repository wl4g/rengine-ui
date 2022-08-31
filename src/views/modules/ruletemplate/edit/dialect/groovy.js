import base from "./base.js"

export default {
  __REGEXS: () => {
    return [
      /([a-zA-Z_$][a-zA-Z0-9_$ '\"]*)+.$/g,
      /(=?|s*)?((news)?[a-zA-Z_$][a-zA-Z0-9_$ (.+)'\"]*)+(s*|\r\n*|\n*).$/g,
    ]
  },
  processSuggestions: function (lineText, librarys) {
    let matchesRegex = this.__REGEXS.find(r => lineText.match(r))
    // for (const r in this.__REGEXS) {
    //   if (lineText.match(r)) {
    //     matchesRegex = r
    //     break
    //   }
    // }
    console.info(matchesRegex)
    // Cleanup
    if (lineText) {
      lineText = lineText.replace(/\(.*?\)/g, "()") // 去除括号内的内容
      let keywords = lineText
        .match(matchesRegex)[0]
        .split(".")
        .filter(item => item)
      return this.doSuggestions(keywords, librarys)
    }
    return ""
  },
  doSuggestions: (keywords, librarys) => {
    console.info(keywords)
    let word = keywords[keywords.length - 1].trim()
    let result = []
    let suggestions = []
    // static Type
    if (word.indexOf("(") == -1) {
      result = librarys.filter(item => item.simpleName == word)
      result.length > 0 &&
        result[0].childrens.forEach(item => {
          item.args.forEach(arg => {
            suggestions.push({
              kind: monaco.languages.CompletionItemKind["Function"],
              label: item.name + `(${arg.type + " " + arg.name})`,
              insertText: item.name + `(${arg.type + " " + arg.name})`,
              detail: item.name + `(${arg.type + " " + arg.name})`,
            })
          })
        })
    } else {
      // instance Type
      if (keywords[0].indexOf("new ") == -1) {
        console.info("notnew", keywords)
        let newKeywords = keywords
        let fristReturnType = newKeywords.shift().replace(/\ /g, "")
        console.info(fristReturnType)
        keywords.forEach(item => {
          fristReturnType = base.util.findReturnType(
            fristReturnType,
            item.replace("()", ""),
            librarys
          )
        })
        result = librarys.filter(item => item.simpleName == fristReturnType)
        suggestions = []
        result[0].childrens.forEach(item => {
          item.args.forEach(arg => {
            suggestions.push({
              kind: monaco.languages.CompletionItemKind["Function"],
              label: item.name + `(${arg.type + " " + arg.name})`,
              insertText: item.name + `(${arg.type + " " + arg.name})`,
              detail: item.name + `(${arg.type + " " + arg.name})`,
            })
          })
        })
      } else {
        console.info("isnew", keywords)
        if (keywords.length > 1) {
          let newKeywords = keywords
          let fristReturnType = newKeywords.shift()
          keywords.forEach(item => {
            fristReturnType = base.util.findReturnType(
              fristReturnType,
              item.replace("()", "").replace("new ", ""),
              librarys
            )
          })
          console.info(fristReturnType)
          result = librarys.filter(item => item.simpleName == fristReturnType)
        } else {
          result = librarys.filter(
            item =>
              item.simpleName == word.replace("()", "").replace("new ", "")
          )
        }
        suggestions = []
        console.info(result)
        result[0].constructors &&
          result[0].constructors.forEach(item => {
            item.args.forEach(arg => {
              suggestions.push({
                kind: monaco.languages.CompletionItemKind["Function"],
                label: item.name + `(${arg.type + " " + arg.name})`,
                insertText: item.name + `(${arg.type + " " + arg.name})`,
                detail: item.name + `(${arg.type + " " + arg.name})`,
              })
            })
          })
      }
    }
    return suggestions
  },
  makeSuggestions: () => {},
}
