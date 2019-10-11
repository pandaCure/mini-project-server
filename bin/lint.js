#!/usr/bin/env node
const CLIEngine = require('eslint').CLIEngine
const eslint = new CLIEngine()
const report = eslint.executeOnFiles(['.'])
const errorReport = CLIEngine.getErrorResults(report.results)
errorReport.forEach(value => {
  const str = `文件${value.filePath}格式不正确\n
  错误数量❌： ----> ${value.errorCount}\n
  是否可以修复数量：-----> ${value.fixableErrorCount}\n
  错误代码code：-----> ${value.source}\n
  错误信息：-----> ${JSON.stringify(value.messages)}
  `
  console.log(str)
})
