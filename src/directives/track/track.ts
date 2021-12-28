import {Directive, DirectiveBinding} from 'vue';

const getEventParamsWrapped = (eventParams?: TrackEventParams): TrackEventParamsWrapped => {
  if (!eventParams) return {};
  const res: TrackEventParamsWrapped = {};
  Object.keys(eventParams).forEach(key => {
    const value = eventParams[key];
    if (typeof value === 'function') {
      res[key] = value();
    } else {
      res[key] = value;
    }
  });
  return res;
};

const _eventListenerCache = new Map<string, EventListener>();

const getEventListener = (binding: DirectiveBinding<Track>): EventListener => {
  const {code: eventCode, type: eventType, params: eventParams} = binding.value;
  const cacheKey = JSON.stringify({eventCode, eventType, eventParams});
  if (_eventListenerCache.has(cacheKey)) {
    return _eventListenerCache.get(cacheKey) as EventListener;
  }
  const listener = () => {
    window.aplus_queue?.push({
      action: 'aplus.record',
      arguments: [eventCode, eventType || 'CLK', getEventParamsWrapped(eventParams)],
    });
  };
  _eventListenerCache.set(cacheKey, listener);
  return listener;
};

const track: Directive<HTMLElement, Track> = {
  mounted(el, binding) {
    const {events} = binding.value;
    const _events: (keyof HTMLElementEventMap)[] = events ? events : ['click'];
    _events?.forEach(ev => {
      el.addEventListener(ev, getEventListener(binding), false);
    });
  },
  unmounted(el, binding) {
    const {events} = binding.value;
    const _events: (keyof HTMLElementEventMap)[] = events ? events : ['click'];
    _events?.forEach(ev => {
      el.removeEventListener(ev, getEventListener(binding), false);
    });
  },
};

export default track;
