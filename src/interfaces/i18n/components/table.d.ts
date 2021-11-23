interface LComponentsTable {
  columns: {
    actions: string;
  };
  actions: {
    editSelected: string;
    deleteSelected: string;
    export: string;
    customizeColumns: string;
  };
  columnsTransfer: {
    title: string;
    titles: {
      left: string;
      right: string;
    };
  };
}
