interface Track {
  eventCode: string;
  eventType?: TrackEventType;
  eventParams?: TrackEventParams;
  events?: (keyof HTMLElementEventMap)[];
}

type TrackEventType = 'CLK' | 'EXP';

type TrackEventParamsWrapped = { [key: string]: any };

type TrackEventParams = { [key: string]: string | number | Function };
