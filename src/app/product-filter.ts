/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Red Wine Path                                                    |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Añadimos los nuevos elementos de filtrado                        |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export interface ProductFilter {
    text?: string;
    category?: string;
    state?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    order?: string;
}
