module.exports = {
    site_name: 'oak bookmark',
    listen_port: 3000,
    /** 日志路径(绝对路径) */
    //log_dir:"",
    /** 日记记录是否不输出到控制台,生产环境请设置为true */
    console_quiet: false,
    /** 日志级别设置, 值可为"silly" "debug" "verbose" "info" "warn" "error" 之一,默认为"debug" */ 
    log_level: 'debug',
    /** mongodb database name */
    db_name: 'obm'        
};
