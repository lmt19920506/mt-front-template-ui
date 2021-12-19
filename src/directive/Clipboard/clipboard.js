// Inspired by https://github.com/Inndy/vue-clipboard2
import Clipboard from 'clipboard';
import { Message } from 'element-ui';

if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ');
}

export default {
  bind(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value;
    } else {
      if (binding.modifiers?.notice) {
        el._v_clipboard_notice = true;
      }
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value;
        },
        action() {
          const action = binding.arg === 'cut' ? 'cut' : 'copy';
          el._v_clipboard_action = action.replace(/^\S/, (v) =>
            v.toUpperCase()
          );
          return action;
        }
      });
      clipboard.on('success', (e) => {
        const callback = el._v_clipboard_success;
        if (callback) {
          callback(e);
        } else if (el._v_clipboard_notice) {
          Message.success(`${el._v_clipboard_action} Successful!`);
        }
      });
      clipboard.on('error', (e) => {
        const callback = el._v_clipboard_error;
        if (callback) {
          callback(e);
        } else if (el._v_clipboard_notice) {
          Message.success(`${el._v_clipboard_action} Failed!`);
        }
      });
      el._v_clipboard = clipboard;
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value;
    } else {
      el._v_clipboard.text = function () {
        return binding.value;
      };
      el._v_clipboard.action = function () {
        const action = binding.arg === 'cut' ? 'cut' : 'copy';
        el._v_clipboard_action = action.replace(/^\S/, (v) => v.toUpperCase());
        return action;
      };
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success;
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error;
    } else {
      el._v_clipboard.destroy();
      delete el._v_clipboard_notice;
      delete el._v_clipboard_action;
      delete el._v_clipboard;
    }
  }
};
