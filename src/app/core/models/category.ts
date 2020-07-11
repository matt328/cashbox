export interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

export interface CategoryUI {
  id: string;
  name: string;
  children: CategoryUI[];
}
