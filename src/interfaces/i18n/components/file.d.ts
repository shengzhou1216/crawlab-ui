interface LComponentsFile {
  editor: {
    navTabs: {
      close: string;
      closeOthers: string;
      closeAll: string;
      showMore: string;
    };
    navMenu: {
      newFile: string;
      newDirectory: string;
      rename: string;
      duplicate: string;
      delete: string;
    };
    sidebar: {
      search: {
        placeholder: string;
      };
      settings: string;
      toggle: {
        showFiles: string;
        hideFiles: string;
      };
    };
    empty: {
      placeholder: string;
    };
    messageBox: {
      prompt: {
        newFile: string;
        newDirectory: string;
        rename: string;
        duplicate: string;
      };
    };
  };
}
