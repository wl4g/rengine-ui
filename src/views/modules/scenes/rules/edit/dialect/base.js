let __dialectPrivder = new Map()
export default {
  register: function (lang, dialect) {
    __dialectPrivder.set(lang, dialect)
  },
  for: function (lang) {
    return __dialectPrivder.get(lang)
  },
  Utils: {
    findReturnType: function (fristReturnType, returnTypeOfName, librarys) {
      let simpleReturnType = ""
      librarys.forEach(item => {
        if (item.simpleName == fristReturnType) {
          item.childrens.forEach(child => {
            if (child.name == returnTypeOfName) {
              simpleReturnType =
                child.returnType.split(".")[
                  child.returnType.split(".").length - 1
                ]
            }
          })
        }
      })
      return simpleReturnType
    },
    processEnterChanged(pos, model, librarys, monacoCode) {
      let currentLineText = model
        .getLineContent(pos.lineNumber)
        .substring(0, pos.endColumn)
      let insertText
      //为空和回车后自动缩进判断
      if (
        currentLineText &&
        currentLineText.length != currentLineText.split(" ").length - 1
      ) {
        currentLineText =
          currentLineText.split(" ")[currentLineText.split(" ").length - 1]
        let result = librarys.filter(item => item.simpleName == currentLineText)
        let insertText
        if (result.length > 0) {
          let importText = `import ${result[0].name}`
          //去重
          if (monacoCode.indexOf(importText) == -1) {
            insertText = {
              range: new monaco.Range(1, 1, 1, 1),
              text: importText + ";\n",
              forceMoveMarkers: true,
            }
          } else {
            insertText = null
          }
        }
        return insertText
      }
      return insertText
    },
  },
}
