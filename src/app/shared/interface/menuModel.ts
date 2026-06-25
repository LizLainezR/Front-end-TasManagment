
export interface MenuItemEntity{
id : string,
name:string, 
icon: string,
route: string | null,
sortOrder:string,
submenus?: MenuItemEntity[];
}
