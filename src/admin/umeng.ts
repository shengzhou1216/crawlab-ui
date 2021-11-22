import useRequest from '@/services/request';

const {
  get,
} = useRequest();

export const initUmeng = () => {
  if (localStorage.getItem('useStats') !== '0') {
    get('/version')
      .then(res => {
        const version = res.data;
        const {aplus_queue} = window;

        // set meta info
        aplus_queue.push({
          action: 'aplus.setMetaInfo',
          arguments: ['globalproperty', {version}, 'OVERWRITE'],
        });

        // send pv
        window.aplus_queue.push({
          action: 'aplus.sendPV',
          arguments: [{is_auto: true}, {}]
        });
      });
  }
};
