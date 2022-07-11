import {Directive, ref, h} from 'vue';
import {ExportTypeCsv} from '@/constants/export';
import ExportForm from '@/components/export/ExportForm.vue';
import {sendEvent} from '@/admin/umeng';
import {downloadData, translate} from '@/utils';
import {ElMessageBox, ElNotification, NotificationHandle} from 'element-plus';
import useExportService from '@/services/export/exportService';

// i18n
const t = translate;

// export service
const {
  postExport,
  getExport,
  getExportDownload,
} = useExportService();

const export_: Directive<HTMLElement, ExportDirective> = {
  mounted(el, binding) {
    const getTarget = (): string => {
      let target: string;
      if (typeof binding.value === 'string') {
        console.debug('string', binding, binding.value);
        target = binding.value;
      } else if (typeof binding.value === 'function') {
        console.debug('function', binding, binding.value);
        target = binding.value();
      } else {
        return '';
      }
      console.debug(target);
      return target;
    };


    // export cache
    const exportCache = new Map<string, Export>();

    // notifications
    const notifications = new Map<string, NotificationHandle>();

    // export polling interval cache
    const exportPollingIntervalCache = new Map<string, any>();

    // export type
    const exportType = ref<ExportType>(ExportTypeCsv);

    const pollAndDownload = async (exportId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      let exp = exportCache.get(exportId);
      if (!exp) {
        exportPollingIntervalCache.delete(exportId);
        return;
      }
      const res = await getExport(exp?.type, exportId);
      exp = res.data;
      if (exp?.status === 'running') {
        await pollAndDownload(exportId);
      } else {
        const n = notifications.get(exportId);
        const dataDownload = await getExportDownload(exportType.value, exportId);
        downloadData(dataDownload, exp?.file_name as string);
        n?.close();
        return;
      }
    };

    // on click export
    const onClickExport = async () => {
      // prompt export message box
      await ElMessageBox({
        title: t('common.actions.export'),
        message: h(ExportForm, {
          target: 'results_add_data',
          defaultType: exportType.value,
          onExportTypeChange: (value: ExportType) => {
            exportType.value = value;
          },
        }),
        boxType: 'prompt',
        showCancelButton: true,
        confirmButtonText: t('common.actions.export'),
        cancelButtonText: t('common.actions.cancel'),
      });

      // perform export
      const res = await postExport(exportType.value, getTarget());
      const exportId = res.data;
      if (!exportId) return;
      exportCache.set(exportId, {
        id: exportId,
        status: 'running',
        type: exportType.value,
      });

      // notification
      const notification = ElNotification({
        title: t('common.actions.export'),
        message: t(`components.export.exporting.${exportType.value}`),
        duration: 0,
        showClose: false,
      });
      notifications.set(exportId, notification);

      // poll and download
      await pollAndDownload(exportId);

      sendEvent('click_spider_detail_actions_export');
    };

    el.addEventListener('click', onClickExport);
  }
};

export default export_;
