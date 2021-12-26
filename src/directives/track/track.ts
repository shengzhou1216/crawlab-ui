import {Directive} from 'vue';

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

const track: Directive<HTMLElement, Track> = (el, binding, vnode) => {
  const {eventCode, eventType, eventParams, events} = binding.value;
  const _events: (keyof HTMLElementEventMap)[] = events ? events : ['click'];
  _events?.forEach(ev => {
    el.addEventListener(ev, () => {
      window.aplus_queue?.push({
        action: 'aplus.record',
        arguments: [eventCode, eventType || 'CLK', getEventParamsWrapped(eventParams)],
      });
    });
  });
};

export default track;
