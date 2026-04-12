// 应该使用 message = useMessage()调用

const message = {
  info: (args: any) => {
    if (window.message) window.message.info(args);
  },
  error: (args: any) => {
    if (window.message) window.message.error(args);
  },
  warning: (args: any) => {
    if (window.message) window.message.warning(args);
  },
  success: (args: any) => {
    if (window.message) window.message.success(args);
  },
};

export default message;
