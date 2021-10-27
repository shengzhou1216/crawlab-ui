interface GitChange {
  path?: string;
  name?: string;
  is_dir?: boolean;
  staging?: string;
  worktree?: string;
  extra?: string;
  children?: GitChange[];
}

interface GitLog {
  msg?: string;
  branch?: string;
  author_name?: string;
  author_email?: string;
  timestamp?: string;
}

interface GitData {
  branches?: string[];
  changes?: GitChange[];
  logs?: GitLog[];
  tags?: string[];
  ignore?: string[];
}
