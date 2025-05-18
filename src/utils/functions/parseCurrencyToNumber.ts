export function parseCurrencyToNumber(value: string) {
    if (!value) return 0;
    // Remove pontos de milhar e troca vírgula por ponto
    const normalized = value.replace(/\./g, '').replace(',', '.');
    return parseFloat(normalized);
}