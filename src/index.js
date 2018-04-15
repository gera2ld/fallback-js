let errors = [];
let options = {
  debug: false,
  selector: '#fallback-js',
  timeout: 1000,
  count: 1, // times to call FallbackJs.ok()
  hide: null, // selector for element to hide
  ...window._fallbackJs, // eslint-disable-line no-underscore-dangle
};
let timer;
let count = 0;

initialize();

function initialize() {
  window.addEventListener('DOMContentLoaded', start, false);
  window.onerror = (message, source, lineno, colno, error) => {
    if (errors && error) {
      debug('get error', error);
      const item = {
        message,
        source: `${source}:${lineno}:${colno}`,
      };
      try {
        item.stack = error.stack;
      } catch (err) {
        // ignore
      }
      errors.push(item);
    }
  };
}

function start() {
  if (count >= (+options.count || 1)) return;
  const { timeout } = options;
  timer = setTimeout(warnObsolete, timeout);
}

export function config(userOptions) {
  debug('config', userOptions);
  options = {
    ...options,
    ...userOptions,
  };
}

export function ok() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  errors = null;
  count += 1;
  debug('finished');
}

function warnObsolete() {
  debug('warn obsolete');
  const el = $(options.selector);
  if (el) {
    el.style.display = '';
    ['hide'].forEach(key => {
      let value = el.getAttribute(`data-${key}`);
      if (value) {
        try {
          value = JSON.parse(value);
        } catch (err) {
          // ignore
        }
        options[key] = value;
      }
    });
    const { hide } = options;
    const elHide = hide && $(hide);
    if (elHide) elHide.style.display = 'none';
  }
  const { onError } = options;
  try {
    if (onError) onError(errors);
  } catch (err) {
    // ignore
  }
}

function debug(...items) {
  if (options && options.debug) {
    // eslint-disable-next-line no-console
    console.log(['[FallbackJs]', ...items].map(item => `${item}`).join(' '));
  }
}

function $(selector) {
  return document.querySelector(selector);
}
