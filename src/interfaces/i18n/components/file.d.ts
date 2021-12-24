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
    settings: {
      title: string;
    };
  };
  upload: {
    title: string;
    buttons: {
      files: {
        dragFilesHereOr: string;
        clickToUpload: string;
      };
      folder: {
        clickToSelectFolderToUpload: string;
      };
    };
    tooltip: {
      folderName: string;
      filesCount: string;
    };
    mode: {
      folder: string;
      files: string;
    };
    fileList: {
      title: string;
    };
  };
}
