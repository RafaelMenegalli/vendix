export function formatCurrency(value: string) {
    // Permite apenas números e , .
    const cleaned = value.replace(/[^\d,\.]/g, '');

    // Converte para formato brasileiro (com , como separador decimal)
    return cleaned;
}