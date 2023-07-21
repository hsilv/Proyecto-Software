export interface selectParams {
    table: string,
    columns: string[],
    conditions: {
        columnName: string,
        comparation: Object,
    },
}