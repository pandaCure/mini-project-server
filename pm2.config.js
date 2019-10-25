module.exports = {
  apps: {
    name: 'weChat-mini-server', // 项目名
    script: './bin/www', // 执行文件
    ignore_watch: [
      // 不用监听的文件
      'node_modules',
      'logs',
      'pm2'
    ],
    error_file: './pm2/app-err.log', // 错误日志文件
    out_file: './pm2/app-out.log', // 正常日志文件
    merge_logs: true, // 设置追加日志而不是新建日志
    log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式
    env: {
      NODE_ENV: 'production', // 环境参数，当前指定为生产环境 process.env.NODE_ENV
      PORT: '8089' // process.env.REMOTE_ADDR
    },
    env_dev: {
      NODE_ENV: 'development', // 环境参数，当前指定为开发环境 pm2 start app.js --env_dev
      REMOTE_ADDR: ''
    },
    env_test: {
      // 环境参数，当前指定为测试环境 pm2 start app.js --env_test
      NODE_ENV: 'test',
      REMOTE_ADDR: ''
    }
  }
}
