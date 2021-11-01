import useDetail from '@/layouts/detail';
import {computed, onBeforeMount} from 'vue';
import {useStore} from 'vuex';
import useSpiderService from '@/services/spider/spiderService';
import {useRoute, useRouter} from 'vue-router';
import useGitService from '@/services/git/gitService';
import {getTabName} from '@/utils/route';

const useSpiderDetail = () => {
  const ns = 'spider';
  const store = useStore();
  const {
    spider: state,
    git: gitState,
  } = store.state as RootStoreState;

  const router = useRouter();

  const route = useRoute();

  const id = computed(() => route.params.id as string);

  const activeNavItem = computed<FileNavItem | undefined>(() => state.activeNavItem);

  const fileContent = computed<string>(() => state.fileContent);

  const {
    saveFile: save,
  } = useSpiderService(store);

  const {
    create: createGitForm,
    updateById: updateGitFormById,
  } = useGitService(store);

  const saveFile = async () => {
    if (!id.value || !activeNavItem.value?.path) return;
    await save(id.value, activeNavItem.value?.path, fileContent.value);
  };

  const activeTabName = computed<string>(() => getTabName(router));

  const saveGit = async () => {
    if (!id.value || !gitState.form.url || activeTabName.value !== 'git') return;
    if (gitState.form._id) {
      await updateGitFormById(gitState.form._id, gitState.form);
    } else {
      await createGitForm({
        _id: state.form._id,
        ...gitState.form,
      });
    }
  };

  onBeforeMount(async () => {
    await Promise.all([
      store.dispatch(`project/getAllList`),
    ]);

    store.commit(`${ns}/setAfterSave`, [
      saveFile,
      saveGit,
    ]);
  });

  return {
    ...useDetail('spider'),
    saveFile,
    saveGit,
  };
};

export default useSpiderDetail;
